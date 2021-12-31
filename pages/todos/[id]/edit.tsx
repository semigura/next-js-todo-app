import { useState, useEffect } from "react";

import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Amplify from "aws-amplify";
import Link from "next/link";
import { useRouter } from "next/router";

import { UpdateTodoMutation, GetTodoQuery, Todo } from "../../../src/API";
import awsconfig from "../../../src/aws-exports";
import Form from "../../../src/component/Form";
import { updateTodo } from "../../../src/graphql/mutations";
import { getTodo } from "../../../src/graphql/queries";

Amplify.configure(awsconfig);

const TodosNew = () => {
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

  const onSubmit = async (newTodo: { [x: string]: string }) => {
    (await API.graphql(
      graphqlOperation(updateTodo, {
        input: {
          ...newTodo,
          id: todo?.id,
        },
      })
    )) as GraphQLResult<UpdateTodoMutation>;
    router.push("/todos/[id]", `/todos/${todo?.id}`);
  };

  return !todo ? (
    <></>
  ) : (
    <>
      <h1>Todos</h1>
      <Link href="/todos/[id]" as={`/todos/${todo.id}`}>
        Back
      </Link>
      <Form onSubmit={onSubmit} values={todo} />
    </>
  );
};

export default withAuthenticator(TodosNew);
