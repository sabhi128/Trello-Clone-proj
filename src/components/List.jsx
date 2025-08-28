import React, { useState } from "react";

const List = ({ title, initialTasks }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, newTask]);
    setNewTask("");
  };

  return (
    <div className="bg-white/90 rounded-xl shadow-lg p-4 w-72 max-h-[500px] flex flex-col transition duration-300 hover:scale-105 hover:shadow-2xl">
      {/* Title */}
      <h2 className="text-xl font-bold mb-3 text-gray-800">{title}</h2>

      {/* Task List with scroll */}
      <ul className="space-y-2 overflow-y-auto pr-2 flex-1">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="bg-gray-600 p-2 rounded-lg shadow-sm hover:bg-blue-300 transition duration-200"
          >
            {task}
          </li>
        ))}
      </ul>

      {/* Add Task Input */}
      <div className="mt-3 flex gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a task..."
          className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 text-black"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition duration-200 active:scale-95"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default List;
