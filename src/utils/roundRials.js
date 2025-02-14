const roundRials = (val) => {
  let rem = 0;

  const minChange = 10000; // to geth the last 5 digits
  const step = 4999; // minimum price step // test

  rem = Math.floor(+val / minChange);

  let change = val - rem * minChange;
  let addToVal = minChange - change;
  if (change > step) {
    val = val + addToVal;
  } else {
    val = val - change;
  }

  return val;
};

export default roundRials;
