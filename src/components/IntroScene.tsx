// src/components/IntroScene.tsx
// ============================================================
// Écran titre avec le nom de la méditation
// Apparaît en douceur pendant les premières secondes
// ============================================================

import React from "react";
import {
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

interface IntroSceneProps {
  titre: string;
  sousTitre?: string;
  instructeur?: string;
  couleurPrincipale?: string;
  couleurSecondaire?: string;
}

export const IntroScene: React.FC<IntroSceneProps> = ({
  titre,
  sousTitre,
  instructeur,
  couleurPrincipale = "#6B5CE7",
  couleurSecondaire = "#1a1a2e",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation du titre avec spring doux
  const titreAnimation = spring({
    frame: frame - 30, // Commence après 1 seconde
    fps,
    config: { damping: 200, stiffness: 60, mass: 2 },
  });

  // Animation du sous-titre (apparaît après le titre)
  const sousTitreAnimation = spring({
    frame: frame - 60, // Commence après 2 secondes
    fps,
    config: { damping: 200, stiffness: 60, mass: 2 },
  });

  // Animation de l'instructeur
  const instructeurAnimation = spring({
    frame: frame - 90, // Commence après 3 secondes
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
      {/* Titre principal */}
      <h1
        style={{
          color: "#FFFFFF",
          fontSize: 64,
          fontFamily: "Inter, sans-serif",
          fontWeight: 200,
          letterSpacing: 3,
          opacity: titreAnimation,
          transform: `translateY(${interpolate(titreAnimation, [0, 1], [30, 0])}px)`,
          textAlign: "center",
          margin: 0,
        }}
      >
        {titre}
      </h1>

      {/* Ligne décorative */}
      <div
        style={{
          width: interpolate(titreAnimation, [0, 1], [0, 120]),
          height: 1,
          background: couleurPrincipale,
          margin: "30px 0",
          opacity: titreAnimation,
        }}
      />

      {/* Sous-titre */}
      {sousTitre && (
        <p
          style={{
            color: "#CCCCCC",
            fontSize: 28,
            fontFamily: "Inter, sans-serif",
            fontWeight: 300,
            opacity: sousTitreAnimation,
            transform: `translateY(${interpolate(sousTitreAnimation, [0, 1], [20, 0])}px)`,
            margin: 0,
          }}
        >
          {sousTitre}
        </p>
      )}

      {/* Nom de l'instructeur */}
      {instructeur && (
        <p
          style={{
            color: "#999999",
            fontSize: 20,
            fontFamily: "Inter, sans-serif",
            fontWeight: 300,
            opacity: instructeurAnimation,
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
