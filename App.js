import React, { useEffect } from "react";
import { AuthProvider } from "stores/auth";
import { ThemeProvider } from "stores/theme";
import Navigation from "components/navigation";
import { LoaderProvider } from "stores/loader";
import { SongQueueProvider } from "stores/song-queue";
import * as Notifications from "helpers/notifications";
import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";
import { queryClient, QueryClientProvider } from "query/client";
import { StripeProvider } from "@stripe/stripe-react-native";
import config from "./config";
import { PassiveEarningProvider } from "./stores/passiveEarning";
import Toast from 'react-native-toast-message';
import Timer from "./screens/timer";

Notifications.init();

export default function App() {
  useEffect(() => {
    (async () => {
      const { status } = await requestTrackingPermissionsAsync();
      console.log(`Permission to track data: ${status}`);
    })();
  }, []);

  return (
    <StripeProvider
      publishableKey={config.MODE === 'development' ? config.STRIPE_TEST_KEY : config.STRIPE_LIVE_KEY}
      merchantIdentifier={config.STRIPE_MERCHANT_ID} // required for Apple Pay
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <SongQueueProvider>
         
            <AuthProvider>
              <PassiveEarningProvider>
                <LoaderProvider>
                  <Navigation />
              
                  <Toast />
                </LoaderProvider>
              </PassiveEarningProvider>
            </AuthProvider>
          </SongQueueProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </StripeProvider>
  );
}


