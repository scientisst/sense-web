<template>
  <div id="buttons">
    <button @click="this.zoomIn()">-</button>
    <p>{{ this.duration - this.zoomFactor }} s</p>
    <button @click="this.zoomOut()">+</button>
  </div>
  <div class="charts">
    <div v-if="this.digital">
      <div class="chart">
        <div class="resize digital">
          <digital-channel-chart
            :title="'digital'"
            ref="digitalChannels"
            :key="'digitalChannels'"
            :sampleRate="this.samplingRate"
            :duration="this.duration"
            :zoomFactor="this.zoomFactor"
            @o1="setOutput1"
            @o2="setOutput2"
          />
        </div>
      </div>
    </div>
    <div class="chart" v-for="channel in channelsData" :key="channel.id">
      <div
        v-bind:class="[
          { container: true },
          { resize: this.visibility[channel.id - 1] },
        ]"
      >
        <channel-chart
          ref="channels"
          :title="'AI' + channel.id"
          :key="'chart' + channel.id"
          :sampleRate="this.samplingRate"
          :duration="this.duration"
          :channel="channel.id"
          :label="'AI' + channel.id"
          :zoomFactor="this.zoomFactor"
          :fixedAutoScale="device != 0"
          @isVisible="setVisibility"
        />
        <div
          v-bind:class="[
            { resizeUI: true },
            { invisible: !this.visibility[channel.id - 1] },
          ]"
        >
          <img
            src="../assets/img/resize.svg"
            alt="resize"
            class="resize-icon"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChannelChart from "./ChannelChart.vue";
import DigitalChannelChart from "./DigitalChannelChart.vue";

export default {
  name: "ChannelsCharts",
  components: { DigitalChannelChart, ChannelChart },
  emits: ["o1", "o2"],
  props: {
    digital: {
      type: Boolean,
      default: true,
    },
    channels: {
      type: Array,
    },
    device: {
      type: Number,
      default: 0,
    },
    samplingRate: { require: true, type: Number },
    refreshRate: { default: 5, type: Number },
  },
  data() {
    return {
      channelsData: this.channels.map((value) => {
        return { id: value, data: [] };
      }),
      digitalData: [
        { id: "I1", data: [] },
        { id: "I2", data: [] },
        { id: "O1", data: [] },
        { id: "O2", data: [] },
      ],
      dt: 1000 / this.samplingRate,
      timestamp: 0,
      duration: 10,
      zoomFactor: 5,
      visibility: this.channels.map(() => true),
    };
  },
  created() {
    if (localStorage.zoomFactor) {
      this.zoomFactor = parseInt(localStorage.zoomFactor);
    }
  },
  beforeUnmount() {
    this.stop();
  },
  methods: {
    setOutput1(event) {
      this.$emit("o1", event);
    },
    setOutput2(event) {
      this.$emit("o2", event);
    },
    start() {
      // update charts every 1/refreshRate seconds
      this.interval = setInterval(() => {
        this.$refs.channels.forEach((channel) => {
          channel.refresh();
        });
        if (this.digital) {
          this.$refs.digitalChannels.refresh();
        }
      }, Math.ceil(1000 / this.refreshRate));
    },
    stop() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = undefined;
      }
    },
    addFrames(frames) {
      // add frames to buffer
      frames.forEach((frame) => {
        this.timestamp += this.dt;
        this.channelsData.forEach((channel, index) => {
          channel.data.push({ x: this.timestamp, y: frame.a[index] });
        });
        if (this.digital) {
          frame.digital.forEach((value, index) => {
            this.digitalData[index].data.push({
              x: this.timestamp,
              y: value,
            });
          });
        }
      });

      // add buffer to charts
      const N = this.channelsData[0].data.length;
      this.$refs.channels.forEach((channel, index) => {
        channel.addData(this.channelsData[index].data.splice(0, N));
      });
      if (this.digital) {
        const digitalChannelsData = [];
        this.digitalData.forEach((channel) => {
          digitalChannelsData.push(channel.data.splice(0, N));
        });
        this.$refs.digitalChannels.addData(digitalChannelsData);
      }
    },
    addSerialData(timestamp, data) {
      this.timestamp = timestamp;
      this.$refs.channels.forEach((channel, index) => {
        channel.addData([{ x: this.timestamp, y: data[index] }]);
      });
    },
    reset() {
      this.timestamp = 0;
      this.channelsData.forEach((channel) => {
        channel.data.length = 0;
      });
      this.$refs.channels.forEach((channel) => {
        channel.reset();
      });
      if (this.digital) {
        this.digitalData.forEach((channel) => {
          channel.data.length = 0;
        });
        this.$refs.digitalChannels.reset();
      }
    },
    zoomIn() {
      if (this.zoomFactor < this.duration - 1) {
        this.zoomFactor++;
      }
      localStorage.zoomFactor = this.zoomFactor;
    },
    zoomOut() {
      if (this.zoomFactor > 0) {
        this.zoomFactor--;
      }
      localStorage.zoomFactor = this.zoomFactor;
    },
    setVisibility(event) {
      const channelIndex = event.channel - 1;
      const isVisible = event.isVisible;
      this.visibility[channelIndex] = isVisible;
    },
  },
};
</script>

<style scoped>
.charts {
  margin: auto;
  width: 95vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
}

.container {
  display: inline-block;
  width: 90vw;
  padding-top: 20px;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 50px;
  border: 2px solid #dedede;
  border-radius: 25px;
  position: relative;
}

.resize {
  resize: both;
  overflow: hidden;
  height: 300px;
}

.digital {
  height: 140px;
}

.resizeUI {
  position: absolute;
  width: 16px;
  height: 16px;
  bottom: 8px;
  right: 8px;
  background: inherit;
  padding: 0px 3px;
  pointer-events: none;
}

.resize::-webkit-resizer {
  background-color: transparent;
}

#buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 10px 0;
}

#buttons button {
  text-align: center;
  width: 22px;
  height: 22px;
  border: none;
  cursor: pointer;
  background: none;
  text-align: center;
  color: var(--main-color);
  font-size: 17px;
  font-weight: bold;
  text-transform: uppercase;
  box-shadow: 0px 0px 0px 3px var(--main-color);
  border-radius: 32px;
}

#buttons p {
  margin-top: 3px;
  margin-bottom: 0;
  color: #888;
}
</style>
