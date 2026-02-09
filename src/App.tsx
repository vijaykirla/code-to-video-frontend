import { useState, useCallback, useEffect } from "react";
import { Header } from "./components/Header";
import { EditorPanel } from "./components/EditorPanel";
import { VideoPreview } from "./components/VideoPreview";
import { Toast } from "./components/Toast";
import { renderVideo } from "./utils/api";
import { DEFAULT_TSX_CODE } from "./utils/constants";
import type { Toast as ToastType, VideoState } from "./types";

function App() {
  const [tsxCode, setTsxCode] = useState(DEFAULT_TSX_CODE);
  const [videoState, setVideoState] = useState<VideoState>("idle");
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const [statusMessage, setStatusMessage] = useState<
    { text: string; type: "info" | "success" | "error" } | undefined
  >();
  const generateFilename = () => {
    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, "-")
      .slice(0, 19);
    return `video_${timestamp}.mp4`;
  };
  const addToast = useCallback(
    (type: ToastType["type"], title: string, message: string) => {
      const toast: ToastType = {
        id: Date.now().toString(),
        type,
        title,
        message,
      };
      setToasts((prev) => [...prev, toast]);
    },
    [],
  );

  // Remove toast
  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  // Handle code clear
  const handleClear = useCallback(() => {
    setTsxCode("");
    addToast("info", "Cleared", "Editor cleared");
  }, [addToast]);

  // Handle render
  const handleRender = useCallback(async () => {
    if (!tsxCode.trim()) {
      setStatusMessage({
        text: "Please enter TSX code to render",
        type: "error",
      });
      return;
    }
    const filename = generateFilename();
    setVideoState("loading");
    setStatusMessage({ text: "Rendering your video...", type: "info" });

    try {
      const blob = await renderVideo({ tsx: tsxCode, filename });
      setVideoBlob(blob);
      setVideoState("success");
      setStatusMessage({
        text: "Video rendered successfully! 🎉",
        type: "success",
      });
      addToast("success", "Success!", "Your video is ready");
    } catch (error) {
      setVideoState("error");
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setStatusMessage({ text: `Error: ${errorMessage}`, type: "error" });
      addToast("error", "Render Failed", errorMessage);
    }
  }, [tsxCode, addToast]);

  // Keyboard shortcut for render
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "Enter") {
        e.preventDefault();
        handleRender();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRender]);

  return (
    // <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white"></div>
    <div className="min-h-screen gradient-bg bg-gray-900">
      <Header />
      <main className="max-w-400 mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EditorPanel
            tsxCode={tsxCode}
            onTsxCodeChange={setTsxCode}
            onRender={handleRender}
            videoState={videoState}
            onClear={handleClear}
            statusMessage={statusMessage}
          />
          <div className="overflow-hidden animate-slide-up p-6">
            <VideoPreview videoState={videoState} videoBlob={videoBlob} />
          </div>
        </div>
      </main>
      <div className="fixed top-6 right-6 z-50 space-y-3">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onDismiss={removeToast} />
        ))}
      </div>
    </div>
  );
}

export default App;
