import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Amplify from "aws-amplify";
import Link from "next/link";
import { useRouter } from "next/router";

import { CreateTodoMutation } from "../../src/API";
import awsconfig from "../../src/aws-exports";
import Form from "../../src/component/Form";
import { createTodo } from "../../src/graphql/mutations";

Amplify.configure(awsconfig);

const TodosNew = () => {
  const router = useRouter();

  const onSubmit = async (newTodo: { [x: string]: string }) => {
    (await API.graphql(
      graphqlOperation(createTodo, {
        input: {
          ...newTodo,
          completed: false,
          timestamp: Math.floor(Date.now() / 1000),
        },
      })
    )) as GraphQLResult<CreateTodoMutation>;
    router.push("/");
  };

  return (
    <>
      <h1>Todos</h1>
      <Link href="/">back</Link>
      <Form onSubmit={onSubmit} />
    </>
  );
};

export default withAuthenticator(TodosNew);
