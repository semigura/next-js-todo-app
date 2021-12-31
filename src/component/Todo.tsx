import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api";
import Link from "next/link";
import { useRecoilState } from "recoil";

import { DeleteTodoMutation } from "../../src/API";
import { deleteTodo } from "../../src/graphql/mutations";
import todosState from "../store/todos";

const Todo = ({
  todo,
}: {
  todo: { id: string; name: string; timestamp: number };
}) => {
  const [todos, setTodos] = useRecoilState(todosState);

  const onArchive = async () => {
    (await API.graphql(
      graphqlOperation(deleteTodo, {
        input: {
          id: todo.id,
        },
      })
    )) as GraphQLResult<DeleteTodoMutation>;
    setTodos(todos.filter((item: { id: string }) => item.id !== todo.id));
  };
  return (
    <>
      <h2>
        <Link href={`/todos/${todo.id}`}>{todo.name}</Link>
      </h2>
      <p>created at {new Date(todo.timestamp * 1000).toLocaleString()}</p>
      <button onClick={onArchive} type="button">
        Archive
      </button>
    </>
  );
};

export default Todo;
