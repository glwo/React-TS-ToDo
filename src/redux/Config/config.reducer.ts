import { Reducer } from 'redux';
import { ADD_TASK, DELETE_TASK, TOGGLE_TASK, SET_TASKS } from './config.types';
import { ConfigActionTypes } from './config.actions';

import taskData from "../../taskData.json";

export interface Task {
  id: number; // Assuming you have a unique identifier for tasks
  description: string;
  types: string[]; // Types could be an array of strings
  completed: boolean;
}

export interface ConfigState {
  tasks: Task[];
  lastUsedTaskId: number;
}

const INITIAL_STATE: ConfigState = {
  tasks: taskData,
  lastUsedTaskId: 50
};

const reducer: Reducer<ConfigState, ConfigActionTypes> = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case SET_TASKS: {
      return {
        ...state,
        tasks: action.tasks,
      };
    }

    case ADD_TASK: {
      const newTask: Task = {
        id: state.lastUsedTaskId + 1,
        description: action.description,
        types: action.types,
        completed: false,
      };

      return {
        ...state,
        tasks: [...state.tasks, newTask],
        lastUsedTaskId: state.lastUsedTaskId + 1,
      };
    }

    case DELETE_TASK: {
      const updatedTasks = state.tasks.filter((task) => task.id !== action.taskId);
      return {
        ...state,
        tasks: updatedTasks,
      };
    }

    case TOGGLE_TASK: {
      const updatedTasks = state.tasks.map((task) =>
        task.id === action.taskId ? { ...task, completed: !task.completed } : task
      );
      return {
        ...state,
        tasks: updatedTasks,
      };
    }

    default:
      return state;
  }
};

export default reducer;
