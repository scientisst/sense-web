<template>
  <div class="logo-top-left">
    <router-link to="/">
      <img
        id="logo"
        alt="Sense logo"
        src="../assets/img/logos/SI-Sense-Vert-Col.svg"
      />
    </router-link>
  </div>
</template>

<script>
export default {
  name: "LogoTopLeft",
};
</script>

<style scoped>
.logo-top-left {
  text-align: left;
  padding: 12px;
}

#logo {
  width: 72px;
}
</style>
