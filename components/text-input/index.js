import React, { useState } from "react";
import styled from "styled-components/native";

const Input = styled.TextInput``;

export default function TextInput({
  onFocusStyle = {},
  style = {},
  StyledComponent = null,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);

  const newProps = {
    style: [style, isFocused ? onFocusStyle : {}],
    onFocus: () => {
      setIsFocused(true);
    },
    onBlur: () => {
      setIsFocused(false);
    },
    ...props,
  };

  if (StyledComponent) {
    return <StyledComponent {...newProps} />;
  }
  return <Input {...newProps} />;
}
