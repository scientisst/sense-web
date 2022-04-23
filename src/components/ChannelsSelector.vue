<template>
  <div class="channels">
    <h3>CHANNELS</h3>
    <div class="boards-container">
      <div class="board-container">
        <div class="channel-highlight" />
        <img src="../assets/img/board/front.png" class="board-img" />
      </div>
      <div class="board-container">
        <div class="channel-highlight" />
        <img src="../assets/img/board/back.png" class="board-img" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChannelsSelector",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  left: 3em;
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
