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
function getUsers() {
    const json = localStorage.getItem('users'); //đọc chuỗi JSON từ localStorage
    if(json === null){
        return [];
    }
    return JSON.parse(json); // chuyển chuỗi JSON thành mảng object thật
}

function saveUsers(users){
    localStorage.setItem('users', JSON.stringify(users)); /// stringify mảng -> lưu
}

function isEmailRegistered(email) {
    const users = getUsers(); /// laays danh sach dang cos
    for(let i=0; i< users.length; i++){
        if(users[i].email.toLowerCase() == email.toLowerCase()) {
            return true;
        }
    }
    return false;
}

function registerUser(fullname, email, pw){
    const users = getUsers();

    const newUser = {
        fullname : fullname,
        email  : email,
        password : pw,
    }
    users.push(newUser);// thêm user mới vào cuối mảng
    saveUsers(users);     // lưu lại toàn bộ mảng (đã có thêm user mới) vào localStorage
}
function findUserByEmail(email) {
    const users = getUsers(); // lấy danh sách user hiện có
    for (let i = 0; i < users.length; i++) {
        if (users[i].email.toLowerCase() === email.toLowerCase()) {
            return users[i]; // tìm thấy 
        }
    }
    return undefined; // khong thay
}





const formDangKy = document.getElementById('formDangKy');
if(formDangKy){
    const nameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const pw1 = document.getElementById('pwReg1');
    const pw2 = document.getElementById('pwReg2');
    const agree = document.getElementById('agree');

    formDangKy.addEventListener('submit', () => {
        let isValid = true;

        if(nameInput.value.trim()=== ''){
            errorMessage(nameInput);
            isValid = false;
        }else{
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
        if(pw1.value.length < 6){
            errorMessage(pw1);
            isValid = false;
        }else{
            successMessage(pw1);
        }

        if(pw2.value !== pw1.value || pw2.value === ''){
            errorMessage(pw2);
            isValid = false;
        }else{
            successMessage(pw2);
        }
        if (!agree.checked) {
            alert('Bạn cần đồng ý với Điều khoản sử dụng và Chính sách bảo mật');
            isValid = false;
        }
        if(!isValid) return;

        registerUser(nameInput.value.trim(), emailInput.value.trim(), pw1.value);
 
        alert('Đăng ký thành công!');
        window.location.href = '/tai/dnhap.html';
    });
}

const formDangNhap = document.getElementById('formDangNhap');

if(formDangNhap) {
    const emailIn = document.getElementById('email');
    const pwIn = document.getElementById('password');
    formDangNhap.addEventListener('submit', () => {

        const email = emailIn.value.trim();
        const password = pwIn.value;

        const user = findUserByEmail(email);

        if(!user){
            alert('Vui lòng nhập đúng email đã đăng ký.');
            return;
        }
        if(password === user.password){
            localStorage.setItem('username', user.fullname);//lưu usename
             
            alert('Đăng nhập thành công. ');
            window.location.href = '/Nguyen/trangchu.html';
        }else {
            alert('Sai email hoặc mật khẩu.');
        }
    })
}