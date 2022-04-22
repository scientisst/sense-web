<template>
  <div class="not-compatible">
    <logo-top-left />
    <h1>Not compatible :(</h1>
  </div>
</template>

<script>
import LogoTopLeft from "../components/LogoTopLeft.vue";

export default {
  name: "NotCompatibleView",
  components: {
    LogoTopLeft,
  },
};
</script>
