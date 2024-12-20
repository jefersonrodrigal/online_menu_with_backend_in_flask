const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItensContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const addressInput = document.getElementById("address");
const nameInput = document.getElementById("client-name")
const addressWarning = document.getElementById('address-warn');
const nameWarning = document.getElementById('name-warn');
const dataSpan = document.getElementById("date-span");
let inputTotal = document.getElementById("total-input")

let cart = [];

cartBtn.addEventListener("click", ()=>{
    updateCartModal();
    cartModal.style.display = "flex";
    
})

cartModal.addEventListener("click", (event)=>{
    if(event.target === cartModal){
        cartModal.style.display = "none";
    }
})

closeModalBtn.addEventListener("click", ()=>{
    cartModal.style.display = "none";
})

menu.addEventListener("click", (event) => {
    let parentButton = event.target.closest(".add-to-cart-btn")
    

    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))

        addToCart(name, price)
    }
})

function addToCart(name, price){
    const existItem = cart.find(item => item.name === name);

    if(existItem){
        existItem.qtd += 1;
        return
    }


    cart.push({
        name,
        price,
        qtd: 1
    });

    updateCartModal();
}

function updateCartModal(){
  cartItensContainer.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

    cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">
        <div>
            <p class="font-medium">${item.name}</p>
            <p>Qtd: ${item.qtd}</p>
            <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
        </div>
        <button class="remove-card-btn bg-red-500 rounded-lg text-white" data-name="${item.name}">
            Remover
        </button>    
    </div> `

    total += item.price * item.qtd;
    inputTotal.value = total.toFixed(2)

    cartItensContainer.appendChild(cartItemElement)

  })

  cartTotal.textContent = total.toLocaleString("pt-BR",{
    style: "currency",
    currency:"BRL"
  });

}


cartItensContainer.addEventListener("click", (event)=>{
    if(event.target.classList.contains("remove-card-btn")){
      const name = event.target.getAttribute("data-name")
  
      removeCartItem(name)
    }
  })


function removeCartItem(name){
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
        const item = cart[index]

        if(item.qtd > 1){
            item.qtd -= 1;

            updateCartModal();
            return
        }

        cart.splice(index, 1)
        updateCartModal()
    }
}

addressInput.addEventListener("input", (event)=>{
    let inputValue = event.target.value;

    if(inputValue !== ""){
        addressInput.classList.remove("border-red-500");
        addressWarning.classList.add("hidden");
    }

})


nameInput.addEventListener("input", (event)=>{
    let inputValue = event.target.value;

    if(inputValue !== ""){
        nameInput.classList.remove("border-red-500");
        nameWarning.classList.add("hidden");
    }
})

checkoutBtn.addEventListener("click", ()=>{

    const isOpen = checkOpen();

    if(!isOpen){
        Toastify({
            text: "Ops!! Estamos fechados no momento!!!",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "#ef4444"
            },
        }).showToast();
        
        return
    }

    if(cart.length === 0) return;

    if(addressInput.value === ""){
        addressWarning.classList.remove("hidden");
        addressInput.classList.add("border-red-500");
    }

    if(nameInput.value === ""){
        nameWarning.classList.remove("hidden");
        nameInput.classList.add("border-red-500");
        return;
    }

    let listItens = []

    let totalOrder = cartTotal.textContent.replace('R$',"")
    totalOrder = parseFloat(totalOrder).toFixed(2)
    listItens.total = totalOrder 
    listItens.client = nameInput.value;
    listItens.address = addressInput.value;

    return
})

function checkOpen(hourOpen, hourClose){
    const data = new Date();
    const hora = data.getHours();
    return hora >= hourOpen && hora < hourClose
}


const isOpen = checkOpen(10, 23);

if(isOpen){
  dataSpan.classList.remove("bg-red-500");
  dataSpan.classList.add("bg-green-500");   
}
else {
    dataSpan.classList.remove("bg-green-500")
    dataSpan.classList.add("bg-red-500");
}

