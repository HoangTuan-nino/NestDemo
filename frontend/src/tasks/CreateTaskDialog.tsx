import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TaskAPI } from "../api/task.api";
import { TaskDTO } from "../api/dto/task.dto";

type Props = {
  open: boolean;
  handleClose: () => void;
  onTaskCreate: (task: TaskDTO) => void;
};
const CreateTaskDialog = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState<undefined | string>(undefined);

  async function createTask() {
    const res = await TaskAPI.createOne({
      name,
      description,
    });
    props.onTaskCreate(res);
    console.log("New Task Created", res);
  }
  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Create New Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create to this task, please enter name and description of task
            here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="email"
            fullWidth
            variant="filled"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Desctiption"
            type="description"
            fullWidth
            variant="filled"
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} variant="contained" color="error">
            Cancel
          </Button>
          <Button onClick={createTask} variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default CreateTaskDialog;
