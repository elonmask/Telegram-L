telegramApi.setConfig({
  app: {
    id: 198971,
    hash: 'd583e5d1c74483c61056fc8d6ed7d134',
    version: telegramApi.VERSION
  },
  server: {
    test: [
      {
        id: 1,
        host: '149.154.167.40',
        port: 443
      }
    ],
    production: [
      {
        id: 2, /* DC ID */
        host: '149.154.167.50',
        port: 443
      }
    ]
  }
});

var authCode
var hash

function SendCode() {

    telegramApi.sendCode(document.getElementById('number').value).then(function(sent_code) {
    if (!sent_code.phone_registered) {
        // New user
    }

    // phone_code_hash will need to sign in or sign up
    window.phone_code_hash = sent_code.phone_code_hash
    console.log(authCode)
    console.log(window.phone_code_hash)
});

}

function SingIn() {

  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:8080/send/?code=" + document.getElementById('code').value + '&' + "hash=" + window.phone_code_hash + '&' + "number=" + document.getElementById('number').value, true);
  xhttp.send();
    delete window.phone_code_hash;
    //download(JSON.stringify(obj), 'conf.json', 'application/JSON')
    console.log('Signed In')
}

function getUser() {
  telegramApi.getUserInfo().then(function(user) {
    if (user.id) {
        console.log('Usr ID: ' + user.id)
        if(user.name) {
          console.log('UserName: ' + user.name)
        } else {
          console.log('Wrong')
        }
    } else {
        // Open log in page
    }
});
}

function getPhoto() {
  telegramApi.getUserPhoto('base64', 'small').then(function(base64) {
    //document.getElementById('avatar').src = base64
});
}

var obj = {

  data: {
      isLogged: null,
      code: null,
      number: null,
      code_hash: null
  }
}
/*
function download(data, filename, type) {
  var file = new Blob([data], {type: type});
  if (window.navigator.msSaveBlob) // IE10+
      window.navigator.msSaveBlob(file, filename);
  else { // Others
      var a = document.createElement("a"),
              url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function() {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);  
      }, 0); 
  }
}
*/
/*
function loadJSON() {   
    document.getElementById('lorem').value = JSON.parse(conf)[0].code
 }
 */