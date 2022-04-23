<template>
  <div class="about">
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
    <channels-charts
      ref="charts"
      :channels="[1, 2, 3]"
      :samplingRate="samplingRate"
      :refreshRate="15"
    />
  </div>
</template>

<script>
import TopBar from "../components/TopBar.vue";
import ChannelsCharts from "../components/ChannelsCharts.vue";
import LoadingIndicator from "../components/LoadingIndicator.vue";

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
      scientisstCopy: undefined,
      samplingRate: 100,
      channels: [1, 2, 3],
      live: false,
      connected: false,
      connecting: false,
      fileData: "",
      download: true,
      downloadLink: "",
      downloadAutomatic: false,
    };
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
    connect() {
      ScientISST.requestPort().then(async (scientisst) => {
        if (scientisst) {
          this.connecting = true;
          this.scientisst = scientisst;
          try {
            await this.scientisst.connect();
            this.connected = true;
          } catch (e) {
            // TODO: handle failed connect
          }
          this.connecting = false;
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
    fileHeader() {
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
    start() {
      if (this.scientisst) {
        this.fileData = this.fileHeader();
        this.scientisst
          .start(this.samplingRate, this.channels)
          .then(async () => {
            this.live = true;
            let frames;
            while (this.scientisst.live) {
              frames = await this.scientisst.read();
              this.$refs.charts.addFrames(frames);
              if (this.download) {
                this.addFramesToFile(frames);
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
        line = frame.seq;
        line += "\t";
        line += frame.digital.join("\t");
        for (let i = 0; i < this.channels.length; i++) {
          line += "\t";
          line += frame.a[i];
          line += "\t";
          line += frame.mv[i];
        }
        this.fileData += "\n" + line;
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
  animation: flashing 2000ms infinite;
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
</style>
