<template>
  <div class="live">
    <top-bar title="Live Acquisition" />
    <div class="buttons">
      <button v-if="connected" class="button" ref="connect" @click="disconnect">
        disconnect
      </button>
      <button v-else class="button" ref="connect" @click="connect">
        <div v-if="connecting">
          <loading-indicator />
        </div>
        <div v-else>connect</div>
      </button>

      <div v-if="connected">
        <button
          v-if="connected && live"
          :class="download ? 'button recording' : 'button'"
          id="stop"
          @click="stop"
        >
          Stop
        </button>
        <button v-else class="button" id="start" @click="start">start</button>
      </div>

      <a
        class="button a-button active"
        v-bind:href="downloadLink"
        :class="{ hide: downloadLink == '' }"
        @click="downloadAnalytics"
        id="downloadBtn"
      >
        Download
      </a>
    </div>
    <div style="height: 32px" />
    <channels-charts
      ref="charts"
      :channels="channels"
      :samplingRate="samplingRate"
      @o1="setOutput1"
      @o2="setOutput2"
      :digital="digital"
      :device="device"
      :key="componentKey"
    />
    <div style="height: 100px" />
    <Modal v-model="isShow" :close="closeModal">
      <div class="modal">
        <h2>Pair your device</h2>
        <div v-if="this.platform.includes('Linux')">
          <linux-pair-help />
        </div>
        <div v-else-if="this.platform.includes('Windows')">
          Insert Instructions for Windows
        </div>
        <div v-else>Insert Instructions for Mac</div>
        <div style="height: 32px" />
        <button class="button" @click="closeModal">Got it!</button>
      </div>
    </Modal>
    <button id="help-button" @click="showModal">?</button>
  </div>
</template>

<script>
import TopBar from "../components/TopBar.vue";
import ChannelsCharts from "../components/ChannelsCharts.vue";
import LoadingIndicator from "../components/LoadingIndicator.vue";
import LinuxPairHelp from "../components/LinuxPairHelp.vue";

import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

import ScientISST from "@scientisst/sense";

import Serial from "@/utils/serial.js";

import FileWriter from "@/utils/fileWriter.js";

import { resolvesDNS } from "@/utils/utils.js";

export default {
  name: "LiveView",
  components: {
    TopBar,
    ChannelsCharts,
    LoadingIndicator,
    LinuxPairHelp,
  },
  props: {
    // scientisst: { type: ScientISST },
  },
  data: function () {
    return {
      isShow: false,
      scientisstCopy: undefined,
      samplingRate: 1000,
      channels: [1],
      live: false,
      connected: false,
      connecting: false,
      fileWriter: new FileWriter(),
      download: true,
      downloadLink: "",
      downloadAutomatic: false,
      showHelp: false,
      platform: navigator.platform,
      o1: false,
      o2: false,
      connectionFailedCounter: 0,
      digital: true,
      comMode: "bth",
      address: "scientisst.local",
      device: 0,
      baudRate: 9600,
      firstSerialData: true,
      firstColIsTime: false,
      componentKey: 0,
      startTime: 0,
      serialSamples: 0,
    };
  },
  created() {
    if (localStorage.device) {
      this.device = parseInt(localStorage.device);
    }
    if (this.device == 0) {
      if (!("serial" in navigator)) {
        this.comMode = "wifi";
      } else {
        if (localStorage.comMode) {
          this.comMode = localStorage.comMode;
        }
      }
      if (localStorage.address) {
        this.address = localStorage.address;
      } else {
        if (!resolvesDNS) {
          this.address = "192.168.4.1";
        }
      }
      if (localStorage.samplingRate) {
        this.samplingRate = parseInt(localStorage.samplingRate.trim());
        if (this.samplingRate < 1) {
          this.samplingRate = 1;
        }
      }
      if (localStorage.digital) {
        this.digital = localStorage.digital == "true";
      }
      let activeChannels = [];
      [1, 2, 3, 4, 5, 6].forEach((channel) => {
        if (localStorage["ch" + channel]) {
          if (localStorage["ch" + channel] == "true") {
            activeChannels.push(channel);
          }
        } else {
          activeChannels.push(channel);
        }
      });
      this.channels = activeChannels;
    } else if (this.device == 1) {
      if (localStorage.baudRate) {
        this.baudRate = parseInt(localStorage.baudRate.trim());
      }
      if (localStorage.firstColIsTime) {
        this.firstColIsTime = localStorage.firstColIsTime == "true";
      }
      this.digital = false;
    }
  },
  beforeUnmount() {
    this.disconnect();
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
    setOutput1(event) {
      this.o1 = event;
      // TODO: inverted order
      this.scientisst.trigger([this.o2, this.o1]);
    },
    setOutput2(event) {
      this.o2 = event;
      // TODO: inverted order
      this.scientisst.trigger([this.o2, this.o1]);
    },
    toast(msg) {
      createToast(msg, {
        type: "danger",
        timeout: 5000,
        showCloseButton: true,
        transition: "bounce",
      });
    },
    onSerialData(data) {
      let parsedData = data.split(",").map((value) => {
        return parseFloat(value);
      });
      if (this.firstSerialData) {
        this.serialSamples++;
        if (this.serialSamples >= 2) {
          this.firstSerialData = false;
          if (this.firstColIsTime) {
            if (parsedData.length < 2) {
              this.disconnect();
              this.toast(
                "Serial data expected at least 2 columns, got 1 instead"
              );
              return;
            }

            this.channels = Array.from(
              { length: parsedData.length - 1 },
              (_, i) => i + 1
            );
          } else {
            this.channels = Array.from(
              { length: parsedData.length },
              (_, i) => i + 1
            );
          }
          this.forceRerender();
        }
      }
      if (this.live) {
        let timestamp;
        if (this.firstColIsTime) {
          timestamp = parsedData[0] - this.startTime;
          parsedData = parsedData.slice(1);
        } else {
          timestamp = new Date().valueOf() - this.startTime;
        }
        this.$refs.charts.addSerialData(timestamp, parsedData);
        this.addSerialDataToFile(timestamp, parsedData);
      } else {
        if (this.firstColIsTime) {
          this.startTime = parsedData[0];
        }
      }
    },
    onConnectionLost() {
      this.toast("Lost connection to device");

      this.stop();

      // disconnect
      this.scientisst = null;
      this.serial = null;
      this.connected = false;
    },
    async checkCertificate(url) {
      const toast = this.toast;
      const scientisst = this.scientisst;
      const promise = new Promise((resolve) => {
        const request = new XMLHttpRequest();
        request.timeout = 2000; // time in ms
        request.open("GET", url, true); // false for synchronous request

        request.onload = function () {
          resolve();
          toast("Certificate is valid");
        };

        request.ontimeout = function () {
          resolve();
          toast("Timeout. Are you connected to the device WiFi?");
        };

        request.onerror = function () {
          resolve();
          toast("Redirecting to certificate authorization page...");
          setTimeout(() => scientisst.requestCert(), 1000);
        };

        request.send(null);
        return true;
      });
      await promise;
    },
    async connect() {
      if (this.device == 0) {
        await this.connectSense();
      } else if (this.device == 1) {
        await this.connectMaker();
      }
    },
    async connectSense() {
      let scientisst;
      if (this.comMode === "bth") {
        scientisst = ScientISST.requestPort();
      } else if (this.comMode === "wifi") {
        scientisst = ScientISST.fromWS(this.address);
      } else {
        this.toast("Uknown communication mode");
        throw "Uknown communication mode";
      }
      await scientisst
        .then(async (scientisst) => {
          if (scientisst) {
            this.connecting = true;
            this.scientisst = scientisst;
            try {
              await this.scientisst.connect(this.onConnectionLost);
              this.connected = true;
            } catch (e) {
              if (e instanceof DOMException) {
                if (
                  e.message ===
                  "Failed to execute 'open' on 'SerialPort': The port is already open."
                ) {
                  this.toast(
                    "The port is already open. Reloading SENSE... Try again."
                  );
                  setTimeout(() => location.reload(), 1000);
                }
                // specific error
              } else if (e.target && e.target instanceof WebSocket) {
                await this.checkCertificate(`https://${this.address}/cert`);
              } else {
                this.toast(e.toString());
              }
            }
          }
        })
        .catch((e) => {
          if (e instanceof DOMException) {
            this.toast("Make sure the device is paired and select a port");
            // specific error
          } else {
            this.toast(e.toString());
            throw e; // let others bubble up
          }
        });
      this.connecting = false;
    },
    async connectMaker() {
      this.serial = await Serial.requestPort();

      console.log(this.baudRate);
      this.connecting = true;
      try {
        await this.serial.connect(
          this.baudRate,
          this.onSerialData,
          this.onConnectionLost
        );
        this.connected = true;
      } catch (e) {
        if (e instanceof DOMException) {
          if (
            e.message ===
            "Failed to execute 'open' on 'SerialPort': The port is already open."
          ) {
            this.toast(
              "The port is already open. Reloading page... Try again."
            );
            setTimeout(() => location.reload(), 1000);
          }
        } else {
          this.toast(e.toString());
        }
      }

      this.connecting = false;
    },
    disconnect() {
      let device;
      if (this.device == 0) {
        device = this.scientisst;
      } else if (this.device == 1) {
        device = this.serial;
      }
      if (device) {
        if (device.connected) {
          device.disconnect().then(() => {
            this.scientisst = null;
            this.connected = false;
          });
        }
      }
    },
    getHeader() {
      let header = "";
      if (this.device == 0) {
        header = "NSeq";
        if (this.digital) {
          header += "\tI1\tI2\tO1\tO2";
        }
        this.channels.forEach((channel) => {
          header += "\t";
          header += "AI" + channel + "_raw";
          header += "\t";
          header += "AI" + channel + "_mv";
        });
        return header;
      } else if (this.device == 1) {
        header = "Timestamp\t";
        this.channels.forEach((channel) => {
          header += "AI" + channel + "\t";
        });
      }
      return header;
    },
    getMetadata() {
      let iso;
      const timestamp = (iso = new Date()).valueOf();

      if (this.device == 0) {
        const resolution = [4];
        if (this.digital) {
          resolution.push(...[1, 1, 1, 1]);
        }
        resolution.push(...this.channels.map(() => 12));
        return {
          Device: "ScientISST Sense",
          Channels: this.channels,
          "Channels indexes mV": this.channels.map(
            (channel) => channel * 2 + (this.digital ? 4 : 0)
          ),
          "Channels indexes raw": this.channels.map(
            (channel) => channel * 2 + (this.digital ? 3 : -1)
          ),
          "Channels labels": this.channels
            .map((channel) => ["AI" + channel + "_raw", "AI" + channel + "_mV"])
            .flat(),
          Header: this.getHeader().split("\t"),
          "ISO 8601": iso,
          "Resolution (bits)": resolution,
          "Sampling rate (Hz)": this.samplingRate,
          Timestamp: timestamp,
        };
      } else if (this.device == 1) {
        return {
          Device: "ScientISST Maker",
          BaudRate: this.baudRate,
          Channels: this.channels,
          "Channels indexes": this.channels,
          "Channels labels": this.channels.map((channel) => "AI" + channel),
          Header: this.getHeader().split("\t"),
          "ISO 8601": iso,
          Timestamp: timestamp,
        };
      }
      return {};
    },
    start() {
      if (!this.firstColIsTime) {
        this.startTime = new Date().valueOf();
      }
      const metadata = this.getMetadata();
      this.fileWriter.addLine("#" + JSON.stringify(metadata) + "\n");
      this.fileWriter.addLine("#" + this.getHeader());
      if (this.device == 0) {
        if (this.scientisst) {
          this.$gtag.event("start", {
            event_category: "live",
            event_label: "started acquisition",
            value: Date.now(),
          });
          this.scientisst
            .start(this.samplingRate, this.channels)
            .then(async () => {
              this.$refs.charts.reset();
              this.$refs.charts.start();
              this.live = true;
              /* eslint-disable */
              let frames;
              let prevTime = performance.now();
              while (this.scientisst.live) {
                try {
                  frames = await this.scientisst.read();
                  const currentTime = performance.now();
                  console.log(`Elapsed time: ${currentTime - prevTime} ms`);
                  prevTime = currentTime;
                  this.$refs.charts.addFrames(frames);
                  if (this.download) {
                    // this.addFramesToFile(frames);
                  }
                } catch (e) {
                  if (this.scientisst.live) {
                    const message = e.toString();
                    if (message == "Error contacting device") {
                      this.connectionFailedCounter++;
                      // do not show the same error twice
                      // after the second time, the device disconnects and the counter is reset
                      if (this.connectionFailedCounter > 2) {
                        this.connectionFailedCounter = 1;
                      }
                      if (this.connectionFailedCounter <= 1) {
                        this.toast(message);
                      }
                    } else {
                      this.connectionFailedCounter = 0;
                      this.toast(message);
                    }
                  }
                }
              }
            });
        }
      } else if (this.device == 1) {
        if (this.serial) {
          this.$gtag.event("start", {
            event_category: "live",
            event_label: "started acquisition",
            value: Date.now(),
          });
          const metadata = this.getMetadata();
          this.fileWriter.addLine("#" + JSON.stringify(metadata));
          this.fileWriter.addLine("\n");
          this.fileWriter.addLine("#" + this.getHeader());

          this.$refs.charts.reset();
          this.$refs.charts.start();
          this.live = true;
        }
      }
    },
    async stop() {
      this.$gtag.event("stop", {
        event_category: "live",
        event_label: "stopped acquisition",
        value: Date.now(),
      });
      this.$refs.charts.stop();
      if (this.device == 0) {
        await this.scientisst.stop();
      }
      this.live = false;
      if (this.download) {
        this.saveFile(Date.now().toString());
      }
    },
    addFramesToFile(frames) {
      let line;
      frames.forEach((frame) => {
        line = "\n";
        line += frame.seq;
        if (this.digital) {
          line += "\t";
          line += frame.digital.join("\t");
        }
        for (let i = 0; i < this.channels.length; i++) {
          line += "\t";
          line += frame.a[i];
          line += "\t";
          line += frame.mv[i];
        }
        this.fileWriter.addLine(line);
      });
    },
    addSerialDataToFile(timestamp, data) {
      this.fileWriter.addLine("\n" + timestamp + "\t" + data.join("\t"));
    },
    saveFile(filename) {
      const file = this.fileWriter.getFile();
      window.URL = window.URL || window.webkitURL;
      this.downloadLink = window.URL.createObjectURL(file);
      const btn = document.getElementById("downloadBtn");
      btn.setAttribute("download", filename + ".csv");
      if (this.downloadAutomatic) {
        btn.downloadBtn.click();
      }
    },
    downloadAnalytics() {
      this.$gtag.event("download", {
        event_category: "live",
        event_label: "downloaded file",
      });
    },
    showModal() {
      this.isShow = true;
    },
    closeModal() {
      this.isShow = false;
    },
  },
};
</script>

<style scoped>
@keyframes flashing {
  0% {
    background-color: #fff;
    color: #ef4b59;
  }
  100% {
    background-color: #ef4b59;
    color: #fff;
  }
}
.recording {
  animation: flashing 1000ms infinite;
  animation-direction: alternate;
  animation-timing-function: ease-in-out;
}

.a-button {
  -webkit-appearance: button;
  -moz-appearance: button;
  appearance: button;

  text-decoration: none;
  color: initial;
}

.hide {
  display: none;
}

#help-button {
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 32px;
  width: 3rem;
  height: 3rem;
  padding: 1rem;
  border: none;
  cursor: pointer;
  background: none;
  text-align: center;
  color: white;
  font-size: 17px;
  font-weight: 1000;
  text-transform: uppercase;
  box-shadow: 0px 0px 0px 3px var(--main-color);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  border-radius: 360px;
  background: var(--main-color);
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}

#help-button:hover {
  box-shadow: 0px 0px 0px 16px #f37a8455, 0px 0px 0px 9px #f1626f55,
    0px 0px 0px 3px var(--main-color);
}

.modal {
  width: 800px;
  padding: 32px;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 20px;
  text-align: center;
  border-radius: 12px;
}
</style>
