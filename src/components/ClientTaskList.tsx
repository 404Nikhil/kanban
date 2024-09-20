'use client'

import React from 'react';
import { useTasks } from '@/hooks/useTasks';
import TaskList from './TaskList/TaskList';

const ClientTaskList: React.FC = () => {
  const { tasks, removeTask } = useTasks();

  return <TaskList tasks={tasks} onDeleteTask={removeTask} />;
};

export default ClientTaskList;