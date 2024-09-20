
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Task Management Dashboard</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/dashboard" className="text-blue-500 hover:underline">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/kanban" className="text-blue-500 hover:underline">
              Kanban Board
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
