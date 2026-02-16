// src/Root.tsx
// ============================================================
// C'est le "sommaire" de toutes vos compositions vidéo
// Remotion regarde ce fichier pour savoir quelles vidéos
// vous pouvez créer
// ============================================================

import React from "react";
import { Composition } from "remotion";
import {
  MeditationVideo,
  defaultMeditationProps,
} from "./compositions/MeditationVideo";
import { MeditationInputProps } from "./types";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ── COMPOSITION PRINCIPALE : Méditation 10 minutes ── */}
      <Composition
        // Identifiant unique — c'est ce nom que Modal/n8n utilisera
        id="MeditationVideo"
        // Le composant React qui génère la vidéo
        component={MeditationVideo}
        // Dimensions : Full HD (1920×1080)
        width={1920}
        height={1080}
        // 30 images par seconde (standard pour des vidéos calmes)
        fps={30}
        // Durée : 10 minutes = 600 secondes × 30 fps = 18 000 frames
        durationInFrames={18000}
        // Props par défaut pour la prévisualisation dans le Studio
        defaultProps={defaultMeditationProps}
        // Schéma de validation des props (optionnel mais recommandé)
        // Permet à Remotion de vérifier que les données envoyées
        // par n8n sont correctes
        calculateMetadata={({ props }) => {
          return {
            // On peut ajuster la durée dynamiquement si besoin
            durationInFrames: 18000,
            props,
          };
        }}
      />

      {/* ── COMPOSITION COURTE : Aperçu de 30 secondes ────── */}
      {/* Utile pour les tests rapides et la prévisualisation */}
      <Composition
        id="MeditationPreview"
        component={MeditationVideo}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={900} // 30 secondes seulement
        defaultProps={{
          ...defaultMeditationProps,
          titre: "Aperçu — Méditation du Matin",
        }}
      />
    </>
  );
};
