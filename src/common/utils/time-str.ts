export const timeStr = (timeStamp: number) =>
  new Date(timeStamp * 1000).toLocaleString();
