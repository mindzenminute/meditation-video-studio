// src/components/TransitionWave.tsx
// ============================================================
// Transition visuelle douce entre les scènes
// Simule une vague de lumière qui traverse l'écran
// ============================================================

import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface TransitionWaveProps {
  dureeFrames?: number;
  couleur?: string;
}

export const TransitionWave: React.FC<TransitionWaveProps> = ({
  dureeFrames = 30,
  couleur = "rgba(107, 92, 231, 0.15)",
}) => {
  const frame = useCurrentFrame();

  const progression = interpolate(frame, [0, dureeFrames], [0, 1], {
    extrapolateRight: "clamp",
  });

  const opacite = interpolate(
    progression,
    [0, 0.3, 0.7, 1],
    [0, 0.8, 0.8, 0],
  );

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: `radial-gradient(ellipse at ${progression * 100}% 50%, ${couleur}, transparent 70%)`,
        opacity: opacite,
        pointerEvents: "none",
      }}
    />
  );
};
