export enum LetterBoardStatus {
  EMPTY = "empty",
  CORRECT = "correct",
  CHANGE = "change",
}

export enum LetterKeyboardStatus {
  USED = "used",
  UNUSED = "unused",
  CORRECT = "correct",
  PENDING = "pending",
}

export interface Letter {
  letter: null | string;
  status: LetterBoardStatus;
  line: number;
  char: number;
}
export interface KeyboardLetter {
  letter: string;
  status: LetterKeyboardStatus;
}

export enum WordStatus {
  NONE = "none",
  WRONG = "wrong",
  CORRECT = "correct",
}

export interface State {
  word: string[];
  line: number;
  char: number;
  lettersUsed: string[];
  run: string[];
  status: WordStatus;
}
