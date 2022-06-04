<template>
  <div id="buttons">
    <button @click="this.zoomIn()">-</button>
    <p>{{ this.duration - this.zoomFactor }} s</p>
    <button @click="this.zoomOut()">+</button>
  </div>
  <div class="charts">
    <div class="chart">
      <div class="resize">
        <digital-channel-chart
          :title="'I1'"
          :key="'I1'"
          :sampleRate="this.samplingRate"
          :duration="this.duration"
          :label="'I1'"
          :zoomFactor="this.zoomFactor"
        />
      </div>
    </div>
    <div class="chart" v-for="channel in channelsData" :key="channel.id">
      <div class="resize">
        <channel-chart
          ref="channels"
          :title="'AI' + channel.id"
          :key="'chart' + channel.id"
          :sampleRate="this.samplingRate"
          :duration="this.duration"
          :label="'AI' + channel.id"
          :zoomFactor="this.zoomFactor"
        />
        <div class="resizeUI">
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
  props: {
    channels: {
      type: Array,
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
    };
  },
  methods: {
    start() {
      this.$refs.channels.forEach((channel) => {
        channel.startRefresh();
      });
    },
    stop() {
      this.$refs.channels.forEach((channel) => {
        channel.stopRefresh();
      });
    },
    addFrames(frames) {
      // add frames to buffer
      frames.forEach((frame) => {
        this.timestamp += this.dt;
        this.channelsData.forEach((channel, index) => {
          channel.data.push({ x: this.timestamp, y: frame.a[index] });
        });
        frame.digital.forEach((value, index) => {
          this.digitalData[index].data.push({
            x: this.timestamp,
            y: value,
          });
        });
      });

      // add buffer to charts
      this.$refs.channels.forEach((channel, index) => {
        channel.addData(
          this.channelsData[index].data.splice(
            0,
            this.channelsData[index].data.length
          )
        );
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
    },
    zoomIn() {
      if (this.zoomFactor < this.duration - 1) {
        this.zoomFactor++;
      }
    },
    zoomOut() {
      if (this.zoomFactor > 0) {
        this.zoomFactor--;
      }
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

.resize {
  display: inline-block;
  width: 90vw;
  height: 300px;
  padding-top: 20px;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 50px;
  border: 2px solid #dedede;
  border-radius: 25px;
  resize: both;
  overflow: hidden;
  position: relative;
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
