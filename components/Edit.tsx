/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import moment from "moment";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

import { todoListState } from "../atoms/states";

type FormData = {
  id: string;
  title: string;
  text: string;
  isComplete: boolean;
};

const Edit: React.FC = () => {
  const setTodoList = useSetRecoilState(todoListState);

  // react-hook-formを設定
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      id: moment().format("YYYYMMDDHHmmss"),
      title: "",
      text: "",
      isComplete: false,
    },
  });

  // Todoを追加
  const addTodo = (data: FormData) => {
    setTodoList((oldTodoList) => [...oldTodoList, data]);
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(addTodo)}>
        <label>title:</label>
        {/* 入力要素とvalidationを設定 */}
        <input
          type="text"
          {...register("title", {
            required: "必須項目です",
            maxLength: {
              value: 20,
              message: "20文字以内で入力してください",
            },
          })}
        />
        {errors.title && <span>{errors.title.message}</span>}
        <br />
        <label>text:</label>
        {/* 入力要素とvalidationを設定 */}
        <input
          type="text"
          {...register("text", {
            required: "必須項目です",
            maxLength: {
              value: 20,
              message: "20文字以内で入力してください",
            },
          })}
        />
        {errors.text && (
          <span className="error.main">{errors.text.message}</span>
        )}
        <br />
        <button type="submit">送信</button>
      </form>
    </div>
  );
};

export default Edit;
