export const randomNum = (max: number, min: number) => {
  return Math.random() * ( max - (-min) ) + (-min);
};
