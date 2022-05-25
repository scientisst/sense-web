<template>
  <canvas ref="chart" id="chart" />
</template>

<script>
// import { shallowRef } from "vue";
import Chart from "chart.js/auto";
import "chartjs-adapter-moment";
import { LTTB } from "downsample";
// import zoomPlugin from "chartjs-plugin-zoom";

// Chart.register(zoomPlugin);

export default {
  name: "ChannelChart",
  props: {
    label: {
      type: String,
      default: "undefined",
    },
    duration: {
      type: Number,
      default: 5,
    },
    sampleRate: {
      type: Number,
      default: 1000,
    },
    zoomFactor: { type: Number, default: 5 },
  },
  data() {
    return { timestamp: 0 };
  },
  mounted() {
    const ctx = this.$refs.chart;
    const config = {
      responsive: true,
      maintainAspectRatio: false,
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
      tooltips: {
        enabled: false,
      },
      plugins: {
        decimation: {
          enabled: false,
        },
        legend: {
          display: false,
        },
        // zoom: {
        //   limits: {
        //     y: { min: 0, max: 4096, minRange: 1 },
        //     x: { minRange: 1000 },
        //   },
        //   pan: {
        //     enabled: true,
        //     mode: "xy",
        //   },
        //   zoom: {
        //     wheel: {
        //       enabled: true,
        //     },
        //     pinch: {
        //       enabled: true,
        //     },
        //     mode: "xy",
        //   },
        // },
      },
      scales: {
        x: {
          type: "time",
          time: {
            unit: "seconds",
            tooltipFormat: "HH:mm:ss",
            displayFormats: {
              seconds: "mm:ss",
            },
            // unitStepSize: 30,
          },
          ticks: {
            source: "auto",
            // Disabled rotation for performance
            maxRotation: 0,
            autoSkip: true,
            sampleSize: 5,
          },
        },
        y: {
          // min: 0,
          // max: 4096,
          ticks: {
            //   // Disabled rotation for performance
            maxRotation: 0,
            autoSkip: true,
            sampleSize: 5,
          },
        },
      },
    };
    this.chart = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            data: [{ x: 0, y: 0 }],
            label: this.label,
          },
        ],
      },
      options: config,
    });
  },
  methods: {
    addData(data) {
      if (data.length > 20) {
        this.chart.data.datasets[0].data.push(...LTTB(data, 20));
      } else {
        this.chart.data.datasets[0].data.push(...data);
      }

      const chartData = this.chart.data.datasets[0].data;
      if (chartData.length > 0) {
        this.timestamp = data[data.length - 1].x;
        let i = 0;
        for (i = 0; i < chartData.length; i++) {
          if (chartData[i].x >= this.timestamp - this.duration * 1000) {
            break;
          }
        }
        this.chart.data.datasets[0].data.splice(0, i);
      }
      const min = this.timestamp - (this.duration - this.zoomFactor) * 1000;
      if (min >= this.chart.data.datasets[0].data[0].x) {
        this.chart.options.scales.x.min = min;
      }
      this.chart.options.scales.x.max = this.timestamp;
      this.chart.update();
    },
    reset() {
      this.chart.data.datasets[0].data = [];
    },
  },
};
</script>
