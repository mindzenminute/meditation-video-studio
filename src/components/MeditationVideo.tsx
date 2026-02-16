// src/compositions/MeditationVideo.tsx
// ============================================================
// COMPOSITION PRINCIPALE
// Assemble toutes les scènes pour créer une vidéo de
// méditation guidée complète de 10 minutes
//
// Structure temporelle (à 30 fps) :
// 0:00 - 0:20  → Introduction (titre, instructeur)
// 0:20 - 9:40  → Segments de méditation guidée
// 9:40 - 10:00 → Conclusion (namasté)
// ============================================================

import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  useCurrentFrame,
  interpolate,
  staticFile,
} from "remotion";
import { MeditationInputProps, MeditationSegment } from "../types";
import { IntroScene } from "../components/IntroScene";
import { BreathingCircle } from "../components/BreathingCircle";
import { TextSegment } from "../components/TextSegment";
import { OutroScene } from "../components/OutroScene";
import { TransitionWave } from "../components/TransitionWave";

// Props par défaut pour la prévisualisation dans le Studio
export const defaultMeditationProps: MeditationInputProps = {
  titre: "Méditation du Matin",
  sousTitre: "Éveillez votre conscience intérieure",
  instructeur: "Studio Zen",
  segments: [
    {
      texte: "Installez-vous confortablement. Fermez doucement les yeux.",
      debutFrame: 600,  // 20 secondes
      dureeFrames: 300,  // 10 secondes
      type: "introduction",
    },
    {
      texte: "Portez votre attention sur votre respiration. Observez-la sans la modifier.",
      debutFrame: 1050,
      dureeFrames: 360,
      type: "respiration",
    },
    {
      texte: "À chaque inspiration, accueillez le calme. À chaque expiration, relâchez les tensions.",
      debutFrame: 1560,
      dureeFrames: 360,
      type: "respiration",
    },
    {
      texte: "Laissez vos pensées passer comme des nuages dans le ciel.",
      debutFrame: 2100,
      dureeFrames: 300,
      type: "guidage",
    },
    {
      texte: "Vous êtes ici, maintenant. En paix.",
      debutFrame: 2700,
      dureeFrames: 240,
      type: "guidage",
    },
    {
      texte: "Sentez la connexion avec votre corps, du sommet de votre tête jusqu'au bout de vos orteils.",
      debutFrame: 3300,
      dureeFrames: 360,
      type: "guidage",
    },
    {
      texte: "Chaque cellule de votre corps se détend un peu plus.",
      debutFrame: 4000,
      dureeFrames: 300,
      type: "guidage",
    },
    {
      texte: "Restez dans cet espace de calme...",
      debutFrame: 5000,
      dureeFrames: 240,
      type: "silence",
    },
    {
      texte: "Doucement, commencez à reprendre conscience de votre environnement.",
      debutFrame: 16200,
      dureeFrames: 300,
      type: "conclusion",
    },
    {
      texte: "Quand vous êtes prêt, ouvrez les yeux.",
      debutFrame: 16800,
      dureeFrames: 240,
      type: "conclusion",
    },
  ],
  musiqueUrl: "",
  musiqueVolume: 0.3,
  couleurPrincipale: "#6B5CE7",
  couleurSecondaire: "#1a1a2e",
  afficherSkillsBadge: true,
  skillsProfileUrl: "https://skills.sh/votre-profil",
};

export const MeditationVideo: React.FC<MeditationInputProps> = (props) => {
  const {
    titre,
    sousTitre,
    instructeur,
    segments,
    musiqueUrl,
    musiqueVolume = 0.3,
    couleurPrincipale = "#6B5CE7",
    couleurSecondaire = "#1a1a2e",
    afficherSkillsBadge = false,
    skillsProfileUrl,
  } = props;

  const frame = useCurrentFrame();

  // ── CALCULS DE TIMING ───────────────────────────────────────
  const FPS = 30;
  const DUREE_TOTALE = 10 * 60 * FPS; // 18 000 frames = 10 minutes
  const INTRO_DUREE = 20 * FPS;        // 600 frames = 20 secondes
  const OUTRO_DEBUT = DUREE_TOTALE - 20 * FPS; // Dernières 20 secondes

  // ── FOND ANIMÉ ──────────────────────────────────────────────
  // Un dégradé qui bouge très lentement pour donner de la vie
  const fondRotation = interpolate(frame, [0, DUREE_TOTALE], [0, 360]);

  // Particules flottantes (simulées par des cercles)
  const particules = Array.from({ length: 5 }, (_, i) => {
    const vitesse = 0.002 + i * 0.001;
    const x = 50 + Math.sin(frame * vitesse + i * 1.5) * 30;
    const y = 50 + Math.cos(frame * vitesse * 0.7 + i * 2) * 25;
    const taille = 100 + i * 80;
    const opacite = 0.03 + i * 0.01;

    return { x, y, taille, opacite };
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${fondRotation}deg, ${couleurSecondaire}, #0d0d1a, ${couleurSecondaire})`,
        overflow: "hidden",
      }}
    >
      {/* ── PARTICULES D'AMBIANCE ──────────────────────────── */}
      {particules.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.taille,
            height: p.taille,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${couleurPrincipale}, transparent)`,
            opacity: p.opacite,
            transform: "translate(-50%, -50%)",
            filter: "blur(40px)",
          }}
        />
      ))}

      {/* ── MUSIQUE DE FOND ────────────────────────────────── */}
      {musiqueUrl && (
        <Audio
          src={musiqueUrl}
          volume={(f) => {
            // Fondu d'entrée sur 5 secondes
            if (f < 150) return interpolate(f, [0, 150], [0, musiqueVolume]);
            // Fondu de sortie sur les 5 dernières secondes
            if (f > DUREE_TOTALE - 150)
              return interpolate(
                f,
                [DUREE_TOTALE - 150, DUREE_TOTALE],
                [musiqueVolume, 0],
              );
            return musiqueVolume;
          }}
          // Boucler la musique si elle est plus courte que 10 min
          loop
        />
      )}

      {/* ── SCÈNE D'INTRODUCTION ───────────────────────────── */}
      <Sequence from={0} durationInFrames={INTRO_DUREE}>
        <IntroScene
          titre={titre}
          sousTitre={sousTitre}
          instructeur={instructeur}
          couleurPrincipale={couleurPrincipale}
          couleurSecondaire={couleurSecondaire}
        />
      </Sequence>

      {/* ── TRANSITION INTRO → CONTENU ─────────────────────── */}
      <Sequence from={INTRO_DUREE - 30} durationInFrames={60}>
        <TransitionWave couleur={couleurPrincipale + "33"} dureeFrames={60} />
      </Sequence>

      {/* ── CERCLE DE RESPIRATION (présent pendant le contenu) */}
      <Sequence from={INTRO_DUREE} durationInFrames={OUTRO_DEBUT - INTRO_DUREE}>
        <AbsoluteFill
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BreathingCircle
            couleur={`${couleurPrincipale}4D`} // 30% opacité
            tailleMax={350}
            cycleDureeFrames={240} // 8 secondes par cycle
          />
        </AbsoluteFill>
      </Sequence>

      {/* ── SEGMENTS DE TEXTE GUIDÉ ────────────────────────── */}
      {segments.map((segment, index) => (
        <TextSegment
          key={index}
          texte={segment.texte}
          debutFrame={segment.debutFrame}
          dureeFrames={segment.dureeFrames}
          couleur="#FFFFFF"
        />
      ))}

      {/* ── TRANSITION CONTENU → OUTRO ─────────────────────── */}
      <Sequence from={OUTRO_DEBUT - 30} durationInFrames={60}>
        <TransitionWave couleur={couleurPrincipale + "33"} dureeFrames={60} />
      </Sequence>

      {/* ── SCÈNE DE CONCLUSION ────────────────────────────── */}
      <Sequence from={OUTRO_DEBUT} durationInFrames={DUREE_TOTALE - OUTRO_DEBUT}>
        <OutroScene
          couleurPrincipale={couleurPrincipale}
          couleurSecondaire={couleurSecondaire}
          instructeur={instructeur}
          afficherSkillsBadge={afficherSkillsBadge}
          skillsProfileUrl={skillsProfileUrl}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
