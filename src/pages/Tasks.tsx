import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/DeleteTwoTone";
import AccountIcon from "@mui/icons-material/AccountBoxRounded";
import Chip from "@mui/joy/Chip";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import _ from "lodash";

import { Task } from "./Dashboard";

import { SetTaskAction } from "../redux/Config/config.actions";

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

  const [searchString, setSearchString] = useState<string | null>(null);

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

  const renderTask = (task: Task) => {
    let topTask = "inactive";
    let backgroundColor = ""; // Changed 'color' to 'backgroundColor' to avoid confusion
    let types: string[] = task.types;

    if (types.includes("work")) {
      topTask = "work";
      backgroundColor = "#9a5b13"; // Set your desired color for 'work'
    } else if (types.includes("wellness")) {
      topTask = "wellness";
      backgroundColor = "#0b6bcb"; // Set your desired color for 'wellness'
    } else if (types.includes("personal")) {
      topTask = "personal";
      backgroundColor = "#c41c1c"; // Set your desired color for 'personal'
    } else {
      topTask = "learning";
      backgroundColor = "#5A5A72"; // Set your desired color for 'learning'
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
          sx={{ width: "100%" }}
          placeholder="Search for a task"
          type="search"
          freeSolo
          disableClearable
          options={tasks.map((option: Task) => option.description)}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchString(event.target.value);
          }}
        />
      </div> */}

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
            {/* <th>Actions</th> */}
            <th style={{ display: "flex", justifyContent: "end" }}></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task: Task, i: number) => {
            let comparatorString = task.description + task.types;
            if (
              comparatorString
                .toLowerCase()
                .includes(searchString ? searchString.toLowerCase() : "")
            ) {
              return (
                <tr key={i}>
                  <td>{task.description}</td>
                  <td>{renderTask(task)}</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "end",
                        gap: "8px",
                      }}
                    >
                      <div
                        className="editIconButton"
                        onClick={() => handleViewtask(task, i)}
                      >
                        <AccountIcon
                          style={{
                            borderRadius: "100px",
                            width: "24px",
                            height: "24px",
                          }}
                        />
                      </div>
                      <div
                        className="deleteIconButton"
                        onClick={() => handleOpenDeleteTaskDialog(task, i)}
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
            } else {
              return null;
            }
          })}
        </tbody>
      </table>
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
