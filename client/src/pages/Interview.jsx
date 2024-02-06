import React from "react";
import Speech from "react-text-to-speech";

export const Interview = () => {
  const startBtn = <button className="my-start-btn">Start Speech</button>;
  const pauseBtn = <button className="my-pause-btn">Pause Speech</button>;
  const stopBtn = <button className="my-stop-btn">Stop Speech</button>;

  return (
    <Speech
      text="This is a partially customized speech component."
      pitch={1.5}
      rate={2}
      volume={0.5}
      voiceURI="Hey everyone"
      startBtn={startBtn}
      pauseBtn={pauseBtn}
      stopBtn={stopBtn}
      props={{ title: "React Text-To-Speech Component" }}
      onError={() => console.error("Browser not supported!")}
    />
  );
};
