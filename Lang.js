function GetLang() {

  var userLang = navigator.language || navigator.userLanguage;
  return userLang;
}

var numberPol = document.getElementById('number')

if(GetLang() == 'ru') {

  numberPol.value = '+7'
} else if(GetLang() == 'uk') {

  numberPol.value = '+380'
}