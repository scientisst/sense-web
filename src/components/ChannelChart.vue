<template>
  <div>
    <canvas id="channel-chart"></canvas>
  </div>
</template>

<script>
// import { shallowRef } from "vue";
import Chart from "chart.js/auto";
import "chartjs-adapter-moment";

export default {
  name: "ChannelChart",
  props: {
    data: {
      type: Array,
      default() {
        return [
          // { x: 0, y: 0 },
          // { x: 1, y: 1 },
          // { x: 2, y: 2 },
          // { x: 3, y: 3 },
          // { x: 4, y: 4 },
        ];
      },
    },
  },
  data() {
    this.chart = null;
    return {
      dataset: {
        datasets: [
          {
            data: this.data,
            label: "signal",
          },
        ],
      },
      options: {
        tension: 0.1,
        borderColor: "#ef4b59",
        borderWidth: 3,
        spanGaps: true, // enable for all datasets
        animation: false,
        normalized: true,
        parsing: false,
        interaction: {
          mode: "nearest",
          axis: "x",
          intersect: false,
        },
        elements: {
          point: {
            radius: 0, // default to disabled in all datasets
          },
        },
        plugins: {
          decimation: {
            enabled: false,
          },
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            min: this.data.length > 0 ? this.data[0].x : 0,
            max: this.data.length > 0 ? this.data[this.data.length - 1].x : 0,
            type: "time",
            ticks: {
              source: "auto",
              // Disabled rotation for performance
              maxRotation: 0,
              autoSkip: true,
              sampleSize: 5,
            },
          },
          y: {
            min: 0,
            // max: 4096,
            ticks: {
              // Disabled rotation for performance
              maxRotation: 0,
              autoSkip: true,
              sampleSize: 5,
            },
          },
        },
      },
    };
  },
  mounted() {
    const ctx = document.getElementById("channel-chart");
    this.chart = new Chart(ctx, {
      type: "line",
      data: this.dataset,
      options: this.options,
    });
    this.chart.options.plugins.decimation.algorithm = "lttb";
    this.chart.options.plugins.decimation.enabled = true;
    this.chart.options.plugins.decimation.samples = 100;
    this.chart.update();

    let timestamp = 0;
    this.interval = setInterval(() => {
      this.addData({ x: timestamp++, y: Math.random() * 4095 });
    }, Math.ceil(2000));
  },
  beforeUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
  },
  methods: {
    addData(data) {
      console.log(data);
      this.chart.data.datasets[0].data.push(data);
      this.chart.update();
    },
    removeData() {
      this.chart.data.datasets[0].data.shift();
      this.chart.update();
    },
  },
};
</script>