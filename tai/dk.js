// const form = document.querySelector('form');
// const fullname = document.querySelector('input[type="text"]');
// const email = document.querySelector('input[type="email"]');
// const pw1 = document.getElementById('pwReg1');
// const pw2 = document.getElementById('pwReg2');
// const agree = document.getElementById('agree');

// // Tự tạo thẻ <span> báo lỗi và chèn vào sau ô input (chỉ tạo 1 lần)
// function getErrorSpan(elmt) {
//     let span = elmt.parentElement.querySelector('.error-text');
//     if (!span) {
//         span = document.createElement('span');
//         span.className = 'error-text';
//         span.style.cssText = 'display:block; font-size:12px; color:red; margin-top:4px;';
//         elmt.parentElement.appendChild(span);
//     }
//     return span;
// }

// function showError(elmt, message) {
//     getErrorSpan(elmt).textContent = message;
//     elmt.style.borderColor = 'red';
// }

// function clearError(elmt) {
//     getErrorSpan(elmt).textContent = '';
//     elmt.style.borderColor = '';
// }

// // ===== LocalStorage: lưu và lấy nháp (họ tên, email) =====
// function saveToStorage() {
//     const data = { fullname: fullname.value, email: email.value };
//     localStorage.setItem('dangKyDraft', JSON.stringify(data));
// }

// function loadFromStorage() {
//     const data = JSON.parse(localStorage.getItem('dangKyDraft'));
//     if (!data) return;
//     fullname.value = data.fullname;
//     email.value = data.email;
// }

// loadFromStorage(); // khôi phục dữ liệu khi vừa mở trang
// fullname.addEventListener('input', saveToStorage);
// email.addEventListener('input', saveToStorage);

// // ===== Validate khi submit =====
// form.addEventListener('submit', () => {
//     let isValid = true;

//     if (fullname.value.trim() === '') {
//         showError(fullname, 'Vui lòng nhập họ và tên');
//         isValid = false;
//     } else {
//         clearError(fullname);
//     }

//     const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
//     if (!regexEmail.test(email.value)) {
//         showError(email, 'Email không hợp lệ');
//         isValid = false;
//     } else {
//         clearError(email);
//     }

//     if (pw1.value.length < 8) {
//         showError(pw1, 'Mật khẩu phải có ít nhất 8 ký tự');
//         isValid = false;
//     } else {
//         clearError(pw1);
//     }

//     if (pw2.value !== pw1.value) {
//         showError(pw2, 'Mật khẩu xác nhận không khớp');
//         isValid = false;
//     } else {
//         clearError(pw2);
//     }

//     if (!agree.checked) {
//         alert('Bạn cần đồng ý điều khoản để đăng ký');
//         isValid = false;
//     }

//     if (isValid) {
//         alert('Đăng ký thành công!');
//         localStorage.removeItem('dangKyDraft'); // xóa nháp vì đã xong
//         form.reset();
//     }
// });