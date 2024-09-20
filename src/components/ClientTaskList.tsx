'use client'

import React from 'react';
import { useTasks } from '@/hooks/useTasks';
import TaskList from './TaskList/TaskList';

const ClientTaskList: React.FC = () => {
  const { tasks, updateTask, removeTask } = useTasks();

  return <TaskList tasks={tasks} onUpdateTask={updateTask} onDeleteTask={removeTask} />;
};

export default ClientTaskList;