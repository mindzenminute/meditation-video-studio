import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  useCurrentFrame,
  interpolate,
} from "remotion";
import { MeditationInputProps } from "../types";
import { IntroScene } from "./IntroScene";
import { BreathingCircle } from "./BreathingCircle";
import { TextSegment } from "./TextSegment";
import { OutroScene } from "./OutroScene";
import { TransitionWave } from "./TransitionWave";

export const defaultMeditationProps: MeditationInputProps = {
  titre: "Méditation du Matin",
  sousTitre: "Éveillez votre conscience intérieure",
  instructeur: "Studio Zen",
  segments: [
    {
      texte: "Installez-vous confortablement. Fermez doucement les yeux.",
      debutFrame: 600,
      dureeFrames: 300,
      type: "introduction",
    },
    {
      texte: "Portez votre attention sur votre respiration.",
      debutFrame: 1050,
      dureeFrames: 360,
      type: "respiration",
    },
    {
      texte: "À chaque inspiration, accueillez le calme.",
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
      texte: "Doucement, reprenez conscience de votre environnement.",
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
  afficherSkillsBadge: false,
  skillsProfileUrl: "",
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
  } = props;

  const frame = useCurrentFrame();

  const DUREE_TOTALE = 18000;
  const INTRO_DUREE = 600;
  const OUTRO_DEBUT = DUREE_TOTALE - 600;

  const fondRotation = interpolate(frame, [0, DUREE_TOTALE], [0, 360]);

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

      {musiqueUrl && musiqueUrl.length > 0 && (
        <Audio
          src={musiqueUrl}
          volume={(f) => {
            if (f < 150) return interpolate(f, [0, 150], [0, musiqueVolume]);
            if (f > DUREE_TOTALE - 150)
              return interpolate(
                f,
                [DUREE_TOTALE - 150, DUREE_TOTALE],
                [musiqueVolume, 0]
              );
            return musiqueVolume;
          }}
          loop
        />
      )}

      <Sequence from={0} durationInFrames={INTRO_DUREE}>
        <IntroScene
          titre={titre}
          sousTitre={sousTitre}
          instructeur={instructeur}
          couleurPrincipale={couleurPrincipale}
          couleurSecondaire={couleurSecondaire}
        />
      </Sequence>

      <Sequence from={INTRO_DUREE - 30} durationInFrames={60}>
        <TransitionWave couleur={`${couleurPrincipale}33`} dureeFrames={60} />
      </Sequence>

      <Sequence from={INTRO_DUREE} durationInFrames={OUTRO_DEBUT - INTRO_DUREE}>
        <AbsoluteFill
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BreathingCircle
            couleur={`${couleurPrincipale}4D`}
            tailleMax={350}
            cycleDureeFrames={240}
          />
        </AbsoluteFill>
      </Sequence>

      {segments.map((segment, index) => (
        <TextSegment
          key={index}
          texte={segment.texte}
          debutFrame={segment.debutFrame}
          dureeFrames={segment.dureeFrames}
          couleur="#FFFFFF"
        />
      ))}

      <Sequence from={OUTRO_DEBUT - 30} durationInFrames={60}>
        <TransitionWave couleur={`${couleurPrincipale}33`} dureeFrames={60} />
      </Sequence>

      <Sequence from={OUTRO_DEBUT} durationInFrames={DUREE_TOTALE - OUTRO_DEBUT}>
        <OutroScene
          couleurPrincipale={couleurPrincipale}
          couleurSecondaire={couleurSecondaire}
          instructeur={instructeur}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
