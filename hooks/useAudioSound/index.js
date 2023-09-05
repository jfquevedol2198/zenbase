import { Audio } from "expo-av";

let audio1 = new Audio.Sound();
let audio2 = new Audio.Sound();

function selectAudio(sound) {
  switch (sound) {
    case 1:
      return audio1;
    case 2:
      return audio2;

    default:
      return audio1;
  }
}

export default function useAudioSound(audioUrl, sound = 1) {
  let audio = selectAudio(sound);
  const playAudio = async (data) => {
    try {
      console.log({ audioUrl });
      // await audio.unloadAsync();
      await audio.loadAsync({ uri: audioUrl });
      await audio.playAsync();
      await audio.setVolumeAsync(previousVolumeRef.current);
      // alert("***qwererwr" + audioUrl);

      // await audio.setVolumeAsync(previousVolumeRef.current);
      // await audio.setVolumeAsync(1.0);
    } catch (e) {
      console.log({ e });
      // alert("Something went wrong!");
      // navigation.goBack();
    }
  };
  const resumeAudio = async () => {
    await audio.playAsync();
    // alert("Resume");
  };

  const pauseAudio = async (data) => {
    await audio.pauseAsync();
    // alert("Pause");
  };

  const exitAudio = async (data) => {
    await audio.stopAsync();
    await audio.unloadAsync();

    // alert("exit");
  };

  return { playAudio, pauseAudio, resumeAudio, exitAudio };
}
