<template>
  <div><Board /><Keyboard /><Scores /><ColorMode /></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import Keyboard from "./components/Keyboard/Keyboard.vue";
import Board from "./components/Board/Board.vue";
import Scores from "./components/Scores/Scores.vue";
import ColorMode from "./components/ColorMode/ColorMode.vue";

import { useColorMode } from "./composables/useColorMode";

export default defineComponent({
  components: {
    Keyboard,
    Board,
    Scores,
    ColorMode,
  },

  setup() {
    const { initColorMode } = useColorMode();
    onMounted(() => {
      initColorMode();
    });
  },
});
</script>

<style lang="scss">
body,
html {
}
#app {
  height: 100vh;
}
.color-mode {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
  margin: variable(space);
}
</style>
