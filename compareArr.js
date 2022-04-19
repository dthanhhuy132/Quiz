export function arrCompare(arr1, arr2) {
  let arr1JSON = JSON.stringify(arr1.sort());
  let arr2JSON = JSON.stringify(arr2.sort());

  return arr1JSON === arr2JSON;
}