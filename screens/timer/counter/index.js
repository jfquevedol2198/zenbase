import Text from "components/text";
import styled from "styled-components/native";
import { useTimer } from "../contex";
import BellIconCard from "../timerBellList/bellIconCard";
import { Octicons } from "@expo/vector-icons";
import logo from "assets/logos/zentoken-flat-circle-logo.png";
import { useEffect, useState,useRef } from "react";
import { useTime } from "react-timer-hook";
import { useNavigation } from "@react-navigation/native";

function CurrentTime() {
  const { seconds, minutes, hours, ampm } = useTime({ format: "12-hour" });



  return (
    <BellTime>
      {hours}:{minutes} {ampm.toUpperCase()}
    </BellTime>
  );
}

export default function Counter({props}) {
  const {
    timerBellListData = [],
    selectedBell,
    setSelectedBell = () => {},
    time,
    timeLib,
    allSeconds,
    timeInput,
    setTimeInput,
    intervalTimeLib,
    bell_playAudio
  } = useTimer();
  const { seconds, minutes, hours, days, isRunning, start, pause, resume, restart } = timeLib;
  // const { id, title, icon, iconShadowColor, width, height } = props;
  const selectedBellListIndex = timerBellListData?.findIndex(({ id }) => id === selectedBell);
  const isTimerFinished = hours === 0 && minutes === 0 && seconds === 0;
  const navigation = useNavigation();

  const intervalRef = useRef(null);

  // const [hours, minutes, seconds] = timeInput.split(":").map(Number);
  const intervalDurationInSeconds = hours * 3600 + minutes * 60 + seconds;
  const [remainingSeconds, setRemainingSeconds] = useState(intervalDurationInSeconds);


  // useEffect(() => {
  //   if (isTimerFinished) {
  //     navigation.navigate('AddJournal');
  //   }
  // }, [isTimerFinished, navigation]);





  useEffect(() => {
    const inputTotalSeconds = hours * 3600 + minutes * 60 + seconds;
    const currentTotalSeconds = hours * 3600 + minutes * 60 + seconds;
    const remainingTimeInSeconds = inputTotalSeconds - currentTotalSeconds;
    console.log(inputTotalSeconds)
    setRemainingSeconds(remainingTimeInSeconds);
  }, [hours, minutes, seconds]);





  return (
    <Wrapper>
      {/* {tempTest()} */}
      <ContentWrapper>
        <ZenTokenWrapper>
          <Logo source={logo} />
          <ZenTokenText>Earn 0.0125 ZENT after 5 min</ZenTokenText>
        </ZenTokenWrapper>
        <BellIconWrapper>
    
          <BellIconCard {...timerBellListData[selectedBellListIndex]} />
          {/* <Title>{title}</Title> */}
       
        </BellIconWrapper>
        <CounterTime>
          {hours < 10 && "0"}
          {hours}:{minutes < 10 && "0"}
          {minutes}:{seconds < 10 && "0"}
          {seconds}
        </CounterTime>
        <BellTimeWrapper>
          <Octicons name="bell-fill" style={{ marginRight: 10 }} size={20} color="#8d8d92" />
          <CurrentTime />
          {/* <BellTime>3:24 PM</BellTime> */}
        </BellTimeWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}
const Title = styled(Text)`
  width: 100%;
  text-align: center;
  color:white;
`;
const Wrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const ContentWrapper = styled.View``;

const ZenTokenWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${({ theme: { getSize } }) => getSize(51)}px;
  margin-bottom: ${({ theme: { getSize } }) => getSize(77)}px;
`;
const Logo = styled.Image`
  width: ${({ theme: { getSize } }) => getSize(30)}px;
  height: ${({ theme: { getSize } }) => getSize(30)}px;
  margin-right: ${({ theme: { getSize } }) => getSize(9)}px;
`;
const BellIconWrapper = styled.View`
  margin-bottom: ${({ theme: { getSize } }) => getSize(81)}px;
`;
const ZenTokenText = styled(Text)`
  font-weight: 600;
  font-size: ${({ theme: { getSize } }) => getSize(16)}px;
  line-height: ${({ theme: { getSize } }) => getSize(19.06)}px;
`;

const CounterTime = styled(Text)`
  text-align: center;
  font-weight: 400;
  font-size: ${({ theme: { getSize } }) => getSize(80)}px;
  line-height: ${({ theme: { getSize } }) => getSize(95)}px;
  margin-bottom: ${({ theme: { getSize } }) => getSize(5)}px;
`;

const BellTimeWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ theme: { getSize } }) => getSize(130)}px;
`;

const BellTime = styled(Text)`
  text-align: center;
  color: #8d8d92;
  font-weight: 400;
  font-size: ${({ theme: { getSize } }) => getSize(20)}px;
  line-height: ${({ theme: { getSize } }) => getSize(24)}px;
`;

const Test = styled.TouchableOpacity`
  width: 100px;
  height: 20px;
  background: red;
  margin-top: 50px;
  margin-left: 30px;
`;
const NromalText = styled(Text)`
  font-size: ${({ theme: { getSize } }) => getSize(16)}px;
  line-height: ${({ theme: { getSize } }) => getSize(19.09)}px;
`;

