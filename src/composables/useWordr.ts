import { reactive, readonly, computed, ref, onMounted } from "vue";
import {
  Letter,
  LetterBoardStatus,
  LetterKeyboardStatus,
  State,
  WordStatus,
  KeyboardLetter,
} from "../types";
import data from "../data/words.json";

export const state = reactive<State>({
  word: [],
  line: 0,
  char: 0,
  lettersUsed: [],
  run: [],
  status: WordStatus.NONE,
});
const board = ref<Letter[]>([]);

export const useWordr = () => {
  // Status
  const alphabet = `qwertyuiop-asdfghjkl-zxcvbnm`.split("");

  const emptyLetter: Letter = {
    letter: null,
    status: LetterBoardStatus.EMPTY,
    line: 0,
    char: 0,
  };

  const availableWords = data.words;

  const letterStatus = (
    letter: string,
    position: number
  ): LetterBoardStatus => {
    if (state.word.includes(letter)) {
      if (state.word.indexOf(letter) == position) {
        return LetterBoardStatus.CORRECT;
      } else {
        return LetterBoardStatus.CHANGE;
      }
    } else {
      return LetterBoardStatus.EMPTY;
    }
  };

  const setLetters = () => {
    state.run.forEach((l, index) => {
      const currentIndex = board.value.findIndex(
        (letter) => letter.line == state.line && letter.char == index
      );

      setTimeout(() => {
        board.value[currentIndex].letter = l;
        board.value[currentIndex].status = letterStatus(l, index);
      }, 100 * index);

      if (!state.lettersUsed.includes(l)) {
        state.lettersUsed.push(l);
      }
    });
  };

  const saveWord = () => {
    const entry = state.run.join("").toLowerCase();
    if (availableWords.includes(entry)) {
      if (entry == state.word.join("")) {
        state.status = WordStatus.CORRECT;
        setLetters();
      } else {
        // Reset and go to next line
        setLetters();
        insertLine();
        setTimeout(() => {
          state.run = [];
          state.char = 0;
          state.line = state.line + 1;
          state.status = WordStatus.NONE;
        }, 500);
      }
    } else {
      state.status = WordStatus.WRONG;
      setTimeout(() => (state.status = WordStatus.NONE), 1000);
    }
  };

  const insertLine = (): void => {
    const line = board.value.length / 5;

    for (let i = 0; i < 5; i++) {
      console.log({ ...emptyLetter, line, char: i });
      board.value.push({ ...emptyLetter, line, char: i });
    }
  };

  const setWord = () => {
    const random = Math.floor(Math.random() * availableWords.length);
    state.word = availableWords[random].split("");
  };

  onMounted(() => {
    if (board.value.length < 1) insertLine();
    if (state.word.length < 1) setWord();
  });

  const removeLetter = () => {
    if (state.run.length) state.run.length = state.run.length - 1;
  };
  // Input a Letter
  const inputLetter = (letter: string) => {
    if (state.run.length > 4) {
      return;
    }

    state.run.push(letter);

    if (state.run.length == 5) saveWord();
  };

  // USED
  // UNUSED
  // CORRECT

  const keyboardLetters = computed(() => {
    const lines: Partial<KeyboardLetter>[][] = [[]];
    alphabet.forEach((l) => {
      if (l == "-") {
        lines.push([]);
      } else {
        lines[lines.length - 1].push({
          letter: l,
          status: state.lettersUsed.includes(l)
            ? state.word.includes(l)
              ? LetterKeyboardStatus.CORRECT
              : LetterKeyboardStatus.USED
            : LetterKeyboardStatus.UNUSED,
        });
      }
    });
    return lines;
  });

  const currentSettings = computed(() => {
    return state;
  });

  return {
    inputLetter,
    removeLetter,
    current: currentSettings,
    board: board,
    keyboardLetters: readonly(keyboardLetters),
  };
};
