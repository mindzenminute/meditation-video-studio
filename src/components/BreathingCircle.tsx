import React from "react";

import { useCurrentFrame, interpolate, spring } from "remotion";

export const BreathingCircle: React.FC<{
  cycleDureeFrames?: number;
  couleur?: string;
  tailleMax?: number;
}> = ({



  cycleDureeFrames = 180,
  couleur = "#8B5CF6",
  tailleMax = 400,
}) => {
  const frame = useCurrentFrame();
  const positionDansCycle = (frame % cycleDureeFrames) / cycleDureeFrames;



  // Utilisation de spring() pour un mouvement naturel et organique
  const progress = spring({
    frame: frame % cycleDureeFrames,
    fps: 30,
    config: {
      damping: 100,
      stiffness: 50,
      mass: 1,
    },
  });

  // Échelle qui respire : 0.8 → 1.2 → 0.8
  // Utilisation de sinus modifié par spring pour fluidité
  const echelleBase = interpolate(
    Math.sin(positionDansCycle * 2 * Math.PI - Math.PI / 2),
    [-1, 1],

    [0.8, 1.2]
  );

  // Appliquer le facteur spring pour adoucir encore plus
  const echelle = echelleBase * (0.95 + progress * 0.05);

  // Opacité variable pour effet de pulsation douce
  const opacite = interpolate(
    Math.sin(positionDansCycle * 2 * Math.PI),
    [-1, 1],

    [0.4, 0.7]
  );










  // Glow bleu-violet cosmique
  const glowIntensite = interpolate(
    echelle,
    [0.8, 1.0, 1.2],
    [20, 40, 60]
  );

  const glowColor = `rgba(139, 92, 246, ${0.6 + progress * 0.2})`;

  return (
    <div
      style={{
        display: "flex",

        alignItems: "center",
        justifyContent: "center",

        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "linear-gradient(180deg, #0a0a1a 0%, #1a1a2e 100%)",
      }}
    >
      {/* Cercle principal avec glow cosmique */}
      <div
        style={{
          width: tailleMax,
          height: tailleMax,
          borderRadius: "50%",

          background: `radial-gradient(circle at 30% 30%, 
            rgba(139, 92, 246, 0.9) 0%, 
            rgba(167, 139, 250, 0.6) 40%, 
            rgba(139, 92, 246, 0.1) 70%, 
            transparent 100%)`,
          boxShadow: `
            0 0 ${glowIntensite}px 2px ${glowColor},
            0 0 ${glowIntensite * 2}px 4px rgba(167, 139, 250, 0.4),
            0 0 ${glowIntensite * 3}px 8px rgba(139, 92, 246, 0.2),
            inset 0 0 ${glowIntensite / 2}px 1px rgba(255, 255, 255, 0.3)
          `,
          transform: `scale(${echelle})`,
          opacity: opacite,
          position: "relative",
          animation: "none",
        }}
      />

      {/* Anneau interne lumineux */}
      <div
        style={{
          position: "absolute",


          width: tailleMax * 0.85,
          height: tailleMax * 0.85,
          borderRadius: "50%",



          border: `2px solid rgba(167, 139, 250, ${0.3 + progress * 0.2})`,
          boxShadow: `
            0 0 ${glowIntensite * 0.5}px 1px rgba(167, 139, 250, 0.5),
            inset 0 0 ${glowIntensite * 0.3}px 0.5px rgba(139, 92, 246, 0.3)
          `,
          transform: `scale(${echelle * 1.05})`,
          opacity: opacite * 0.8,
        }}
      />

      {/* Points de lumière flottants */}
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <div
          key={angle}
          style={{
            position: "absolute",
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: `rgba(196, 181, 253, ${0.6 + Math.sin((frame + angle) * 0.05) * 0.4})`,
            boxShadow: `0 0 6px 2px rgba(167, 139, 250, 0.8)`,
            top: "50%",
            left: "50%",
            transform: `
              translate(-50%, -50%)
              rotate(${angle}deg)
              translateY(${-tailleMax * 0.6}px)
              rotate(-${angle}deg)
            `,
            opacity: opacite,
          }}
        />
      ))}

      {/* Centre lumineux */}
      <div
        style={{
          position: "absolute",








          width: tailleMax * 0.15,
          height: tailleMax * 0.15,
          borderRadius: "50%",
          background: `radial-gradient(circle, 
            rgba(255, 255, 255, 0.9) 0%, 
            rgba(196, 181, 253, 0.6) 50%, 
            transparent 70%)`,
          boxShadow: `
            0 0 ${glowIntensite}px 4px rgba(167, 139, 250, 0.8),
            0 0 ${glowIntensite * 1.5}px 8px rgba(139, 92, 246, 0.4)
          `,
          transform: `scale(${1.2 - echelle * 0.2})`,
          opacity: opacite,
        }}



      />
    </div>
  );
};
