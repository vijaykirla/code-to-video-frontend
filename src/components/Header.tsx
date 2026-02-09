import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="pt-8 pb-6">
      <div className="max-w-400 mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center text-2xl">
              🎬
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Video Renderer</h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
