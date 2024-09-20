'use client'

import React from 'react';
import { useTasks } from '@/hooks/useTasks';
import KanbanBoard from './KanbanBoard/KanbanBoard';

const ClientKanbanBoard: React.FC = () => {
  const { tasks, updateTaskStatus } = useTasks();

  return <KanbanBoard tasks={tasks} onUpdateTaskStatus={updateTaskStatus} />;
};

export default ClientKanbanBoard;