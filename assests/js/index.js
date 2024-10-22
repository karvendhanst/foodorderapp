let themeToggler = ()=>{

    let modeToggler = document.querySelector(".nav-mode-toggler")
    let modeBtn = document.querySelector(".nav-mode-toggler .btn")

    document.body.className = localStorage.getItem("theme")
    if(document.body.classList.contains("dark")){
        modeBtn.innerHTML = `<i class="fa-solid fa-sun"></i>`
    }

    modeToggler.addEventListener("click", ()=>{
    document.body.classList.toggle("dark");
    if(document.body.classList.contains("dark")){
        modeBtn.innerHTML = `<i class="fa-solid fa-sun"></i>`
        localStorage.setItem("theme", "dark")
    }
    else{
         modeBtn.innerHTML = `<i class="fa-solid fa-moon"></i>`
         localStorage.setItem("theme", "")
    }
   })

}

let menuToggler = ()=>{
    let navToggle = document.querySelector(".navbar-toggler span i");
    navToggle.addEventListener("click", ()=>{
        navToggle.classList.toggle("fa-xmark")
    })
}

document.addEventListener("DOMContentLoaded", ()=>{
    themeToggler();
    menuToggler();

})


