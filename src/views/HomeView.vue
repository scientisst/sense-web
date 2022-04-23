<template>
  <div class="home">
    <div id="logo">
      <img
        alt="ScientISST Sense logo"
        src="../assets/img/logos/SI-Sense-Hor-Col.svg"
      />
    </div>

    <div style="height: 32px" />

    <div class="buttons">
      <router-link to="/live" v-slot="{ href, route, navigate }">
        <button :href="href" @click="navigate" class="button">
          {{ route.name }}
        </button>
      </router-link>
      <router-link to="/settings" v-slot="{ href, route, navigate }">
        <button :href="href" @click="navigate" class="button">
          {{ route.name }}
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeView",
  components: {},
  created: function () {
    if (!("serial" in navigator)) {
      this.$router.replace({ path: "/not-compatible" });
    }
  },
};
</script>

<style scoped>
#logo {
  margin: 50px 0;
}

.home {
  width: 99vw;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}
</style>