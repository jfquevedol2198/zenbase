import styled from "styled-components/native";
import AmbientSound from "./ambientSound";
import { ambientSoundData, timerBellListData } from "./config";
import { TimerContext } from "./contex";
import IntervalBell from "./intervalBell";
import TimerBellList from "./timerBellList";
import Actions from "./actions";
import TimeSelection from "./timeSelection";
import { useState } from "react";
import { TIMER_STATUS_INITIAL } from "./keys";
import { Text, AnimatedHeaderView, Container } from "components";
import Header from "./header";
import Counter from "./counter";
import Canvas from "../../components/canvas";
import { Audio } from "expo-av";
import config from "../../config";
import AmbientSoundSelection from "./ambientSoundSelection";

import { useTimer as useTimerLib } from "react-timer-hook";
import useAudioSound from "hooks/useAudioSound";
import TimerEarned from "./timerEarned";
import Wallet from "../../deprecated/screens/wallet";

// let audio = new Audio.Sound();

export default function Timer({navigation}) {
  const initial = [
    { id: "hour", value: 1 },
    { id: "min", value: 0 },
    { id: "second", value: 0 },
  ];

  const [earnView, setEarnView] = useState(false);

  const [selectedTime, setSelectedTime] = useState(initial);

  const [timeInput, setTimeInput] = useState(["00", "15", "00"]);
  const [intervltimeInput, setIntervlTimeInput] = useState(["00", "00", "00"]);

  // const allSeconds =
  //   selectedTime[0].value * 60 * 60 + selectedTime[1].value * 60 + selectedTime[2].value;

  const TotalHours = parseInt(timeInput[0]);
  const TotalMin = parseInt(timeInput[1]);
  const TotalSeconds = parseInt(timeInput[2]);

  const allSeconds = TotalHours * 60 * 60 + TotalMin * 60 + TotalSeconds;

  const time = new Date();
  time.setSeconds(time.getSeconds() + allSeconds);
  const { seconds, minutes, hours, days, isRunning, start, pause, resume, restart } = useTimerLib({
    expiryTimestamp: time,
    onExpire: () => setEarnView(true),
  });

  const selectedBellListIndex = timerBellListData?.findIndex(({ id }) => id === selectedBell);

  const bellUrl = timerBellListData[selectedBellListIndex]?.sound || "";
  const {
    playAudio: bell_playAudio,
    pauseAudio: bell_pauseAudio,
    resumeAudio: bell_resumeAudio,
    exitAudio: bell_exitAudio,
  } = useAudioSound(bellUrl, 2);

  const intervalTime = new Date();
  
  const TotalIntervalHours = parseInt(intervltimeInput[0]);
  const TotalIntervalMin = parseInt(intervltimeInput[1]);
  const TotalIntervalSeconds = parseInt(intervltimeInput[2]);

  const allIntervalSeconds =
    TotalIntervalHours * 60 * 60 + TotalIntervalMin * 60 + TotalIntervalSeconds;

  intervalTime.setSeconds(time.getSeconds() + allIntervalSeconds);

  const intervalTimeLib = useTimerLib({
    expiryTimestamp: time,
    onExpire: () => {
        if (bellUrl) {
            bell_playAudio();
  
            setTimeout(() => {
                exitAudio();
        }, 5000);
  
            setTimeout(() => {
                resetInterval();
        }, 100);
        }
    },
  });

  const resetInterval = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + allIntervalSeconds);
    intervalTimeLib?.restart(time);
  };

  const [selectedAmbientSound, setSelectedAmbientSound] = useState(2);

  const currentAmbientSound = selectedAmbientSound
    ? config.API_URL + ambientSoundData.filter(({ _id }) => _id === selectedAmbientSound)[0].file
    : "";

  const audioUrl = currentAmbientSound;

  const {
    playAudio: ambient_playAudio,
    pauseAudio: ambient_pauseAudio,
    resumeAudio: ambient_resumeAudio,
    exitAudio: ambient_exitAudio,
  } = useAudioSound(audioUrl);

  const [selectedBell, setSelectedBell] = useState(timerBellListData[1]?.id);


  // console.log('selectedbell',selectedBell)
  const [timerStatus, setTimerStatus] = useState(TIMER_STATUS_INITIAL);
  const [ambientSoundSelection, setAmbientSoundSelection] = useState(false);

  const contextProps = {
    earnView,
    setEarnView,
    timerBellListData,
    selectedBell,
    setSelectedBell,
    timerStatus,
    setTimerStatus,
    ambientSoundSelection,
    setAmbientSoundSelection,
    selectedAmbientSound,
    setSelectedAmbientSound,

    ambient_playAudio,
    ambient_pauseAudio,
    ambient_resumeAudio,
    ambient_exitAudio,

    bell_playAudio,
    bell_pauseAudio,
    bell_resumeAudio,
    bell_exitAudio,

    time,
    allSeconds,
    timeLib: { seconds, minutes, hours, days, isRunning, start, pause, resume, restart },
    TotalHours,
    TotalMin,
    TotalSeconds,

    allIntervalSeconds,
    intervalTimeLib,
    selectedTime,
    setSelectedTime,
    timeInput,
    setTimeInput,
    intervltimeInput,
    setIntervlTimeInput,
  };

  const mainView = ({ hide = false }) => {
    // console.log('first',timerBellListData[selectedBell-1])
    const mainStyle = hide ? { display: "none" } : {};
    return (
      <Canvas style={mainStyle}>
        {/* <AnimatedHeaderView
        previousScreenName="Timer"
        header={<Header title={"Timer"} />}
        inputRange={[10, 50]}
        hide={hide}
      > */}

        <Wrapper>
          <Header />
          <Container>
            <Title>Timer</Title>
          </Container>
          <TimerBellList />
          <Container >
            <TimeSelection />
            <IntervalBell />
           
            <AmbientSound />
            <Actions />
          </Container>
        </Wrapper>
        {/* </AnimatedHeaderView> */}
      </Canvas>
    );
  };
  const startedView = () => (
    <Canvas>
      <Wrapper>
        <Container>
          <Counter  intervltimeInput={intervltimeInput} />
           <Actions />
        </Container>
      </Wrapper>
    </Canvas>
  );

  const timerViews = () => (
    <>
      {ambientSoundSelection ? (
        <AmbientSoundSelection />
      ) : timerStatus === TIMER_STATUS_INITIAL ? (
        <></>
      ) : (
        startedView()
      )}
      {mainView({ hide: ambientSoundSelection || timerStatus !== TIMER_STATUS_INITIAL })}
    </>
  );

  return (
    <>
      <TimerContext.Provider value={contextProps}>
        {earnView ? <TimerEarned/>: timerViews()}
      </TimerContext.Provider>
    </>
  );
}

const Wrapper = styled.View`




`;

const Head = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const Title = styled(Text)`
  font-weight: 600;
  font-size: ${({ theme: { getSize } }) => getSize(20)}px;
  line-height: ${({ theme: { getSize } }) => getSize(19)}px;
`;
