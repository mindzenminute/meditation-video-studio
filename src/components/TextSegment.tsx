import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

export const TextSegment: React.FC<{
  texte: string;
  debutFrame: number;
  dureeFrames: number;
  couleur?: string;
}> = ({ texte, debutFrame, dureeFrames, couleur = "#FFFFFF" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < debutFrame || frame > debutFrame + dureeFrames) {
    return null;
  }

  const frameRelative = frame - debutFrame;

  const entree = spring({
    frame: frameRelative,
    fps,
    config: { damping: 200, stiffness: 80, mass: 1.5 },
  });

  const sortie = interpolate(
    frameRelative,
    [dureeFrames - 30, dureeFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacite = Math.min(entree, sortie);
  const translateY = interpolate(entree, [0, 1], [20, 0]);

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 120px",
        opacity: opacite,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <p
        style={{
          color: couleur,
          fontSize: 42,
          fontFamily: "Inter, sans-serif",
          fontWeight: 300,
          lineHeight: 1.8,
          textAlign: "center",
          letterSpacing: 1,
          textShadow: "0 2px 20px rgba(0,0,0,0.5)",
          maxWidth: 900,
        }}
      >
        {texte}
      </p>
    </div>
  );
};
