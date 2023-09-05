import * as React from "react";
import { View, StyleSheet } from "react-native";
import { find } from "lodash";
import range from "./utils/range";
import { Picker } from "@react-native-picker/picker";
import styled from "styled-components/native";
import { Text } from "components";

const PickerFactory = ({ pickerProps, selectedValue, onChange, pickerStyle, itemStyle }) => {
  const { id, label = "", min, max } = pickerProps;
  const numbers = range(min, max);

  return (
    <Picker
      style={{ ...styles.picker, ...pickerStyle }}
      selectedValue={selectedValue}
      onValueChange={(value) => onChange({ id, value })}
      itemStyle={itemStyle}
    >
      {numbers.map((number, index) => (
        <Picker.Item
          color="#fff"
          key={`${id}-${number}-${index}`}
          value={number}
          label={`${number} ${label}`}
        />
      ))}
    </Picker>
  );
};

const NumberPlease = ({ digits, values, onChange, ...rest }) => {
  const onChangeHandle = (value, index) => {
    const temp = JSON.parse(JSON.stringify(values));
  
    temp[index] = value;
    onChange(temp);
  };

  return (
    <View style={styles.container}>
      {digits.map((picker, index) => {
        const pickerValues = find(values, { id: picker.id });
        return (
          <>
            <PickerFactory
              key={`${picker.id}-picker-${index}`}
              pickerProps={picker}
              selectedValue={pickerValues?.value}
              onChange={(e) => onChangeHandle(e, index)}
              {...rest}
            />
            <Text>{picker?.title}</Text>
          </>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  // picker: { height: "100%", width: 90 },
});

export default NumberPlease;
const Title = styled(Text)`
  font-size: ${({ theme: { getSize } }) => getSize(24)}px;
  line-height: ${({ theme: { getSize } }) => getSize(28.64)}px;
`;
