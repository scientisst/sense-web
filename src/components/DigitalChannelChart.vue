<template>
  <div id="chart-options">
    <div class="channel-title">{{ title }}</div>
    <div style="flex-grow: 1"></div>
  </div>
  <canvas ref="chart" id="chart" />
</template>

<script>
import Chart from "chart.js/auto";
import "chartjs-adapter-moment";
import { LTTB } from "downsample";

export default {
  name: "DigitalChannelChart",
  components: {},
  props: {
    title: {
      type: String,
      default: "",
    },
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
          {
            data: [{ x: 0, y: 0 }],
            label: this.label,
          },
        ],
      },
      options: config,
    });
  },
  beforeUnmount() {
    this.stopRefresh();
  },
  methods: {
    startRefresh() {
      this.interval = setInterval(() => {
        this.updateChart();
      }, Math.ceil(1000 / this.refreshRate));
    },
    stopRefresh() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = undefined;
      }
      this.updateChart(true);
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
    pushData(data) {
      for (let i = 0; i < data.length; i++) {
        this.chart.data.datasets[data[i].y].data.push({ x: data[i].x, y: 0 });
      }
    },
    addData(data) {
      if (this.sampleRate > 100) {
        this.pushData(
          LTTB(
            data,
            Math.floor(data.length * this.decimateFactor * this.widthFactor)
          )
        );
      } else {
        this.pushData(data);
      }
    },
    updateXAxis() {
      const chartData = this.chart.data.datasets[0].data;
      if (chartData.length > 0) {
        this.timestamp = chartData[chartData.length - 1].x;
        let i = 0;
        for (i = 0; i < chartData.length; i++) {
          if (chartData[i].x >= this.timestamp - this.duration * 1000) {
            break;
          }
        }
        chartData.splice(0, i);
      }
      const min = Math.max(
        this.timestamp - (this.duration - this.zoomFactor) * 1000,
        0
      );
      this.chart.options.scales.x.min = min;
      this.chart.options.scales.x.max = this.timestamp;
    },
    reset() {
      this.chart.data.datasets[0].data = [];
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
