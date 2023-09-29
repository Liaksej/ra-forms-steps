export function utils(dateString: string) {
  console.log(dateString);
  let parts: string[] = dateString.split(".");
  return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
}

export const isValidDate = (date: string) => {
  const patternDate =
    /^([0-2][0-9]|(3)[0-1])\.(((0)[0-9])|((1)[0-2]))\.\d{2}(1[1-9]|2[0-9])$/;
  return patternDate.test(date);
};

export const isValidDistance = (distance: number) => {
  return !isNaN(distance) && distance > 0;
};
