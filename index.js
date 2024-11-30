async function information() {

    let firstname = document.querySelector("#name").value;
    let lastname = document.querySelector("#name1").value;
    let email = document.querySelector("#email").value;
    let psw = document.querySelector("#psw").value;
    let psw1 = document.querySelector("#psw1").value;

    if (!validateInputs(firstname, lastname, email, psw, psw1)) {
        return; 
    }

    let api = "http://localhost:4000/user";

    const data = {
        "firstname": firstname,
        "lastname": lastname, 
        "email": email,
        "password": psw
    };

    try {
        const response = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        localStorage.setItem("data", JSON.stringify(data));

        let storedData = localStorage.getItem("data");
        console.log(storedData);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}


function validateInputs(firstname, lastname, email, psw, psw1) {
    if (firstname === "") {
        alert("First name cannot be empty");
        return false;
    }
    if (lastname === "") {
        alert("Last name cannot be empty");
        return false;
    }
    if (email === "") {
        alert("Email cannot be empty");
        return false;
    }
    if (psw === "") {
        alert("Password cannot be empty");
        return false;
    }
    if (psw !== psw1) {
        alert("Passwords do not match");
        return false;
    }
    return true; 
}





async function login(){
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    let api = "http://localhost:4000/user";
    
    const response = await fetch(api);
        
        const user = await response.json();
        console.log(user);
     
     let loginUser =   await user.filter((key)=>{
            if(key.email == email && key.password == password){
              return key
             }
        })

        if(loginUser.length!=0){
          document.location.href="./Admin.html";
        localStorage.setItem("userCheck",true)
        localStorage.setItem("username",loginUser[0].firstname)
       


        }
        else{
          console.log("either password or email is incorrect");
          window.alert("please login frist");
        }

        return false;

}








function logout(){
  localStorage.setItem("userCheck",false);
  localStorage.setItem("username","")

  document.location.href="./login.html"
}


function checkUser(){
 
  if(flag=="true"){
    alert("Welcome "+name)
  }
  else{
    document.location.href="./login.html"
    alert("please login first")

  }
}


async function stats(){
    let api = "http://localhost:4000/product";

   const response =await fetch(api)
   const data =await response.json()
   console.log(data)
    let totalprice = 0;
    let totalProduct =0;
   data.map((key)=>{
        totalprice+=Number(key.pprice);
        totalProduct++;
   })
   setTimeout(totalprice,2000)

   document.querySelector("#Stat1").innerHTML+=totalprice
   document.querySelector("#Stat2").innerHTML+=totalProduct

  
}
stats();

async function crud(){
    let res = await fetch("http://localhost:4000/product");
    let data = await res.json();
    console.log(data);

    let result = data.map((t)=> `
   <tr> 
  <td>${t.id}</td>
  <td><img width="100px" src = ${t.imageurl}></td>
  <td>${t.pname}</td>
  <td>${t.bname}</td>
  <td>${t.pprice}</td>
  <td><button onclick ="deletedata('${t.id}')">Delete</button></td>
  <td><button onclick ="updatedata('${t.id}')">Update</button></td>
   </tr>
   `).join(" ")

    document.querySelector("#showdata").innerHTML = result;

}
crud();
function deletedata(id){
 fetch(`http://localhost:4000/product/${id}`,{
    method:'DELETE'
 })
 .then(res=>window.alert("data delete suceesfully.!!!!!!!!!!!!!!!!!"))
}






async function updatedata(id){
   let mydata = await  fetch(`http://localhost:4000/product/${id}`);
   let redata = await mydata.json();
   let sendata = `
    <form>
    <input type="text" value="${redata.id}" id="id1" readonly><br>
    <input type="text" value="${redata.imageurl}" id="imageurl1"><br>
    <input type="text" value="${redata.pname}" id="pname1"><br>
    <input type="text" value="${redata.bname}" id="bname1"><br>
    <input type="text" value="${redata.pprice}" id="pprice1"><br>
    <input  type="submit" onclick = "finalupdate('${redata.id}')">
    </form>


   `
  document.querySelector("#updatetabel").innerHTML = sendata
}

function finalupdate(id){
     let udata = {
        imageurl:document.querySelector("#imageurl1").value,
        pname:document.querySelector("#pname1").value,
        bname:document.querySelector("#bname1").value,
        pprice:document.querySelector("#pprice1").value,
     }



    fetch(`http://localhost:4000/product/${id}`,{
        method:'PUT',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(udata)
    })
    .then(res=>window.alert("update date sucessfully.....!!!!!!"))
}


function Addingdata()
{
    let object={
        imageurl:document.querySelector("#image").value,
        pname:document.querySelector("#product").value,
        bname:document.querySelector("#brand").value,
        pprice:document.querySelector("#price").value
    }

    fetch(`http://localhost:4000/product`,{
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify(object)
    })
    .then(res=>window.alert("Adding data suceesfully..!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"))
}

