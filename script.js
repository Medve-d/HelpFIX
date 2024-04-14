import express from "express";



const nav = document.querySelector('.navbar')
fetch('/navbar.html')
.then(res=>res.text())
.then(data=>{
    nav.innerHTML=data
})

express.Router();

