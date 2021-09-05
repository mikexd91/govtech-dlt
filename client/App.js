import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import ListComponent from "./components/ListComponent";
import ModalComponent from "./components/ModalComponent";
import FilterComponent from "./components/FilterComponent";
import { isEmpty } from "lodash";

const CenterDiv = styled.div`
  display: flex;
  padding-top: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const SpaceDiv = styled.div`
  padding: 10px;
`;

const BASE_TASKLIST_URL = "http://localhost:5000/v1/api/tasklist";

export default function App() {
  const [taskList, setTaskList] = useState([]);
  const [filteredTaskList, setFilteredTaskList] = useState([]);
  const [taskListId, setTaskListId] = useState("");

  useEffect(() => {
    // await ApiService.get();
    // console.log("asdasd");
    fetch(`${BASE_TASKLIST_URL}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status.code) {
          setTaskList(response.data.tasks);
          setFilteredTaskList(response.data.tasks);
          setTaskListId(response.data.id);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const onFilter = (queryParams) => {
    const { status, priority } = queryParams;
    if ((!isEmpty(status) || !isEmpty(priority)) && !isEmpty(taskList)) {
      const filtered = taskList.filter((task) => {
        if (!isEmpty(status) && !isEmpty(priority)) {
          return (
            status.includes(task.status) && priority.includes(task.priority)
          );
        }

        if (!isEmpty(status) && isEmpty(priority)) {
          return status.includes(task.status);
        }

        if (isEmpty(status) && !isEmpty(priority)) {
          return priority.includes(task.priority);
        }
      });
      setFilteredTaskList(filtered);
    } else {
      setFilteredTaskList(taskList);
    }
  };

  const onSubmit = (data) => {
    fetch(`${BASE_TASKLIST_URL}/${taskListId}`, {
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
          setFilteredTaskList(response.data.tasks);
          setTaskListId(response.data.id);
        }
      })
      .catch((error) => console.log(error));
  };

  const onUpdate = (data) => {
    console.log(data);
    fetch(`${BASE_TASKLIST_URL}/${taskListId}/task/${data.taskId}`, {
      credentials: "include",
      method: "PUT",
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
          setFilteredTaskList(response.data.tasks);
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
          setFilteredTaskList(response.data.tasks);
          setTaskListId(response.data.id);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <CenterDiv>
      <Typography variant="h5" style={{ color: "palevioletred" }}>
        Fancy Task List
      </Typography>
      <SpaceDiv />
      <FilterComponent handleFilter={onFilter} />
      <SpaceDiv />
      <ListComponent
        taskList={filteredTaskList}
        addTask={false}
        updateTask={true}
        handleRemoval={onRemoval}
        handleUpdate={onUpdate}
      />
      <SpaceDiv />
      <ModalComponent
        addTask={true}
        updateTask={false}
        handleSubmitForm={onSubmit}
      />
    </CenterDiv>
  );
}
