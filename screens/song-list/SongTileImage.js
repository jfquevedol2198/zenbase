import { View, Text, Image, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from "react";

const SongTileImage = ({ source, ...props }) => {
  const [imageLoading, setImageLoading] = useState(true);


  // useEffect hook to handle image loading logic
  useEffect(() => {
    const image = Image.resolveAssetSource({ uri: source });
    Image.getSize(image.uri, () => {
      // Image has loaded successfully
      setImageLoading(false);
    }, () => {
      // Image failed to load
      setImageLoading(false);
    });
  }, [source]);

  return (
    <>
      {imageLoading ? (
        <View style={{ position: "absolute", top: 0, bottom: 100, left: -10, right: 20, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size="small" color="white" />
        </View>
      ) : (
        <Image
          source={{ uri: source }}
          // {...props} // You can spread additional props to the Image component if needed
          onLoad={() =>  setImageLoading(false)} // You can perform additional actions when the image is loaded
          onLoadEnd={() => setImageLoading(false)} // You can perform additional actions when the image loading ends
        />
      )}
    </>
  );
};

export default SongTileImage;









