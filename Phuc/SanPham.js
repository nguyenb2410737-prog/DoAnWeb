document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.querySelector('.car-search');
    if (!searchForm) return;
    
    const selects = searchForm.querySelectorAll('select');
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
        switch (rangeText) {
            case 'Dưới 1 tỷ':
                return price < 1000000000;
            case '1 - 2 tỷ':
                return price >= 1000000000 && price <= 2000000000;
            case '2 - 4 tỷ':
                return price >= 2000000000 && price <= 4000000000;
            case 'Trên 4 tỷ':
                return price > 4000000000;
            default:
                return true;
        }
    }

    /* HÀM KIỂM TRA CARD CÓ KHỚP BỘ LỌC */
    function isCardMatch(card, filters) {
        // Đọc dữ liệu từ thuộc tính data
        const brand        = card.dataset.brand;
        const type         = card.dataset.type;
        const year         = card.dataset.year;
        const price        = Number(card.dataset.price);
        const transmission = card.dataset.transmission;
        const fuel         = card.dataset.fuel;
        const condition    = card.dataset.condition;
        // Điều kiện lọc
        if (filters.brand !== '' && brand !== filters.brand) return false;
        if (filters.type !== '' && type !== filters.type) return false;
        if (filters.year !== '' && year !== filters.year) return false;
        if (filters.transmission !== '' && transmission !== filters.transmission) return false;
        if (filters.fuel !== '' && fuel !== filters.fuel) return false;
        if (filters.condition !== '' && condition !== filters.condition) return false;
        // Kiểm tra khoảng giá riêng biệt
        if (filters.priceRange !== '' && !isPriceInRange(price, filters.priceRange)) return false;
        return true;
    }
    /* HÀM XỬ LÝ CHÍNH KHI BẤM NÚT TÌM KIẾM */
    function handleFilterSubmit(event) {
        event.preventDefault(); // Chặn việc load lại trang

        // Quét qua TẤT CẢ các select
        const filters = {
            brand: selectHang.value.startsWith('--') ? '' : selectHang.value,
            type: selectDong.value.startsWith('--') ? '' : selectDong.value,
            year: selectNam.value.startsWith('--') ? '' : selectNam.value,
            priceRange: selectGia.value.startsWith('--') ? '' : selectGia.value,
            transmission: selectHopSo.value.startsWith('--') ? '' : selectHopSo.value,
            fuel: selectNhienLieu.value.startsWith('--') ? '' : selectNhienLieu.value,
            condition: selectTinhTrang.value.startsWith('--') ? '' : selectTinhTrang.value
        };

        let visibleCount = 0;

        // Duyệt qua danh sách xe để Ẩn / Hiện
        carLinks.forEach(function (card) {
            const matched = isCardMatch(card, filters);

            if (matched) {
                card.style.display = ''; // Hiện xe phù hợp
                visibleCount++;
            } else {
                card.style.display = 'none'; // Ẩn xe không phù hợp
            }
        });

        // Hiển thị thông báo nếu không tìm thấy bất kỳ chiếc xe nào
        noResultMsg.style.display = (visibleCount === 0) ? 'block' : 'none';
    }

    //Tìm Kiếm xe
    searchForm.addEventListener('submit', handleFilterSubmit);
});


/* Hàm chuẩn hóa khi hover vào từng sản phẩm -> Sinh ra href có kèm id sản phẩm */
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