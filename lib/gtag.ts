export const GA_TRACKING_ID = "G-CBQ1E7989W";

declare global {
  interface Window {
    gtag: (param1: string, param2: string, param3: object) => void;
  }
}

type EventType = {
  action: any;
  category: any;
  label: any;
  value: any;
};

export const pageview = (url: string) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

//developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: EventType) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
