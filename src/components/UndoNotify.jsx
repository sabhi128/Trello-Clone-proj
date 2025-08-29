import React from "react";

const UndoNotify = ({ show, message, onUndo }) => {
  if (!show) return null;

  return (
    <div
      className="fixed bottom-4 left-4 z-[9999] pointer-events-auto"
    >
      <div className="bg-gray-700 rounded-lg px-4 py-2 flex items-center gap-3 shadow-lg">
        <span className="text-white font-medium">{message}</span>
        <button
          onClick={onUndo}
          className="px-3 py-1 rounded bg-gray-800 text-white hover:bg-gray-700 transition"
        >
          Undo
        </button>
      </div>
    </div>
  );
};

export default UndoNotify;
