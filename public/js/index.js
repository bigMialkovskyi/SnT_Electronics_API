// const { createApp } = Vue

// createApp({
//   data() {
//     return {
//       message: 'Hello Vue!'
//     }
//   },
//   template: "<h1>prekl</h1>"
// }).mount('#app')

function loginAdmin() {
  const adminLogin = document.getElementById("adminLogin").value;
  const adminPassword = document.getElementById("adminPassword").value;

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3093/auth/admins/login");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({
    "login": adminLogin,
    "password": adminPassword
  }));
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      if (objects['success'] == true) {
        console.log(objects['message'])
        document.cookie = "token=" + objects['token'];
        Swal.fire({
          text: objects['message'],
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = './home';
          }
        });
      } else {
        Swal.fire({
          text: objects['message'],
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  };
}

function getData() {
  const productTitle = document.getElementById("productTitle").value;
  const productDesc = document.getElementById("productDesc").value;
  const productType = document.getElementById("productType").value;
  const productImg = document.getElementById("productImg").value;

  console.log(productTitle, productDesc, productType, productImg)
  console.log(typeof (productImg))
}

function newFunc() {
  let result;
  let input = document.getElementsByTagName('input')[0];
  input.oninput = (e) => {
    console.log(e);
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      console.log(evt.target.result);
      result = evt.target.result;
      const xhr = new XMLHttpRequest();
      const url = 'http://localhost:3000/events';

      xhr.open('POST', url);
      xhr.send(result);
    };
    reader.readAsDataURL(file);
  }
}
