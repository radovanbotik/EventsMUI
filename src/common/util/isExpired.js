const isExpired = (timestamp) => {
  if (timestamp < new Date().getTime()) {
    return true;
  } else {
    return false;
  }
};

export default isExpired;
