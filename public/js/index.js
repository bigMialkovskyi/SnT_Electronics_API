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
  // xhttp.open("POST", "https://snt-electronics.herokuapp.com/auth/admins/login");
  xhttp.open("POST", `http://664326-vds-dm.penzyakov.gmhost.pp.ua:3093/auth/admins/login`);
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

function registerAdmin() {
  const adminLogin = document.getElementById("adminLogin").value;
  const adminPassword = document.getElementById("adminPassword").value;

  const xhttp = new XMLHttpRequest();
  // xhttp.open("POST", "https://snt-electronics.herokuapp.com/auth/admins/register");
  xhttp.open("POST", `http://664326-vds-dm.penzyakov.gmhost.pp.ua:3093/auth/admins/register`);
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
            window.location.href = './admin-login';
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

function getAllProducts() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:3093/products/get/all");
  xhr.send();
  xhr.responseType = "json";
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      createProductList(xhr.response.products)
    } else {
      console.log(`Error: ${xhr.status}`);
    }
  };
};



function createProductList(productList) {
  productList.forEach(element => {
    document.getElementById('products-container').innerHTML += `<li class="product-elem">Product title: ${element.title}<br><br>Product ID: ${element._id}</li>`;
    console.log(element.title)
  });
};

function deleteProduct() {
  const deleteProductID = document.getElementById('product-id').value
  const deleteProductIDRep = document.getElementById('product-id-rep').value
//   console.log(`first ID: ${deleteProductID} 
// second ID: ${deleteProductIDRep}`)
//   console.log(deleteProductID == deleteProductIDRep)

  if (deleteProductID != deleteProductIDRep) {
    return document.getElementById('error-container').innerHTML += `<h6 class="error-message">ID не співпадають. перевірте введені дані та спробуйте знову</h6>`;
  }

  if (deleteProductID == deleteProductIDRep) {
    const xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", `http://localhost:3093/products/delete/${deleteProductID}`);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        const objects = JSON.parse(this.responseText);
        if (objects['success'] == true) {
          console.log(objects['message'])
          // document.cookie = "token=" + objects['token'];
          Swal.fire({
            text: objects['message'],
            icon: 'success',
            confirmButtonText: 'OK'
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


}
