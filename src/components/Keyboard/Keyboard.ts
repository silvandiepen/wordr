import { computed, defineComponent, onMounted } from "vue";
import { Style } from "@sil/tools";
import { useWordr } from "../../composables/useWordr";

export default defineComponent({
  setup() {
    const style = new Style("keyboard");
    const { inputLetter, removeLetter, current, keyboardLetters, board } =
      useWordr();

    const setLetter = (letter: string) => {
      inputLetter(letter);
    };
    onMounted(() => {
      window.addEventListener("keydown", (e) => {
        if (e.key === "Backspace") {
          removeLetter();
        }
      });
      window.addEventListener("keypress", function (e) {
        setLetter(String.fromCharCode(e.keyCode));
      });
    });

    return {
      style,
      current,
      removeLetter,
      setLetter,
      board,
      keyboardLetters,
    };
  },
});
