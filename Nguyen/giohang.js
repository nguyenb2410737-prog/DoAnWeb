
function formatPrice(price){
    return price.toLocaleString("vi-VN")+" VNĐ";
}



function renderCart(){

    const cart=getCart();
    const container=document.getElementById("cart-container");
    const template=document.getElementById("cart-template");

    const cartItems = container.querySelectorAll(".cart-item");

    cartItems.forEach(item => {
        if (item.id !== "cart-template") {
            item.remove();
        }
    });

    if(cart.length===0){

        document.querySelector(".cart-wrapper").style.display="none";
        document.getElementById("empty-cart").style.display="flex";

        updateCartCount();
        return;
    }

    document.querySelector(".cart-wrapper").style.display="flex";
    document.getElementById("empty-cart").style.display="none";

    let subTotal=0;

    for(let i=0;i<cart.length;i++){

        const item=cart[i];
        console.log(item);
        const itemTotal=item.price*item.quantity;

        subTotal+=itemTotal;

        const clone=template.cloneNode(true);

        clone.removeAttribute("id");
        clone.hidden=false;

        clone.querySelector(".car-image").src=item.image;
        clone.querySelector(".car-name").textContent=item.name;
        clone.querySelector(".car-color").textContent=item.color;
        clone.querySelector(".car-year").textContent=item.nam;

        clone.querySelector(".car-price").textContent=formatPrice(item.price);
        clone.querySelector(".car-total").textContent=formatPrice(itemTotal);

        clone.querySelector(".quantity-number").textContent=item.quantity;

        clone.querySelector(".minus-btn").addEventListener("click",function(){
            changeQuantity(i,-1);
        });

        clone.querySelector(".plus-btn").addEventListener("click",function(){
            changeQuantity(i,1);
        });

        clone.querySelector(".remove-btn").addEventListener("click",function(){
            deleteItem(i);
        });
        container.appendChild(clone);

    }

    const vat=subTotal*0.1;
    const grandTotal=subTotal+vat;

    document.getElementById("sub-total").textContent=formatPrice(subTotal);
    document.getElementById("vat").textContent=formatPrice(vat);
    document.getElementById("grand-total").textContent=formatPrice(grandTotal);

    updateCartCount();

}

function changeQuantity(index,change){
    const cart=getCart();
    cart[index].quantity+=change;
    if(cart[index].quantity<=0){
        cart.splice(index,1); //Xóa khỏi giỏ hàng nếu số lượng nhỏ hơn bằng 0
    }
    saveCart(cart);
    renderCart();

}

function deleteItem(index){
    const cart=getCart();
    cart.splice(index,1); //Cứ xóa, ko quan tâm số lượng
    saveCart(cart);
    renderCart();

}

function checkout(){
    const cart = getCart();
    if(cart.length === 0){
        showToast("Giỏ hàng đang trống!", "warning");
        return;
    }

    showToast("Thanh toán thành công", "success");
    saveCart([]);
    renderCart();
    updateCartCount();
}

function setupGiohang(){
    renderCart();
    const checkoutBtn = document.getElementById("check-btn");
    if(checkoutBtn){
        checkoutBtn.addEventListener("click", checkout)
    }
}

window.onload=setupGiohang;