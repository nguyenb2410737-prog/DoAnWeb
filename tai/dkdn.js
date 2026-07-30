//chung 

function errorMessage(elmt) {
    const formRow = elmt.parentElement;
    if (formRow.classList.contains('success')) {
        formRow.classList.remove('success');
    }
    formRow.classList.add('failure');
}

function successMessage(elmt) {
    const formRow = elmt.parentElement;
    if (formRow.classList.contains('failure')) {
        formRow.classList.remove('failure');
    }
    formRow.classList.add('success');
}

function validateEmail(value) {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(String(value).toLowerCase());
}

//local strorage 
function getUser() {
    const json = localStorage.getItem('user'); //đọc chuỗi JSON từ localStorage
    if (json === null) {
        return null;
    }
    return JSON.parse(json); // chuyển chuỗi JSON thành object thật
}

function saveUser(user) {
    localStorage.setItem('user', JSON.stringify(user)); /// stringify  -> lưu
}

function isEmailRegistered(email) {
    const user = getUser();
    if (!user) {
        return false;
    }
    return user.email.toLowerCase() === email.toLowerCase();
}

function registerUser(fullname, email, pw) {
    // const user = getUser();

    const newUser = {
        fullname: fullname,
        email: email,
        password: pw,
    }
    saveUser(newUser);     // lưu lại vào localStorage
}
function findUserByEmail(email) {
    const user = getUser();

    if (user && user.email.toLowerCase() === email.toLowerCase()) {
        return user;
    }
    return undefined; // khong thay
}

const formDangKy = document.getElementById('formDangKy');
if (formDangKy) {
    const nameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const pw1 = document.getElementById('pwReg1');
    const pw2 = document.getElementById('pwReg2');
    const agree = document.getElementById('agree');

    formDangKy.addEventListener('submit', (event) => {
        event.preventDefault();
        let isValid = true;

        if (nameInput.value.trim() === '') {
            errorMessage(nameInput);
            isValid = false;
        } else {
            successMessage(nameInput);
        }
        //email
        if (!validateEmail(emailInput.value)) {
            errorMessage(emailInput);
            isValid = false;
        } else if (isEmailRegistered(emailInput.value)) {
            errorMessage(emailInput);
            isValid = false;
        } else {
            successMessage(emailInput);
        }
        //pw
        if (pw1.value.length < 6) {
            errorMessage(pw1);
            isValid = false;
        } else {
            successMessage(pw1);
        }

        if (pw2.value !== pw1.value || pw2.value === '') {
            errorMessage(pw2);
            isValid = false;
        } else {
            successMessage(pw2);
        }
        if (!agree.checked) {
            showToast('Bạn cần đồng ý với Điều khoản sử dụng và Chính sách bảo mật', 'warning');
            isValid = false;
        }
        if (!isValid) return;

        registerUser(nameInput.value.trim(), emailInput.value.trim(), pw1.value);

        showToast('Đăng ký thành công!', 'success');
        setTimeout(() =>  {
                    window.location.href = '/tai/dnhap.html';
        }, 1000);
    });
}

const formDangNhap = document.getElementById('formDangNhap');

if (formDangNhap) {
    const emailIn = document.getElementById('email');
    const pwIn = document.getElementById('password');
    formDangNhap.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = emailIn.value.trim();
        const password = pwIn.value;

        const user = findUserByEmail(email);

        if (!user) {
            showToast('Vui lòng nhập đúng email đã đăng ký.', 'error');
            return;
        }
        if (password === user.password) {

            localStorage.setItem('currentUser',JSON.stringify(user));
            showToast('Đăng nhập thành công.', 'success');

            // Trả ngược lại trang html mua hàng để tiếp tục thêm vào giỏ hàng.
            setTimeout(() => {
                const redirect = localStorage.getItem("redirectAfterLogin");
                if(redirect){
                    localStorage.removeItem(
                        "redirectAfterLogin"
                    );
                    window.location.href = redirect;
                }
                else{
                    window.location.href="/Nguyen/trangchu.html";
                }
            },1000);
        } else {
            showToast('Sai email hoặc mật khẩu.', 'error');
        }
    })
}