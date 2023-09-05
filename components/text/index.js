import React from "react";
import styled from "styled-components/native";

const TextRenderer = styled.Text`
  color: ${(props) => (props.color ? props.theme.color[props.color] || props.color : "white")};

  font-size: ${(props) =>
    props.fontSize
      ? props.theme.fontSize[props.fontSize] || `${props.fontSize}px`
      : props.theme.fontSize.md};

  font-weight: ${(props) => props.fontWeight || "normal"};
`;

export default function Text(props) {
  return <TextRenderer {...props} />;
}
