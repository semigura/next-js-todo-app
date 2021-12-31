import { useEffect } from "react";

import { FieldValues, useForm, UseFormReturn } from "react-hook-form";

import { Todo } from "../API";

interface Props extends UseFormReturn<FieldValues, object> {
  errors?: { [x: string]: string };
}

const Form = (props: {
  onSubmit: (newTodo: { [x: string]: string }) => void;
  values?: Todo;
}) => {
  const { onSubmit, values } = props;
  const { register, handleSubmit, reset, setValue }: Props = useForm();

  useEffect(() => {
    if (!values) return;
    setValue("name", values.name);
  });

  const handler = (newTodo: { [x: string]: string }) => {
    onSubmit(newTodo);
    reset();
  };

  const errorMessage = (error: { [x: string]: any }, field: string) => {
    const message = [];
    if (error[field]?.type === "required") {
      message.push("required");
    }
    if (error[field]?.type === "maxLength") {
      message.push("Exceeded 20 characters");
    }
    return message.join(", ");
  };

  return (
    <form onSubmit={handleSubmit(handler)}>
      <input
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register("name", { required: true, maxLength: 20 })}
      />
      {errorMessage}
      <button type="submit">Save</button>
    </form>
  );
};

export default Form;

Form.defaultProps = {
  values: undefined,
};
