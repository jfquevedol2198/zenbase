import { useEffect, useRef, useState,useContext } from "react";
import { Text, Container, Canvas, Button } from "components";
import styled from "styled-components/native";
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker';

import { useTimer } from "../contex";
import { useTheme } from "stores/theme";
import { TextInput,TouchableOpacity,TouchableWithoutFeedback, View  } from "react-native";

const InputWrapper = styled.View`
  margin-top: ${({ theme: { getSize } }) => getSize(6)}px;
  margin-bottom: ${({ theme: { getSize } }) => getSize(10)}px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #1e1f20;
  width: ${({ theme: { getSize } }) => getSize(253)}px;
  border: ${({ isClicked, theme: { color } }) =>
  isClicked ? `1px #6B26FF` : color?.card}; 
&:focus {
  outline: none;
}
  border-radius: ${({ theme: { getSize } }) => getSize(13.1096)}px;
  margin-left: auto;
  margin-right: auto;
  height: ${({ theme: { getSize } }) => getSize(50)}px;
`;

const Wrap = styled.View`
  margin-top: ${({ theme: { getSize } }) => getSize(36)}px;
  // margin-bottom: ${({ theme: { getSize } }) => getSize(-50)}px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #1e1f20;
  width: ${({ theme: { getSize } }) => getSize(200)}px;
  border: ${({ isClicked, theme: { color } }) =>
  isClicked ? `1px #6B26FF` :'1px #6B26FF'}; 
&:focus {
  outline: none;
}
  border-radius: ${({ theme: { getSize } }) => getSize(13.1096)}px;
  margin-left: auto;
  margin-right: auto;
  height: ${({ theme: { getSize } }) => getSize(40)}px;
`;



const InputSeperator = styled(Text)`
  font-weight: 400;
  font-size: ${({ theme: { getSize } }) => getSize(24)}px;
  line-height: ${({ theme: { getSize } }) => getSize(29)}px;
`;
const Input = styled.TextInput`
  width: ${({ theme: { getSize } }) => getSize(30)}px;
  font-size: ${({ theme: { getSize } }) => getSize(24)}px;
  color: ${(props) => props.theme.color.white};
  /* margin-left: ${({ theme: { getSize } }) => getSize(5)}px;
  margin-right: ${({ theme: { getSize } }) => getSize(5)}px; */
  font-weight: 400;
  font-size: ${({ theme: { getSize } }) => getSize(24)}px;
  line-height: ${({ theme: { getSize } }) => getSize(29)}px;
  text-align: center;
`;
const NromalText = styled(Text)`
  font-size: ${({ theme: { getSize } }) => getSize(16)}px;
  line-height: ${({ theme: { getSize } }) => getSize(19.09)}px;
`;
function TimerInputs() {
  const { timeInput, setTimeInput } = useTimer();
  const { theme } = useTheme();
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const [scrollState, setScrollState] = useState(null); 
  const { timerBellListData = [], selectedBell, setSelectedBell = () => {} } = useTimer();
  const selectedBellListIndex = timerBellListData?.findIndex(({ id }) => id === selectedBell);
  const [isClicked, setIsClicked] = useState(false);
  const { viewTitle, title } = timerBellListData[selectedBellListIndex];
  const { intervltimeInput, setIntervlTimeInput } = useTimer();


  const [showPicker, setShowPicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());

  const handlePickerButtonPress = () => {
    setIsClicked(true)
    setShowPicker(true);
    setScrollState(selectedTime);
  };
  const handlePickerChange = (event, selected) => {
    if (selected) {
    
      setSelectedTime(selected);
      setShowPicker(false); // Close the picker after selecting a time
      const hours = selected.getHours().toString().padStart();
      const minutes = selected.getMinutes().toString().padStart();
      const seconds = selected.getSeconds().toString().padStart();
      const updatedTimeInput = [hours, minutes, seconds];
      setTimeInput(updatedTimeInput);
    }
  };

  const handlePickerScroll = (event) => {
    // Update the scroll state while scrolling
    setScrollState(event.nativeEvent.contentOffset);
  };


  const handlePickerClose = () => {
    setShowPicker(false);
    if (scrollState !== null) {
      // Restore the selectedTime after scrolling
      const restoredTime = new Date(selectedTime);
      restoredTime.setHours(scrollState.x / 60); // Assuming each unit is 1 minute
      restoredTime.setMinutes(scrollState.y / 60);
      restoredTime.setSeconds(scrollState.y / 60);
      setSelectedTime(restoredTime);
    }
  };



  // useEffect(() => {
  //   inputRefs[0].current.focus();
  // }, []);

  return (
   

  
    <>
 
    <Wrap>
    
    

    <NromalText>{viewTitle || title}</NromalText>
   
  
    </Wrap>
    
    <TouchableOpacity  onPress={handlePickerButtonPress}    >
    {/* <TouchableWithoutFeedback onPress={() => setIsClicked(true)}> */}
        <InputWrapper  isClicked={isClicked} >
       
        <Input
          showSoftInputOnFocus={false}
          selectionColor={theme.color.white}
          keyboardType={null}
          // returnKeyType="done"
          maxLength={2}
          // ref={inputRefs[0]}
          // onFocus={() => setActiveInputIndex(0)}
          onChangeText={(value) => {
            if (value !== '' && value?.length === 2) {
              // inputRefs[1].current.focus();
            }
           
            const updatedtimeInput = [...timeInput];
            updatedtimeInput[0] = `${value}`;
            setTimeInput(updatedtimeInput);
          }}
          onKeyPress={(e) => {
            if (
              e.nativeEvent.key !== 'Backspace' &&
              e.nativeEvent.value !== '' &&
              e.nativeEvent.value?.length === 2
            ) {
              inputRefs[1].current.focus();
            }
          }}
          value={timeInput[0]}
          blurOnSubmit={true}
        />

     
        <InputSeperator>:</InputSeperator>
        <Input
        showSoftInputOnFocus={false}
          selectionColor={theme.color.white}
          keyboardType={"numeric"}
          maxLength={2}
          // returnKeyType="done"
          ref={inputRefs[1]}
          onChangeText={(value) => {
            if (value !== "" && value?.length === 2) {
              inputRefs[2].current.focus();
            }

            const updatedtimeInput = [...timeInput];
            updatedtimeInput[1] = `${value}`;
            setTimeInput(updatedtimeInput);
          }}
          onKeyPress={(e) => {
            if (
              e.nativeEvent.key == "Backspace" &&
              e.nativeEvent.value === undefined &&
              e.nativeEvent.value === ""
            ) {
              inputRefs[0].current.focus();
            } else if (e.nativeEvent.value !== "" && e.nativeEvent.value?.length === 2) {
              inputRefs[2].current.focus();
            }
          }}
          value={timeInput[1]}
          blurOnSubmit={true}
        />
        {/* <InputSeperator>:</InputSeperator>
        <Input
        showSoftInputOnFocus={false}
          selectionColor={theme.color.white}
          keyboardType={"numeric"}
          maxLength={2}
          // returnKeyType="done"
          ref={inputRefs[2]}
          onChangeText={(value) => {
            if (value !== "" && value?.length === 2) {
              // inputRefs[3].current.focus();
            }

            const updatedtimeInput = [...timeInput];
            updatedtimeInput[2] = `${value}`;
            setTimeInput(updatedtimeInput);
          }}
          onKeyPress={(e) => {
            if (
              e.nativeEvent.key == "Backspace" &&
              e.nativeEvent.value === undefined &&
              e.nativeEvent.value === ""
            ) {
              inputRefs[1].current.focus();
            } else if (e.nativeEvent.value !== "" && e.nativeEvent.value?.length === 2) {
              inputRefs[2].current.focus();
            }
          }}
          value={timeInput[2]}
          blurOnSubmit={true}
        />
         */}
       
      </InputWrapper>
      {/* </TouchableWithoutFeedback> */}
      </TouchableOpacity>
    
      
      {showPicker && (
      <DateTimePicker
      textColor="white"
      style={{ }} 
        value={selectedTime}
        mode="time"
       
        is24Hour={true}
        display="spinner"
        onChange={handlePickerChange}
          onScroll={handlePickerScroll} // Add this line to handle scroll
          onClose={handlePickerClose} 
      
      />
    )}


      </>
  
   
  );
}
export default function TimeSelection(props) {
  const { selectedTime, setSelectedTime, timeLib } = useTimer();

  const timeList = [
    { id: "hour", label: "", min: 0, max: 23, title: "hours" },
    { id: "min", label: "", min: 0, max: 59, title: "min" },
    { id: "second", label: "", min: 0, max: 59, title: "sec" },
  ];

  // console.log("Time: ", selectedTime);
  return (
    <TouchableWithoutFeedback>
    <Wrapper >
  
      <PickerWrapper>
      

        
      
        <TimerInputs />
    
        {/* <NumberPlease
          pickerStyle={{
            width: 90,
            backgroundColor: "red",
            marginRight: -9,
            marginLeft: -9,
            marginLeft: -9,

            fontSize: 12,
          }}
          itemStyle={{ backgroundColor: "red" }}
          digits={timeList}
          values={selectedTime}
          onChange={(values) => setSelectedTime(values)}
        /> */}
      </PickerWrapper>
      {/* <RNDateTimePicker
        textColor={"#fff"}
        style={{ height: 80, width: "100%" }}
        display="spinner"
        mode={"time"}
        // minuteInterval={10}
        value={new Date("July 1, 1999, 12:00:00")}
      /> */}

      {/* <RNDateTimePicker minuteInterval={10} />
      <NumberPlease digits={date} values={birthday} onChange={(values) => setBirtday(values)} /> */}
      </Wrapper>
    </TouchableWithoutFeedback>
  );
}

const Wrapper = styled.View`
width: 100%;
  
`;
const PickerWrapper = styled.View``;
const Title = styled(Text)``;
