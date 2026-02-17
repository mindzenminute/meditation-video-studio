// src/index.ts
// ============================================================
// Point d'entrée de Remotion
// 
// registerRoot() dit à Remotion : "voici le composant principal
// qui contient toutes mes compositions vidéo"
//
// C'est LA ligne indispensable sans laquelle rien ne fonctionne
// ============================================================

import { registerRoot } from "remotion";
import { RemotionRoot } from "./Root";

registerRoot(RemotionRoot);
