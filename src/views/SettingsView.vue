<template>
  <div class="settings">
    <top-bar title="Sense Settings" />
    <sampling-rate />
    <div style="height: 16px" />
    <channels-selector />
  </div>
</template>

<script>
import TopBar from "../components/TopBar.vue";
import ChannelsSelector from "../components/ChannelsSelector.vue";
import SamplingRate from "../components/SamplingRate.vue";

export default {
  name: "SettingsView",
  components: {
    TopBar,
    ChannelsSelector,
    SamplingRate,
  },
};
</script>
