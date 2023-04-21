export const warning = (condition: any, message: string) => {
  if (condition && process.env.NODE_ENV !== "production") {
    console.warn(message);
  }
};