// src/components/BreathingCircle.tsx
// ============================================================
// Cercle animé qui simule le rythme de respiration
// Grossit = Inspirez, Rétrécit = Expirez
// ============================================================

import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface BreathingCircleProps {
  // Durée d'un cycle complet inspir+expir en frames
  cycleDureeFrames?: number;
  // Couleur du cercle
  couleur?: string;
  // Taille maximale du cercle en pixels
  tailleMax?: number;
}

export const BreathingCircle: React.FC<BreathingCircleProps> = ({
  cycleDureeFrames = 240, // 8 secondes à 30fps (4s inspir + 4s expir)
  couleur = "rgba(107, 92, 231, 0.3)",
  tailleMax = 300,
}) => {
  const frame = useCurrentFrame();

  // Position dans le cycle actuel (0 à 1)
  const positionDansCycle = (frame % cycleDureeFrames) / cycleDureeFrames;

  // L'échelle va de 0.6 (petit) à 1 (grand) et revient
  // On utilise une fonction sinusoïdale pour un mouvement fluide
  const echelle = interpolate(
    Math.sin(positionDansCycle * 2 * Math.PI),
    [-1, 1], // Entrée : sin va de -1 à 1
    [0.6, 1], // Sortie : l'échelle va de 0.6 à 1
  );

  // Opacité qui pulse doucement
  const opacite = interpolate(
    Math.sin(positionDansCycle * 2 * Math.PI),
    [-1, 1],
    [0.2, 0.5],
  );

  // Texte d'instruction qui alterne
  const estInspiration = positionDansCycle < 0.5;
  const texteInstruction = estInspiration ? "Inspirez" : "Expirez";

  // Opacité du texte avec transition douce
  const texteOpacite = interpolate(
    positionDansCycle < 0.5
      ? positionDansCycle * 2 // 0→1 pendant l'inspiration
      : (positionDansCycle - 0.5) * 2, // 0→1 pendant l'expiration
    [0, 0.1, 0.9, 1],
    [0, 1, 1, 0],
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
      {/* Cercle principal */}
      <div
        style={{
          width: tailleMax,
          height: tailleMax,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${couleur}, transparent)`,
          transform: `scale(${echelle})`,
          opacity: opacite,
          transition: "none", // Pas de transition CSS, Remotion gère tout
        }}
      />

      {/* Cercle intérieur plus lumineux */}
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

      {/* Texte d'instruction */}
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
