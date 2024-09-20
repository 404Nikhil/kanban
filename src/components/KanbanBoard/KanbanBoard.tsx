import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Task, TaskStatus } from '@/types';
import Column from './Column';

interface KanbanBoardProps {
  tasks: Task[];
  onUpdateTaskStatus: (id: string, newStatus: TaskStatus) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onUpdateTaskStatus }) => {
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newStatus = destination.droppableId as TaskStatus;
    onUpdateTaskStatus(draggableId, newStatus);
  };

  const columns: TaskStatus[] = ['To Do', 'In Progress', 'Completed'];

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4">
        {columns.map((column) => (
          <Column
            key={column}
            title={column}
            tasks={tasks.filter((task) => task.status === column)}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;