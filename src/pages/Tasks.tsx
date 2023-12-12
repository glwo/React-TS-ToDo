import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/DeleteTwoTone";
import EditIcon from "@mui/icons-material/EditTwoTone";
import Chip from "@mui/joy/Chip";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Checkbox from "@mui/joy/Checkbox";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Stack from "@mui/joy/Stack";
import Button from "@mui/material/Button";
import _ from "lodash";

import { Task } from "./Dashboard";

import { SetTaskAction, AddTaskAction } from "../redux/Config/config.actions";
import { ADD_TASK } from "../redux/Config/config.types";
import FormControlLabel from "@mui/material/FormControlLabel";

interface TasksProps {}

const Tasks: React.FC<TasksProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tasks = useSelector((state: any) => state.config.tasks);

  const [deleteTaskDialogOpen, setDeleteTaskDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [taskToDeleteIndex, setTaskToDeleteIndex] = useState<number | null>(
    null
  );
  const [addTaskDialogOpen, setAddTaskDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState<Task>({
    id: 50,
    description: "",
    types: [],
    completed: false,
  });

  const [searchString, setSearchString] = useState<string | null>(null);

  const [isFormValid, setIsFormValid] = useState(false);

  const typesOptions = ["work", "wellness", "learning", "personal"];

  useEffect(() => {
    console.log(searchString);
  }, [searchString]);

  const handleViewtask = (task: Task, index: number) => {
    navigate(`/tasks/${index}`);
  };

  const handleOpenDeleteTaskDialog = (task: Task, index: number) => {
    setTaskToDelete(task);
    setTaskToDeleteIndex(index);
    setDeleteTaskDialogOpen(true);
  };

  const handleCloseDeletetaskDialog = () => {
    setTaskToDelete(null);
    setTaskToDeleteIndex(null);
    setDeleteTaskDialogOpen(false);
  };

  const handleOpenAddTaskDialog = () => {
    setNewTask({ id: 50, description: "", types: [], completed: false });
    setAddTaskDialogOpen(true);
  };

  const handleCloseAddTaskDialog = () => {
    setAddTaskDialogOpen(false);
  };

  const handleChangeNewTask = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setNewTask({
      ...newTask,
      [field]: e.target.value,
    });
  };

  const handleSaveNewTask = () => {
    // Check if the description and types are provided
    if (newTask.description.trim() === "" || newTask.types.length === 0) {
      // Invalid input, set isFormValid to false
      setIsFormValid(false);
      return;
    }

    // Dispatch the action to add the new task
    const addTaskAction: AddTaskAction = {
      type: ADD_TASK,
      description: newTask.description,
      types: newTask.types,
    };

    dispatch(addTaskAction);
    handleCloseAddTaskDialog();
  };

  const deletetask = () => {
    if (taskToDeleteIndex !== null) {
      let temptasks = _.cloneDeep(tasks);
      temptasks.splice(taskToDeleteIndex, 1);
      const setTaskAction: SetTaskAction = {
        type: "SET_TASKS",
        tasks: temptasks,
      };

      dispatch(setTaskAction);
      handleCloseDeletetaskDialog();
    }
  };

  const handleCheckboxChange = (index: number) => {
    // Clone the tasks array to avoid mutating the state directly
    const updatedTasks = [...tasks];
    // Toggle the completed status of the task at the specified index
    updatedTasks[index] = {
      ...updatedTasks[index],
      completed: !updatedTasks[index].completed,
    };

    // Dispatch the action to update the tasks in the state
    const setTaskAction: SetTaskAction = {
      type: "SET_TASKS",
      tasks: updatedTasks,
    };

    dispatch(setTaskAction);
  };

  const handleTypeCheckboxChange = (type: string) => {
    // Toggle the type in the newTask array
    setNewTask((prevTask) => {
      const updatedTypes = prevTask.types.includes(type)
        ? prevTask.types.filter((t) => t !== type)
        : [...prevTask.types, type];

      return {
        ...prevTask,
        types: updatedTypes,
      };
    });
  };

  const renderTask = (task: Task, index: number) => {
    let topTask = "inactive";
    let backgroundColor = "";
    let types: string[] = task.types;

    if (types.includes("work")) {
      topTask = "work";
      backgroundColor = "#9a5b13";
    } else if (types.includes("wellness")) {
      topTask = "wellness";
      backgroundColor = "#0b6bcb";
    } else if (types.includes("personal")) {
      topTask = "personal";
      backgroundColor = "#c41c1c";
    } else {
      topTask = "learning";
      backgroundColor = "#5A5A72";
    }

    return (
      <tr key={index}>
        <td>{task.description}</td>
        <td>{renderTaskChip(task, index)}</td>
        <td>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              gap: "8px",
            }}
          >
            <Checkbox
              sx={{
                borderRadius: "100px",
                width: "24px",
                height: "24px",
              }}
              checked={task.completed}
              onChange={() => handleCheckboxChange(index)}
            />
            <div
              className="editIconButton"
              onClick={() => handleViewtask(task, index)}
            >
              <EditIcon
                style={{
                  borderRadius: "100px",
                  width: "24px",
                  height: "24px",
                }}
              />
            </div>
            <div
              className="deleteIconButton"
              onClick={() => handleOpenDeleteTaskDialog(task, index)}
            >
              <DeleteIcon
                sx={{ color: "white" }}
                style={{
                  borderRadius: "100px",
                  width: "24px",
                  height: "24px",
                }}
              />
            </div>
          </div>
        </td>
      </tr>
    );
  };

  const renderTaskChip = (task: Task, index: number) => {
    let topTask = "inactive";
    let backgroundColor = "";

    let types: string[] = task.types;

    if (types.includes("work")) {
      topTask = "work";
      backgroundColor = "#9a5b13";
    } else if (types.includes("wellness")) {
      topTask = "wellness";
      backgroundColor = "#0b6bcb";
    } else if (types.includes("personal")) {
      topTask = "personal";
      backgroundColor = "#c41c1c";
    } else {
      topTask = "learning";
      backgroundColor = "#5A5A72";
    }

    if (types.length === 1) {
      return (
        <Chip sx={{ zIndex: 0, backgroundColor }} variant="solid">
          {topTask}
        </Chip>
      );
    } else {
      return (
        <div style={{ display: "flex", gap: "4px" }}>
          <Chip sx={{ backgroundColor }} variant="solid">
            {topTask}
          </Chip>
          <Chip color="neutral" variant="solid">
            {`+${types.length - 1}`}
          </Chip>
        </div>
      );
    }
  };

  return (
    <div className="Page-container">
      <h1>Tasks</h1>

      {/* <div className="Search-bar">
        <Input
          style={{ width: "100%" }}
          placeholder="Search for a task"
          type="search"
          disableClearable
          options={tasks.map((option: Task) => option.description)}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchString(event.target.value);
          }}
        />
      </div> */}

      <Button variant="contained" onClick={handleOpenAddTaskDialog}>
        Add Task
      </Button>

      <table style={{ width: "100%" }}>
        <thead>
          <tr
            style={{
              backgroundColor: "#D9D9D9",
              outline: "4px solid #D9D9D9",
              zIndex: "100 !important",
            }}
          >
            <th>Description</th>
            <th>Type</th>
            <th
              style={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task: Task, index: number) => renderTask(task, index))}
        </tbody>
      </table>
      {addTaskDialogOpen && (
        <Modal
          open={addTaskDialogOpen}
          onClose={() => handleCloseAddTaskDialog()}
        >
          <ModalDialog
            aria-labelledby="basic-modal-dialog-title"
            aria-describedby="basic-modal-dialog-description"
            sx={{ width: 600, padding: "32px", boxSizing: "border-box" }}
          >
            <h1>Add Task</h1>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  value={newTask.description}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangeNewTask(e, "description")
                  }
                  autoFocus
                  required
                  onBlur={() =>
                    setIsFormValid(
                      newTask.description.trim() !== "" &&
                        newTask.types.length > 0
                    )
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Types/Type</FormLabel>
                <Stack direction="row" spacing={2}>
                  {typesOptions.map((type) => (
                    <FormControlLabel
                      key={type}
                      control={
                        <Checkbox
                          checked={newTask.types.includes(type)}
                          onChange={() => handleTypeCheckboxChange(type)}
                          sx={{ marginLeft: 0, marginRight: 1 }}
                        />
                      }
                      label={type}
                    />
                  ))}
                </Stack>
              </FormControl>
            </Stack>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "24px",
              }}
            >
              <div
                className="cancelIconButton"
                style={{ marginLeft: "8px", fontWeight: "800" }}
                onClick={() => handleCloseAddTaskDialog()}
              >
                Cancel
              </div>
              <div
                className="addIconButton"
                style={{
                  marginLeft: "8px",
                  fontWeight: "800"
                }}
                onClick={() => handleSaveNewTask()}
              >
                Save
              </div>
            </div>
          </ModalDialog>
        </Modal>
      )}
      {deleteTaskDialogOpen && (
        <Modal
          open={deleteTaskDialogOpen}
          onClose={() => handleCloseDeletetaskDialog()}
        >
          <ModalDialog
            aria-labelledby="basic-modal-dialog-title"
            aria-describedby="basic-modal-dialog-description"
            sx={{ width: 600, padding: "32px", boxSizing: "border-box" }}
          >
            <h1>Delete task</h1>
            <p>
              Are you sure you want to delete{" "}
              <strong>{taskToDelete?.description}</strong>?
            </p>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "24px",
              }}
            >
              <div
                className="cancelIconButton"
                style={{ marginLeft: "8px", fontWeight: "800" }}
                onClick={() => handleCloseDeletetaskDialog()}
              >
                cancel
              </div>
              <div
                className="addIconButton"
                style={{ marginLeft: "8px", fontWeight: "800" }}
                onClick={() => deletetask()}
              >
                Delete
              </div>
            </div>
          </ModalDialog>
        </Modal>
      )}
    </div>
  );
};

export default Tasks;
