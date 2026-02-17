import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

export const BreathingCircle: React.FC<{
  cycleDureeFrames?: number;
  couleur?: string;
  tailleMax?: number;
}> = ({
  cycleDureeFrames = 240,
  couleur = "rgba(107, 92, 231, 0.3)",
  tailleMax = 300,
}) => {
  const frame = useCurrentFrame();
  const positionDansCycle = (frame % cycleDureeFrames) / cycleDureeFrames;

  const echelle = interpolate(
    Math.sin(positionDansCycle * 2 * Math.PI),
    [-1, 1],
    [0.6, 1]
  );

  const opacite = interpolate(
    Math.sin(positionDansCycle * 2 * Math.PI),
    [-1, 1],
    [0.2, 0.5]
  );

  const estInspiration = positionDansCycle < 0.5;
  const texteInstruction = estInspiration ? "Inspirez" : "Expirez";

  const texteOpacite = interpolate(
    positionDansCycle < 0.5
      ? positionDansCycle * 2
      : (positionDansCycle - 0.5) * 2,
    [0, 0.1, 0.9, 1],
    [0, 1, 1, 0]
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          width: tailleMax,
          height: tailleMax,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${couleur}, transparent)`,
          transform: `scale(${echelle})`,
          opacity: opacite,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: tailleMax * 0.4,
          height: tailleMax * 0.4,
          borderRadius: "50%",
          background: couleur.replace("0.3", "0.6"),
          transform: `scale(${echelle})`,
          opacity: opacite + 0.2,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -50,
          fontSize: 28,
          color: "white",
          fontFamily: "Inter, sans-serif",
          fontWeight: 300,
          letterSpacing: 4,
          textTransform: "uppercase",
          opacity: texteOpacite,
        }}
      >
        {texteInstruction}
      </div>
    </div>
  );
};
