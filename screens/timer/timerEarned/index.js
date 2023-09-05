import { useAuth } from "stores/auth";
import ZentTokenBanner from "components/zent-token-banner";
import Canvas from "components/canvas";
import { useTimer } from "../contex";
import Text from "components/text";
import styled from "styled-components/native";
import BellIconCard from "../timerBellList/bellIconCard";
import { Octicons } from "@expo/vector-icons";
import logo from "assets/logos/zentoken-flat-circle-logo.png";
import { useEffect, useState } from "react";
import Button from "components/button";
import { Container } from "components";
import { Dimensions } from "react-native";
import { Box } from "../../../components";
import { TIMER_STATUS_INITIAL } from "../keys";
import axios from "axios";

const windowHeight = Dimensions.get("window").height;

export default function TimerEarned(props) {
  const { secondsWorth, user, walletAmount, zenTransactions, fetchTransactions } = useAuth();

  const timerValues = useTimer();
  const {
    timerBellListData = [],
    selectedBell,
    setSelectedBell = () => {},
    time,
    timeLib,

    timeInput,
    setTimeInput,
    setTimerStatus,
    setEarnView,
    TotalHours,
    TotalMin,
    TotalSeconds,
    allSeconds,
  } = timerValues;
  const { seconds, minutes, hours, days, isRunning, start, pause, resume, restart } = timeLib;

  const amount = secondsWorth * allSeconds;

  const AMOUNT_OF_ZENTOKENS_TO_GIVE = user?.isPremium ? amount * 1.3 : amount;

  const transact = async () => {
    await axios.post("/transactions", {
      amount: AMOUNT_OF_ZENTOKENS_TO_GIVE,
      appreciatedFor: secondsWorth,
      type: "TIMER",
      remarks: "",
    });
    fetchTransactions();
  };

  const allTime =
    TotalHours > 0
      ? `${TotalHours} hours`
      : "" + TotalMin > 0
      ? `${TotalMin} min`
      : "" + TotalSeconds > 0
      ? `${TotalSeconds} sec`
      : "";

  const selectedBellListIndex = timerBellListData?.findIndex(({ id }) => id === selectedBell);
  return (
    <Canvas>
      <Container style={{ flex: 1 }}>
        <Wrapper>
          <ZentTokenBanner
            tokens={Number(walletAmount).toFixed(6)}
            usd={0}
            onPress={() => {
              // navigation.navigate("ZentDonation");
            }}
          />

          <BellIconWrapper>
            <BellIconCard
              {...timerBellListData[selectedBellListIndex]}
              title={`Timer • ${allTime}`}
            />
          </BellIconWrapper>
          <NormalView>
            <YouEarned>You’ve earned it.</YouEarned>
            <YouEarned style={{ marginBottom: 12 }}>{amount} ZENT</YouEarned>

            <Button
              title={"Claim to wallet"}
              block
              onPress={() => {
                transact();
                setEarnView(false);
                setTimerStatus(TIMER_STATUS_INITIAL);
                // navigation.navigate('Wallet')
              }}
            />
          </NormalView>
        </Wrapper>
      </Container>
    </Canvas>
  );
}
const Wrapper = styled.View`
  width: 100%;
 
  // flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  margin-top:30
`;

const BellIconWrapper = styled.View`
  margin-bottom: ${({ theme: { getSize } }) => getSize(81)}px;

`;

const YouEarned = styled(Text)`
  font-weight: 700;
  font-size: ${({ theme: { getSize } }) => getSize(32)}px;
  line-height: ${({ theme: { getSize } }) => getSize(38.19)}px;

`;

const NormalView = styled.View``;
