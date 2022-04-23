<template>
  <div class="charts">
    <div v-for="channel in channelsData" :key="channel.id">
      <div class="channel-title">AI{{ channel.id }}</div>
      <channel-chart
        ref="channels"
        :data="channel.data"
        :showXAxisLabels="channel.last"
      />
    </div>
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
    samplingRate: { require: true, type: Number },
    refreshRate: { default: 5, type: Number },
  },
  data: function () {
    return {
      channelsData: this.channels.map((value, index) => {
        return { id: value, data: [], last: index == this.channels.length - 1 };
      }),
      windowInSeconds: 3,
      dt: 1000 / this.samplingRate,
      timestamp: 0,
    };
  },
  mounted: function () {
    this.interval = setInterval(() => {
      if (this.channelsData[0].length > 0) {
        this.$refs.channels.forEach((channel, index) => {
          channel.updateChart(this.channelsData[index].data);
        });
      }
    }, Math.ceil(1000 / this.refreshRate));
  },
  beforeUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
  },
  methods: {
    addFrames(frames) {
      frames
        .filter((_, index) => {
          return index % 2 == 0;
        })
        .forEach((frame) => {
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
.channel-title {
  font-size: 17px;
  font-weight: bold;
}
</style>
