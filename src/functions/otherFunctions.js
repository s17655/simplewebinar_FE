//łączenie dwóch stringów JSON w jeden
export function mergeTwoJSONStrings(string1, string2) {
  const obj1 = JSON.parse(string1);
  const obj2 = JSON.parse(string2);
  const both = {
    ...obj1,
    ...obj2,
  };
  return JSON.stringify(both);
}

//walidacja maila
export function isValiEmail(val) {
  let regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regEmail.test(val)) {
    return true;
  }
  return false;
}
