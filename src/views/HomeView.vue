<template>
  <div class="home">
    <div v-if="showInstallButton" id="install">
      <button @click="installPWA" class="button active">
        <font-awesome-icon icon="download" size="sm" />
        Install
      </button>
    </div>
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
  data() {
    return {
      showInstallButton: false,
    };
  },
  created: function () {
    if (!("serial" in navigator)) {
      this.$router.replace({ path: "/not-compatible" });
    }
  },
  beforeMount() {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      this.installEvent = e;
      this.showInstallButton = true;
    });
  },
  methods: {
    installPWA() {
      this.installEvent.prompt();
      this.installEvent.userChoice.then((choice) => {
        if (choice.outcome === "accepted") {
          this.showInstallButton = false;
        }
      });
    },
  },
};
</script>

<style scoped>
#logo {
  margin: 50px 0;
}

.home {
  height: 100% !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#install {
  position: absolute;
  top: 0;
  right: 0;
  margin: 32px;
}

#install button {
  padding: 8px 12px;
  font-size: 14px;
}
</style>