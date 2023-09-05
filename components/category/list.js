import React from "react";
import styled from "styled-components/native";
import Divider from "components/divider";
import CategoryTile from "components/category/tile";
import Text from "components/text";
import { FlatList, TouchableOpacity } from "react-native";
import { useMock } from "services/mock";
import Box from "components/box";

const TitleContainer = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  margin-bottom: 10px;
`;

export const CategoryList = ({ categories }) => {
  return (
    <>
      <TitleContainer>
        <Text fontWeight="600" fontSize="xl" color="white">
          Sounds by Category
        </Text>
      </TitleContainer>

      <FlatList
        showsHorizontalScrollIndicator={false}
        data={categories}
        horizontal
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => {
          return (
            <Box mr={index === categories.length - 1 ? 0 : "10px"}>
              <CategoryTile category={item} inlineTitle={false} />
            </Box>
          );
        }}
      />

      <Divider />
    </>
  );
};
