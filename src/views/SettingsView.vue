<template>
  <div class="settings">
    <top-bar title="Sense Settings" />
    <div v-if="serialAvailable">
      <communication-mode />
    </div>
    <div style="height: 16px" />
    <sampling-rate />
    <div style="height: 16px" />
    <digital-selector />
    <div style="height: 16px" />
    <channels-selector />
    <div style="height: 32px" />
  </div>
</template>

<script>
import TopBar from "../components/TopBar.vue";
import ChannelsSelector from "../components/ChannelsSelector.vue";
import DigitalSelector from "../components/DigitalSelector.vue";
import SamplingRate from "../components/SamplingRate.vue";
import CommunicationMode from "@/components/CommunicationMode.vue";

export default {
  name: "SettingsView",
  components: {
    TopBar,
    ChannelsSelector,
    DigitalSelector,
    SamplingRate,
    CommunicationMode,
  },
  computed: {
    serialAvailable() {
      return "serial" in navigator;
    },
  },
};
</script>
