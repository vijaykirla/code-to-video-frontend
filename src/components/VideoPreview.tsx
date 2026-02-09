import React from "react";
import type { VideoState } from "../types";

interface VideoPreviewProps {
  videoState: VideoState;
  videoBlob: Blob | null;
}

const LoadingSkeleton: React.FC = () => (
  <div className="w-full">
    <div className="overflow-hidden shadow-2xl bg-gray-200 dark:bg-gray-700">
      <div className="aspect-video skeleton"></div>
    </div>
    <div className="mt-6 space-y-3">
      <div className="flex items-center justify-center gap-3">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-700 dark:text-gray-300 font-medium">
          Rendering your video...
        </p>
      </div>
      <div className="skeleton h-3 rounded-full w-3/4 mx-auto"></div>
      <div className="skeleton h-3 rounded-full w-1/2 mx-auto"></div>
    </div>
  </div>
);

const IdleState: React.FC = () => (
  <div className="w-full">
    <div className="overflow-hidden shadow-2xl bg-linear-to-br from-indigo-500 to-purple-600 aspect-video flex items-center justify-center">
      <div className="text-center text-white p-8">
        <h1 className="text-6xl font-bold mb-4">Code to Video</h1>
        <p className="text-xl opacity-90">Preview will appear here</p>
      </div>
    </div>
    <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-4">
      Edit the code and click "Generate Video" to render
    </p>
  </div>
);

export const VideoPreview: React.FC<VideoPreviewProps> = ({
  videoState,
  videoBlob,
}) => {
  const [videoUrl, setVideoUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (videoBlob) {
      const url = URL.createObjectURL(videoBlob);
      setVideoUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [videoBlob]);

  return (
    <>
      <div className="flex items-center justify-center min-h-162.5">
        {videoState === "loading" && <LoadingSkeleton />}

        {videoState === "idle" && <IdleState />}

        {videoState === "success" && videoUrl && (
          <div className="w-full">
            <div className="overflow-hidden shadow-2xl bg-black">
              <video src={videoUrl} controls className="w-full aspect-video" />
            </div>
          </div>
        )}

        {videoState === "error" && (
          <div className="w-full text-center">
            <div className="text-6xl mb-4">❌</div>
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              Failed to render video
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
              Please check your code and try again
            </p>
          </div>
        )}
      </div>
    </>
  );
};
