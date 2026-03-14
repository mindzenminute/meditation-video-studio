import React, { memo } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

export type CallToActionProps = {
  title: string;
  message: string;
  actionText: string;
  startFrame?: number;
  entranceDuration?: number;
};

/**
 * CallToAction — Composant réutilisable pour le message de fin
 * Utilisé dans OutroScene pour l'appel à l'action
 * Design minimaliste avec animation douce en cascade
 */
export const CallToAction: React.FC<CallToActionProps> = memo(({
  title,
  message,
  actionText,
  startFrame = 0,
  entranceDuration = 90,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;
  const progress = interpolate(relativeFrame, [0, entranceDuration], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  
  const titleOpacity = interpolate(progress, [0, 0.4], [0, 1], { extrapolateLeft: 'clamp' });
  const messageOpacity = interpolate(progress, [0.2, 0.6], [0, 1], { extrapolateLeft: 'clamp' });
  const actionOpacity = interpolate(progress, [0.4, 0.8], [0, 1], { extrapolateLeft: 'clamp' });
  
  const titleTranslateY = interpolate(progress, [0, 0.4], [30, 0], { extrapolateLeft: 'clamp' });
  const messageTranslateY = interpolate(progress, [0.2, 0.6], [20, 0], { extrapolateLeft: 'clamp' });
  const actionTranslateY = interpolate(progress, [0.4, 0.8], [15, 0], { extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 80px', textAlign: 'center' }}>
      <h2
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: 42,
          fontWeight: 400,
          color: '#ffffff',
          margin: '0 0 20px 0',
          opacity: titleOpacity,
          transform: `translateY(${titleTranslateY}px)`,
          letterSpacing: '0.02em',
          textShadow: '0 3px 20px rgba(0, 0, 0, 0.4)',
        }}
      >
        {title}
      </h2>
      <p
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: 24,
          fontWeight: 300,
          color: '#c0c0e0',
          margin: '0 0 40px 0',
          opacity: messageOpacity,
          transform: `translateY(${messageTranslateY}px)`,
          lineHeight: 1.5,
          maxWidth: 800,
        }}
      >
        {message}
      </p>
      <div style={{ opacity: actionOpacity, transform: `translateY(${actionTranslateY}px)` }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            padding: '16px 32px',
            background: 'linear-gradient(135deg, #c9a961 0%, #b89552 100%)',
            borderRadius: 50,
            boxShadow: '0 4px 20px rgba(201, 169, 97, 0.3)',
          }}
        >
          <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 18, fontWeight: 500, color: '#0a1628', letterSpacing: '0.05em' }}>
            {actionText}
          </span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0a1628" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
      <div style={{ width: 200, height: 1, background: 'linear-gradient(90deg, transparent, #c9a96180, transparent)', marginTop: 40, opacity: 0.5 }} />
    </AbsoluteFill>
  );
});

CallToAction.displayName = 'CallToAction';
export default CallToAction;
