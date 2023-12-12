import {
    ADD_TASK,
    DELETE_TASK,
    SET_TASKS,
    TOGGLE_TASK,
} from './config.types';

import { Task } from '../../pages/Dashboard';

export interface SetTaskAction {
  type: typeof SET_TASKS;
  tasks: Task[]; // Assuming Task is a type or interface representing your task structure
}

export interface AddTaskAction {
    type: typeof ADD_TASK;
    description: string;
    types: string[];
  }

  export interface DeleteTaskAction {
    type: typeof DELETE_TASK;
    taskId: number;
  }

  export interface ToggleTaskAction {
    type: typeof TOGGLE_TASK;
    taskId: number;
  }

  export type ConfigActionTypes =
    | SetTaskAction
    | AddTaskAction
    | DeleteTaskAction
    | ToggleTaskAction;
