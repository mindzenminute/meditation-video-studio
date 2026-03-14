import React, { memo } from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from 'remotion';  // ← useVideoConfig SUPPRIMÉ
import { LogoBranding, LogoBrandingProps } from './LogoBranding';
import { CallToAction, CallToActionProps } from './CallToAction';

export type OutroSceneProps = {
  branding: Omit<LogoBrandingProps, 'startFrame'>;
  cta: CallToActionProps;
  sceneStartFrame: number;
  fadeOutStartFrame?: number;
};

/**
 * OutroScene — Scène de clôture (9:30–10min / 17100–18000 frames)
 */
export const OutroScene: React.FC<OutroSceneProps> = memo(({
  branding,
  cta,
  sceneStartFrame,
  fadeOutStartFrame = 17700,
}) => {
  const ctaStartFrame = 0;
  const brandingStartFrame = 150;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a1628' }}>
      <Sequence from={sceneStartFrame + ctaStartFrame}>
        <CallToAction {...cta} startFrame={0} />
      </Sequence>
      <Sequence from={sceneStartFrame + brandingStartFrame}>
        <LogoBranding {...branding} startFrame={0} finalOpacity={0.9} />
      </Sequence>
      <AbsoluteFill
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 20%, rgba(201, 169, 97, 0.04) 0%, transparent 50%),
            radial-gradient(circle at 30% 80%, rgba(150, 130, 200, 0.03) 0%, transparent 60%)
          `,
          opacity: 0.5,
        }}
      />
      <Sequence from={fadeOutStartFrame}>
        <FinalFade />
      </Sequence>
    </AbsoluteFill>
  );
});

const FinalFade: React.FC = memo(() => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, 90], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ backgroundColor: '#000000', opacity: progress }} />;
});

OutroScene.displayName = 'OutroScene';
export default OutroScene;
