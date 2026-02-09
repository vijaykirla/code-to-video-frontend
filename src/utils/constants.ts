export const DEFAULT_TSX_CODE = `import { AbsoluteFill } from 'remotion';

export const compositionConfig = {
  id: 'MyVideo',
  durationInSeconds: 3,
  fps: 30,
  width: 1920,
  height: 1080,
};

export const MyVideo = () => (
  <AbsoluteFill
    style={{
      backgroundColor: '#4F46E5',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <h1 style={{ color: 'white', fontSize: 120 }}>
      Code to Video
    </h1>
  </AbsoluteFill>
);`;
