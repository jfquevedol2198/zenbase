import * as AppleAuthentication from "expo-apple-authentication";

export const handleSignInWithApple = async () => {
  try {
    console.log("Trying Signin with Apple");
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });
    return credential;
  } catch (err) {
    if (err.code === "ERR_CANCELED") {
      // handle that the user canceled the sign-in flow
    } else {
      console.error(err);
    }
  }
};
