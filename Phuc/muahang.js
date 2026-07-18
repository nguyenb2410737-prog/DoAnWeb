function isExistedInCart(item, cartItems){
    for(let i = 0; i < cartItems.length; i++){
        if(cartItems[i].id === item.id){
            return i;
        }
    }
    return -1;
}

function orderSelectedProduct(){
    const newItem = {
        id: document.querySelector(".car-id").textContent,
        name: document.querySelector(".car-name").textContent,
        price: Number(document.querySelector(".car-price").textContent.replace(/\D/g,"") ),
        color: document.querySelector(".car-color").textContent,
        image: document.querySelector(".car-image").src,
        nam: document.querySelector(".car-year").textContent,
        quantity: 1
    };

    if(typeof(Storage) !== "undefined"){
        let cartItems = [];

        if(localStorage.getItem("cartItems") == null){
            cartItems.push(newItem);
        }
        else{
            cartItems = JSON.parse(localStorage.getItem("cartItems"));

            let index = isExistedInCart(newItem, cartItems);

            if(index == -1){
                cartItems.push(newItem);
            }
            else{
                cartItems[index].quantity++;
            }
        }

        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        updateCartCount();
        console.log(cartItems);
        alert("Đã thêm vào giỏ hàng");
    }
    else{
        alert("Trình duyệt không hỗ trợ Local Storage");
    }
}

// Hàm cho biết số lượng sản phẩm nằm trong giỏ hàng.
function updateCartCount(){
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    let totalQuantity = 0;

    for(let i = 0; i < cartItems.length; i++){
        totalQuantity += cartItems[i].quantity;
    }

    document.getElementById("cart-count").textContent = totalQuantity;
}
//Cài đặt định dạng tiền
function setPrices(){
    const prices = document.querySelectorAll(".car-price");

    prices.forEach(item => {
        item.innerText = Number(item.innerText.replace(/\D/g, ""))
            .toLocaleString("vi-VN") + " VNĐ";
    });
}


function addEventToCartButton(){
    const addCartBtn = document.getElementById("addCartBtn");
    addCartBtn.addEventListener("click", orderSelectedProduct, false);
}

function setup(){
    setPrices();
    addEventToCartButton();
    updateCartCount();
}

window.addEventListener("load", setup, false);