document.addEventListener('DOMContentLoaded', function () {// hàm lắng nghe sự kiện 
    
    const searchForm = document.querySelector('.car-search');// hàm lấy giá trị từ car-search
    if (!searchForm) return;
    
    const selects = searchForm.querySelectorAll('select');// lấy các select trong search-form
    const selectHang      = selects[0]; // Hãng xe
    const selectDong      = selects[1]; // Dòng xe
    const selectNam       = selects[2]; // Năm sản xuất
    const selectGia       = selects[3]; // Khoảng giá
    const selectHopSo     = selects[4]; // Hộp số
    const selectNhienLieu = selects[5]; // Nhiên liệu
    const selectTinhTrang = selects[6]; // Tình trạng

    // Khu vực chứa tất cả các card xe
    const cardsWrapper = document.querySelector('.featured__cards');
    const carLinks = document.querySelectorAll('.featured__cards > .car-link');

    // Tạo thông báo khi không tìm thấy xe
    const noResultMsg = document.createElement('p');
    noResultMsg.textContent = 'Không tìm thấy xe phù hợp.';
    noResultMsg.style.display = 'none';
    noResultMsg.style.width = '100%';
    noResultMsg.style.textAlign = 'center';
    noResultMsg.style.padding = '30px 0';
    noResultMsg.style.fontSize = '18px';
    noResultMsg.style.color = '#666';

    if (cardsWrapper) {
        cardsWrapper.appendChild(noResultMsg);
    }

    /* HÀM KIỂM TRA KHOẢNG GIÁ */

    function isPriceInRange(price, rangeText) {
    switch (rangeText) { // so sánh khoảng giá
        case 'Dưới 2 tỷ':
            return price < 2000000000;

        case '2 - 4 tỷ':
            return price >= 2000000000 && price < 4000000000;

        case '4 - 6 tỷ':
            return price >= 4000000000 && price < 6000000000;

        case 'Trên 6 tỷ':
            return price >= 6000000000;

        default:
            return true;
    }
}
    /* HÀM KIỂM TRA CARD CÓ KHỚP BỘ LỌC */
    function isCardMatch(card, filters) {//card là là một phần tử của HTML (DOM Element) có thuộc tính data-* tự động cung cấp cho 1 dataset
        // Đọc dữ liệu từ thuộc tính data
        const brand        = card.dataset.brand;
        const type         = card.dataset.type;
        const year         = card.dataset.year;
        const price        = Number(card.dataset.price);
        const transmission = card.dataset.transmission;
        const fuel         = card.dataset.fuel;
        const condition    = card.dataset.condition;
        // Điều kiện lọc
        // Nếu điều kiện người dùng chọn khác với điều kiện các atribute của thẻ xe thì không kiếm dc
        if (filters.brand !== '' && brand !== filters.brand) return false;
        if (filters.type !== '' && type !== filters.type) return false;
        if (filters.year !== '' && year !== filters.year) return false;
        if (filters.transmission !== '' && transmission !== filters.transmission) return false;
        if (filters.fuel !== '' && fuel !== filters.fuel) return false;
        if (filters.condition !== '' && condition !== filters.condition) return false;
        // Kiểm tra khoảng giá trong khoảng đã so sánh ở trên
        if (filters.priceRange !== '' && !isPriceInRange(price, filters.priceRange)) return false;

        //trả về card xe phù hợp 
        return true;
    }
    
    /* HÀM XỬ LÝ CHÍNH KHI BẤM NÚT TÌM KIẾM */
    function handleFilterSubmit(event) {// xử lí form khi gửi
        event.preventDefault(); // Chặn việc load lại trang

        // Quét qua TẤT CẢ các select
        const filters = {// gom điều kiện người dùng lại vào 1 object
            brand: selectHang.value.startsWith('--') ? '' : selectHang.value,
            // if select là "--" thì cho kết quả " " rỗng else cho kết quả là 1 giá trị

            type: selectDong.value.startsWith('--') ? '' : selectDong.value,
            year: selectNam.value.startsWith('--') ? '' : selectNam.value,
            priceRange: selectGia.value.startsWith('--') ? '' : selectGia.value,
            transmission: selectHopSo.value.startsWith('--') ? '' : selectHopSo.value,
            fuel: selectNhienLieu.value.startsWith('--') ? '' : selectNhienLieu.value,
            condition: selectTinhTrang.value.startsWith('--') ? '' : selectTinhTrang.value
        };

        let visibleCount = 0;// khai báo đếm số xe phù hợp với điều kiện

        // Duyệt qua danh sách xe để Ẩn / Hiện
        carLinks.forEach(function (card) {
            //khai báo trả về số lượng card xe
            const matched = isCardMatch(card, filters);

            if (matched) {
                card.style.display = ''; // Hiện xe phù hợp
                visibleCount++;
            } else {
                card.style.display = 'none'; // Ẩn xe không phù hợp
            }
        });
        // cuon xuong phan loc
        document.getElementById("fil").scrollIntoView({
        behavior: "smooth",
        block: "start"
        });
        // Hiển thị thông báo nếu không tìm thấy bất kỳ chiếc xe nào
        noResultMsg.style.display = (visibleCount === 0) ? 'block' : 'none';
        
}

    //Tìm Kiếm xe
    searchForm.addEventListener('submit', handleFilterSubmit);
});



/* Hàm chuẩn hóa khi hover vào từng sản phẩm -> Sinh ra href có kèm id sản phẩm hàm của Nguyên viết*/
function generateHoverLinks(){
    const carLinks = document.querySelectorAll(".car-link");

    carLinks.forEach(link => {
        const baseHref = link.getAttribute("href");
        const carId = link.getAttribute("id");

        if(baseHref && carId){
            const finalLink = `${baseHref}?fromItem=${carId}`;
            link.setAttribute("href", finalLink);
        }
    });
}

window.addEventListener("load", () =>{
    generateHoverLinks();
});