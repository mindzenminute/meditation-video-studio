// src/types.ts
// ============================================================
// Définition des types pour les vidéos de méditation
// ============================================================

// Un "segment" = un moment de la méditation avec du texte à afficher
export interface MeditationSegment {
  // Le texte que le méditant voit à l'écran
  texte: string;
  // Quand ce texte apparaît (en frames, pas en secondes)
  // Pour convertir : secondes × 30 = frames
  debutFrame: number;
  // Combien de temps il reste affiché (en frames)
  dureeFrames: number;
  // Type de scène pour adapter le visuel
  type: "introduction" | "respiration" | "guidage" | "silence" | "conclusion";
}

// Les données que n8n/Modal enverra pour personnaliser la vidéo
export interface MeditationInputProps {
  // Titre de la méditation (ex: "Méditation du matin")
  titre: string;
  // Sous-titre optionnel
  sousTitre?: string;
  // Les segments de texte guidé
  segments: MeditationSegment[];
  // URL de la musique de fond (hébergée quelque part)
  musiqueUrl: string;
  // Volume de la musique (0 à 1)
  musiqueVolume?: number;
  // Couleur principale du thème (ex: "#6B5CE7")
  couleurPrincipale?: string;
  // Couleur secondaire pour les dégradés
  couleurSecondaire?: string;
  // Nom de l'instructeur
  instructeur?: string;
  // Afficher le badge skills.sh ?
  afficherSkillsBadge?: boolean;
  // URL du profil skills.sh de l'instructeur
  skillsProfileUrl?: string;
}
