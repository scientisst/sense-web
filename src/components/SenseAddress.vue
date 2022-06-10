<template>
  <h3>ADDRESS</h3>
  <div :class="validInput ? 'valid' : 'invalid'">
    <input
      v-model="address"
      type="text"
      class="input"
      placeholder="scientisst.local"
      minlength="7"
      maxlength="15"
      size="15"
      pattern="^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$"
    />
  </div>
</template>

<script>
export default {
  name: "SenseAddress",
  data() {
    return { address: "", validInput: true };
  },
  mounted() {
    if (localStorage.address) {
      this.address = localStorage.address;
    }
  },
  watch: {
    address(newAddress) {
      this.validInput = this.validateAddress(newAddress);
      if (this.validInput) {
        this.address = newAddress;
        localStorage.address = this.address;
      }
    },
  },
  methods: {
    validateAddress(value) {
      if (value == "") return true;
      return /^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(
        value
      );
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
  font-size: 20px;
  padding: 8px;
  font-weight: bold;
  width: 12em;
}

.invalid input {
  background-color: #ffdddd;
}
</style>