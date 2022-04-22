<template>
  <div>
    <apexchart
      height="300"
      type="line"
      ref="chart"
      :options="options"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
export default {
  name: "ChannelChart",
  props: { showXAxisLabels: { default: false, type: Boolean } },
  data: function () {
    return {
      options: {
        chart: {
          id: "vuechart-example",
          animations: {
            enabled: false,
            easing: "linear",
            dynamicAnimation: {
              speed: 200,
            },
          },
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        colors: ["var(--main-color)"],
        grid: {
          show: true,
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
        },
        tooltip: {
          enabled: false,
        },
        stroke: {
          width: 3,
          curve: "smooth",
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          type: "numeric",
          tickAmount: 5,
          labels: {
            formatter: function (val, timestamp) {
              return new Date(timestamp).toISOString().slice(-13, -5);
            },
          },
        },
        yaxis: {
          min: 0,
          max: 4096,
          tickAmount: 4,
        },
        markers: {
          size: 0,
        },
      },
      series: [
        {
          name: "series-1",
          // data: this.props.data,
          data: [],
        },
      ],
    };
  },
  methods: {
    updateChart(newData) {
      this.series = [
        {
          data: newData,
        },
      ];
    },
  },
};
</script>
