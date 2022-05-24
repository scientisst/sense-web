<template>
  <div class="charts">
    <div v-for="channel in channelsData" :key="channel.id">
      <div class="channel-title">AI{{ channel.id }}</div>
      <channel-chart ref="channels" :key="'chart' + channel.id" />
    </div>
  </div>
</template>

<script>
import ChannelChart from "./ChannelChart.vue";

export default {
  name: "ChannelsCharts",
  components: { ChannelChart },
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
      windowInSeconds: 3,
      dt: 1000 / this.samplingRate,
      timestamp: 0,
    };
  },
  mounted: function () {
    this.interval = setInterval(() => {
      // if (this.channelsData[0].data.length > 0) {
      // this.$refs.channels.forEach((channel, index) => {
      // channel.updateChart(this.channelsData[index].data);
      // this.$refs.channels[0].addData({ x: this.timestamp, y: Math.random() });
      this.timestamp += this.dt;

      // this.$refs.channels.forEach((channel) => {
      //   channel.addData({ x: this.timestamp, y: Math.random() * 4095 });
      // });
      // }
    }, Math.ceil(2000));
    // }, Math.ceil(1000 / this.refreshRate));
  },
  beforeUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
  },
  methods: {
    addFrames(frames) {
      frames.forEach((frame) => {
        // const frame = frames[0];
        this.timestamp += this.dt;
        frame.a.forEach((value, index) => {
          this.channelsData[index].data.push([this.timestamp, value]);
        });
      });
      const N = this.samplingRate * this.windowInSeconds;
      this.channelsData.forEach((channel, index) => {
        const channelData = channel.data;
        if (channelData.length >= N) {
          this.channelsData[index].data = channelData.slice(
            channelData.length - N
          );
        }
      });
    },
  },
};
</script>

<style scoped>
.channel-title {
  font-size: 17px;
  font-weight: bold;
}
</style>
