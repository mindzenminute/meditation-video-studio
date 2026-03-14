import React from 'react';
import { AbsoluteFill, Composition } from 'remotion';
import { BreathingCircle } from './components/BreathingCircle';

const BreathingPreview: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: '#0a1628' }}>
    <BreathingCircle startFrame={0} cycleDuration={8} inhaleText="Inspirez" exhaleText="Expirez" />
  </AbsoluteFill>
);

export const TestBreathingCircle = () => (
  <Composition
    id="TestBreathingCircle"
    component={BreathingPreview}
    durationInFrames={240}  // 8 secondes pour voir un cycle complet
    fps={30}
    width={1920}
    height={1080}
    defaultProps={{}}
  />
);
