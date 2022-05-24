<template>
  <div class="not-compatible">
    <logo-top-left />
    <div class="center">
      <img src="../assets/img/logos/logo-sad.svg" />
      <h2>Your browser is not compatible...</h2>
      <p>
        The SENSE web application is only compatible with <b>Google Chrome</b>.
        <br />
        If you don't have Google Chrome, you can download it here:
      </p>
      <div style="height: 1em" />
      <button
        class="button"
        id="download-button"
        onclick=" window.open('https://www.google.com/chrome/','_blank')"
      >
        <img
          src="https://www.google.com/chrome/static/images/chrome-logo.svg"
        />
        <span style="width: 1em" />
        <span>Google Chrome</span>
      </button>
    </div>
  </div>
</template>

<script>
import LogoTopLeft from "../components/TopBar.vue";

export default {
  name: "NotCompatibleView",
  components: {
    LogoTopLeft,
  },
  created: function () {
    if ("serial" in navigator) {
      this.$router.replace({ path: "/" });
    }
  },
};
</script>

<style scoped>
.not-compatible {
  width: 100%;
  height: 100%;
}

.center {
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  text-align: center;
}

#download-button {
  display: inline-flex;
  align-items: center;
}
</style>
