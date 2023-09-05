// Import Dependencies
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuth } from "stores/auth";

// Import Components
import { TabBar } from "components";

// Import Screens
import Login from "screens/auth/login";
import Register from "screens/auth/register";
import Home from "screens/home";
import Profile from "screens/profile";
import Favorites from "screens/favorites";
import Wallet from "screens/wallet";
import Search from "screens/search";
import Followers from "screens/followers";
import Sounds from "screens/sounds";
import Settings from "screens/settings";
import EditProfile from "screens/edit-profile";
import Journal from "screens/journal";
import ZentDonation from "screens/zent-donation";
import DonationThanks from "screens/zent-donation/donation-thanks";
import FavoritesType from "screens/favorites/favorites-type";
import ForgotPassword from "screens/auth/forgot-password";
import OneTimePassword from "screens/auth/otp";
import SignupBonus from "screens/signup-bonus";
import ReferFriends from "screens/refer-friends";
import ZenbaseAds from "screens/zenbase-ads";
import SongList from "screens/song-list";
import RegisterRewards from "screens/auth/register-rewards";
import PremiumTrial from "screens/auth/premium-trial";
import PremiumTrailEnded from "screens/home/premium-trail-ended";
import WalletRewards from "screens/wallet/wallet-rewards";
import WalletPremium from "screens/wallet/wallet-premium";
import CancelPremium from "screens/profile/cancel-premium";
import PremiumUpgrade1 from "screens/play/premium-upgrade-1";
import PremiumUpgrade2 from "screens/play/premium-upgrade-2";
import SearchModal from "screens/search/modal";
import Play from "screens/play";
import AddJournal from "screens/journal/add";
import ClaimToWallet from "screens/play/claim-to-wallet";
import EnableNotification from "screens/play/enable-notification";
import TotalEarnings from "screens/play/total-earnings";
import JournalUpgradeToZenbase from "screens/journal/upgrade-to-zenbase";
import ChangePassword from "screens/auth/change-password";
import UserProfile from "screens/followers/user";
import DeleteAccount from "screens/delete-account";
import LoginForm from "screens/auth/login/form";
import { useLoader } from "stores/loader";
import Rewards from "screens/rewards";
import SplashScreen from "screens/splash-screen";
import Timer from "screens/timer";
import EarningTeam from "screens/earning-team";
import AmbientSoundSelection from "screens/timer/ambientSoundSelection";
import UpgradePremium from "screens/upgrade-premium";
import UpgradePremiumSuccessfully from "screens/upgrade-premium/success";
import JournalEntry from "screens/journal/journal-entry";
import Redeem from "screens/redeem";

// Create Stack Navigator
const Stack = createNativeStackNavigator();

// Create Bottom Tab Navigator
const Tabs = createBottomTabNavigator();

const TimerStack=createNativeStackNavigator();

export function TimerNavigator(){

  return(
    <TimerStack.Navigator screenOptions={{headerShown:false}}>
     <TimerStack.Screen name="Timer" component={Timer}/>

    </TimerStack.Navigator>
  )
}

/**
 * **********
 * Components
 * **********
 */

// Bottom Tab Navigator
export function HomeStack() {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...props} />}
      backBehavior="history"
    >
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="TimerNavigator" component={TimerNavigator} />
      <Tabs.Screen name="Search" component={Search} />
      <Tabs.Screen name="Wallet" component={Wallet} />
      <Tabs.Screen name="Favorites" component={Favorites} />
      <Tabs.Screen name="FavoritesType" component={FavoritesType} />
      <Tabs.Screen name="Profile" component={Profile} />

      <Tabs.Screen name="Sounds" component={Sounds} />
     
        
    </Tabs.Navigator>
  );
}

// Navigation Component (Default)
export default function Navigation() {
  const { renderLoader } = useLoader();

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          // initialRouteName="Timer"
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Group>
            <Stack.Screen name="SongList" component={SongList} />
            <Stack.Screen name="Followers" component={Followers} />
            <Stack.Screen name="EarningTeam" component={EarningTeam} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="LoginForm" component={LoginForm} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="App" component={HomeStack} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Journal" component={Journal} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="OTP" component={OneTimePassword} />
            <Stack.Screen name="SignupBonus" component={SignupBonus} />
            <Stack.Screen name="ReferFriends" component={ReferFriends} />
            <Stack.Screen name="Rewards" component={Rewards} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="AmbientSoundSelection" component={AmbientSoundSelection} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="UpgradePremium" component={UpgradePremium} />
            <Stack.Screen name="JournalEntry" component={JournalEntry} />
            <Stack.Screen name="DeleteUser" component={DeleteAccount} />
            <Stack.Screen name="Play" component={Play} />
            
          </Stack.Group>

          <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
            <Stack.Screen
              name="UpgradePremiumSuccessfully"
              component={UpgradePremiumSuccessfully}
            />
            <Stack.Screen name="Redeem" component={Redeem} />
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="ZentDonation" component={ZentDonation} />
            <Stack.Screen name="DonationThanks" component={DonationThanks} />
            <Stack.Screen name="ZenbaseAds" component={ZenbaseAds} />
            <Stack.Screen name="SearchModal" component={SearchModal} />
            <Stack.Screen name="AddJournal" component={AddJournal} />
        
            {/* <Stack.Screen name="Play" component={Play} /> */}
            <Stack.Screen name="ClaimToWallet" component={ClaimToWallet} />
            <Stack.Screen name="EnableNotification" component={EnableNotification} />
            <Stack.Screen name="TotalEarnings" component={TotalEarnings} />

            {/* CTAs */}
            <Stack.Screen name="RegisterRewards" component={RegisterRewards} />
            <Stack.Screen name="PremiumTrial" component={PremiumTrial} />
            <Stack.Screen name="PremiumTrailEnded" component={PremiumTrailEnded} />
            <Stack.Screen name="WalletRewards" component={WalletRewards} />
            <Stack.Screen name="WalletPremium" component={WalletPremium} />
            <Stack.Screen name="CancelPremium" component={CancelPremium} />
            <Stack.Screen name="PremiumUpgrade1" component={PremiumUpgrade1} />
            <Stack.Screen name="PremiumUpgrade2" component={PremiumUpgrade2} />
            <Stack.Screen name="JournalUpgradeToZenbase" component={JournalUpgradeToZenbase} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
      {renderLoader()}
    </>
  );
}
