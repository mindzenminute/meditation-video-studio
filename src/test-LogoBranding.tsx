import React from 'react';
import { Composition } from 'remotion';
import { LogoBranding } from './components/LogoBranding';

const LogoPreview: React.FC = () => (
  <LogoBranding
    title="MindZen Minute"
    subtitle="Méditations guidées"
    startFrame={0}
    entranceDuration={90}
  />
);

export const TestLogoBranding = () => (
  <Composition
    id="TestLogoBranding"
    component={LogoPreview}
    durationInFrames={150}
    fps={30}
    width={1920}
    height={1080}
    defaultProps={{}}
  />
);
