import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { useTimer } from "../contex";
import BellIconCard from "./bellIconCard";

export default function BellCard(props) {
  const { id, title, icon, width, height } = props;
  const { setSelectedBell = () => {} } = useTimer();
  return (
    <Wrapper width={Dimensions.get("window").width * 0.5}>
      <ContentWrapper
      //  onPress={() => setSelectedBell(id)}
      >
        <BellIconCard {...props} />
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  width: ${({ width }) => width};
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const ContentWrapper = styled.View``;
