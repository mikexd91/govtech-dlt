/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { isEmpty, cloneDeep } from 'lodash';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import ListComponent from './ListComponent';
import ModalComponent from './ModalComponent';
import FilterComponent from './FilterComponent';

import {
  addTasktoTasklist, removeFromTasklist, updateTasklist,
} from '../utils/apiService';

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

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

export default function FullWidthTabs({
  users, loginUserName, loginCallback, onFilterArray, values, filtered,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [usersData, setUsers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    if (users.length > 0)setCurrentUser(users[value]);
    setUsers(users);
    setFilteredData(users);
  }, [users, loginUserName]);

  useEffect(() => {
    setFilteredData(filtered);
  }, [filtered, values]);

  const handleChange = (event, newValue) => {
    setCurrentUser(users[newValue]);
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const filterHelper = (status, priority, tasklist) => {
    const filteredArray = tasklist.filter((task) => {
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
    return filteredArray;
  };

  const onFilter = (queryParams) => {
    const { status, priority } = queryParams;
    if ((!isEmpty(status) || !isEmpty(priority)) && !isEmpty(currentUser)) {
      // eslint-disable-next-line array-callback-return
      const privateTasks = filterHelper(status, priority, currentUser.privateTasks);
      const publicTasks = filterHelper(status, priority, currentUser.publicTasks);
      const userResult = cloneDeep(users);
      userResult[value].privateTasks = privateTasks;
      userResult[value].publicTasks = publicTasks;
      setFilteredData(userResult);
      onFilterArray(userResult);
    } else {
      onFilterArray(users);
    }
  };

  const onSubmit = async (data) => {
    if (loginUserName === currentUser.name) {
      await addTasktoTasklist(currentUser.taskListId, data, currentUser.id);
      loginCallback({ name: loginUserName });
    }
  };

  const onUpdate = async (data) => {
    if (loginUserName === currentUser.name) {
      await updateTasklist(currentUser.taskListId, data, currentUser.id);
      loginCallback({ name: loginUserName });
    }
  };

  const onRemoval = async (data) => {
    if (loginUserName === currentUser.name) {
      await removeFromTasklist(currentUser.taskListId, data, currentUser.id);
      loginCallback({ name: loginUserName });
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {filteredData.map((item) => (
            <Tab label={item.name} {...a11yProps(item.id)} />
          ))}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {filteredData.map((item) => (
          <CenterDiv>
            {loginUserName === '' && (
            <Typography variant="h6" style={{ color: 'black' }}>
              Login or Register a new user to proceed
            </Typography>
            )}
            {loginUserName && <FilterComponent handleFilter={onFilter} />}
            <SpaceDiv />
            {item.privateTasks && (
              <>
                <Typography variant="h6" style={{ color: 'black' }}>
                  Private Tasks
                </Typography>
                <ListComponent
                  allowEdit={loginUserName !== currentUser.name}
                  taskList={item.privateTasks}
                  addTask={false}
                  updateTask={true}
                  handleRemoval={onRemoval}
                  handleUpdate={onUpdate}
                />
              </>

            )}
            {item.publicTasks && (
            <>
              <Typography variant="h6" style={{ color: 'black' }}>
                Public Tasks
              </Typography>
              <ListComponent
                allowEdit={loginUserName !== currentUser.name}
                taskList={item.publicTasks}
                addTask={false}
                updateTask={true}
                handleRemoval={onRemoval}
                handleUpdate={onUpdate}
              />
            </>
            )}
            <SpaceDiv />
            {loginUserName === currentUser.name && (
            <ModalComponent
              addTask={true}
              updateTask={false}
              handleSubmitForm={onSubmit}
            />
            )}

          </CenterDiv>
        ))}
      </SwipeableViews>
    </div>
  );
}
