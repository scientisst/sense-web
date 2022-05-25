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
        @click="test"
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
      :refreshRate="5"
    />
    <div style="height: 100px" />
    <Modal v-model="isShow" :close="closeModal">
      <div class="modal">
        <h2>Pair your device</h2>
        <div v-if="this.platform.includes('Linux')">
          First, you must pair your device to your computer.
          <br />
          Now, the tricky part is establishing a serial communication. You have
          to options:
          <br />
          <br />
          <b>1.</b> Open a connection to the device:
          <br />
          <pre>sudo rfcomm connect 0 [device MAC address]</pre>
          <br />
          <b>2.</b> Bind the device to a serial port:
          <br />
          <pre>sudo rfcomm bind 0 [device MAC address]</pre>
          <br />
          You can choose one of the above. The first option will start a process
          and, once terminated, the connection is closed. The second option will
          bind the device to serial port 0. To unbid that port, do:
          <br />
          <pre>sudo rfcomm unbind 0</pre>
          <br />
          The <i>[device MAC address]</i> is something like:
          <i>E8:9F:6D:D2:BC:5A</i>.
          <br />
          You can also select a different port number, e.g.:
          <br />
          <pre>sudo rfcomm connect 1 [device MAC address]</pre>
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

import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

/* eslint-disable no-constant-condition */
import ScientISST from "@scientisst/sense";

export default {
  name: "LiveView",
  components: {
    TopBar,
    ChannelsCharts,
    LoadingIndicator,
  },

  props: {
    // scientisst: { type: ScientISST },
  },
  data: function () {
    return {
      isShow: false,
      scientisstCopy: undefined,
      samplingRate: 1000,
      channels: [1, 2, 3, 4, 5, 6],
      live: false,
      connected: false,
      connecting: false,
      fileData: "",
      download: true,
      downloadLink: "",
      downloadAutomatic: false,
      showHelp: false,
      platform: navigator.platform,
    };
  },
  created() {
    if (localStorage.samplingRate) {
      this.samplingRate = parseInt(localStorage.samplingRate);
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
  },
  beforeUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
    if (this.scientisst) {
      if (this.scientisst.connected) {
        this.scientisst.disconnect();
      }
    }
  },
  methods: {
    toast(msg) {
      createToast(msg, {
        type: "danger",
        timeout: 5000,
        showCloseButton: true,
        transition: "bounce",
      });
    },
    connect() {
      ScientISST.requestPort()
        .then(async (scientisst) => {
          if (scientisst) {
            this.connecting = true;
            this.scientisst = scientisst;
            try {
              await this.scientisst.connect();
              this.connected = true;
            } catch (e) {
              this.toast(e.toString());
            }
            this.connecting = false;
          }
        })
        .catch((e) => {
          if (e instanceof DOMException) {
            this.toast("Make sure the device is paired and select a port");
            // specific error
          } else {
            throw e; // let others bubble up
          }
        });
    },
    disconnect() {
      if (this.scientisst) {
        this.scientisst.disconnect().then(() => {
          this.scientisst = null;
          this.connected = false;
        });
      }
    },
    getHeader() {
      let header = "";
      header += "NSeq\tI1\tI2\tO1\tO2";
      this.channels.forEach((channel) => {
        header += "\t";
        header += "AI" + channel + "_raw";
        header += "\t";
        header += "AI" + channel + "_mv";
      });
      return header;
    },
    getMetadata() {
      let iso;
      const timestamp = (iso = new Date()).valueOf();
      let metadata = {
        Channels: this.channels,
        "Channels indexes mV": this.channels.map((channel) => channel * 2 + 4),
        "Channels indexes raw": this.channels.map((channel) => channel * 2 + 3),
        "Channels labels": this.channels
          .map((channel) => ["AI" + channel + "_raw", "AI" + channel + "_mV"])
          .flat(),
        Header: this.getHeader().split("\t"),
        "ISO 8601": iso,
        "Resolution (bits)": [4, 1, 1, 1, 1] + this.channels.map(() => 12),
        "Sampling rate (Hz)": this.samplingRate,
        Timestamp: timestamp,
      };
      return metadata;
    },
    start() {
      if (this.scientisst) {
        const metadata = this.getMetadata();
        this.fileData = "#" + JSON.stringify(metadata) + "\n";
        this.fileData += this.getHeader();
        this.scientisst
          .start(this.samplingRate, this.channels)
          .then(async () => {
            this.$refs.charts.reset();
            this.live = true;
            let frames;
            while (this.scientisst.live) {
              try {
                frames = await this.scientisst.read();
                this.$refs.charts.addFrames(frames);
                if (this.download) {
                  this.addFramesToFile(frames);
                }
              } catch (e) {
                this.toast(e.toString());
              }
            }
          });
      }
    },
    stop() {
      this.scientisst.stop().then(() => {
        this.live = false;
        if (this.download) {
          this.saveFile(Date.now().toString(), this.fileData);
          this.fileData = "";
        }
      });
    },
    addFramesToFile(frames) {
      let line;
      frames.forEach((frame) => {
        line = "\n";
        line += frame.seq;
        line += "\t";
        line += frame.digital.join("\t");
        for (let i = 0; i < this.channels.length; i++) {
          line += "\t";
          line += frame.a[i];
          line += "\t";
          line += frame.mv[i];
        }
        this.fileData += line;
      });
    },
    saveFile(filename, data) {
      // TODO: use existing button
      const myFile = new Blob([data], { type: "text/plain" });
      window.URL = window.URL || window.webkitURL;
      this.downloadLink = window.URL.createObjectURL(myFile);
      const btn = document.getElementById("downloadBtn");
      btn.setAttribute("download", filename + ".csv");
      if (this.downloadAutomatic) {
        btn.downloadBtn.click();
      }
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

.active {
  color: white;
  background-color: #ef4b59;
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

pre {
  background: #f4f4f4;
  border: 1px solid #ddd;
  color: #666;
  page-break-inside: avoid;
  font-family: monospace;
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 1.6em;
  padding: 1em 1.5em;
  display: inline-block;
  word-wrap: break-word;
}

h2 {
  font-size: 1.5em;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 2px;
}
</style>
