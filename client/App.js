import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ListComponent from "./ListComponent";
import InputComponent from "./InputComponent";

const CenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const BASE_TASKLIST_URL = "http://localhost:5000/tasklist";

export default function App() {
  const [taskList, setTaskList] = useState([]);
  const [taskListId, setTaskListId] = useState("");

  useEffect(() => {
    fetch(`${BASE_TASKLIST_URL}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status.code) {
          setTaskList(response.data.tasks);
          setTaskListId(response.data.id);
        }

        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const onSubmit = (data) => {
    fetch(`${BASE_TASKLIST_URL}`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status.code) {
          setTaskList(response.data.tasks);
          setTaskListId(response.data.id);
        }
      })
      .catch((error) => console.log(error));
  };

  const onStatusChange = (data) => {
    const req = {
      status: data.status == "DONE" ? "NOT DONE" : "DONE",
    };
    fetch(`${BASE_TASKLIST_URL}/${taskListId}/task/${data.taskId}`, {
      credentials: "include",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(req),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status.code) {
          setTaskList(response.data.tasks);
          setTaskListId(response.data.id);
        }
      })
      .catch((error) => console.log(error));
  };

  const onRemoval = (data) => {
    fetch(`${BASE_TASKLIST_URL}/${taskListId}/task/${data.taskId}`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status.code) {
          setTaskList(response.data.tasks);
          setTaskListId(response.data.id);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <CenterDiv>
      <Title>Fancy Todo List</Title>
      <ListComponent
        taskList={taskList}
        handleStatusChange={onStatusChange}
        handleRemoval={onRemoval}
      />
      <InputComponent parentCallback={onSubmit} />
    </CenterDiv>
  );
}
