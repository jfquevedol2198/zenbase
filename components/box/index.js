import styled from "styled-components/native";

const Box = styled.View`
  display: flex;
  justify-content: flex-start;
  height: ${(props) => props.h || "auto"};
  width: ${(props) => props.w || "auto"};
  margin: ${(props) => props.m || "auto"};
  padding: ${(props) => props.p || "0"};

  /* Custom Margins */
  ${(props) => props.mt && `margin-top: ${props.mt};`}
  ${(props) => props.mb && `margin-bottom: ${props.mb};`}
  ${(props) => props.ml && `margin-left: ${props.ml};`}
  ${(props) => props.mr && `margin-right: ${props.mr};`}

  /* Custom Paddings */
  ${(props) => props.pt && `padding-top: ${props.pt};`}
  ${(props) => props.pb && `padding-bottom: ${props.pb};`}
  ${(props) => props.pl && `padding-left: ${props.pl};`}
  ${(props) => props.pr && `padding-right: ${props.pr};`}
`;

export default Box;
