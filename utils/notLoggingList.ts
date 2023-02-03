export const notLogList = [
  "ho9gF0upkFgswQQem037xim55qa2",
  "Yn1cKFVNkSclOYSKm7N9d8Z3PRl2",
];

export enum LogType {
  SHARE = "share",
  SAVE = "save",
  COPY = "copy",
  VIEW = "view",
}

export type LogDataType = {
  loggedAt: any;
  type: LogType;
  questionId: string | number;
  userId: string;
};
