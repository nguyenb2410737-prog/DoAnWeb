//Thao tác cho thanh hamburger menu
const menuToggle = document.getElementById("menuToggle");
const headerMenu = document.getElementById("headerMenu");

menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    headerMenu.classList.toggle("active");
});

document.addEventListener("click", (e)=> {
    if(!menuToggle.contains(e.target) && !headerMenu.contains(e.target)) {
        headerMenu.classList.remove("active");
    }
});







// Thao tác cho việc chọn các hình ảnh ở phần thông tin nổi bật
const mainImage = document.getElementById("mainImage");
const thumbnails = document.querySelectorAll(".thumbnail");
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener("click", () => {
        const img = thumbnail.querySelector("img");
        mainImage.src = img.src;
        thumbnails.forEach(item => {
            item.classList.remove("active");
        });
        // Thêm ảnh mới, chỉ thêm cho ảnh thumbnail vừa được chọn thôi, còn các ảnh kia đã bị remove
        thumbnail.classList.add("active");

    });

});









/* Cập nhật số lượng trong giỏ hàng*/
const CART_KEY="cartItems";

function getCart(){
    const cart=localStorage.getItem(CART_KEY);
    return cart?JSON.parse(cart):[];
}

function saveCart(cart){
    localStorage.setItem(CART_KEY,JSON.stringify(cart));
}


function updateCartCount(){

    const cartCount = document.getElementById("cart-count");
    if(!cartCount){
        return;
    }
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    // chưa đăng nhập
    if(!currentUser){
        cartCount.textContent="0";
        cartCount.style.display="none";
        return;
    }
    const cart=getCart();
    let totalQuantity=0;
    for(let i=0;i<cart.length;i++){

        totalQuantity += cart[i].quantity;

    }
    cartCount.textContent=totalQuantity;
}

function setupMain(){
    updateCartCount();
}
window.addEventListener("load", setupMain, false);







/*Phần chuyển đổi nút button khi đăng nhập*/
const loginLink = document.getElementById('loginLink');
const userMenu = document.getElementById('usermenu');
const userName = document.getElementById('userName');
const userSelect = document.getElementById('userSelect');

function update() {
    const json = localStorage.getItem('currentUser');// đọc local của currentuser
    const user = json ? JSON.parse(json) : null;
    if (user) {
        loginLink.style.display = 'none';
        userMenu.style.display = 'block';
        userName.textContent = user.fullname;
    } else {
        loginLink.style.display = 'block';
        userMenu.style.display = 'none';
    }
}

update();
if (userSelect) {
    userSelect.addEventListener('change', function () {
        const action = userSelect.value;

        if (action === 'account') {
            window.location.href = "#";// không có trang 
        } else if (action === 'logout') {
            localStorage.removeItem('currentUser') // xóa 
            updateCartCount();
            window.location.href = "/Nguyen/trangchu.html";
            
        }

        userSelect.selectedIndex = 0;//Đưa  về mục đầu vị trí của mục đang chọn trong select
    });
}   


