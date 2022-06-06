<template>
  <div id="chart-options">
    <div class="channel-title">{{ title }}</div>
    <div style="flex-grow: 1"></div>
    <toggle-button @input="setOutput1">O1</toggle-button>
    <toggle-button @input="setOutput2">O2</toggle-button>
  </div>
  <canvas ref="chart" id="chart" />
</template>

<script>
import Chart from "chart.js/auto";

import "chartjs-adapter-moment";
import { LTTB } from "downsample";
import ToggleButton from "./ToggleButton.vue";

const digitalColor = (ctx) => (ctx.p0.parsed.z ? "#ef4b59" : "#eeeeee");

export default {
  name: "DigitalChannelChart",
  components: { ToggleButton },
  emits: ["o1", "o2"],
  props: {
    title: {
      type: String,
      default: "",
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
    return {
      timestamp: 0,
      zoom: 1,
      zoomChanged: false,
      maxZoom: 10,
      buffer: [],
      refreshRate: 5,
      widthFactor: 1,
      width: 1500,
      plotSampleRate: 100,
    };
  },
  computed: {
    decimateFactor() {
      return this.plotSampleRate / this.sampleRate;
    },
  },
  mounted() {
    const ctx = this.$refs.chart;
    const config = {
      responsive: true,
      maintainAspectRatio: false,
      tension: 0,
      borderWidth: 20,
      animation: false,
      normalized: true,
      spanGaps: true,
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
          type: "linear",
          min: -0.5,
          max: 3.5,
          grid: {
            display: false,
          },
          ticks: {
            //   // Disabled rotation for performance
            maxRotation: 0,
            autoSkip: true,
            callback: function (val) {
              // Hide the label of every 2nd dataset
              switch (val) {
                case 0:
                  return "O2";
                case 1:
                  return "O1";
                case 2:
                  return "I2";
                case 3:
                  return "I1";
                default:
                  return "";
              }
            },
          },
        },
      },
    };
    this.chart = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            data: [{ x: 0, y: 3 }],
            label: "I1",
            segment: {
              borderColor: (ctx) => digitalColor(ctx),
            },
          },
          {
            data: [{ x: 0, y: 2 }],
            label: "I2",
            segment: {
              borderColor: (ctx) => digitalColor(ctx),
            },
          },
          {
            data: [{ x: 0, y: 1 }],
            label: "O1",
            segment: {
              borderColor: (ctx) => digitalColor(ctx),
            },
          },
          {
            data: [{ x: 0, y: 0 }],
            label: "O2",
            segment: {
              borderColor: (ctx) => digitalColor(ctx),
            },
          },
        ],
      },
      options: config,
    });
  },
  methods: {
    setOutput1(event) {
      if (event.target) {
        const value = event.target.checked;
        this.$emit("o1", value);
      }
    },
    setOutput2(event) {
      if (event.target) {
        const value = event.target.checked;
        this.$emit("o2", value);
      }
    },
    refresh() {
      this.updateChart();
    },
    visible() {
      const rect = this.$refs.chart.getBoundingClientRect();
      this.widthFactor = Math.min(1, rect.width / this.width);
      return (
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.top <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth)
      );
    },
    updateChart(force = false) {
      if (this.visible() || force) {
        this.updateXAxis();
        this.chart.update();
      }
    },
    pushData(digitalChannels) {
      for (let i = 0; i < digitalChannels[0].length; i++) {
        this.chart.data.datasets.forEach((dataset, ch) => {
          const point = digitalChannels[ch][i];
          dataset.data.push({
            x: point.x,
            y: 3 - ch,
            z: point.y,
          });
        });
      }
    },
    addData(digitalChannels) {
      if (this.sampleRate > 100) {
        digitalChannels = digitalChannels.map((digitalData) =>
          LTTB(
            digitalData,
            Math.floor(
              digitalData.length * this.decimateFactor * this.widthFactor
            )
          )
        );
        this.pushData(digitalChannels);
      } else {
        this.pushData(digitalChannels);
      }
    },
    updateXAxis() {
      this.chart.data.datasets.forEach((dataset) => {
        const chartData = dataset.data;
        if (chartData.length > 0) {
          const N = chartData.length;
          this.timestamp = chartData[N - 1].x;
          const start = this.timestamp - this.duration * 1000;
          if (chartData[N % 2] < start) {
            console.log("before cut", chartData.length);
            chartData.splice(0, N % 2);
            console.log("after cut", chartData.length);
          }
        }
      });
      const min = Math.max(
        this.timestamp - (this.duration - this.zoomFactor) * 1000,
        0
      );
      this.chart.options.scales.x.min = min;
      this.chart.options.scales.x.max = this.timestamp;
    },
    reset() {
      this.chart.data.datasets.forEach((dataset) => (dataset.data = []));
    },
  },
};
</script>

<style scoped>
.channel-title {
  padding: 2px;
  background: var(--main-color);
  text-align: center;
  color: white;
  font-size: 17px;
  font-weight: bold;
  letter-spacing: 2px;
  text-transform: uppercase;
  border: 3px solid var(--main-color);
  border-radius: 4px;
  margin: 2px;
}

#chart-options {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}
</style>
