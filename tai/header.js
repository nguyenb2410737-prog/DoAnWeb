const loginLink = document.getElementById('loginLink');
const userMenu = document.getElementById('usermenu');
const userName = document.getElementById('userName');
const userSelect = document.getElementById('userSelect');

function update() {
    const username = localStorage.getItem('username');

    if (username) {
        loginLink.style.display = 'none';
        userMenu.style.display = 'block';
        userName.textContent = username;
    } else {
        loginLink.style.display = 'block';
        userMenu.style.display = 'none';
    }
}

update();

userSelect.addEventListener('change', function () {
    const action = userSelect.value;

    if (action === 'account') {
        window.location.href = "#"; // không có trang 
    } else if (action === 'logout') {
        localStorage.removeItem('username');
        window.location.href = "/tai/dnhap.html";
    }

    userSelect.selectedIndex = 0; //Đưa  về mục đầu vị trí của mục đang chọn trong select
});