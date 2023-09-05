import ExpoMixpanelAnalytics from "components/mixpanel";
import config from "../config";

const mixpanel = new ExpoMixpanelAnalytics(config.MIXPANEL_PROJECT_TOKEN);

mixpanel.track("Initialization", {
  api: config.API_URL,
});

export default mixpanel;
