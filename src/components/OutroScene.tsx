import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

export const OutroScene: React.FC<{
  couleurPrincipale?: string;
  couleurSecondaire?: string;
  instructeur?: string;
}> = ({
  couleurPrincipale = "#6B5CE7",
  couleurSecondaire = "#1a1a2e",
  instructeur,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const apparition = spring({
    frame,
    fps,
    config: { damping: 200, stiffness: 40, mass: 3 },
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: `linear-gradient(135deg, ${couleurSecondaire}, ${couleurPrincipale}15)`,
      }}
    >
      <div style={{ fontSize: 72, opacity: apparition, marginBottom: 30 }}>
        🪷
      </div>

      <h2
        style={{
          color: "#FFFFFF",
          fontSize: 48,
          fontFamily: "Inter, sans-serif",
          fontWeight: 200,
          opacity: apparition,
          transform: `translateY(${interpolate(apparition, [0, 1], [20, 0])}px)`,
        }}
      >
        Namasté
      </h2>

      <p
        style={{
          color: "#888",
          fontSize: 22,
          fontFamily: "Inter, sans-serif",
          fontWeight: 300,
          opacity: interpolate(apparition, [0, 0.5, 1], [0, 0, 1]),
          marginTop: 20,
        }}
      >
        Merci d&apos;avoir pris ce moment pour vous
      </p>
    </div>
  );
};
