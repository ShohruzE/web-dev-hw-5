import React from "react";
import { Link, useNavigate } from "react-router";

import { Task } from "../types/Task";

type TasksProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const Tasks = ({ tasks, setTasks }: TasksProps) => {
  const navigate = useNavigate();

  const deleteTask = async (id: string) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/tasks/${id}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    console.log(data);
    setTasks(tasks.filter((task) => task._id !== id));
    navigate("/", { replace: true });
  };

  return (
    <>
      {tasks.map((task, index) => (
        <div
          key={index}
          className="flex justify-between items-center p-2 border-b"
        >
          <Link
            to={`/tasks/${task._id}`}
            className="text-blue-500 hover:underline"
          >
            {task.taskName}
          </Link>
          <div className="space-x-2">
            <button
              onClick={() => navigate(`/tasks/edit/${task._id}`)}
              className="bg-blue-500 text-white text-sm px-6 py-2 rounded-md"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTask(task._id)}
              className="bg-red-500 text-white text-sm px-6 py-2 rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Tasks;
