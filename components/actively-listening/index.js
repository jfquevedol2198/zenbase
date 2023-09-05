import styled from "styled-components/native";
import { Text } from "components";
import ZenbaseWhiteVector from "assets/vectors/zenbase-white.png";

import { ImageBackground, TouchableOpacity, StyleSheet, View } from "react-native";
import rectangle from "assets/vectors/Rectangle.png";
import zenbaselogo from '../../assets/logos/zentoken-flat-circle-logo.png'



const ActivelyListingView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 6px;
`;

const ZenbaseWhiteImage = styled.Image`
  width: 17px;
  height: 17px;
  margin-right: 5px;
`;

export default function ActivelyListing({ count = null }) {
  if (count === null) return null;

  return (


    <ActivelyListingView style={{ alignSelf: 'center',marginTop:'8%'}}>
      <TouchableOpacity >
        <ImageBackground source={rectangle} style={{   width:'100%',flexDirection: 'row', padding: '2%', justifyContent: 'center', paddingLeft: 0, paddingRight: 0,alignItems:'center' }}>

        
          <ZenbaseWhiteImage source={zenbaselogo}/>
          <Text color="white">
            {count} {count <= 1 ? 'person' : 'people'} Meditating now
          </Text>
        

        </ImageBackground>
      </TouchableOpacity>
    </ActivelyListingView>

  );
}
