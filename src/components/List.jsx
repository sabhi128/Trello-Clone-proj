import React, { useState, useEffect } from "react";

const List = ({ title, initialTasks, onDelete }) => {
  const savedTasks = JSON.parse(localStorage.getItem(title)) || initialTasks;

  const [tasks, setTasks] = useState(
    savedTasks.map((task) =>
      typeof task === "string" ? { text: task, isEditing: false } : { ...task, isEditing: false }
    )
  );

  const [newTask, setNewTask] = useState("");

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem(title, JSON.stringify(tasks.map((t) => ({ text: t.text }))));
  }, [tasks, title]);

  // Add new task
  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    setTasks([
      ...tasks,
      { text: newTask, label: newLabel, dueDate: newDueDate, isEditing: false },
    ]);
    setNewTask("");
    setNewLabel("Medium");
    setNewDueDate("");
  };

  // Edit / Save
  const handleEditTask = (index) => {
    setTasks(tasks.map((t, i) => (i === index ? { ...t, isEditing: true } : t)));
  };
  const handleSaveTask = (index, newText) => {
    setTasks(tasks.map((t, i) => i === index ? { text: newText, isEditing: false } : t));
  };

  // Delete
  const handleDeleteTask = (index) => {
    const taskToDelete = tasks[index];
    setTasks(tasks.filter((_, i) => i !== index));
    if (onDelete) {
      onDelete({ task: taskToDelete, index, listTitle: title });
    }
  };

  // Listen for undo events
  useEffect(() => {
    const handleUndoEvent = (e) => {
      const deletedTask = e.detail;
      if (deletedTask.listTitle === title) {
        const newTasks = [...tasks];
        newTasks.splice(deletedTask.index, 0, deletedTask.task);
        setTasks(newTasks);
      }
    };
    window.addEventListener("undoTask", handleUndoEvent);
    return () => window.removeEventListener("undoTask", handleUndoEvent);
  }, [tasks, title]);

  // --- DnD: when another list drops a task, remove it here if this was the source
  useEffect(() => {
    const handleTaskMoved = (e) => {
      const data = e.detail;
      if (!data || data.fromTitle !== title) return;

      setTasks((prev) => {
        // Prefer removing by index+text (safer). Fallback to first match by text.
        if (
          typeof data.index === "number" &&
          data.index >= 0 &&
          data.index < prev.length &&
          prev[data.index]?.text === data.task?.text
        ) {
          return prev.filter((_, i) => i !== data.index);
        }
        const removeIdx = prev.findIndex((t) => t.text === data.task?.text);
        if (removeIdx !== -1) {
          return prev.filter((_, i) => i !== removeIdx);
        }
        return prev;
      });
    };

    window.addEventListener("taskMoved", handleTaskMoved);
    return () => window.removeEventListener("taskMoved", handleTaskMoved);
  }, [title]);

  // --- DnD: allow dropping into this list
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setIsOver(true);
  };
  const handleDragLeave = () => setIsOver(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsOver(false);

    let raw = e.dataTransfer.getData("text/plain");
    if (!raw) return;

    try {
      const data = JSON.parse(raw);
      if (!data?.task || !data?.fromTitle) return;

      // If dropped back onto the same list, do nothing
      if (data.fromTitle === title) return;

      // Add to this list
      setTasks((prev) => [...prev, { text: data.task.text, isEditing: false }]);

      // Tell the source list to remove it
      window.dispatchEvent(new CustomEvent("taskMoved", { detail: data }));
    } catch {
      // ignore invalid payloads
    }
  };

  return (
    <div className="bg-white/90 rounded-xl shadow-lg p-4 w-72 max-h-[500px] flex flex-col transition duration-300 hover:scale-105 hover:shadow-2xl">
      <h2 className="text-xl font-bold mb-3 text-gray-800">{title}</h2>

      {/* Task list */}
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

              {/* Due Date */}
              <div className="flex items-center gap-2 ml-2">


                {/* Edit / Save */}
                <img
                  src={task.isEditing ? "/tick.png" : "/edit.png"}
                  alt={task.isEditing ? "Save" : "Edit"}
                  className="w-5 h-5 cursor-pointer filter invert-0 hover:invert transition"
                  onClick={() =>
                    task.isEditing
                      ? handleSaveTask(index, task.text)
                      : handleEditTask(index)
                  }
                />

              <img
                src="/delete.png"
                alt="Delete"
                className="w-5 h-5 cursor-pointer filter invert-0 hover:invert transition"
                onClick={() => handleDeleteTask(index)}
              />

            </div>
          </li>
        ))}
      </ul>

      {/* New task row */}
      <div className="mt-3 flex items-center gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a task..."
          className="flex-1 min-w-0 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200 text-black"
        />

        {/* Priority dropdown */}
        <select
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          className="h-10 w-22 flex-shrink-0 px-2 rounded-lg bg-gray-700 text-white border border-gray-700 text-sm appearance-none pr-6"
          style={{
            backgroundImage: "url('/dropdown.svg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.5rem center",
            backgroundSize: "14px",
          }}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        {/* Calendar icon (date picker trigger) */}
        <div className="relative h-10 w-10 bg-gray-700 flex items-center justify-center rounded-lg hover:bg-gray-600 cursor-pointer">
          <img src="/calendar.png" alt="Calendar" className="w-5 h-5 invert pointer-events-none" />

          {/* Transparent input over the icon */}
          <input
            type="date"
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>

      </div>

      {/* Full-width Add button */}
      <button
        onClick={handleAddTask}
        className="mt-2 w-full h-10 flex items-center justify-center rounded-lg bg-gray-700 text-white hover:bg-gray-800 transition"
      >
        Add
      </button>
    </div>
  );
};

export default List;
