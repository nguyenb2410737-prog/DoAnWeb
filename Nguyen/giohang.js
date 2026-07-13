const CART_KEY="cartItems";

function getCart(){
    const cart=localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart){
    localStorage.setItem(CART_KEY,JSON.stringify(cart));
}

function formatPrice(price){
    return price.toLocaleString("vi-VN")+" VNĐ";
}

function updateCartCount(){
    const cart=getCart();

    let count=0;

    cart.forEach(item=>{
        count+=item.quantity;
    });

    const badge=document.getElementById("cart-count");

    if(badge){
        badge.innerText=count;
    }
}

function renderCart(){
    const cart=getCart();
    const container=document.getElementById("cart-container");

    container.innerHTML="";
    if(cart.length===0){

        document.querySelector(".cart-wrapper").style.display="none";

        document.getElementById("empty-cart").style.display="flex";

        updateCartCount();

        return;
    }

    document.querySelector(".cart-wrapper").style.display="flex";

    document.getElementById("empty-cart").style.display="none";

    let subTotal=0;

    cart.forEach((item,index)=>{
        console.log(item);
        console.log("IMAGE =", item.image);;
        const itemTotal=item.price*item.quantity;

        subTotal+=itemTotal;

        container.innerHTML+=`

        <article class="cart-item">

            <div class="cart-image">

                <img src="${item.image}">

            </div>

            <div class="cart-info">

                <h2 class="car-name">
                    ${item.name}
                </h2>

                <p class="car-version">
                    ${item.version||""}
                </p>

                <div class="car-detail">
                    <span>Màu</span>
                    <strong>${item.color}</strong>
                </div>

                <div class="car-detail">
                    <span>Năm sản xuất</span>
                    <strong>${item.year}</strong>
                </div>

                <div class="car-detail">
                    <span>Động cơ</span>
                    <strong>${item.engine||"--"}</strong>
                </div>

                <div class="car-detail">
                    <span>Hộp số</span>
                    <strong>${item.transmission||"--"}</strong>
                </div>

                <div class="car-detail">
                    <span>Nhiên liệu</span>
                    <strong>${item.fuel||"--"}</strong>
                </div>

                <div class="car-detail">
                    <span>Đơn giá</span>
                    <strong>${formatPrice(item.price)}</strong>
                </div>

                <div class="car-detail">
                    <span>Thành tiền</span>
                    <strong>${formatPrice(itemTotal)}</strong>
                </div>

                <div class="quantity-wrapper">
                    <span>Số lượng</span>

                    <div class="quantity-box">

                        <button class="quantity-btn"
                            onclick="changeQuantity(${index},-1)">
                            -
                        </button>

                        <span class="quantity-number">
                            ${item.quantity}
                        </span>

                        <button class="quantity-btn"
                            onclick="changeQuantity(${index},1)">
                            +
                        </button>

                    </div>
                </div>
                <div class="cart-action">
                    <button class="remove-btn"
                        onclick="deleteItem(${index})">
                        🗑 Xóa khỏi giỏ hàng
                    </button>
                </div>
            </div>
        </article>

        `;
});

    const vat=subTotal*0.1;
    const grandTotal=subTotal+vat;

    document.getElementById("sub-total").innerText= formatPrice(subTotal);

    document.getElementById("vat").innerText= formatPrice(vat);

    document.getElementById("grand-total").innerText= formatPrice(grandTotal);

    updateCartCount();

}

function changeQuantity(index,change){
    let cart=getCart();
    cart[index].quantity+=change;
    if(cart[index].quantity<=0){
        cart.splice(index,1);
    }
    saveCart(cart);
    renderCart();

}

function deleteItem(index){
    let cart=getCart();
    cart.splice(index,1);
    saveCart(cart);
    renderCart();

}

window.onload=function(){
    renderCart();
}