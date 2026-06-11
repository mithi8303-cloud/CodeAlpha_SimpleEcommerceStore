document.addEventListener("DOMContentLoaded", function(){

const loginForm = document.querySelector(".login-form");

if(loginForm){

loginForm.addEventListener("submit", function(e){

e.preventDefault();

alert("Login Successful!");

});

}

});

const registerForm = document.getElementById("registerForm");

if(registerForm){

registerForm.addEventListener("submit", function(e){

e.preventDefault();

const passwords =
document.querySelectorAll("input[type='password']");

if(passwords[0].value !== passwords[1].value){

alert("Passwords do not match!");

}else{

alert("Registration Successful!");

}

});

}

function addToCart(name, price){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.push({
name:name,
price:price
});

localStorage.setItem("cart", JSON.stringify(cart));

alert(name + " added to cart!");

}