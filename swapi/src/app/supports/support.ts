import { MAX_LENGTH_TEXT } from '../data/constants';

const stringMaxLength = (value: string) => {
  if (value.length > MAX_LENGTH_TEXT) {
    return value.substring(0, MAX_LENGTH_TEXT);
  }

  return value;
};

const stringToNumber = (value: string) => {
  const result: number = +value;

  if (isNaN(result)) {
    return 0;
  }

  return result;
};

export { stringMaxLength, stringToNumber };
