import React from "react";

const NewFeature = ({ title, description, icon }) => {
  return (
    <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex-shrink-0 text-indigo-600 text-3xl">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
};

export default NewFeature;
