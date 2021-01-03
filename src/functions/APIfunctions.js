import {mergeTwoJSONStrings} from './otherFunctions.js'


//wysylka formularzy (DataForm object, JSON, url)
export async function submitPost(formData, data2,  url){
  var options = JSON.stringify(Object.fromEntries(formData));

  if(data2!=null)
     options = mergeTwoJSONStrings(options,JSON.stringify(data2));

  let response = await fetch(url, {
    method:'POST',
    headers: {
      'Accept': 'application/json',
      'Content-type':'application/json'
    },
    body:
      options,
  });
  return response;
}



export async function showError(response){
  var textError;
  await response.json()
  .then
  (res=>
    {if(res.hasOwnProperty("ErrorMessage")){
      textError=res.ErrorMessage;
    }else{
      textError = showErrorDataAnnotationsGenerated(res);
      }
    }
  );
  return textError;
}

function showErrorDataAnnotationsGenerated(response){
  var responseText="";
  for (const property in response.errors) {
    responseText = responseText + `${response.errors[property]}` +"\n";
  }
  return responseText;
}

export async function showOk(response){
  var responseText="";
  await response.json()
  .then(
    resText=>{
      responseText=resText;
    }
  )
  return responseText;
}
