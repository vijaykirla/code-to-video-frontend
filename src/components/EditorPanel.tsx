import React from "react";
import { CodeEditor } from "./CodeEditor";
import { RenderControls } from "./RenderControls";
import type { VideoState } from "../types";

interface EditorPanelProps {
  tsxCode: string;
  onTsxCodeChange: (value: string) => void;
  onRender: () => void;
  videoState: VideoState;
  onClear: () => void;
  statusMessage?: {
    text: string;
    type: "info" | "success" | "error";
  };
}

export const EditorPanel: React.FC<EditorPanelProps> = ({
  tsxCode,
  onTsxCodeChange,
  onRender,
  videoState,
  onClear,
}) => {
  return (
    <div className="overflow-hidden animate-slide-up">
      <CodeEditor
        value={tsxCode}
        onChange={onTsxCodeChange}
        onClear={onClear}
      />
      <RenderControls
        onRender={onRender}
        isRendering={videoState === "loading"}
      />
    </div>
  );
};
