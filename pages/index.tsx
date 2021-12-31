import { useEffect } from "react";

import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Amplify from "aws-amplify";
import Link from "next/link";
import { useRecoilState } from "recoil";

import { ListTodosQuery } from "../src/API";
import awsconfig from "../src/aws-exports";
import Todo from "../src/component/Todo";
import { listTodos } from "../src/graphql/queries";
import todosState from "../src/store/todos";

Amplify.configure(awsconfig);

const TodosIndex = () => {
  const [todos, setTodos] = useRecoilState(todosState);

  useEffect(() => {
    const asyncFunc = async () => {
      const result = (await API.graphql(
        graphqlOperation(listTodos)
      )) as GraphQLResult<ListTodosQuery>;
      if (
        result &&
        result.data &&
        result.data.listTodos &&
        result.data.listTodos.items !== null
      ) {
        setTodos(result.data.listTodos.items);
      }
    };
    asyncFunc();
  }, [setTodos]);

  return (
    <>
      <h1>Todos</h1>
      <Link href="/todos/new">New</Link>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </>
  );
};

export default withAuthenticator(TodosIndex);
