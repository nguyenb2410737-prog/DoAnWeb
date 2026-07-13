const form = document.getElementById('bookingForm');

const fullname = document.getElementById('fullname');
const phone = document.getElementById('phone');
const email = document.getElementById('email');
const carModel = document.getElementById('carModel');
const plate = document.getElementById('plate');
const province = document.getElementById('province');
const ward = document.getElementById('ward');
const consentLabel = document.getElementById('consent'); // thẻ label, dùng để tô đỏ
const consent = consentLabel.querySelector('input[type="checkbox"]'); // checkbox thật, dùng để check .checked
const serviceInputs = form.querySelectorAll('input[name="service"]');
const serviceList = form.querySelector('.service--list'); 
const dateInput = form.querySelector('input[type="date"]');
const timeInput = form.querySelector('input[type="time"]'); //querySelector lấy theo bất kỳ CSS
const km = document.getElementById('km');

// du lieu cua ward 
const wardData = {
  hn: ['Ba Đình', 'Hoàn Kiếm', 'Đống Đa', 'Cầu Giấy'],
  hcm: ['Quận 1', 'Quận 3', 'Bình Thạnh', 'Thủ Đức'],
  ct: ['Ninh Kiều', 'Cái Răng', 'Bình Thủy', 'Tân An'],
  dn: ['Hải Châu', 'Thanh Khê', 'Sơn Trà', 'Cẩm Lệ'],
};

// doi danh sach phuong xa khi chon tinh thanh
province.addEventListener('change', () => { //dùng để lắng nghe sự kiện.
    const list = wardData[province.value] || []; // lay danh sach tinh vua chon
    ward.innerHTML = '<option value="">Phường/Xã</option>'; // xoa danh sach cu
    list.forEach((name) => { //duyet tung phan tu
        const option = document.createElement('option');
        option.value = name; //gan gtri
        option.textContent = name; // hiện thị chữ
        ward.appendChild(option);//them vao select
    });
    ward.classList.remove('invalid');
});
// ham nhung ô sai
function setInvalid(el, isInvalid) {
  el.classList.toggle('invalid', isInvalid);
}
 // Gỡ trạng thái lỗi ngay khi người dùng sửa lại
[fullname, phone, email, carModel,km, plate, province, ward, dateInput, timeInput].forEach((el) => {
  el.addEventListener('input', () => setInvalid(el, false));
  el.addEventListener('change', () => setInvalid(el, false));
});
serviceInputs.forEach((cb) => {
  cb.addEventListener('change', () => setInvalid(serviceList, false));
});
consent.addEventListener('change', () => setInvalid(consentLabel, false));
 
form.addEventListener('submit', (e) => {
    e.preventDefault(); // ngăn reset khi submit
    let isValid = true;

    // ho ten
    if(fullname.value.trim()===''){
        setInvalid(fullname, true);
        isValid = false;
    }
    // sdt
    if(!/^\d{10,}$/.test(phone.value.trim())){
        setInvalid(phone, true);
    isValid = false;
    }

    //email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())){
        setInvalid(email, true);
        isValid = false;
    }

    const hasService = Array.from(serviceInputs).some((cb) => cb.checked);
    if(!hasService){
        setInvalid(serviceList, true);
        isValid = false;
    }
    if(plate.value.trim()===''){ // trim là gõ tay
        setInvalid(plate, true);
        isValid = false;
    }
    if(carModel.value ===''){ // không ttrim là danh sách có sẵn
      setInvalid(carModel, true);
      isValid = false;
    }
     if(km.value.trim()===''){
        setInvalid(km, true);
        isValid = false;
    }
    if(province.value ===''){
        setInvalid(province, true);
        isValid = false;
    }
      if (ward.value === '') {
        setInvalid(ward, true);
        isValid = false;
    }
 
  // Ngày giờ
    if (dateInput.value === '') {
        setInvalid(dateInput, true);
        isValid = false;
    }
    if (timeInput.value === '') {
        setInvalid(timeInput, true);
        isValid = false;
    }
 
     // Đồng ý điều khoản
    if (!consent.checked) {
        setInvalid(consentLabel, true);
        isValid = false;
    }
  if (!isValid){
    alert('Gửi yêu cầu thất bại! Vui lòng kiểm tra lại thông tin.');
     return;
  }
 
  alert('Đặt lịch thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.');
  form.reset();
  ward.innerHTML = '<option value="">Phường/Xã</option>';
});