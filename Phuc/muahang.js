function isExistedInCart(item, cartItems){
    for(let i = 0; i < cartItems.length; i++){
        if(cartItems[i].id === item.id){
            return i;
        }
    }
    return -1;
}

function orderSelectedProduct(){

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // Chưa đăng nhập
    if(!currentUser){
        showToast("Vui lòng đăng nhập trước khi mua hàng", "warning");
        // lưu lại trang hiện tại
        localStorage.setItem("redirectAfterLogin", window.location.href);
        setTimeout(()=>{
            window.location.href="/tai/dnhap.html";
        },3000);
        return;
    }

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
        showToast("Đã thêm vào giỏ hàng",'success');
    }
    else{
        showToast("Trình duyệt không hỗ trợ Local Storage", 'warning');
    }
}

//Cài đặt định dạng tiền
function setPrices(){
    const prices = document.querySelectorAll(".car-price");

    prices.forEach(item => {
        let text = item.innerText;
        text = text.replace(/\D/g, "");
        let price = Number(text);
        price = price.toLocaleString("vi-VN");
        item.innerText = price + " VNĐ";    });
}


function addEventToCartButton(){
    const addCartBtn = document.getElementById("addCartBtn");
    addCartBtn.addEventListener("click", orderSelectedProduct);
}

function setupMuahang(){
    setPrices();
    addEventToCartButton();
    updateCartCount();
}

window.addEventListener("load", setupMuahang);