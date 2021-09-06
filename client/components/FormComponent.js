/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { makeStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { useForm, Controller } from 'react-hook-form';
import { forOwn } from 'lodash';
import moment from 'moment';

import {
  DEFAULT_STATUS,
  UNDER_REVIEW_STATUS,
  IN_PROGRESS_STATUS,
  DONE_STATUS,
  BLOCKED_STATUS,
  HIGH_PRIORITY,
  MEDIUM_PRIORITY,
  LOW_PRIORITY,
} from '../constant';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Form = ({
  updateTask,
  loginUser,
  registerUser,
  addTask,
  handleClose,
  handleSubmitForm,
  existingData,
}) => {
  const classes = useStyles();
  const { handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    const result = {};
    forOwn(data, (value, key) => {
      if (value !== '') {
        if (key === 'dueDate' && value !== 'Invalid date' && value !== 'null') {
          result[key] = moment(value).format('DD-MM-YYYY').toString();
        } else if (key === 'isPrivate') {
          result[key] = value === 'true';
        } else {
          result[key] = value;
        }
      }
    });
    existingData ? (result.taskId = existingData.taskId) : null;
    handleSubmitForm(result);
    handleClose();
  };

  let titleRule = {};
  addTask ? (titleRule = { required: 'Task title required' }) : null;

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      {(registerUser || loginUser) && (
      <Controller
        name="name"
        control={control}
        defaultValue={existingData ? existingData.task : ''}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Name"
            variant="filled"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
        rules={titleRule}
      />
      )}

      {!registerUser && !loginUser && (
      <Controller
        name="taskTitle"
        control={control}
        defaultValue={existingData ? existingData.task : ''}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Task"
            variant="filled"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
        rules={titleRule}
      />
      )}

      {!registerUser && !loginUser && (
      <Controller
        name="priority"
        control={control}
        defaultValue={existingData ? existingData.priority : ''}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Priority</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
              onChange={onChange}
              error={!!error}
            >
              <MenuItem value={HIGH_PRIORITY}>{HIGH_PRIORITY}</MenuItem>
              <MenuItem value={MEDIUM_PRIORITY}>{MEDIUM_PRIORITY}</MenuItem>
              <MenuItem value={LOW_PRIORITY}>{LOW_PRIORITY}</MenuItem>
            </Select>
          </FormControl>
        )}
        rules={titleRule}
      />

      )}

      {!registerUser && !loginUser && !updateTask && (
      <Controller
        name="isPrivate"
        control={control}
        defaultValue={existingData ? existingData.priority : ''}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Privacy</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
              onChange={onChange}
              error={!!error}
            >
              <MenuItem value="true">Private</MenuItem>
              <MenuItem value="false">Public</MenuItem>
            </Select>
          </FormControl>
        )}
        rules={titleRule}
      />
      )}
      {!registerUser && !loginUser && (
        <Controller
          name="dueDate"
          control={control}
          defaultValue={existingData ? existingData.dueDate : ''}
        // eslint-disable-next-line no-unused-vars
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              id="date"
              label="dueDate"
              type="date"
              onChange={onChange}
              value={value}
              defaultValue="24-05-2019"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        />
      )}

      {updateTask && (
        <Controller
          name="status"
          control={control}
          defaultValue={existingData ? existingData.status : ''}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                onChange={onChange}
                error={!!error}
              >
                <MenuItem value={DEFAULT_STATUS}>{DEFAULT_STATUS}</MenuItem>
                <MenuItem value={IN_PROGRESS_STATUS}>
                  {IN_PROGRESS_STATUS}
                </MenuItem>
                <MenuItem value={UNDER_REVIEW_STATUS}>
                  {UNDER_REVIEW_STATUS}
                </MenuItem>
                <MenuItem value={BLOCKED_STATUS}>{BLOCKED_STATUS}</MenuItem>
                <MenuItem value={DONE_STATUS}>{DONE_STATUS}</MenuItem>
              </Select>
            </FormControl>
          )}
        />
      )}
      <div>
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {addTask && 'Add New Task'}
          {updateTask && 'Update Task'}
          {loginUser && 'Login User'}
          {registerUser && 'Register User'}
        </Button>
      </div>
    </form>
  );
};

export default Form;
