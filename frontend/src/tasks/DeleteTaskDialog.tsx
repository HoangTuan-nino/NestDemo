import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
import { TaskDTO } from "../api/dto/task.dto";
import { TaskAPI } from "../api/task.api";

type Props = {
  open: boolean;
  handleClose: () => void;
  onTaskDelete: (taskId: number) => void;
  data: TaskDTO | undefined;
};
const DeleteTaskDialog = (props: Props) => {
  const [open, setOpen] = React.useState(false);

  const delteteTask = async () => {
    if (props.data) {
      const res: any = await TaskAPI.deleteOne(props.data?.id);
      props.onTaskDelete(res);
      props.handleClose();
    }
    console.log(props.data);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Delete ${props.data?.name}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you agree to delete this task, it will disappear forever
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Disagree</Button>
          <Button onClick={delteteTask} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default DeleteTaskDialog;
