<template>
  <div class="wrapper">
    <router-view />
  </div>
  <div id="modals"></div>
  <page-footer />
</template>

<script>
import PageFooter from "@/components/PageFooter.vue";

export default {
  name: "senseApp",
  components: {
    PageFooter,
  },
};
</script>

<style>
:root {
  --main-color: #ef4b59;
}

body {
  margin: 0;
  height: 100vh;
}

.wrapper {
  flex-grow: 1;
}
.footer {
  height: 50px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 32px;
}

.button {
  padding: 1rem 3.5rem;
  border: none;
  cursor: pointer;
  background: none;
  text-align: center;
  color: var(--main-color);
  font-size: 17px;
  font-weight: bold;
  letter-spacing: 2px;
  text-transform: uppercase;
  box-shadow: 0px 0px 0px 3px var(--main-color);
  border-radius: 3px;
}

.button:hover {
  box-shadow: 0px 0px 0px 16px #f37a8455, 0px 0px 0px 9px #f1626f55,
    0px 0px 0px 3px var(--main-color);
}

.button:focus {
  outline: none;
}
button:focus {
  outline: none;
}

.active {
  color: white !important;
  background-color: #ef4b59;
}
</style>
