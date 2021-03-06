import { AppBar, Container, Grid, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { TaskDTO } from "../api/dto/task.dto";
import { TaskAPI } from "../api/task.api";
import CreateTaskDialog from "./CreateTaskDialog";
import DeleteTaskDialog from "./DeleteTaskDialog";
import UpdateTaskDialog from "./EditTaskDialog";

const TaskListt = () => {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const [openCreateTaskDialog, setOpenCreateTaskDialog] = useState(false);
  const [openUpdateTaskDialog, setOpenUpdateTaskDialog] = useState(false);
  const [openDeleteTaskDialog, setOpenDeleteTaskDialog] = useState(false);
  const [taskEdited, setTaskEdited] = useState<undefined | TaskDTO>(undefined);
  const [taskDeleted, setTaskDeleted] = useState<undefined | TaskDTO>(
    undefined
  );

  useEffect(() => {
    fetchAll();
  }, [tasks]);

  async function fetchAll() {
    const res = await TaskAPI.getAll();
    setTasks(res);
  }

  const addTask = (task: TaskDTO) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (taskId: number) => {
    const filterTask = tasks.filter((t) => t.id !== taskId);
    setTasks(filterTask);
  };

  const onTaskDeleteBtnClicked = (task: TaskDTO) => {
    setOpenDeleteTaskDialog(true);
    setTaskDeleted(task);
  };

  const updateTask = async (task: TaskDTO) => {
    setTasks(
      tasks.map((t) => {
        if (t.id === task.id) return task;
        return t;
      })
    );
  };

  const onTaskEditBtnClicked = (task: TaskDTO) => {
    setOpenUpdateTaskDialog(true);
    setTaskEdited(task);
  };

  const appbar = (
    <Box sx={{ flexGrow: 1 }}>
      <CreateTaskDialog
        open={openCreateTaskDialog}
        handleClose={() => setOpenCreateTaskDialog(false)}
        onTaskCreate={addTask}
      />
      <UpdateTaskDialog
        open={openUpdateTaskDialog}
        handleClose={() => setOpenUpdateTaskDialog(false)}
        onTaskUpdate={updateTask}
        data={taskEdited}
      />
      <DeleteTaskDialog
        open={openDeleteTaskDialog}
        handleClose={() => setOpenDeleteTaskDialog(false)}
        onTaskDelete={deleteTask}
        data={taskDeleted}
      />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task List
          </Typography>
          <Button
            color="warning"
            variant="contained"
            onClick={() => setOpenCreateTaskDialog(true)}
          >
            CREATE TASK
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
  return (
    <div>
      {appbar}
      <Grid container spacing={1} style={{ padding: 10 }}>
        {tasks.map((task) => {
          return (
            <Grid item xs={3} key={task.id}>
              <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {task.name}
                    </Typography>
                    <Typography variant="body2">{task.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <Container>
                      <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        style={{ marginLeft: 5 }}
                        onClick={() => onTaskEditBtnClicked(task)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="secondary"
                        variant="contained"
                        style={{ marginLeft: 5 }}
                        onClick={() => onTaskDeleteBtnClicked(task)}
                      >
                        Delete
                      </Button>
                    </Container>
                  </CardActions>
                </Card>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
export default TaskListt;
