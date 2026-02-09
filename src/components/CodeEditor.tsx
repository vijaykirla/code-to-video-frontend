import React from "react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;

  onClear: () => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  onClear,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Tab key support
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      target.value =
        target.value.substring(0, start) + "  " + target.value.substring(end);
      target.selectionStart = target.selectionEnd = start + 2;
      onChange(target.value);
    }
  };

  return (
    <div className="p-6 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">TSX Code Editor</h2>
        <div className="flex gap-2">
          <button
            onClick={onClear}
            className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
          >
            🗑️ Clear
          </button>
        </div>
      </div>

      <div className="relative rounded-xl overflow-hidden shadow-lg">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="code-editor w-full h-125 p-6 text-sm text-gray-100 leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-900"
          placeholder="Paste your TSX code here... (Ctrl+Enter to render)"
          spellCheck={false}
        />
      </div>
    </div>
  );
};
