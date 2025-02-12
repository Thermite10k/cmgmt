const roundRials = (val) => {
  let rem = 0;

  rem = Math.floor(+val / 1000);

  let change = val - rem * 1000;
  let addToVal = 1000 - change;
  if (change > 499) {
    val = val + addToVal;
  } else {
    val = val - change;
  }

  return val;
};

export default roundRials;
