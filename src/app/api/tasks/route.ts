
import { NextRequest, NextResponse } from 'next/server';
import { Task, TaskStatus, TaskPriority } from '@/types';

let tasks: Task[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Draft and submit the project proposal by end of week',
    status: 'To Do',
    priority: 'High',
    dueDate: '2023-06-30',
  },
  {
    id: '2',
    title: 'Review code changes',
    description: 'Review and approve pending pull requests',
    status: 'In Progress',
    priority: 'Medium',
    dueDate: '2023-06-25',
  },
  {
    id: '3',
    title: 'Update documentation',
    description: 'Update user guide with new features',
    status: 'Completed',
    priority: 'Low',
    dueDate: '2023-06-20',
  },
];

function validateTask(task: Partial<Task>): string | null {
  if (!task.title || task.title.trim().length === 0) {
    return 'Title is required';
  }
  if (task.status && !['To Do', 'In Progress', 'Completed'].includes(task.status)) {
    return 'Invalid status';
  }
  if (task.priority && !['Low', 'Medium', 'High'].includes(task.priority)) {
    return 'Invalid priority';
  }
  if (task.dueDate && isNaN(Date.parse(task.dueDate))) {
    return 'Invalid due date format';
  }
  return null;
}

export async function GET() {
  return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
  try {
    const task: Omit<Task, 'id'> = await request.json();
    
    const validationError = validateTask(task);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      status: task.status || 'To Do',
      priority: task.priority || 'Medium',
    };

    tasks.push(newTask);
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, ...updates }: Partial<Task> = await request.json();
    
    if (!id) {
      return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
    }

    const validationError = validateTask(updates);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
    return NextResponse.json(tasks[taskIndex]);
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
    }

    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    tasks.splice(taskIndex, 1);
    return NextResponse.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}