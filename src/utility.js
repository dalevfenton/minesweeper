export const arraySwap = (arr, i1, i2) => {
  const temp = arr[i1]
  arr[i1] = arr[i2]
  arr[i2] = temp
  return arr
}

export const shuffleArray = arr => {
  let temp = arr
  for (let curIndex = (arr.length-1); curIndex > 0; curIndex--) {
    const randomIndex = Math.floor(Math.random() * curIndex) + 1
    temp = arraySwap(temp, curIndex, randomIndex)
  }
  return temp
}

export const cellRefs = [
  function(x, width) {
    return x - width - 1;
  },
  function(x, width) {
    return x - width;
  },
  function(x, width) {
    return x - width + 1;
  },
  function(x, width) {
    return x - 1;
  },
  function(x, width) {
    return x + 1;
  },
  function(x, width) {
    return x + width - 1;
  },
  function(x, width) {
    return x + width;
  },
  function(x, width) {
    return x + width + 1;
  }
];
