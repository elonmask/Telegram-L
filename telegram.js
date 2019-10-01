telegramApi.setConfig({
  app: {
    id: _ID_,
    hash: '_HASH_',
    version: telegramApi.VERSION
  },
  server: {
    test: [
      {
        id: 1,
        host: '1.2.3.4.5.6',
        port: 443
      }
    ],
    production: [
      {
        id: 2, /* DC ID */
        host: '7.8.9.10.11.12',
        port: 443
      }
    ]
  }
});

var authCode
var hash
var responseData

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
  xhttp.open("GET", "http://localhost:8080/send/?code=" + document.getElementById('code').value + '&' + "hash=" + window.phone_code_hash + '&' + "number=" + '+' + document.getElementById('number').value, true);
  xhttp.send();
    //download(JSON.stringify(obj), 'conf.json', 'application/JSON')
    //console.log('Signed In')
}

function LogIn() {

  var number;
  var hash;
  var code;

RequestPhone('http://localhost:8080/getnumber', number);
Request('http://localhost:8080/gethash', hash);
Request('http://localhost:8080/getcode', code);

  window.phone_code_hash = hash;

  telegramApi.signIn(number, window.phone_code_hash, code).then(function() {
    delete window.phone_code_hash;
    getPhoto();
}, function(err) {
    switch (err.type) {
        case 'PHONE_CODE_INVALID':
            // alert "Phone code invalid"
            break;
        case 'PHONE_NUMBER_UNOCCUPIED':
            // User not registered, you should use signUp method
            break;
    }
});

}

function Request(url, param) {

  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, false);
  xhttp.send();
  param = xhttp.responseText;
  console.log('Data: ' + param);
}

function RequestPhone(url, param) {

  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, false);
  xhttp.send();
  var temp = "+" + xhttp.responseText;
  param = temp.replace(/\s/g,'');
  console.log('Data: ' + param);
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
    document.getElementById('avatar').src = base64
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
