<template>
  <div class="about">
    <logo-top-left />
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
          class="button recording"
          id="stop"
          @click="stop"
        >
          Stop
        </button>
        <button v-else class="button" id="start" @click="start">start</button>
      </div>
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
import LogoTopLeft from "../components/LogoTopLeft.vue";
import ChannelsCharts from "../components/ChannelsCharts.vue";
import LoadingIndicator from "../components/LoadingIndicator.vue";

/* eslint-disable no-constant-condition */
import ScientISST from "@scientisst/sense";

export default {
  name: "LiveView",
  components: {
    LogoTopLeft,
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
      live: false,
      connected: false,
      connecting: false,
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
    start() {
      if (this.scientisst) {
        this.scientisst.start(this.samplingRate, [1, 2, 3]).then(async () => {
          this.live = true;
          let frames;
          while (this.scientisst.live) {
            frames = await this.scientisst.read();
            this.$refs.charts.addFrames(frames);
          }
        });
      }
    },
    stop() {
      this.scientisst.stop().then(() => {
        this.live = false;
      });
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
</style>
