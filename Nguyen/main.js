const mainImage = document.getElementById("mainImage");
const thumbnails = document.querySelectorAll(".thumbnail");
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener("click", () => {
        // Lấy ảnh trong thumbnail nhỏ dưới
        const img = thumbnail.querySelector("img");
        // Đổi lên ảnh lớn
        mainImage.src = img.src;
        // Xóa cái cũ 
        thumbnails.forEach(item => {
            item.classList.remove("active");
        });
        // Thêm ảnh mới
        thumbnail.classList.add("active");

    });

});

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
            window.location.href = "/Nguyen/trangchu.html";
            
        }

        userSelect.selectedIndex = 0;//Đưa  về mục đầu vị trí của mục đang chọn trong select
    });
}   



const menuToggle = document.getElementById("menuToggle");
const headerMenu = document.getElementById("headerMenu");

menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    headerMenu.classList.toggle("active");
     console.log("clicked");
});

document.addEventListener("click", (e)=> {
    if(!menuToggle.contains(e.target) && !headerMenu.contains(e.target)) {
        headerMenu.classList.remove("active");
    }
});