/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import FormComponent from './FormComponent';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ModalComponent({
  loginUser,
  loginUserName,
  registerUser,
  addTask,
  updateTask,
  handleSubmitForm,
  existingData,
  disabled,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data) => {
    handleSubmitForm(data);
  };

  return (
    <div>
      {addTask && (
        <Button onClick={handleOpen} variant="contained" color="primary">
          Add New Task
        </Button>
      )}
      {loginUser && (
      <Button onClick={handleOpen} variant="outlined" color="primary">
        {loginUserName === '' ? 'Login' : `Login as ${loginUserName}`}
      </Button>
      )}
      {registerUser && (
      <Button onClick={handleOpen} variant="contained" color="primary">
        Register New User
      </Button>
      )}
      {updateTask && (
        <IconButton edge="end" aria-label="edit" onClick={handleOpen} disabled={disabled}>
          <EditIcon />
        </IconButton>
      )}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Div className={classes.paper}>
            <Typography variant="h5" style={{ color: 'black' }}>
              {addTask && 'Add New Task'}
              {updateTask && 'Update Task'}
              {loginUser && 'Login User'}
              {registerUser && 'Register User'}
            </Typography>
            <FormComponent
              handleSubmitForm={onSubmit}
              handleClose={handleClose}
              loginUser={loginUser}
              registerUser={registerUser}
              addTask={addTask}
              updateTask={updateTask}
              existingData={existingData}
            />
          </Div>
        </Fade>
      </Modal>
    </div>
  );
}
