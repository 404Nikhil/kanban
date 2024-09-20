import React from 'react';
import { Task } from '@/types';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete }) => {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">{task.title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{task.description}</p>
        <p className="text-sm">Status: {task.status}</p>
        <p className="text-sm">Priority: {task.priority}</p>
        {task.dueDate && <p className="text-sm">Due Date: {task.dueDate}</p>}
      </CardContent>
      <CardFooter>
        <Button variant="destructive" onClick={() => onDelete(task.id)}>Delete</Button>
      </CardFooter>
    </Card>
  );
};

export default TaskItem;