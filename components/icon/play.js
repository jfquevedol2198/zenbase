import React from "react";
import Svg, { Path } from "react-native-svg";

function IconPlay({ fill = "#8B57FF", ...props }) {
  return (
    <Svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M13.237 7.16l-8.49-5.002C4.056 1.752 3 2.146 3 3.15v10.001c0 .902.982 1.445 1.746.993l8.49-5a1.15 1.15 0 000-1.985z"
        fill={fill}
      />
    </Svg>
  );
}

const MemoIconPlay = React.memo(IconPlay);
export default MemoIconPlay;
