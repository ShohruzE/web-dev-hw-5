import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

const Task = () => {
  const { id } = useParams(); // Get the id from the URL
  console.log(id);

  const [task, setTask] = useState({
    taskName: "",
    description: "",
  });

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/tasks/${id}`
      );
      const data = await response.json();
      console.log(data);
      setTask(data);
    };
    fetchTask();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 space-y-4">
        <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Home
        </Link>
        <h1 className="text-2xl font-bold mb-4">Task</h1>
        <div className="space-y-2">
          <p className="text-lg font-semibold">{task.taskName}</p>
          <p className="text-gray-700">{task.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Task;
