<template>
  <div class="charts">
    <channel-chart
      v-for="channel in channelsData"
      ref="channels"
      :key="channel.id"
      :data="channel.data"
      :showXAxisLabels="channel.last"
    />
  </div>
</template>

<script>
import ChannelChart from "./Chart.vue";

export default {
  name: "ChannelsCharts",
  components: { ChannelChart },
  props: {
    channels: {
      type: Array,
    },
    samplingRate: { default: 100, type: Number },
    refreshRate: { default: 5, type: Number },
  },
  data: function () {
    return {
      channelsData: this.channels.map((value, index) => {
        return { id: value, data: [], last: index == this.channels.length - 1 };
      }),
      windowInSeconds: 3,
      dt: 1 / this.samplingRate,
    };
  },
  mounted: function () {
    this.interval = setInterval(() => {
      this.$refs.channels.forEach((channel, index) => {
        channel.updateChart(this.channelsData[index].data);
      });
    }, Math.ceil(1000 / this.refreshRate));
  },
  beforeUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
  },
  methods: {
    addFrames(frames, timestamp) {
      frames.forEach((frame, fIndex) => {
        // const frame = frames[0];
        frame.a.forEach((value, index) => {
          const t = timestamp - (frames.length - 1 - fIndex) * this.dt;
          this.channelsData[index].data.push([t, value]);
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
  // data: function () {
  // const channelsData = {};
  // this.channels.array.forEach((channel) => {
  //   channelsData[channel] = [];
  // });
  // return { channelsData: channelsData };
  // return {
  //   message: "",
  // };
  // },
};
</script>

<style scoped>
</style>
