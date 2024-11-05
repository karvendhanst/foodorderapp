// Dark Mode Light Mode Changer
let themeToggler = () => {

    let modeToggler = document.querySelector(".nav-mode-toggler")
    let modeBtn = document.querySelector(".nav-mode-toggler .btn")

    document.body.className = localStorage.getItem("theme")
    if (document.body.classList.contains("dark")) {
        modeBtn.innerHTML = `<i class="fa-solid fa-sun"></i>`
    }

    modeToggler.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        if (document.body.classList.contains("dark")) {
            modeBtn.innerHTML = `<i class="fa-solid fa-sun"></i>`
            localStorage.setItem("theme", "dark")
        }
        else {
            modeBtn.innerHTML = `<i class="fa-solid fa-moon"></i>`
            localStorage.setItem("theme", "")
        }
    })

}

let cartArr = []

let oredered = ()=>{
    alert("Order Placed")
}

// Update Total
let updateTotal = ()=>{
    let total = document.querySelector(".cart-total p span")
    let qtyPrice = document.querySelectorAll(".q-price");
    
    let totalArr =[]
    let count = 0
    
    qtyPrice.forEach((item)=>{
        totalArr.push(parseFloat(item.innerHTML.replace("₹", "").trim()))
    })

    if(totalArr == []){
        count = 0
    }
    else{
        totalArr.forEach((value)=>{
            count+=value
        })
    }
    
    total.innerHTML = count
}

// Update Quantity
let updateQty = (qty)=>{
   if(qty.value<1){
    qty.value = 1
   }

   let qtyParent = qty.parentElement;
   let qPrice = qtyParent.querySelector(".q-price");
   let aPrice = parseFloat(qtyParent.querySelector(".a-price").innerHTML.replace("₹", "").trim());
   qPrice.innerHTML = `₹ ${qty.value * aPrice}`

   updateTotal()
}

// Delete cart item
let deleteCard = (delCard)=>{
    if(confirm("Are U Sure To Remove !")){
        delCard.parentElement.remove()
        cartArr = cartArr.filter((item)=>{
            return item.cardName != delCard.parentElement.querySelector(".item-name").innerHTML
        })
    }
    updateTotal()
    
}

// Create Cart Card Template and insert card info and Update cart 

let createTemplate = (cardData) => {

    cartArr.push(cardData)

    let cartList = document.querySelector(".cart-list")
    let createLi = document.createElement("li")
    createLi.classList.add("cart-list-item")
    
    let template = `
                        <div class="cart-item-img">
                            <img src=${cardData.cardImg} alt="img">
                        </div>
                        <div class="cart-item-info">
                            <h3 class="item-name">${cardData.cardName}</h3>
                            <p class="item-price"> <span class="a-price">₹ ${cardData.cardPrice}</span> <i class="fa-solid fa-angles-right"></i> <span class="q-price">₹ ${cardData.cardPrice}</span></p>
                            <input type="number" class="item-qty" value="1" onchange="updateQty(this)">

                        </div>
                        <div class="cart-item-trash" onclick="deleteCard(this)">
                            <i class="fa-regular fa-trash-can"></i>
                        </div>
                    `
    createLi.innerHTML = template
    cartList.append(createLi)  
    
    updateTotal()

}

// Collecting Selected Card info
let updateCart = (e) => {

    let parentCard = e.target.parentElement.parentElement.parentElement;
    let cardImg = parentCard.querySelector(".card-img-top").src;
    let cardName = parentCard.querySelector(".card-title").innerHTML;
    let cardPrice = parseFloat(parentCard.querySelector(".card-price").innerHTML.replace("₹", "").trim());
    
    let cardInfo = { cardImg, cardName, cardPrice }

    if(cartArr.find((el)=> el.cardName == cardInfo.cardName ))
    {
        alert("Already Added")
        return
    }
    else{
        createTemplate(cardInfo)
    }

}

// After Dom Loaded

document.addEventListener("DOMContentLoaded", () => {
    themeToggler();

    // cart open
    let cartIcon = document.querySelector(".cart-icon")
    cartIcon.addEventListener("click", () => {
        let cartSection = document.querySelector(".cart-section")
        cartSection.classList.add("cart-active")
    })
    // cart close
    let cartClose = document.querySelector(".cart-close")
    cartClose.addEventListener("click", () => {
        let cartSection = document.querySelector(".cart-section")
        cartSection.classList.remove("cart-active")
    })

    // Add Cart
    let cardAddCart = document.querySelectorAll(".card-add-cart")
    cardAddCart.forEach((item) => {
        item.addEventListener("click", (e) => {
            document.querySelector(".cart-section").classList.add("cart-active")
            updateCart(e)
        })
    })

})


