/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

import {
  DEFAULT_STATUS,
  UNDER_REVIEW_STATUS,
  IN_PROGRESS_STATUS,
  DONE_STATUS,
  BLOCKED_STATUS,
  HIGH_PRIORITY,
  MEDIUM_PRIORITY,
  LOW_PRIORITY,
} from '../constant.js';

const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const status = [
  DEFAULT_STATUS,
  IN_PROGRESS_STATUS,
  UNDER_REVIEW_STATUS,
  BLOCKED_STATUS,
  DONE_STATUS,
];
const priority = [LOW_PRIORITY, MEDIUM_PRIORITY, HIGH_PRIORITY];

export default function FilterComponent({ handleFilter }) {
  const classes = useStyles();

  const [selectedStatus, setStatus] = useState([]);

  const [selectedPriority, setPriority] = useState([]);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const onFilter = () => {
    const result = {
      status: selectedStatus,
      priority: selectedPriority,
    };

    handleFilter(result);
  };

  return (
    <Div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">Priority</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={selectedPriority}
          onChange={handlePriorityChange}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {priority.map((item) => (
            <MenuItem key={item} value={item}>
              <Checkbox checked={selectedPriority.indexOf(item) > -1} />
              <ListItemText primary={item} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">Status</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={selectedStatus}
          onChange={handleStatusChange}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {status.map((item) => (
            <MenuItem key={item} value={item}>
              <Checkbox checked={selectedStatus.indexOf(item) > -1} />
              <ListItemText primary={item} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button onClick={onFilter} variant="outlined" color="primary">
        Filter
      </Button>
    </Div>
  );
}
