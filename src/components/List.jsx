import React, { useState } from "react";

const List = ({ title = "My Tasks", initialTasks = [] }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    const value = newTask.trim();
    if (!value) return;
    setTasks((prev) => [...prev, value]);
    setNewTask("");
  };

  const handleDeleteTask = (index) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAddTask();
  };

  return (
    <div className="relative group w-80">
      {/* subtle gradient border glow */}
      <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-blue-500/40 via-fuchsia-500/40 to-emerald-500/40 blur opacity-60 transition group-hover:opacity-100" />
      
      <div className="relative bg-white/80 backdrop-blur rounded-2xl shadow-xl border border-gray-100 p-5 max-h-[520px] flex flex-col">
        {/* Title */}
        <h2 className="text-lg font-semibold tracking-tight text-gray-900 mb-4">
          {title}
        </h2>

        {/* Task List */}
        <ul className="space-y-2 overflow-y-auto pr-1 flex-1">
          {tasks.length === 0 ? (
            <li className="text-sm text-gray-500 py-8 text-center select-none">
              No tasks yet — add one below ✨
            </li>
          ) : (
            tasks.map((task, index) => (
              <li
                key={index}
                className="group/item flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-2.5 shadow-sm hover:shadow-md hover:border-gray-300 transition"
              >
                <span className="h-2 w-2 rounded-full bg-blue-500/80 shrink-0" />
                <span className="text-sm text-gray-800 flex-1 break-words">
                  {task}
                </span>
                <button
  type="button"
  onClick={() => handleDeleteTask(index)}
  className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-red-500 text-white hover:bg-red-600 hover:scale-105 active:scale-95 transition"
  aria-label="Delete task"
  title="Delete"
>
  ✕
</button>

              </li>
            ))
          )}
        </ul>

        {/* Add Task */}
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a task…"
            className="flex-1 text-sm bg-white border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
          />
          <button
            type="button"
            onClick={handleAddTask}
            className="px-4 py-2 rounded-xl text-white text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-95 shadow-md"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default List;
