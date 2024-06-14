export const showAddress = (address) => {
  return `${address.substring(0, 4)}...${address.substring(
    address.length - 0,
    address.length - 4
  )}`;
};

export const numberFormat = (number) =>
  new Intl.NumberFormat().format(Number(number));
