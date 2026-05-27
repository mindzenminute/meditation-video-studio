// C'est LE format que TOUTES les vidéos devront respecter
export interface MeditationScript {
  title: string;
  durationSeconds: number;
  scenes: Array<{
    id: string;
    startTime: number;
    text: string;
    backgroundImage?: string;
    audioCue?: string;
  }>;
  metadata: {
    tone: string;
    speakerName: string;
  };
}
