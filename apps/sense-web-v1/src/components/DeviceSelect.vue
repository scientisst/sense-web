<template>
  <div v-if="serialAvailable" id="devices">
    <div
      :class="[device == 0 ? 'selected' : '', 'device']"
      v-on:click="setDevice(0)"
    >
      <div class="device-image">
        <font-awesome-icon :icon="['fas', 'wave-square']" size="2xl" />
      </div>
      <br />
      <br />
      SENSE
    </div>
    <div
      :class="[device == 1 ? 'selected' : '', 'device']"
      v-on:click="setDevice(1)"
    >
      <div class="device-image">
        <font-awesome-icon :icon="['fas', 'toolbox']" size="2xl" />
      </div>
      <br />
      <br />
      MAKER
    </div>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faToolbox, faWaveSquare } from "@fortawesome/free-solid-svg-icons";
library.add(faToolbox, faWaveSquare);

export default {
  name: "DeviceSelect",
  components: {},
  computed: {
    serialAvailable() {
      return "serial" in navigator;
    },
  },
  emits: ["device"],
  data() {
    return { device: 0 };
  },
  mounted() {
    if (this.serialAvailable) {
      if (localStorage.device) {
        this.device = localStorage.device;
      }
    } else {
      this.device = 0;
    }
  },
  methods: {
    setDevice(device) {
      this.device = device;
      localStorage.device = this.device;
      this.$emit("device", device);
    },
  },
};
</script>

<style scoped>
#devices {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 64px;
}

.device {
  font-weight: bold;
}

.device-image {
  transform: scale(1.5);
}
.device:hover .device-image {
  transform: scale(1.7);
}

.selected {
  color: var(--main-color);
}
</style>