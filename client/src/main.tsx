import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Task from "./components/Task.tsx";
import EditTaskForm from "./components/EditTaskForm.tsx";
import CreateTaskForm from "./components/CreateTaskForm.tsx";

import { BrowserRouter, Routes, Route } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/tasks/:id" element={<Task />} />
        <Route path="/tasks/edit/:id" element={<EditTaskForm />} />
        <Route path="/tasks/new" element={<CreateTaskForm />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
