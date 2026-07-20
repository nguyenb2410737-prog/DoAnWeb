window.onload = function () {
    const loginBtn = document.getElementById('loginBtn');
    if (!loginBtn) return;
    

    function update() {
       const username = localStorage.getItem('username'); 
        if (username) {
            loginBtn.textContent = "Dang Xuat";
        } else {
            loginBtn.textContent = "Dang Nhap";
        }
    }
    update(); 
    loginBtn.addEventListener('click', function (e) {
         e.preventDefault(); //  // chặn thẻ <a> nhảy trang theo href mặc định
        const username = localStorage.getItem("username");
        if (username) {
            localStorage.removeItem("username");
            window.location.href = "/Nguyen/trangchu.html";
        } else { // gia trị la null
            window.location.href = "/tai/dnhap.html";
        }
    });
}