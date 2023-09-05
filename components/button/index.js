import React from "react";
import Text from "components/text";
import styled from "styled-components/native";
import Icon from "components/icon";

const variants = {
  white: {
    background: "white",
    color: "black",
  },
  primary: {
    background: "primary",
    color: "white",
  },
  primaryDark: {
    background: "primaryDark",
    color: "white",
  },
  primaryDarker: {
    background: "primaryDarker",
    color: "white",
  },
  secondary: {
    background: "hud",
    color: "white",
  },
  disabled: {
    background: "hud",
    color: "informationBackground",
  },
  information: {
    background: "informationBackground",
    color: "information",
  },
  danger: {
    background: "red",
    color: "white",
  },
  silent: {
    background: "transparent",
    color: "primary",
  },
  silentDisabled: {
    background: "transparent",
    color: "informationBackground",
  },
};

const TouchableOpacityWrapper = styled.TouchableOpacity`
  ${(props) => {
    if (props.block) {
      return `width: 100%;`;
    } else if (props.width) {
      return `width: ${props.width}px;`;
    } else {
      return `width: auto;`;
    }
  }}
`;

const ButtonWrapper = styled.View`
  background: ${(props) =>
    props.variant
      ? props.theme.color[variants[props.variant]?.background] || props.theme.color.primary
      : props.theme.color.primary};

  ${(props) => {
    if (props.block) {
      return `width: 100%;`;
    } else if (props.width) {
      return `width: ${props.width}px;`;
    } else {
      return `width: auto;`;
    }
  }}
  height: ${(props) => (props.height ? `${props.height}px` : "42px")};
  padding-horizontal: ${(props) =>
    props.horizontalPadding ? props.horizontalPadding + "px" : props.theme.spacing.xxl};
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius + "px" : "7.5px")};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const TextWrapper = styled(Text)`
  font-size: ${(props) => (props.fontSize ? props.fontSize + "px" : "16px")};
  color: ${(props) =>
    props.variant
      ? props.theme.color[variants[props.variant]?.color] || props.theme.color.white
      : props.theme.color.white};
  font-weight: 500;
`;

export default function Button({
  title,
  image = null,
  icon = null,
  iconProps = {},
  titleProps = {},
  ...props
}) {
  return (
    <TouchableOpacityWrapper {...props}>
      <ButtonWrapper {...props}>
        {icon && <Icon variant={icon} {...iconProps} />}
        {image ? image : null}
        <TextWrapper {...props} {...titleProps}>
          {title || "Button"}
        </TextWrapper>
      </ButtonWrapper>
    </TouchableOpacityWrapper>
  );
}
