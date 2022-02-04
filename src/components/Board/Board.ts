import { defineComponent, onMounted, computed, watch } from "vue";
import { Style } from "@sil/tools";
import { useWordr } from "../../composables/useWordr";

export default defineComponent({
  setup() {
    const style = new Style("board");

    const { inputLetter, keyboardLetters, current, board } = useWordr();

    const boardLayout = computed(() => {
      const rows = [];

      const rowLength = Math.floor(board.value.length / 5);

      for (let ri = 0; ri < rowLength; ri++) {
        const col = [];
        for (let ci = 0; ci < 5; ci++) {
          const char = board.value.find((c) => c.char === ci && c.line === ri);
          let letter = char?.letter;

          if (ri == current.value.line && char) {
            if (current.value.run.length > 0) {
              letter = current.value.run[ci] || null;
            }
          }

          col.push({ ...char, letter: letter });
        }
        rows.push(col);
      }

      return rows;
    });

    watch(
      () => board,
      () => {
        console.log("bord changed");
        const element = document.querySelector(".board__container");
        if (element) element.scrollTop = element?.scrollHeight;
      },
      { deep: true }
    );

    return {
      style,
      inputLetter,
      keyboardLetters,
      current,
      boardLayout,
    };
  },
});
