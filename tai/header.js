const loginLink = document.getElementById('loginLink');
const userMenu = document.getElementById('usermenu');
const userName = document.getElementById('userName');
const userSelect = document.getElementById('userSelect');

function update() {
    const json = localStorage.getItem('user');
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
            window.location.href = "/tai/dnhap.html";
        }

        userSelect.selectedIndex = 0;//Đưa  về mục đầu vị trí của mục đang chọn trong select
    });
}
