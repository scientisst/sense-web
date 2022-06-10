<template>
  <div v-show="serialAvailable">
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
  </div>
  <div v-if="comMode == 'wifi'">
    <sense-address />
  </div>
</template>

<script>
import SegmentedControl from "vue-segmented-control";
import SenseAddress from "./SenseAddress.vue";

export default {
  name: "CommunicationMode",
  components: {
    SegmentedControl,
    SenseAddress,
  },
  computed: {
    serialAvailable() {
      return "serial" in navigator;
    },
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
    if (this.serialAvailable) {
      if (localStorage.comMode) {
        this.comMode = localStorage.comMode;
      }
    } else {
      this.comMode = "wifi";
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