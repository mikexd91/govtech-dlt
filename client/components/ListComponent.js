/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import styled from 'styled-components';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import ModalComponent from './ModalComponent';

const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const SpaceDiv = styled.div`
  padding-left: 10px;
`;

const StyleChip = withStyles({
  root: {
    backgroundColor: 'green',
    color: 'white',
  },
})(Chip);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 700,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ListComponent({
  allowEdit,
  taskList,
  handleUpdate,
  handleRemoval,
}) {
  const classes = useStyles();

  return (
    <List dense className={classes.root}>
      {taskList.map((task) => (
        <ListItem key={task.taskId} button>
          <ListItemText
            disableTypography
            primary={(
              <Typography variant="h6" style={{ color: 'black' }}>
                {task.task}
              </Typography>
              )}
          />
          <ListItemSecondaryAction>
            <Div>
              {task.dueDate !== 'null' && (
              <Chip color="secondary" label={task.dueDate} size="small" />
              )}
              <SpaceDiv />
              <Chip
                color="secondary"
                label={task.priority}
                variant="outlined"
                size="small"
              />
              <SpaceDiv />
              {task.status === 'DONE' && (
              <StyleChip
                label={task.status}
                variant="outlined"
                size="small"
              />
              )}
              {task.status !== 'DONE' && (
              <Chip
                color="primary"
                label={task.status}
                variant="outlined"
                size="small"
              />
              )}
              <SpaceDiv />
              <ModalComponent
                addTask={false}
                updateTask
                disabled={allowEdit}
                handleSubmitForm={(task) => handleUpdate(task)}
                existingData={task}
              />
              <SpaceDiv />
              <IconButton
                edge="end"
                disabled={allowEdit}
                aria-label="delete"
                onClick={() => handleRemoval(task)}
              >
                <DeleteIcon />
              </IconButton>
            </Div>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
}
