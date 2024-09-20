'use client'

import { useState, useEffect } from 'react';
import { Task, TaskStatus } from '@/types';
import { fetchTasks, createTask, updateTask, deleteTask } from '@/lib/api';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      setLoading(true);
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }

  async function addTask(task: Omit<Task, 'id'>) {
    try {
      const newTask = await createTask(task);
      setTasks([...tasks, newTask]);
    } catch (err) {
      setError('Failed to add task');
    }
  }

  async function updateTaskStatus(id: string, newStatus: TaskStatus) {
    try {
      const updatedTask = await updateTask(id, { status: newStatus });
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
    } catch (err) {
      setError('Failed to update task');
    }
  }

  async function removeTask(id: string) {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError('Failed to delete task');
    }
  }

  return {
    tasks,
    loading,
    error,
    addTask: (task: Omit<Task, 'id'>) => Promise<void>,
    updateTaskStatus: (id: string, newStatus: TaskStatus) => Promise<void>,
    removeTask: (id: string) => Promise<void>
  };
}