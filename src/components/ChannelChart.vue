<template>
  <div id="chart-options">
    <button
      v-bind:class="[{ channelTitle: true }, { active: this.isVisible }]"
      @click="toggleVisibility"
    >
      {{ title }}
    </button>
    <div style="flex-grow: 1"></div>
    <div
      id="control-buttons"
      v-if="!fixedAutoScale"
      v-bind:class="{ invisible: !isVisible }"
    >
      <circular-button @click="zoomOut">
        <font-awesome-icon icon="magnifying-glass-minus" />
      </circular-button>
      <toggle-button :value="autoscale" @input="setAutoscale">
        <font-awesome-icon icon="magnifying-glass-chart"
      /></toggle-button>
      <circular-button @click="zoomIn">
        <font-awesome-icon icon="magnifying-glass-plus" />
      </circular-button>
    </div>
  </div>
  <div id="visibility-container" v-bind:class="{ invisible: !isVisible }">
    <canvas ref="chart" id="chart" />
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import "chartjs-adapter-moment";
import { LTTB } from "downsample";
import ToggleButton from "./ToggleButton.vue";
import CircularButton from "./CircularButton.vue";

export default {
  name: "ChannelChart",
  components: { ToggleButton, CircularButton },
  props: {
    title: {
      type: String,
      default: "",
    },
    channel: {
      type: Number,
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
      default: 100,
    },
    fixedAutoScale: {
      type: Boolean,
      default: false,
    },
    zoomFactor: { type: Number, default: 5 },
  },
  emits: ["isVisible"],
  data() {
    return {
      isVisible: true,
      timestamp: 0,
      autoscale: false,
      zoom: 1,
      zoomChanged: false,
      maxZoom: 10,
      avg: undefined,
      alpha: Math.min(1, 10 / this.sampleRate),
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
  created() {
    this.autoscale = this.fixedAutoScale;
  },
  mounted() {
    const ctx = this.$refs.chart;
    const config = {
      responsive: true,
      maintainAspectRatio: false,
      tension: 0.2,
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
        ],
      },
      options: config,
    });
    this.updateAutoscale();
  },
  methods: {
    refresh() {
      this.updateChart();
    },
    visible() {
      if (this.isVisible) {
        const rect = this.$refs.chart.getBoundingClientRect();
        this.widthFactor = Math.min(1, rect.width / this.width);
        return (
          rect.bottom >= 0 &&
          rect.right >= 0 &&
          rect.top <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          rect.left <=
            (window.innerWidth || document.documentElement.clientWidth)
        );
      } else {
        return false;
      }
    },
    updateChart(force = false) {
      if (this.visible() || force) {
        console.log("refresh");
        this.updateXAxis();
        this.updateYAxis();
        this.chart.update();
      }
    },
    zoomIn() {
      if (this.autoscale) {
        this.autoscale = false;
      }
      if (this.zoom < this.maxZoom) {
        this.zoom++;
        this.zoomChanged = true;
      }
    },
    zoomOut() {
      if (this.autoscale) {
        this.autoscale = false;
      }
      if (this.zoom > 1) {
        this.zoom--;
        this.zoomChanged = true;
      }
    },
    setAutoscale(event) {
      if (event.target) {
        this.autoscale = event.target.checked;
        this.updateAutoscale();
      }
    },
    updateAutoscale() {
      if (this.chart) {
        if (this.autoscale) {
          this.chart.options.scales.y.min = null;
          this.chart.options.scales.y.max = null;
        } else {
          this.chart.options.scales.y.min = 0;
          this.chart.options.scales.y.max = 4095;
        }
        this.updateChart();
      }
    },
    pushData(data) {
      for (let i = 0; i < data.length; i++) {
        this.chart.data.datasets[0].data.push(data[i]);
        this.avg = (1 - this.alpha) * this.avg + this.alpha * data[i].y;
      }
    },
    addData(data) {
      if (this.avg == undefined) {
        this.avg = data[0].y;
      }
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
    updateYAxis() {
      if (!this.autoscale) {
        if (this.zoom == 1) {
          if (this.zoomChanged) {
            this.zoomChanged = false;
            this.chart.options.scales.y.min = 0;
            this.chart.options.scales.y.max = 4095;
          }
        } else {
          const gap = 2047 * (1 - 0.1 * (this.zoom - 1));
          let min = Math.max(0, this.avg - gap);
          let max = Math.min(4095, this.avg + gap);
          if (max - min < gap * 2) {
            if (min == 0) {
              max = gap * 2;
            } else if (max == 4095) {
              min -= gap - (max - min);
            }
          }
          this.chart.options.scales.y.min = Math.floor(min);
          this.chart.options.scales.y.max = Math.floor(max);
        }
      }
    },
    updateXAxis() {
      const chartData = this.chart.data.datasets[0].data;
      if (chartData.length > 1) {
        const N = chartData.length;
        const N2 = Math.floor(N / 2);
        this.timestamp = chartData[N - 1].x;
        const start = this.timestamp - this.duration * 1000;
        if (chartData[N2].x < start) {
          chartData.splice(0, N2);
        }
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
    toggleVisibility() {
      this.isVisible = !this.isVisible;
      this.$emit("isVisible", {
        channel: this.channel,
        isVisible: this.isVisible,
      });
    },
  },
};
</script>

<style scoped>
.channelTitle {
  padding: 2px;
  text-align: center;
  font-size: 17px;
  background-color: white;
  color: var(--main-color);
  font-weight: bold;
  letter-spacing: 2px;
  text-transform: uppercase;
  border: 3px solid var(--main-color);
  border-radius: 4px;
  margin: 2px;
  cursor: pointer;
}

#chart-options {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

#control-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

#visibility-container {
  height: 100%;
}
</style>
