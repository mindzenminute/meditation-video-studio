import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

export const IntroScene: React.FC<{
  titre: string;
  sousTitre?: string;
  instructeur?: string;
  couleurPrincipale?: string;
  couleurSecondaire?: string;
}> = ({
  titre,
  sousTitre,
  instructeur,
  couleurPrincipale = "#6B5CE7",
  couleurSecondaire = "#1a1a2e",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titreAnim = spring({
    frame: frame - 30,
    fps,
    config: { damping: 200, stiffness: 60, mass: 2 },
  });

  const sousTitreAnim = spring({
    frame: frame - 60,
    fps,
    config: { damping: 200, stiffness: 60, mass: 2 },
  });

  const instructeurAnim = spring({
    frame: frame - 90,
    fps,
    config: { damping: 200, stiffness: 60, mass: 2 },
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
        background: `linear-gradient(135deg, ${couleurSecondaire} 0%, ${couleurPrincipale}22 50%, ${couleurSecondaire} 100%)`,
      }}
    >
      <h1
        style={{
          color: "#FFFFFF",
          fontSize: 64,
          fontFamily: "Inter, sans-serif",
          fontWeight: 200,
          letterSpacing: 3,
          opacity: titreAnim,
          transform: `translateY(${interpolate(titreAnim, [0, 1], [30, 0])}px)`,
          textAlign: "center",
          margin: 0,
        }}
      >
        {titre}
      </h1>

      <div
        style={{
          width: interpolate(titreAnim, [0, 1], [0, 120]),
          height: 1,
          background: couleurPrincipale,
          margin: "30px 0",
          opacity: titreAnim,
        }}
      />

      {sousTitre && (
        <p
          style={{
            color: "#CCCCCC",
            fontSize: 28,
            fontFamily: "Inter, sans-serif",
            fontWeight: 300,
            opacity: sousTitreAnim,
            transform: `translateY(${interpolate(sousTitreAnim, [0, 1], [20, 0])}px)`,
            margin: 0,
          }}
        >
          {sousTitre}
        </p>
      )}

      {instructeur && (
        <p
          style={{
            color: "#999999",
            fontSize: 20,
            fontFamily: "Inter, sans-serif",
            fontWeight: 300,
            opacity: instructeurAnim,
            marginTop: 40,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Guidé par {instructeur}
        </p>
      )}
    </div>
  );
};
