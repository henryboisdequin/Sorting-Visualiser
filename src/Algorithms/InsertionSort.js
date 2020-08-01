export function getInsertionSortAnimations(array) {
  let animations = [];
  let helperArray = array.slice();
  insertionSort(helperArray, animations);
  return animations;
}

function insertionSort(helperArray, animations) {
  const length = helperArray.length;
  for (let i = 1; i < length; i++) {
    let position = helperArray[i];
    let j = i - 1;
    animations.push(["comparison1", j, i]);
    animations.push(["comparison2", j, i]);
    while (j >= 0 && helperArray[j] > position) {
      animations.push(["overwrite", j + 1, helperArray[j]]);
      helperArray[j + 1] = helperArray[j];
      j = j - 1;
      if (j >= 0) {
        animations.push(["comparison1", j, i]);
        animations.push(["comparison2", j, i]);
      }
    }
    animations.push(["overwrite", j + 1, position]);
    helperArray[j + 1] = position;
  }
}
