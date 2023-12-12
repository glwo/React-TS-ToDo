import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/EditTwoTone";
import Chip from "@mui/joy/Chip";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Card from "@mui/joy/Card";

import _ from "lodash";

import { Task } from "./Dashboard";

import { RootState } from '../redux/rootReducer';

import { SetTaskAction } from "../redux/Config/config.actions";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

interface TaskInfoProps {}

const TaskInfo: React.FC<TaskInfoProps> = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.config.tasks);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [task, setTask] = useState<Task>(tasks[0]);
  const [editTask, setEditTask] = useState<Task>({
    id: 0,
    description: "",
    types: [],
    completed: false,
  });
  const [saveTaskDisabled, setSaveTaskDisabled] = useState(false);
  const routeParams = useParams();

  const [editTaskDialogOpen, setEditTaskDialogOpen] = useState(false);

  const typesOptions = ["work", "wellness", "learning", "personal"];

  useEffect(() => {
    // Ensure that routeParams.taskId is defined before using it
    if (routeParams.taskId !== undefined) {
      const taskId = Number(routeParams.taskId);
      setTask(tasks[taskId]);
      setEditTask(tasks[taskId]);
      setSelectedIndex(taskId);
    }
  }, [tasks, routeParams.taskId]);

  useEffect(() => {
    if (
      !task ||
      !task.description ||
      !task.types ||
      task.description.trim().length === 0 ||
      task.types.length === 0
    ) {
      setSaveTaskDisabled(true);
    } else {
      setSaveTaskDisabled(false);
    }
  }, [task]);

  const handleEditTask = () => {
    setEditTask(_.cloneDeep(task));
    setEditTaskDialogOpen(true);
  };

  const handleChangeTask = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof Task
  ) => {
    let updatedTask: Task = {
      id: editTask.id,
      description: editTask.description,
      types: editTask.types,
      completed: editTask.completed,
    };

    switch (key) {
      case "description":
        updatedTask.description = e.target.value;
        break;

      case "types":
        updatedTask.types = e.target.value.split(",");
        break;

      case "completed":
        updatedTask.completed = e.target.checked;
        break;
    }

    setEditTask(updatedTask);
  };

  const handleSaveTask = () => {
    if (!saveTaskDisabled) {
      let tempTasks = _.cloneDeep(tasks);
      tempTasks[selectedIndex] = _.cloneDeep(editTask);
      const setTaskAction: SetTaskAction = {
        type: "SET_TASKS",
        tasks: tempTasks,
      };

      dispatch(setTaskAction);
      setEditTaskDialogOpen(false);
    }
  };

  const handleCloseEditTaskDialog = () => {
    setEditTaskDialogOpen(false);
  };

  const handleChangeTaskCheckbox = (type: string) => {
    // Toggle the type in the editTask array
    setEditTask((prevTask) => {
      const updatedTypes = prevTask.types.includes(type)
        ? prevTask.types.filter((t) => t !== type)
        : [...prevTask.types, type];

      return {
        ...prevTask,
        types: updatedTypes,
      };
    });
  };

  const getBackgroundColor = (type: string): string => {
    switch (type) {
      case "work":
        return "#9a5b13";

      case "wellness":
        return "#0b6bcb";

      case "personal":
        return "#c41c1c";

      default:
        return "#5A5A72";
    }
  };

  return (
    <div className="Page-container">
      {task && (
        <div style={{ width: "100%" }}>
          <h1>{`Task: ${task.description}`}</h1>
          {task && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <Card sx={{ color: "#636363", width: "600px" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <h3 style={{ fontWeight: "bold", marginTop: "4px" }}>
                      {task.description}
                    </h3>
                    <div style={{ display: "flex", gap: "4px" }}>
                      {task.types.slice(0, 4).map((type, index) => (
                        <Chip
                          key={index}
                          sx={{ backgroundColor: getBackgroundColor(type) }}
                          variant="solid"
                        >
                          {type}
                        </Chip>
                      ))}
                      {task.types.length > 4 && (
                        <Chip color="neutral" variant="solid">
                          {`+${task.types.length - 4}`}
                        </Chip>
                      )}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <div
                      className="editIconButton"
                      onClick={() => handleEditTask()}
                    >
                      <EditIcon
                        style={{
                          borderRadius: "100px",
                          width: "24px",
                          height: "24px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
          {editTaskDialogOpen && (
            <Modal
              open={editTaskDialogOpen}
              onClose={() => handleCloseEditTaskDialog()}
            >
              <ModalDialog
                aria-labelledby="basic-modal-dialog-title"
                aria-describedby="basic-modal-dialog-description"
                sx={{ width: 600, padding: "32px", boxSizing: "border-box" }}
              >
                <h1>Edit Task</h1>
                <Stack spacing={2}>
                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Input
                      value={editTask.description}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChangeTask(e, "description")
                      }
                      autoFocus
                      required
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
                              checked={editTask.types.includes(type)}
                              onChange={() => handleChangeTaskCheckbox(type)}
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
                    onClick={() => handleCloseEditTaskDialog()}
                  >
                    Cancel
                  </div>
                  <div
                    className="addIconButton"
                    style={{
                      marginLeft: "8px",
                      fontWeight: "800",
                      backgroundColor: saveTaskDisabled ? "grey" : "",
                    }}
                    onClick={() => handleSaveTask()}
                  >
                    Save
                  </div>
                </div>
              </ModalDialog>
            </Modal>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskInfo;
