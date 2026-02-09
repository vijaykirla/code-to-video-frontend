export interface RenderRequest {
  tsx: string;
  filename: string;
}

export interface RenderResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface CompositionConfig {
  id: string;
  durationInSeconds: number;
  fps: number;
  width: number;
  height: number;
}

export type ToastType = "success" | "error" | "info";

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message: string;
}

export type VideoState = "idle" | "loading" | "success" | "error";
