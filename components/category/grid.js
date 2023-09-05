import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import CategoryTile from "components/category/tile";
import Text from "components/text";
import { View } from "react-native";

const TitleContainer = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding-left: 5px;
  padding-right: 10px;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const GridRow = styled.View`
  display: flex;
  flex-direction: row;
`;

const GridItem = styled.View`
  margin-right: 10px;
  margin-bottom: 10px;
`;

const CategoryGrid = ({ categories = [] }) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let categoryRowCount = Math.ceil(categories.length / 2);
    let count = 0;
    const _rows = [...new Array(categoryRowCount)]
      .map((_, index) => {
        const r = count;
        count += 2;
        return r;
      })
      .map((index) => {
        if (!categories[index + 1]) return [categories[index]];
        return [categories[index], categories[index + 1]];
      });
    setRows(_rows);
  }, []);

  return (
    <>
      <TitleContainer>
        <Text fontSize="xl" color="white">
          Browse Categories
        </Text>
      </TitleContainer>

      {rows?.map((row) => {
        return (
          <GridRow>
            <GridItem>
              <CategoryTile category={row[0]} inlineTitle={true} />
            </GridItem>
            {row[1] && (
              <GridItem>
                <CategoryTile category={row[1]} inlineTitle={true} />
              </GridItem>
            )}
          </GridRow>
        );
      })}
    </>
  );
};

export default CategoryGrid;
