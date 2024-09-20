import React from 'react';
import { useTasks } from '@/hooks/useTasks';
import TaskItem from './TaskItem';

const TaskList: React.FC = () => {
  const { tasks, removeTask } = useTasks();

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={removeTask} />
      ))}
    </div>
  );
};

export default TaskList;
