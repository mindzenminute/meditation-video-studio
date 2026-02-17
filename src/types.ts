export interface MeditationSegment {
  texte: string;
  debutFrame: number;
  dureeFrames: number;
  type: "introduction" | "respiration" | "guidage" | "silence" | "conclusion";
}

export interface MeditationInputProps {
  titre: string;
  sousTitre?: string;
  segments: MeditationSegment[];
  musiqueUrl: string;
  musiqueVolume?: number;
  couleurPrincipale?: string;
  couleurSecondaire?: string;
  instructeur?: string;
  afficherSkillsBadge?: boolean;
  skillsProfileUrl?: string;
}
