import TaskList from '@/components/TaskList/TaskList';

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Task Dashboard</h1>
      <TaskList />
    </div>
  );
}