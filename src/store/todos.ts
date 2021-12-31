import { atom } from "recoil";

import { Todo } from "../API";

const todosState = atom<Todo[]>({
  key: "todos",
  default: [],
});

export default todosState;
