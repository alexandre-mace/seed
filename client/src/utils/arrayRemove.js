export default function arrayRemove(arr, value) {
  return arr.filter(function(ele){
    if (ele !== value) {
      return ele
    }
  });
}
