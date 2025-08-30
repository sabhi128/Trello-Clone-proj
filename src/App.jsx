// App.jsx
import React, { useState } from "react";
import List from "./components/List";
import UndoNotify from "./components/UndoNotify";
import Navbar from "./components/Navbar";

const App = () => {
  const [deletedTask, setDeletedTask] = useState(null);
  const [showUndo, setShowUndo] = useState(false);

  // Handle deletion from lists
  const handleDelete = (taskInfo) => {
    setDeletedTask(taskInfo);
    setShowUndo(true);

    // Hide undo after 5 seconds
    setTimeout(() => setShowUndo(false), 5000);
  };

  // Handle undo action
  const handleUndo = () => {
    if (!deletedTask) return;

    // Dispatch a custom event to let List know about undo
    const event = new CustomEvent("undoTask", { detail: deletedTask });
    window.dispatchEvent(event);

    setDeletedTask(null);
    setShowUndo(false);
  };

  return (
    <>
          <Navbar />

      <div
        className="h-screen w-screen bg-cover bg-center p-6 
             flex flex-col md:flex-row md:overflow-x-auto gap-6 pt-30"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=1350&q=80')",
        }}
      >
        {/* Lists */}
        <List title="To Do" initialTasks={["Task 1", "Task 2"]} onDelete={handleDelete} />
        <List title="In Progress" initialTasks={["Task 3"]} onDelete={handleDelete} />
        <List title="Done" initialTasks={["Task 4", "Task 5"]} onDelete={handleDelete} />
      </div>

      {/* Undo notification fixed at bottom-left */}
      <UndoNotify show={showUndo} message="Task deleted" onUndo={handleUndo} />
    </>
  );
};

export default App;
