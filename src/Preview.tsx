// src/Preview.tsx — Page de prévisualisation pour les testeurs

import React from 'react';
import { Player } from '@remotion/player';
import { MeditationVideo } from './MeditationVideo';

export const Preview: React.FC = () => {
  return (
    <div
      style={{
        fontFamily: 'Georgia, serif',
        backgroundColor: '#111',
        color: '#e8d5b7',
        minHeight: '100vh',
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1 style={{ marginBottom: 10 }}>🧘 Méditation Guidée — Aperçu</h1>
      <p style={{ opacity: 0.7, marginBottom: 40 }}>
        Version de démonstration en lecture seule
      </p>

      <div style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 22, marginBottom: 15 }}>
          Méditation du Sommeil Profond (10 min)
        </h2>
        <Player
          component={MeditationVideo}
          compositionWidth={1920}
          compositionHeight={1080}
          durationInFrames={30 * 60 * 10}
          fps={30}
          style={{ width: 960, height: 540, borderRadius: 12 }}
          controls
          inputProps={{
            title: 'Méditation du Sommeil Profond',
            scriptSegments: [
              'Installez-vous confortablement dans votre lit.',
              'Fermez les yeux et prenez une grande inspiration.',
              'Expirez lentement, en relâchant toutes les tensions.',
              'Sentez votre corps devenir de plus en plus lourd.',
              'Chaque muscle se détend...',
              "Jusqu'à la pointe de vos orteils.",
              'Imaginez une lumière douce et chaude qui vous enveloppe.',
              'Cette lumière apaise chaque pensée.',
              'Vous flottez dans un espace de calme absolu.',
              'Laissez le sommeil venir naturellement à vous.',
            ],
            musicUrl: '',
            backgroundColor: '#0a0a2e',
            textColor: '#e8d5b7',
          }}
        />
      </div>

      <div>
        <h2 style={{ fontSize: 22, marginBottom: 15 }}>
          Démo Express (1 min)
        </h2>
        <Player
          component={MeditationVideo}
          compositionWidth={1920}
          compositionHeight={1080}
          durationInFrames={30 * 60}
          fps={30}
          style={{ width: 960, height: 540, borderRadius: 12 }}
          controls
          inputProps={{
            title: 'Démo - Méditation Express',
            scriptSegments: [
              'Bienvenue dans cette courte méditation.',
              'Respirez profondément...',
              'Vous êtes en paix.',
            ],
            musicUrl: '',
            backgroundColor: '#1a0a2e',
            textColor: '#d5e8b7',
          }}
        />
      </div>

      <footer style={{ marginTop: 60, opacity: 0.5, fontSize: 14 }}>
        <p>🔒 Lecture seule — Contactez-nous pour une version personnalisée</p>
      </footer>
    </div>
  );
};
