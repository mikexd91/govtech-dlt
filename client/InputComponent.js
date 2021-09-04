import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Input = styled.input`
  margin: 5px;
  padding: 5px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export default function InputComponent(props) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    props.parentCallback(data);
    reset("");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        placeholder="taskTitle"
        {...register("taskTitle", { required: true })}
      />

      <Input type="submit" />
    </Form>
  );
}
