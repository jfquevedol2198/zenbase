import zentokenIcon from "assets/icons/zentoken.png";
import giftIcon from "assets/icons/gift.png";
import bitCoinIcon from "assets/icons/bitcoin.png";
import styled from "styled-components/native";
import { useAuth } from "stores/auth";
import { Text } from "components";
import { Fragment } from "react";
import { useNavigation } from "@react-navigation/native";
import { usePassiveEarning } from "stores/passiveEarning";
const TT = styled(Text)``;
export default function WalletGridCard(props) {
  const navigation = useNavigation();
  const { passiveEarningStart, timerLib, passiEarningRunning } = usePassiveEarning();
  const { walletAmount, zenTransactions, fetchTransactions } = useAuth();
  const started = passiEarningRunning;

  const ZenCardIsClickable = started ? Fragment : ZenCardClickWrapper;

  const zenClickableProps = started ? {} : { onPress: () => passiveEarningStart() };

  return (
    <>
      {/* <TT>{JSON.stringify({ timerLib, passiEarningRunning }, null, 2)}</TT> */}
      <Wrapper>
        <ColWrapper>
          <ZenCardIsClickable {...zenClickableProps}>
            <ZenCard>
              <ZenIcon source={zentokenIcon} disabled={!started} />
              <HeadText disabled={!started}>{Number(walletAmount).toFixed(6)}</HeadText>
              <EarnZen>Earning ZENT/hr.</EarnZen>
              {!started ? (
                <UseZen>Use Zenbase to earn passively for 24-hours</UseZen>
              ) : (
                <>
                  <PassiveEarning>Passive earning ends in</PassiveEarning>
                  <PassiveEarningTime>
                    {timerLib?.hours}:{timerLib?.minutes}:{timerLib?.seconds}
                  </PassiveEarningTime>
                </>
              )}
            </ZenCard>
          </ZenCardIsClickable>
        </ColWrapper>
        <ColWrapper>
          <ActionWrapper>
            <CryptoCard>
              <BitCoinIcon source={bitCoinIcon} />
              <HeadText disabled>Crypto Wallet</HeadText>
            </CryptoCard>
            <RedeemCard onPress={() => navigation.navigate("Redeem")}>
              <GiftIcon source={giftIcon} />
              <HeadText>Redeem</HeadText>
            </RedeemCard>
          </ActionWrapper>
        </ColWrapper>
      </Wrapper>
    </>
  );
}
const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: ${({ theme: { getSize } }) => getSize(40)}px;
`;

const ActionWrapper = styled.View``;

const Card = ({ theme: { getSize } }) => `
  background: #1e1f20;
  border-radius: ${getSize(10)}px;
`;

const ColWrapper = styled.View`
  width: 50%;
  flex: 0 0 50%;
`;

const ZenCardClickWrapper = styled.TouchableOpacity``;
const ZenCard = styled.View`
  ${Card}
  min-height: ${({ theme: { getSize } }) => getSize(177)}px;
  padding: ${({ theme: { getSize } }) => getSize(15)}px;
  padding-right: ${({ theme: { getSize } }) => getSize(10)}px;
  margin-right: ${({ theme: { getSize } }) => getSize(5)}px;
`;

const CryptoCard = styled.View`
  ${Card}
  min-height: ${({ theme: { getSize } }) => getSize(84)}px;
  padding-top: ${({ theme: { getSize } }) => getSize(16)}px;
  padding-left: ${({ theme: { getSize } }) => getSize(15)}px;
  margin-left: ${({ theme: { getSize } }) => getSize(5)}px;
  margin-bottom: ${({ theme: { getSize } }) => getSize(10)}px;
`;

const RedeemCard = styled.TouchableOpacity`
  ${Card} margin-left: 5px;
  padding-top: ${({ theme: { getSize } }) => getSize(16)}px;
  padding-left: ${({ theme: { getSize } }) => getSize(15)}px;
  min-height: ${({ theme: { getSize } }) => getSize(83)}px;
`;
const ZenIcon = styled.Image`
  width: ${({ theme: { getSize } }) => getSize(40)}px;
  height: ${({ theme: { getSize } }) => getSize(40)}px;
  margin-bottom: ${({ theme: { getSize } }) => getSize(10)}px;
  tint-color: ${({ disabled }) => (disabled ? "rgba(255, 255, 255, 0.35)" : "#fff")};
`;

const BitCoinIcon = styled.Image`
  width: ${({ theme: { getSize } }) => getSize(17.07)}px;
  height: ${({ theme: { getSize } }) => getSize(24)}px;
  margin-bottom: ${({ theme: { getSize } }) => getSize(10)}px;
`;

const GiftIcon = styled.Image`
  width: ${({ theme: { getSize } }) => getSize(21.6)}px;
  height: ${({ theme: { getSize } }) => getSize(24)}px;
  margin-bottom: ${({ theme: { getSize } }) => getSize(10)}px;
`;
const HeadText = styled(Text)`
  font-weight: 700;
  font-size: ${({ theme: { getSize } }) => getSize(20)}px;
  line-height: ${({ theme: { getSize } }) => getSize(24)}px;
  color: ${({ disabled }) => (disabled ? "rgba(255, 255, 255, 0.35)" : "#fff")};
`;
const EarnZen = styled(Text)`
  color: #8f9094;
  font-size: ${({ theme: { getSize } }) => getSize(16)}px;
  line-height: ${({ theme: { getSize } }) => getSize(19)}px;
  margin-bottom: ${({ theme: { getSize } }) => getSize(13)}px;
`;
const UseZen = styled(Text)`
  font-size: ${({ theme: { getSize } }) => getSize(14.5)}px;
  line-height: ${({ theme: { getSize } }) => getSize(19)}px;
`;

const PassiveEarning = styled(Text)`
  font-size: ${({ theme: { getSize } }) => getSize(14)}px;
  line-height: ${({ theme: { getSize } }) => getSize(17)}px;
  margin-bottom: ${({ theme: { getSize } }) => getSize(3)}px;
`;

const PassiveEarningTime = styled(Text)`
  font-size: ${({ theme: { getSize } }) => getSize(16)}px;
  line-height: ${({ theme: { getSize } }) => getSize(19)}px;
  color: ${({ theme: { color } }) => color.green};
  letter-spacing: 0.05em;
`;
