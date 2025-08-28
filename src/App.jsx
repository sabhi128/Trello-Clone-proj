import React from "react";
import List from "./components/List";

const App = () => {
  return (
    <div
      className="h-screen w-screen bg-cover bg-center p-6 flex items-start gap-6 relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=1350&q=80')",
      }}
    >
      <List title="To Do" initialTasks={["Task 1", "Task 2"]} />
      <List title="In Progress" initialTasks={["Task 3"]} />
      <List title="Done" initialTasks={["Task 4", "Task 5"]} />

    </div>
  );
};

export default App;
