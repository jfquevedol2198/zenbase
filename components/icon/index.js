import React from "react";
import MemoIconPlay from "components/icon/play";
import MemoIconMore from "components/icon/more";
import styled from "styled-components/native";

const IconWrapper = styled.View`
  margin: ${(props) => props.theme.spacing.sm};
`;

const getComponentFromVariant = (variant) => {
  if (variant === "play") return MemoIconPlay;
  if (variant === "more") return MemoIconMore;
  return MemoIconPlay;
};

export default function Icon({ variant, ...props }) {
  const IconComponent = getComponentFromVariant(variant);
  return (
    <IconWrapper>
      <IconComponent {...props} />
    </IconWrapper>
  );
}
