const form = document.getElementById('bookingForm');

const fullname = document.getElementById('fullname');
const phone = document.getElementById('phone');
const email = document.getElementById('email');
const carModel = document.getElementById('carModel');
const plate = document.getElementById('plate');
const province = document.getElementById('province');
const ward = document.getElementById('ward');
const consentLabel = document.getElementById('consent');
const consent = consentLabel.querySelector('input[type="checkbox"]'); // checkbox thật, dùng để check .checked
const serviceInputs = form.querySelectorAll('input[name="service"]'); // nhiều phần tử, không thể dùng getElementById
const serviceList = document.getElementById('serviceList');
const dateInput = document.getElementById('dateInput');
const timeInput = document.getElementById('timeInput');
const km = document.getElementById('km');

// du lieu cua ward 
const wardData = {
    hn: ['Ba Đình', 'Hoàn Kiếm', 'Đống Đa', 'Cầu Giấy'],
    hcm: ['Quận 1', 'Quận 3', 'Bình Thạnh', 'Thủ Đức'],
    ct: ['Ninh Kiều', 'Cái Răng', 'Bình Thủy', 'Tân An'],
    dn: ['Hải Châu', 'Thanh Khê', 'Sơn Trà', 'Cẩm Lệ'],
};

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
// xóa cá options đang có trong ward
function resetWard() {
    while (ward.options.length > 0) {
        ward.remove(0);
    }
    const defaultOption = document.createElement('option');//tạo thẻo mới
    defaultOption.value = '';
    defaultOption.textContent = 'Phường/Xã';//gán chữ hiển thị cho option
    ward.appendChild(defaultOption);// gán thẻ vào trang 
}
//nạp lại danh sách phường/xã theo tỉnh
province.addEventListener('change', () => {
    const list = wardData[province.value] || [];
    resetWard();
    list.forEach((name) => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        ward.appendChild(option);
    });
    ward.parentElement.classList.remove('failure', 'success');
});
//dọn mọi màu đỏ/xanh
function clearAllMessages() {
    form.querySelectorAll('.failure, .success').forEach((el) => {
        el.classList.remove('failure', 'success');
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault(); // ngăn load lại trang khi submit
    let isValid = true;

    if (fullname.value.trim() === '') {
        errorMessage(fullname);
        isValid = false;
    } else {
        successMessage(fullname);
    }

    if (!/^\d{10,}$/.test(phone.value.trim())) {
        errorMessage(phone);
        isValid = false;
    } else {
        successMessage(phone);
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        errorMessage(email);
        isValid = false;
    } else {
        successMessage(email);
    }

    //  ít nhất 1 checkbox
    const hasService = Array.from(serviceInputs).some((cb) => cb.checked);
    if (!hasService) {
        errorMessage(serviceList);
        isValid = false;
    } else {
        successMessage(serviceList);
    }

   
    if (plate.value.trim() === '') {
        errorMessage(plate);
        isValid = false;
    } else {
        successMessage(plate);
    }

    if (carModel.value === '') {
        errorMessage(carModel);
        isValid = false;
    } else {
        successMessage(carModel);
    }

    if (km.value.trim() === '') {
        errorMessage(km);
        isValid = false;
    } else {
        successMessage(km);
    }

    if (province.value === '') {
        errorMessage(province);
        isValid = false;
    } else {
        successMessage(province);
    }

    if (ward.value === '') {
        errorMessage(ward);
        isValid = false;
    } else {
        successMessage(ward);
    }

    if (dateInput.value === '') {
        errorMessage(dateInput);
        isValid = false;
    } else {
        successMessage(dateInput);
    }

    if (timeInput.value === '') {
        errorMessage(timeInput);
        isValid = false;
    } else {
        successMessage(timeInput);
    }

   if (!consent.checked) {
    alert('Vui lòng đồng ý với Chính sách Bảo vệ Dữ liệu cá nhân để tiếp tục.');
    isValid = false;
    return;
}

    if (!isValid) {
        alert('Gửi yêu cầu thất bại! Vui lòng kiểm tra lại thông tin.');
        return;
    }

    alert('Đặt lịch thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.');
    form.reset();
    resetWard();
    clearAllMessages(); 
});