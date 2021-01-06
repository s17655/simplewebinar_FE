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


export function checkPassword(password){

  //1 - dlugosc
  if(password.length<8){
    return false;
  }


  //2 - mala litera
  if(password.toUpperCase() === password){
    return false;
  }


  //3 - wielka litera
  if(password.toLowerCase() === password){
    return false;
  }


  //4 - cyfra
  if(!(/[0-9]/.test(password))){
    return false;
  }


  return true;
}




export function checkCode(code) {

  if(code.length===5){
    if(code.match(/^[0-9A-Z]+$/) != null){
      return true;
    }
  }
  return false
}
