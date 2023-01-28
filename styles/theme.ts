export const theme = {
  purple01: "#F3CCFF",
  purple02: "#D09CFA",
  purple03: "#A555EC",
  grey: "#CCD5DF",
  darkGrey: "#2F3747",
  blue01: "#8D9EFF",
  blue02: "#8D9EFF96",
  hoverBack: "rgba(0,0,0,0.1)",
  hoverBlue: "#8D9EFF4D",
  bgColor02: "rgba(0,0,0,0.2)",
  bgColor03: "#D9D9D966",
  bgColor04: "#D9D9D9AA",
  black04: "rgba(0,0,0,0.4)",
  black06: "rgba(0,0,0,0.6)",
  black08: "rgba(0,0,0,0.8)",
};

export const lightTheme = {
  ...theme,
  color: "#000000",
  bgColor: "#ffffff",
  bgColor01: "#27282E",
  textColor02: "#000000",
  borderColor: "#000000",
  borderColor01: "#77777733",
  botChat: "#ECEDEE",
};

export const darkTheme = {
  ...theme,
  color: "#ffffff",
  bgColor: "#0E1016",
  bgColor01: "#27282E",
  textColor02: "#C1C3C4",
  borderColor: "#ffffff",
  borderColor01: "#ffffff33",
  botChat: "#ECEDEE",
};

export type ThemeType = {
  purple01: string;
  purple02: string;
  purple03: string;
  color: string;
  bgColor: string;
  borderColor: string;
};

export type ThemeProvide = {
  theme: ThemeType;
};
