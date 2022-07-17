<template>
  <div class="settings">
    <top-bar title="Sense Settings" />
    <device-select v-on:device="onDeviceChanged" />
    <div style="height: 16px" />
    <div v-if="device == 0">
      <sense-settings />
    </div>
    <div v-else-if="device == 1"><maker-settings /></div>
    <div style="height: 32px" />
  </div>
</template>

<script>
import TopBar from "../components/TopBar.vue";
import DeviceSelect from "../components/DeviceSelect.vue";
import SenseSettings from "../components/SenseSettings.vue";
import MakerSettings from "../components/MakerSettings.vue";

export default {
  name: "SettingsView",
  components: {
    TopBar,
    DeviceSelect,
    SenseSettings,
    MakerSettings,
  },
  data() {
    return {
      device: 0,
    };
  },
  created() {
    if (localStorage.device) {
      this.device = parseInt(localStorage.device);
    }
  },
  methods: {
    onDeviceChanged(event) {
      this.device = event;
    },
  },
};
</script>
