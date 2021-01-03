//łączenie dwóch stringów JSON w jeden
function mergeTwoJSONStrings (string1, string2){
  const obj1 = JSON.parse(string1);
  const obj2 = JSON.parse(string2)
  const both ={
   ...obj1,
   ...obj2
  }
 return JSON.stringify(both);
}
