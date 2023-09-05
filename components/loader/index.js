import React from "react";
import styled from "styled-components/native";

const LoaderOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
  z-index: 1000000;
`;

export default function Loader() {
  return <LoaderOverlay />;
}
