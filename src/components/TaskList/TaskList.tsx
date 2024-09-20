'use client'

import React, { useState } from 'react';
import { Task, TaskStatus, TaskPriority } from '@/types';

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdateTask, onDeleteTask }) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleEdit = (task: Task) => {
    setEditingId(task.id);
  };

  const handleSave = (task: Task) => {
    onUpdateTask(task.id, task);
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="bg-white p-4 rounded shadow">
          {editingId === task.id ? (
            <EditableTask task={task} onSave={handleSave} onCancel={handleCancel} />
          ) : (
            <ViewTask task={task} onEdit={() => handleEdit(task)} onDelete={() => onDeleteTask(task.id)} />
          )}
        </div>
      ))}
    </div>
  );
};

interface ViewTaskProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
}

const ViewTask: React.FC<ViewTaskProps> = ({ task, onEdit, onDelete }) => (
  <>
    <h3 className="font-bold">{task.title}</h3>
    <p>{task.description}</p>
    <p>Status: {task.status}</p>
    <p>Priority: {task.priority}</p>
    <button onClick={onEdit} className="mr-2 text-blue-500">Edit</button>
    <button onClick={onDelete} className="text-red-500">Delete</button>
  </>
);

interface EditableTaskProps {
  task: Task;
  onSave: (task: Task) => void;
  onCancel: () => void;
}

const EditableTask: React.FC<EditableTaskProps> = ({ task, onSave, onCancel }) => {
  const [editedTask, setEditedTask] = useState(task);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <input
        name="title"
        value={editedTask.title}
        onChange={handleChange}
        className="w-full mb-2 p-1 border rounded"
      />
      <input
        name="description"
        value={editedTask.description || ''}
        onChange={handleChange}
        className="w-full mb-2 p-1 border rounded"
      />
      <select
        name="status"
        value={editedTask.status}
        onChange={handleChange}
        className="w-full mb-2 p-1 border rounded"
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <select
        name="priority"
        value={editedTask.priority}
        onChange={handleChange}
        className="w-full mb-2 p-1 border rounded"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button onClick={() => onSave(editedTask)} className="mr-2 text-green-500">Save</button>
      <button onClick={onCancel} className="text-gray-500">Cancel</button>
    </div>
  );
};

export default TaskList;