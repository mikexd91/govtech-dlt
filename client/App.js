/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import TabComponent from './components/TabComponent';
import ModalComponent from './components/ModalComponent';
import {
  fetchUsers, registerUser, loginUser,
} from './utils/apiService';

const CenterDiv = styled.div`
  display: flex;
  padding-top: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const FlexRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const SpaceDiv = styled.div`
  padding: 10px;
`;

export default function App() {
  const [users, setUsers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [value, setvalue] = useState(0);
  const [loginUserName, setLoginUserName] = useState('');

  useEffect(async () => {
    const usersData = await fetchUsers();
    setUsers(usersData);
  }, []);

  const onLoginUser = async (data) => {
    const usersData = await loginUser(data);
    setUsers(usersData);
    setLoginUserName(data.name);
  };

  const onRegisterNewUser = async (data) => {
    await registerUser(data);
    await onLoginUser(data);
  };

  const onFilter = (data) => {
    setvalue(value + 1);
    setFilteredData(data);
  };

  return (
    <CenterDiv>
      <Typography variant="h5" style={{ color: 'palevioletred' }}>
        Fancy Task List
      </Typography>
      <SpaceDiv />
      <FlexRowDiv>
        <ModalComponent
          loginUser={true}
          loginUserName={loginUserName}
          handleSubmitForm={onLoginUser}
        />
        <SpaceDiv />
        <ModalComponent
          registerUser={true}
          handleSubmitForm={onRegisterNewUser}
        />
      </FlexRowDiv>
      <SpaceDiv />
      <TabComponent
        users={users}
        filtered={filteredData}
        loginUserName={loginUserName}
        loginCallback={onLoginUser}
        onFilterArray={onFilter}
        values={value}
      />
    </CenterDiv>
  );
}
