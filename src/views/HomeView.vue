<template>
  <div class="home">
    <div id="logo">
      <img
        alt="ScientISST Sense logo"
        src="../assets/img/logos/SI-Sense-Hor-Col.svg"
      />
    </div>

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
      this.$router.push({ path: "/not-compatible" });
    }
  },
};
</script>

<style scoped>
#logo {
  margin: 50px 0;
}
</style>