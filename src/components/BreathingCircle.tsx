import React from "react";
import { Composition } from "remotion";
import {
  MeditationVideo,
  defaultMeditationProps,
} from "./components/MeditationVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MeditationVideo"
        component={MeditationVideo}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={18000}
        defaultProps={defaultMeditationProps}
      />
      <Composition
        id="MeditationPreview"
        component={MeditationVideo}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={900}
        defaultProps={{
          ...defaultMeditationProps,
          titre: "Aperçu — Méditation du Matin",
        }}
      />
    </>
  );
};
