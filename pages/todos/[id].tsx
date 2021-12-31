import { useState, useEffect } from "react";

import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Amplify from "aws-amplify";
import Link from "next/link";
import { useRouter } from "next/router";

import { GetTodoQuery, Todo } from "../../src/API";
import awsconfig from "../../src/aws-exports";
import { getTodo } from "../../src/graphql/queries";

Amplify.configure(awsconfig);

const TodosShow = () => {
  const [todo, setTodo] = useState<Todo>();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const asyncFunc = async () => {
      const result = (await API.graphql(
        graphqlOperation(getTodo, { id })
      )) as GraphQLResult<GetTodoQuery>;
      if (result && result.data && result.data.getTodo) {
        setTodo(result.data.getTodo);
      }
    };
    asyncFunc();
  }, [id]);

  return !todo ? (
    <></>
  ) : (
    <>
      <h1>Todos</h1>
      <Link href="/">Back</Link>
      <Link href="/todos/[id]/edit" as={`/todos/${todo.id}/edit`}>
        Edit
      </Link>
      <h2>{todo.name}</h2>
      <p>created at {new Date(todo.timestamp * 1000).toLocaleString()}</p>
      <p>{todo.completed ? "Completed" : "In progress"}</p>
    </>
  );
};

export default withAuthenticator(TodosShow);
