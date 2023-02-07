<template>
  <h3>BAUDRATE</h3>
  <input
    v-model="baudRate"
    type="number"
    class="input"
    min="300"
    max="2000000"
    size="7"
  />
</template>

<script>
export default {
  name: "BaudRate",
  data() {
    return { baudRate: 9600 };
  },
  mounted() {
    if (localStorage.baudRate) {
      this.baudRate = localStorage.baudRate;
    }
  },
  watch: {
    baudRate(newBaudRate) {
      localStorage.baudRate = newBaudRate;
      this.baudRate = newBaudRate;
    },
  },
};
</script>


<style scoped>
*:focus {
  outline: none;
}

.input {
  border: none;
  box-shadow: 0px 0px 0px 4px var(--main-color);
  border-radius: 12px;
  text-align: center;
  font-size: 24px;
  padding: 8px;
  font-weight: bold;
  width: 6em;
}
</style>