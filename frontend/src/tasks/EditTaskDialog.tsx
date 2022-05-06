import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TaskAPI } from "../api/task.api";
import { TaskDTO } from "../api/dto/task.dto";
import {
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";

type Props = {
  open: boolean;
  handleClose: () => void;
  onTaskUpdate: (task: TaskDTO) => void;
  data: TaskDTO | undefined;
};
const UpdateTaskDialog = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState<undefined | string>(undefined);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (props.data) {
      setName(props.data.name);
      setDescription(props.data.description);
    }
  }, [props.data]);

  const updateTask = async () => {
    if (props.data) {
      const res = await TaskAPI.updateOne(props.data.id, {
        name,
        description,
        isDone,
      });
      props.onTaskUpdate(res);
      console.log("Task Updated", res);
    }
    console.log(props.data);
  };
  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Update Task</DialogTitle>
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
            value={name}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} variant="contained" color="error">
            Cancel
          </Button>
          <Button onClick={updateTask} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default UpdateTaskDialog;
