// src/components/TextSegment.tsx
// ============================================================
// Affiche un texte de méditation avec un fondu d'entrée/sortie
// doux, adapté à une lecture calme et posée
// ============================================================

import React from "react";
import {
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

interface TextSegmentProps {
  texte: string;
  debutFrame: number;
  dureeFrames: number;
  couleur?: string;
}

export const TextSegment: React.FC<TextSegmentProps> = ({
  texte,
  debutFrame,
  dureeFrames,
  couleur = "#FFFFFF",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // On ne rend rien si on n'est pas dans la plage de temps
  if (frame < debutFrame || frame > debutFrame + dureeFrames) {
    return null;
  }

  // Frame relative (0 = début de ce segment)
  const frameRelative = frame - debutFrame;

  // Animation d'entrée avec spring (rebond naturel)
  const entree = spring({
    frame: frameRelative,
    fps,
    config: {
      damping: 200, // Très amorti = mouvement doux, pas de rebond
      stiffness: 80, // Souple = mouvement lent et gracieux
      mass: 1.5, // Un peu lourd = mouvement majestueux
    },
  });

  // Animation de sortie (fondu sur les 30 dernières frames = 1 seconde)
  const sortie = interpolate(
    frameRelative,
    [dureeFrames - 30, dureeFrames], // Les 30 dernières frames
    [1, 0], // De visible à invisible
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // L'opacité combine l'entrée et la sortie
  const opacite = Math.min(entree, sortie);

  // Léger mouvement vers le haut à l'entrée (5 pixels)
  const translateY = interpolate(entree, [0, 1], [20, 0]);

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 120px", // Marges latérales généreuses
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
          // Ombre douce pour lisibilité sur fond sombre
          textShadow: "0 2px 20px rgba(0,0,0,0.5)",
          maxWidth: 900,
        }}
      >
        {texte}
      </p>
    </div>
  );
};
