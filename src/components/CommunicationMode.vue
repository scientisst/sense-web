<template>
  <h3>COMMUNICATION MODE</h3>
  <div id="segmented-control">
    <segmented-control
      :options="options"
      color="#fff"
      active-color="#ef4b59"
      :multiple="false"
      @select="onSelect"
      ref="segmented"
    />
  </div>
</template>

<script>
import SegmentedControl from "vue-segmented-control";

export default {
  name: "CommunicationMode",
  components: {
    SegmentedControl,
  },
  data() {
    return {
      comMode: "bth",
      valueToLabel: {
        bth: "BTH",
        wifi: "WiFi",
      },
      options: [
        { label: "BTH", value: "bth" },
        { label: "WiFi", value: "wifi" },
      ],
    };
  },
  mounted() {
    if (localStorage.comMode) {
      this.comMode = localStorage.comMode;
    }
    this.$refs.segmented.onSelect({
      label: this.valueToLabel[this.comMode],
      value: this.comMode,
    });
  },
  methods: {
    onSelect(optionsSelected) {
      this.comMode = optionsSelected[0].value;
      localStorage.comMode = this.comMode;
    },
  },
};
</script>


<style >
#segmented-control {
  width: 300px;
  margin: auto;
}

.segmented-control {
  border-width: 4px !important;
  border-radius: 12px !important;
  cursor: pointer;
}

.segmented-item {
  font-weight: bold;
}
</style>