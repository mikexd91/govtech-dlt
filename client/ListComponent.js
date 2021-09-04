import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ListComponent(props) {
  const classes = useStyles();

  return (
    <List dense className={classes.root}>
      {props.taskList.map((task) => {
        const labelId = `checkbox-list-secondary-label-${task.taskId}`;
        return (
          <ListItem key={task.taskId} button>
            <ListItemText id={labelId} primary={`${task.task}`} />
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                onChange={() => props.handleStatusChange(task)}
                checked={task.status === "DONE"}
                inputProps={{ "aria-labelledby": labelId }}
              />
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => props.handleRemoval(task)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
