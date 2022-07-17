<template>
  <communication-mode />
  <div style="height: 16px" />
  <sampling-rate />
  <div style="height: 16px" />
  <digital-selector />
  <div style="height: 16px" />
  <channels-selector />
</template>

<script>
import ChannelsSelector from "../components/ChannelsSelector.vue";
import DigitalSelector from "../components/DigitalSelector.vue";
import SamplingRate from "../components/SamplingRate.vue";
import CommunicationMode from "@/components/CommunicationMode.vue";

export default {
  name: "SenseSettings",
  components: {
    ChannelsSelector,
    DigitalSelector,
    SamplingRate,
    CommunicationMode,
  },
};
</script>
