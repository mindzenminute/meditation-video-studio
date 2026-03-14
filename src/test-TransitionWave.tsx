import React from 'react';
import { AbsoluteFill, Composition } from 'remotion';
import { TransitionWave } from './components/TransitionWave';

const WavePreview: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: '#0a1628' }}>
    <TransitionWave duration={30} direction="up" color="#1a1a3a" />
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#fff', fontFamily: 'sans-serif', fontSize: 32 }}>
      🌊 Transition Test
    </div>
  </AbsoluteFill>
);

export const TestTransitionWave = () => (
  <Composition
    id="TestTransitionWave"
    component={WavePreview}
    durationInFrames={60}
    fps={30}
    width={1920}
    height={1080}
    defaultProps={{}}
  />
);
