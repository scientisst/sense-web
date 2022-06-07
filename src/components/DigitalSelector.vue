<template>
  <div class="digital-selector">
    <h3>DIGITAL</h3>
  </div>
</template>

<script>
export default {
  name: "DigitalSelector",
  data() {
    return { ch1: true, ch2: true, ch3: true, ch4: true, ch5: true, ch6: true };
  },
  mounted() {
    if (localStorage.ch1) {
      this.ch1 = localStorage.ch1;
    }
    if (localStorage.ch2) {
      this.ch2 = localStorage.ch2;
    }
    if (localStorage.ch3) {
      this.ch3 = localStorage.ch3;
    }
    if (localStorage.ch4) {
      this.ch4 = localStorage.ch4;
    }
    if (localStorage.ch5) {
      this.ch5 = localStorage.ch5;
    }
    if (localStorage.ch6) {
      this.ch6 = localStorage.ch6;
    }

    [1, 2, 3, 4, 5, 6].forEach((channel) => {
      if (localStorage["ch" + channel]) {
        this["ch" + channel] = localStorage["ch" + channel] == "true";
      }
    });

    [1, 3, 5].forEach((channel) => {
      const item = document.getElementById("ch" + channel);
      item.addEventListener(
        "mouseover",
        () => {
          this.$refs.frontHighlight.classList.add("AI" + channel);
        },
        false
      );
      item.addEventListener(
        "mouseout",
        () => {
          this.$refs.frontHighlight.classList.remove("AI" + channel);
        },
        false
      );
    });
    [2, 4, 6].forEach((channel) => {
      const item = document.getElementById("ch" + channel);
      item.addEventListener(
        "mouseover",
        () => {
          this.$refs.backHighlight.classList.add("AI" + channel);
        },
        false
      );
      item.addEventListener(
        "mouseout",
        () => {
          this.$refs.backHighlight.classList.remove("AI" + channel);
        },
        false
      );
    });
  },
  watch: {
    ch1(newCh1) {
      if (this.emptyChannels()) {
        newCh1 = true;
        this.ch1 = newCh1;
      }
      localStorage.ch1 = newCh1;
    },
    ch2(newCh2) {
      if (this.emptyChannels()) {
        this.ch1 = true;
      }
      localStorage.ch2 = newCh2;
    },
    ch3(newCh3) {
      if (this.emptyChannels()) {
        this.ch1 = true;
      }
      localStorage.ch3 = newCh3;
    },
    ch4(newCh4) {
      if (this.emptyChannels()) {
        this.ch1 = true;
      }
      localStorage.ch4 = newCh4;
    },
    ch5(newCh5) {
      if (this.emptyChannels()) {
        this.ch1 = true;
      }
      localStorage.ch5 = newCh5;
    },
    ch6(newCh6) {
      if (this.emptyChannels()) {
        this.ch1 = true;
      }
      localStorage.ch6 = newCh6;
    },
  },
  methods: {
    emptyChannels() {
      return !(
        this.ch1 ||
        this.ch2 ||
        this.ch3 ||
        this.ch4 ||
        this.ch5 ||
        this.ch6
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.buttons-row {
  display: flex;
  justify-content: center;
  gap: 24px;
}
.channel-button {
  /* padding: 1rem 1rem; */
  width: 3rem;
  height: 3rem;
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
  border-radius: 360px;
}

.active {
  background: var(--main-color);
  color: white;
}

.channel-button:hover {
  box-shadow: 0px 0px 0px 16px #f37a8455, 0px 0px 0px 9px #f1626f55,
    0px 0px 0px 3px var(--main-color);
}

.board-img {
  width: 100%;
}

.boards-container {
  display: flex;
  justify-content: center;
}

.board-container {
  width: 25em;
  position: relative;
}

.channel-highlight {
  width: 5em;
  height: 5em;
  border: solid #ef4b59;
  border-width: 6px;
  position: absolute;
  display: none;
}

.AI1 {
  top: -0.3em;
  left: 3em;
  display: block;
}

.AX1 {
  top: -0.3em;
  right: 3em;
  display: block;
}

.AI3 {
  top: 4.2em;
  left: 3em;
  display: block;
}

.AI5 {
  top: 4.2em;
  right: 3em;
  display: block;
}

.AX2 {
  top: -0.3em;
  left: 3em;
  display: block;
}

.AI2 {
  top: -0.3em;
  right: 3em;
  display: block;
}

.AI6 {
  top: 4.2em;
  left: 3em;
  display: block;
}

.AI4 {
  top: 4.2em;
  right: 3em;
  display: block;
}
</style>
