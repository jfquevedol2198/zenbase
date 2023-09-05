import styled from "styled-components/native";
import { Text } from "components";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { useTheme } from "stores/theme";
import zentLogo from "assets/logos/zent-coin.png";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../stores/auth";
import { usePassiveEarning } from "stores/passiveEarning";

export default function ZentCoin(props) {
  const {} = props;
  const { passiveEarningStart, timerLib, passiEarningRunning } = usePassiveEarning();
  const { walletAmount, user } = useAuth();
  const { theme } = useTheme();
  const navigation = useNavigation();

  const info = user?.isPremium
    ? "Earning 30% more with Zenbase Premium"
    : "Earn 30% more with Zenbase Premium";
  const coins = `${Math.round(walletAmount * 100) / 100} ZENT`;
  const time =
    timerLib?.hours !== 0 && timerLib?.minutes !== 0 && timerLib?.seconds !== 0 ? (
      <>
        {timerLib?.hours}:{timerLib?.minutes}:{timerLib?.seconds}
      </>
    ) : (
      ""
    );
  // const time = "";

  return (
    <Wrapper
    style={{marginTop:'6%'}}
      onPress={() => {
        // user?.isPremium
        //   ? navigation.navigate("Wallet")
          // : 
          navigation.navigate("UpgradePremium", {
              previousScreenName: "Home",
            });
      }}
    >
     
      <ZentIcon source={zentLogo} />
      <View>
        <Info style={{color:'white',marginTop:"1.6%"}}>{info}</Info>
        <CoinWrapper>
          <Coins>{coins}</Coins>
          {time && <Time>{time}</Time>}
          <Entypo
            style={{ marginLeft: -6, marginTop: 2 }}
            name="chevron-right"
            size={20}
            color={theme.color.information}
          />
        </CoinWrapper>
      </View>
    
    </Wrapper>
  );
}

const Wrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;
const ZentIcon = styled.Image`
  width: 36.56px;
  height: 40px;
  margin-right: 13px;
`;
const Info = styled(Text)`
  font-size: 14px;
  color: ${({ theme }) => theme?.color?.description};
  margin-right: 9px;
`;

const CoinWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CoinsText = styled(Text)`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  margin-right: 9px;
`;

const Coins = styled(CoinsText)``;

const Time = styled(CoinsText)`
  color: ${({ theme }) => theme?.color?.green};
`;
