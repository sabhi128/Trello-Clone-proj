import React, { useState, useEffect } from "react";

const List = ({ title, initialTasks }) => {
  const savedTasks = JSON.parse(localStorage.getItem(title)) || initialTasks;

  const [tasks, setTasks] = useState(
    savedTasks.map((task) =>
      typeof task === "string" ? { text: task, isEditing: false } : { ...task, isEditing: false }
    )
  );
  const [newTask, setNewTask] = useState("");
  const [deletedTask, setDeletedTask] = useState(null); // for undo
  const [showUndo, setShowUndo] = useState(false);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem(title, JSON.stringify(tasks.map((t) => ({ text: t.text }))));
  }, [tasks, title]);

  // Add new task
  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { text: newTask, isEditing: false }]);
    setNewTask("");
  };

  // Edit / Save
  const handleEditTask = (index) => {
    setTasks(tasks.map((t, i) => i === index ? { ...t, isEditing: true } : t));
  };
  const handleSaveTask = (index, newText) => {
    setTasks(tasks.map((t, i) => i === index ? { text: newText, isEditing: false } : t));
  };

  // Delete with undo
  const handleDeleteTask = (index) => {
    const taskToDelete = tasks[index];
    setDeletedTask({ task: taskToDelete, index });
    setTasks(tasks.filter((_, i) => i !== index));
    setShowUndo(true);

    // Hide undo after 5 seconds
    setTimeout(() => setShowUndo(false), 5000);
  };

  const handleUndo = () => {
    if (deletedTask) {
      const newTasks = [...tasks];
      newTasks.splice(deletedTask.index, 0, deletedTask.task);
      setTasks(newTasks);
      setDeletedTask(null);
      setShowUndo(false);
    }
  };

  return (
    <div className="bg-white/90 rounded-xl shadow-lg p-4 w-72 max-h-[500px] flex flex-col transition duration-300 hover:scale-105 hover:shadow-2xl">
      <h2 className="text-xl font-bold mb-3 text-gray-800">{title}</h2>

      <ul className="space-y-2 overflow-y-auto pr-2 flex-1">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`bg-gray-600 p-2 rounded-lg shadow-sm flex justify-between items-center transition duration-200
              ${task.isEditing ? "bg-gray-300" : ""}
              ${tasks.some((t) => t.isEditing) && !task.isEditing ? "opacity-50" : ""}`}
          >
            {task.isEditing ? (
              <input
                type="text"
                value={task.text}
                autoFocus
                onFocus={(e) => e.target.select()}
                onChange={(e) => {
                  const newText = e.target.value;
                  setTasks(tasks.map((t, i) => i === index ? { ...t, text: newText } : t));
                }}
                className="flex-1 p-1 rounded-md text-black border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            ) : (
              <span>{task.text}</span>
            )}

            <div className="flex gap-1">
              <button
                onClick={() => task.isEditing ? handleSaveTask(index, task.text) : handleEditTask(index)}
                className="w-8 h-8 flex items-center justify-center rounded bg-gray-200 hover:bg-gray-300 text-white font-bold"
              >
                {task.isEditing ? "s" : "e"}
              </button>

              <button
                onClick={() => handleDeleteTask(index)}
                className="w-8 h-8 flex items-center justify-center rounded bg-gray-200 hover:bg-gray-300 text-white font-bold"
              >
                d
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-3 flex gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a task..."
          className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200 text-black"
        />
        <button
          onClick={handleAddTask}
          className="px-3 py-2 rounded-lg hover:bg-gray-200 transition duration-200"
        >
          +
        </button>
      </div>

      {showUndo && (
  <div className="fixed bottom-4 left-4 bg-gray-800 text-white px-4 py-2 rounded flex items-center gap-4 shadow-lg z-50">
    <span>Task deleted</span>
    <button
      onClick={handleUndo}
      className="bg-gray-200 text-white px-2 py-1 rounded hover:bg-gray-300"
    >
      Undo
    </button>
  </div>
)}

    </div>
  );
};

export default List;
