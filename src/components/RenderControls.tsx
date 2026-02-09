import React from "react";

interface RenderControlsProps {
  onRender: () => void;
  isRendering: boolean;
}

export const RenderControls: React.FC<RenderControlsProps> = ({
  onRender,
  isRendering,
}) => {
  return (
    <div className="p-6 gradient-bg bg-gray-900">
      <button
        onClick={onRender}
        disabled={isRendering}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isRendering ? "⏳ Rendering..." : "🎥 Generate Video"}
      </button>
    </div>
  );
};
