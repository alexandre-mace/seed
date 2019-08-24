export default function arrayRemove(arr, value) {
  return arr.filter(function(ele){
    if (ele.id !== value) {
      return ele
    }
  });
}
