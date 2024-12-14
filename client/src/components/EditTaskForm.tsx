import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router";

const EditTaskForm = () => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/tasks/${id}`
      );
      const data = await response.json();
      console.log(data);
      setTaskName(data.taskName);
      setDescription(data.description);
    };
    fetchTask();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = { taskName, description };

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/tasks/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      }
    );

    if (response.ok) {
      navigate("/");
    } else {
      console.error("Failed to create task");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4">
      <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Home
      </Link>
      <h1 className="text-3xl font-bold">Edit Task</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[400px]">
        <label className="flex justify-center flex-col">
          Task Name:
          <input
            type="text"
            name="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="border border-gray-400 rounded-md p-2"
          />
        </label>
        <label className="flex justify-center flex-col">
          Description:
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-400 rounded-md p-2 h-24"
          />
        </label>
        <button type="submit" className="bg-blue-500 rounded-md p-2 text-white">
          Edit Task
        </button>
      </form>
    </div>
  );
};

export default EditTaskForm;
