import BasuIcon from "assets/images/timerBells/Basu.png";
import SilentMeditationIcon from "assets/images/timerBells/Silent-Meditation.png";
import DengzeIcon from "assets/images/timerBells/Dengze.png";
import JambatiIcon from "assets/images/timerBells/Jambati.png";
import KangseIcon from "assets/images/timerBells/Kangse.png";
import OmbuIcon from "assets/images/timerBells/Ombu.png";
import SakyaIcon from "assets/images/timerBells/Sakya.png";
import Shurong1Icon from "assets/images/timerBells/Shurong-1.png";
import ShurongIcon from "assets/images/timerBells/Shurong.png";
import ThadobatiIcon from "assets/images/timerBells/Thadobati.png";
import ZhadaIcon from "assets/images/timerBells/Zhada.png";

import BirdsIcon from "assets/images/ambientSound/Birds.png";
import DeepOmIcon from "assets/images/ambientSound/DeepOm.png";
import LightRainIcon from "assets/images/ambientSound/LightRain.png";
import OceanWavesIcon from "assets/images/ambientSound/OceanWaves.png";
import PeacefulPondIcon from "assets/images/ambientSound/PeacefulPond.png";
import RainforestIcon from "assets/images/ambientSound/Rainforest.png";
import Lightning from "assets/images/ambientSound/Lightning.jpg";
import River from "assets/images/ambientSound/River.jpg";

//Bell Sounds

import BasuSound from "assets/sounds/BellSounds/Basu.wav";
import DengzeSound from "assets/sounds/BellSounds/Dengze.wav";
import GongHanchiSound from "assets/sounds/BellSounds/Gong-Hanchi.wav";
import KangseSound from "assets/sounds/BellSounds/Kangse.wav";
import OmbuSound from "assets/sounds/BellSounds/Ombu.wav";
import SakyaSound from "assets/sounds/BellSounds/Sakya.wav";
import ShurongSound from "assets/sounds/BellSounds/Shurong.wav";
import ZhadaSound from "assets/sounds/BellSounds/Zhada.wav";

import tempSongTile from "assets/images/song.png";

export const timerBellListData = [
  {
    id: 1,
    icon: Shurong1Icon,
    title: "Shurong",
    width: 80,
    height: 80,
    width: 80,
    height: 80,
    sound: ShurongSound,
    iconShadowColor: "rgba(221, 144, 74, 0.25)",
  },
  {
    id: 2,
    icon: SilentMeditationIcon,
    title: "Silent Meditation",
    viewTitle: "Silent",
    width: 60.04,
    height: 60,
    iconShadowColor: "rgba(107, 38, 255, 0.5)",
  },
  {
    id: 3,
    icon: ShurongIcon,
    title: "Shurong",
    width: 117.31,
    height: 70,
    sound: ShurongSound,
    iconShadowColor: "rgba(184, 118, 67, 0.25)",
  },
  {
    id: 4,
    icon: BasuIcon,
    title: "Basu",
    width: 146,
    height: 55,
    sound: BasuSound,
    iconShadowColor: "rgba(190, 126, 49, 0.25)",
  },
  {
    id: 5,
    icon: DengzeIcon,
    title: "Dengze",
    width: 130.2,
    height: 70,
    sound: DengzeSound,
    iconShadowColor: "rgba(110, 101, 78, 0.25)",
  },
  {
    id: 6,
    icon: SakyaIcon,
    title: "Sakya",
    width: 143.93,
    height: 70,
    sound: SakyaSound,
    iconShadowColor: "rgba(192, 128, 69, 0.25)",
  },
  {
    id: 7,
    icon: OmbuIcon,
    title: "Ombu",
    width: 135,
    height: 71,
    sound: OmbuSound,
    iconShadowColor: "rgba(184, 132, 62, 0.25)",
  },
  {
    id: 8,
    icon: KangseIcon,
    title: "Kangse",
    width: 131.34,
    height: 70,
    sound: KangseSound,
    iconShadowColor: "rgba(223, 162, 76, 0.25)",
  },
  {
    id: 9,
    icon: ZhadaIcon,
    title: "Zhada",
    width: 125.73,
    height: 70,
    sound: ZhadaSound,
    iconShadowColor: "rgba(154, 109, 56, 0.25)",
  },
  {
    id: 10,
    icon: JambatiIcon,
    title: "Jambati",
    width: 110.27,
    height: 70,
    iconShadowColor: "rgba(132, 115, 79, 0.25)",
  },
  {
    id: 11,
    icon: ThadobatiIcon,
    title: "Thadobati",
    width: 103,
    height: 70,
    iconShadowColor: "rgba(169, 116, 2, 0.25)",
  },

  // {
  //   id: 12,
  //   icon: GongHanchiSound,
  //   title: "Thadobati",
  //   width: 103,
  //   height: 70,
  //   iconShadowColor: "rgba(169, 116, 2, 0.25)",
  // },
];
const tempFile = "/uploads/1669332859414-924275594.mp3";
export const ambientSoundData = [
  {
    _id: 1,
    title: "Birds",
    file: tempFile,
    file: "uploads/timer/Birds.mp3",
    songImage: BirdsIcon,
  },
  {
    _id: 2,
    title: "Deep Om",

    file: "uploads/timer/Deep Om.mp3",
    songImage: DeepOmIcon,
  },
  {
    _id: 3,
    title: "Light Rain",

    file: "uploads/timer/Light Rain.mp3",
    songImage: LightRainIcon,
  },
  {
    _id: 4,
    title: "Ocean Waves",
    file: "uploads/timer/Ocean Waves.mp3",
    songImage: OceanWavesIcon,
  },
  {
    _id: 5,
    title: "Peaceful Pond",
    file: "uploads/timer/Peaceful Pond.mp3",
    songImage: PeacefulPondIcon,
  },
  {
    _id: 6,
    title: "Rainforest",
    file: "uploads/timer/Rainforest.mp3",
    songImage: RainforestIcon,
  },
  {
    _id: 7,
    title: "River",
    file: "uploads/timer/River.mp3",
    songImage: River,
  },
  {
    _id: 8,
    title: "Storm",
    file: "uploads/timer/Storm.mp3",
    songImage: Lightning,
  },

  
];



