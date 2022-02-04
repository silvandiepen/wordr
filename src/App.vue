<template>
  <div><Board /><Keyboard /><Scores /></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Keyboard from "./components/Keyboard/Keyboard.vue";
import Board from "./components/Board/Board.vue";
import Scores from "./components/Scores/Scores.vue";
export default defineComponent({
  components: {
    Keyboard,
    Board,
    Scores,
  },
  setup() {},
});
</script>

<style lang="scss">
body,
html {
}
#app {
}
</style>
