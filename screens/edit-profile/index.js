import React, { useEffect, useState } from "react";
import { Container, Canvas, Text, Button } from "components";
import styled from "styled-components/native";
import { Alert, TouchableOpacity } from "react-native";
import { useTheme } from "stores/theme";
import * as ImagePicker from "expo-image-picker";
import Filter from "bad-words";

// Import Images
import profileImage from "assets/images/artist.png";

// Import Icons
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "stores/auth";
import axios from "services/axios";

// Styled Component
const EditProfileHeader = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: ${(props) => props.theme.spacing.md};
`;

const ProfileImageWrapper = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 50px;
`;

const EditButton = styled.TouchableOpacity`
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: ${(props) => props.theme.spacing.md};
  padding-right: ${(props) => props.theme.spacing.md};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.md};
  background-color: ${(props) => props.theme.color.primary};
  border-radius: ${(props) => props.theme.borderRadius.lg};
`;

const InputWrapper = styled.View`
  width: 100%;
  background-color: ${(props) => props.theme.color.hud};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  margin-top: ${(props) => props.theme.spacing.md};
`;

const InputGroup = styled.View`
  padding-left: ${(props) => props.theme.spacing.lg};
  height: 45px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const InputLabel = styled.View`
  flex: 1;
`;

const Input = styled.TextInput`
  max-width: 50%;
  color: ${(props) => props.theme.color.white};
  height: 45px;
  margin-right: ${(props) => props.theme.spacing.md};
  text-align: right;
`;

const HR = styled.View`
  margin-left: ${(props) => props.theme.spacing.lg};
  border-bottom-width: 0.5px;
  border-bottom-color: ${(props) => props.theme.color.informationBackground};
`;

const ErrorText = styled.Text`
  color: #fd3b30;
  margin: 10px;
`;

// Edti Profile Component (Default)
export default function EditProfile({ route, navigation }) {
  // Theme Configuration
  const { theme } = useTheme();

  const { user, updateUser, updateUserLocal, setUser } = useAuth();
  // Profile Image
  const [image, setImage] = useState(user?.image || null);



  // States
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [fullname, setFullname] = useState(user?.name);
  const [username, setUsername] = useState(user?.username);
  const [isValidUserName, setIsValidUserName] = useState(false);
  const [badWords, setBadWords] = useState([]);

  useEffect(() => {
    const filter = new Filter();
    const lowerBadWord = filter.list.map((element) => {
      return element.toLowerCase();
    });
    setBadWords(lowerBadWord);
  }, []);

  // Input Handler
  const updateInput = (setState, value) => {
    setState(value);

    let isExist = badWords.includes(value.toLowerCase());
    if (isExist) {
      setIsValidUserName(true);
    } else {
      setIsValidUserName(false);
    }
    if (!isProfileUpdated) {
      setIsProfileUpdated(true);
    }
  };


  const editProfile = async () => {
    try {
      setIsUpdating(true);
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        // aspect: [4, 4],
        quality: 1,
      });
     
      if (!result.canceled) {
        setImage(result.assets[0].uri);

        // Form Data to Save Photo
        let formData = new FormData();
        formData.append("image", {
          uri: result.assets[0].uri,
          name: "image.jpg",
          type: "image/jpeg",
        });
     
        const {
          data: { data: imageURL },
        } = await axios.patch("/auth/profile-image", formData);

      
        updateUserLocal("image", imageURL);
        console.log('URL : ', imageURL)
        setIsProfileUpdated(true);
        setIsUpdating(false);
      } else {
        setIsUpdating(false);
      }
    } catch (err) {
      // Error Handling
     
      setIsUpdating(false);
    }
  };

  const saveChanges = async () => {
    if (!isUpdating) {
      let isExistFullNameBadWord = badWords.includes(fullname.toLowerCase());
      let isExistUserNameBadWord = badWords.includes(username.toLowerCase());
      if (!isExistFullNameBadWord && !isExistUserNameBadWord) {
        setIsValidUserName(false);
        if (isProfileUpdated) {
          setIsUpdating(true);
          try {
            // Logic to save profile changes
            if (user?.name != fullname) {
              await updateUser("name", fullname, false, true);
              setUser({
                ...user,
                name: fullname,
              });
            }

            if (user?.username != username) {
            }
            await updateUser("username", username, false, true);
            setUser({
              ...user,
              name: fullname,
              username,
            });

            setIsUpdating(false);
            // Close Edit Profile Model after updating profile
            navigation.goBack();
          } catch (e) {
            Alert.alert("", e?.response?.data?.error, [{ text: "OK", onPress: () => {} }], {
              userInterfaceStyle: "dark",
            });
            setIsUpdating(false);
          }
        } else {
          navigation.goBack();
        }
      } else {
        setIsValidUserName(true);
      }
    }
  };

  const cacheBuster = Date.now();
const profileImageUrlWithCacheBuster = `${image}?cb=${cacheBuster}`;

  return (
    <Canvas>
      <EditProfileHeader>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          {/* <Ionicons name="ios-chevron-back" size={30} color={theme.color.primary} /> */}
        </TouchableOpacity>
        <Button
          variant={"silent"}
          title={isUpdating ? "Loading..." : "Done"}
          onPress={saveChanges}
        />
      </EditProfileHeader>
      <Container style={{ flex: 1 }}>
        <ProfileImageWrapper>
          <ProfileImage source={image ? { uri: profileImageUrlWithCacheBuster } : profileImage} resizeMode="cover" />
          
          <EditButton onPress={editProfile}>
            <Text color="white" fontSize="md">
              EDIT PHOTO
            </Text>
          </EditButton>
        </ProfileImageWrapper>

        <InputWrapper>
          {/* Full Name */}
          <InputGroup>
            <InputLabel>
              <Text>Name</Text>
            </InputLabel>
            <Input
              placeholder="Full Name"
              placeholderTextColor={theme.color.secondary}
              onChangeText={(value) => updateInput(setFullname, value)}
              value={fullname}
            />
          </InputGroup>
          {/* Full Name - End*/}

          <HR />

          {/* Username */}
          <InputGroup>
            <InputLabel>
              <Text>Username</Text>
            </InputLabel>
            <Text color="secondary">@</Text>
            <Input
              placeholder="username"
              placeholderTextColor={theme.color.secondary}
              onChangeText={(value) => updateInput(setUsername, value)}
              value={username}
              autoCapitalize="none"
            />
          </InputGroup>
          {/* Username - End*/}
        </InputWrapper>
        <ErrorText>{isValidUserName && "Name & Username not allowed bad words"}</ErrorText>
        <Text color="information" style={{ padding: 5, paddingTop: 10 }} fontSize="sm">
          Your photo, name, and username will be visible in Zenbase and web search results.
        </Text>
      </Container>
    </Canvas>
  );
}
