import KanbanBoard from '@/components/ClientKanbanBoard';

export default function Kanban() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Kanban Board</h1>
      <KanbanBoard />
    </div>
  );
}