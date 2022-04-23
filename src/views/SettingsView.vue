<template>
  <div class="settings">
    <top-bar title="Sense Settings" />
    <channels-selector />
  </div>
</template>

<script>
import TopBar from "../components/TopBar.vue";
import ChannelsSelector from "../components/ChannelsSelector.vue";

export default {
  name: "SettingsView",
  components: {
    TopBar,
    ChannelsSelector,
  },
};
</script>
