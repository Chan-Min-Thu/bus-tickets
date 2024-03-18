export const dupilcated = (arr: string[]) => {
  return arr.filter((element: string, index: number) => {
    return arr.indexOf(element) === index;
  });
};

export const getTime = (date: Date, hh: number) => {
  date.setHours(date.getHours() + hh);
  return date;
};

export const compareValue = (val: number) => {
  return val < 10 ? "0" + val : val;
};
