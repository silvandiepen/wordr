import { defineComponent, onMounted } from "vue";
import { Style } from "@sil/tools";
import { useWordr } from "../../composables/useWordr";

export default defineComponent({
  setup() {
    const style = new Style("keyboard");
    const { inputLetter, removeLetter, keyboardLetters, board } = useWordr();

    onMounted(() => {
      window.addEventListener("keydown", (e) => {
        if (e.key === "Backspace") {
          removeLetter();
        }
      });
      window.addEventListener("keypress", function (e) {
        inputLetter(String.fromCharCode(e.keyCode));
      });
    });

    return {
      style,
      board,
      keyboardLetters,
    };
  },
});
