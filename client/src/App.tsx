import { useState, useEffect, Suspense } from "react";
import Tasks from "./components/Tasks";
import { Link } from "react-router";

import { Task } from "./types/Task";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);
      const data = await response.json();
      console.log(data);
      setTasks(data);
    };
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen container mx-auto">
      <div className="flex flex-col justify-center items-center pt-20">
        <div className="flex flex-col justify-center items-center gap-2">
          <h1 className="font-bold text-3xl">Task Manager</h1>
          <h2 className="font-medium text-md text-gray-600">
            By: Shohruz Ernazarov
          </h2>
        </div>
        <div className="flex justify-center items-center mt-4">
          <Link
            to="/tasks/new"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Create Task
          </Link>
        </div>
        <div className="border-2 rounded-lg min-w-72 w-[500px] h-[500px] overflow-y-auto p-4 m-4">
          <Suspense fallback={<div>Loading...</div>}>
            <Tasks tasks={tasks} setTasks={setTasks} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default App;
