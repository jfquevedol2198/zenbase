import { useState } from "react";
import styled from "styled-components/native";
import { Text, Container, Box } from "components";
import { FlatList } from "react-native";

export default function ActivitiesTabs(props) {
  const { title = "", tabContent = [] } = props;
  const [activeTab, setActiveTab] = useState(tabContent[0]?.id);

  const renderTabButtons = () => (
    <TabButtonWrapper>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={tabContent}
        horizontal
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => {
          const { id, name, icon = {} } = item;
          return (
            <Box
              pl={index == 0 ? 20 : null}
              mr={index === tabContent?.length - 1 ? "20px" : "10px"}
            >
              <TabButton active={id === activeTab} onPress={() => setActiveTab(id)}>
                { <Icon {...icon} />}
                <Text>{name}</Text>
              </TabButton>
            </Box>
          );
        }}
      />
    </TabButtonWrapper>
  );

  const currentTab = tabContent?.filter(({ id }) => id === activeTab)[0];

  return (
    <Wrapper>
      <Container>{title && <Title>{title}</Title>}</Container>
      {/* {renderTabButtons()} */}
      {currentTab && currentTab?.component}
      {/* {activeTab} */}
    </Wrapper>
  );
}
const Icon = styled.Image`
  width: ${({ width }) => width};
  height: ${({ height = "16px" }) => height};
  margin-right: 9px;
`;

const Wrapper = styled.View``;
const Title = styled(Text)`
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  margin-bottom: 14px;
`;
const TabButtonWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const TabButton = styled.TouchableOpacity`
  background: #333333;
  border-radius: 10px;
  height: 50px;
  padding: 0 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  border-color: ${({ active }) => (active ? "#8D8D92" : "transparent")};
  border-width: 1.5px;
`;
