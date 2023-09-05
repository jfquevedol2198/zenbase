import styled from "styled-components/native";
import { Text } from "components";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { useTheme } from "stores/theme";
import inviteIcon from "assets/icons/invite.png";
import { useAuth } from "stores/auth";
import { ReactNativeShare } from "helpers";
import friendsIcon from "assets/icons/friends.png";
export default function InviteFriend(props) {
  const { label = "", onPress = () => {} } = props;
  const { theme } = useTheme();
  const { user } = useAuth();

  const onPressNavigateToNextScreen = () => {
    navigation.navigate("PremiumTrial");
  };

  const inviteFriend = (message) => {
    ReactNativeShare(
      message,
      onPressNavigateToNextScreen,
      () => {
        // Dismissed
      },
      (err) => {
        // Error
      }
    );
  };



  return (
    <Wrapper>
      {/* <Icon source={inviteIcon} /> */}
      <Icon source={friendsIcon} />
      <View>
        <TouchableOpacity       onPress={() =>
                inviteFriend(
                  `${user?.name} is inviting you to meditate with them. Zenbase is the fastest-growing meditation app with cryptocurrency rewards. \n\nJoin Here: https://apps.apple.com/in/app/zenbase-meditate-to-earn/id1619530022`
                )
              }
>
        <Info>Invite or join friends</Info>

        <CoinWrapper>
          <Invites>{label} With Friends</Invites>

          <Ionicons
            name="ios-chevron-forward"
            style={{ marginTop: 1, marginLeft: -5 }}
            size={18}
            color={theme.color.information}
          />
        </CoinWrapper>
        </TouchableOpacity>
      </View>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  margin-top:-20px
`;
const Icon = styled.Image`
  width: 70px;
  height: 70px;
  margin-right: 13px;
`;
const Info = styled(Text)`
  font-size: 14px;
  color: ${({ theme }) => theme?.color?.description};
`;

const CoinWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Invites = styled(Text)`
  font-weight: 600;
  font-size: 24px;
  margin-right: 9px;
`;
