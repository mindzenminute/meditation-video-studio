// Types partagés pour le projet Meditation Video Studio

/**
 * Segment de texte de guidance avec timing précis
 * Utilisé dans MeditationVideoInputProps.guidanceSegments
 */
export type MeditationSegment = {
  /** Texte à afficher */
  text: string;
  /** Temps de début en secondes (relatif au début de la phase guidance) */
  startTime: number;
  /** Durée d'affichage en secondes */
  duration: number;
  /** Alignement optionnel (défaut: 'center') */
  align?: 'left' | 'center' | 'right';
};

/**
 * Configuration de branding réutilisable
 */
export type BrandingConfig = {
  title: string;
  subtitle?: string;
};

/**
 * Configuration de call-to-action
 */
export type CTAConfig = {
  title: string;
  message: string;
  actionText: string;
};
