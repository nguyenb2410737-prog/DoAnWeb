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



    const noResultMsg = document.createElement('p');
    noResultMsg.textContent = 'Không tìm thấy xe phù hợp.';
    noResultMsg.classList.add('no-result-message'); // có thể style thêm trong CSS
    noResultMsg.style.display = 'none';
    noResultMsg.style.width = '100%';
    noResultMsg.style.textAlign = 'center';
    noResultMsg.style.padding = '30px 0';
    noResultMsg.style.fontSize = '18px';
    noResultMsg.style.color = '#666';

    if (cardsWrapper) {
        cardsWrapper.appendChild(noResultMsg);
    }


    /*HÀM KIỂM TRA KHOẢNG GIÁ*/
    function isPriceInRange(price, rangeText) {
        switch (rangeText) {
            case 'Dưới 1 tỷ':
                return price <= 1000000000;
            case '1 - 2 tỷ':
                return price >= 1000000000 && price <= 2000000000;
            case '2 - 4 tỷ':
                return price >= 2000000000 && price <= 4000000000;
            case 'Trên 4 tỷ':
                return price > 4000000000;
            default:
                // Nếu không khớp trường hợp nào thì không lọc theo giá
                return true;
        }
    }
    /*HÀM KIỂM TRA 1 CARD CÓ KHỚP BỘ LỌC */
    function isCardMatch(card, filters) {

        // Đọc dữ liệu đã gắn sẵn trên thẻ <a class="car-link"> qua data-*
        const brand        = card.dataset.brand;
        const type         = card.dataset.type;
        const year         = card.dataset.year;
        const price        = Number(card.dataset.price);
        const transmission = card.dataset.transmission;
        const fuel         = card.dataset.fuel;
        const condition    = card.dataset.condition;

        // Hãng xe
        if (filters.brand !== '' && brand !== filters.brand) return false;

        // Dòng xe
        if (filters.type !== '' && type !== filters.type) return false;

        // Năm sản xuất
        if (filters.year !== '' && year !== filters.year) return false;

        // Hộp số
        if (filters.transmission !== '' && transmission !== filters.transmission) return false;

        // Nhiên liệu
        if (filters.fuel !== '' && fuel !== filters.fuel) return false;

        // Tình trạng
        if (filters.condition !== '' && condition !== filters.condition) return false;

        // Khoảng giá (so sánh riêng bằng hàm isPriceInRange)
        if (filters.priceRange !== '' && !isPriceInRange(price, filters.priceRange)) return false;

        // Không bị loại ở bước nào => card này khớp bộ lọc
        return true;
    }
    /* HÀM XỬ LÝ CHÍNH KHI NGƯỜI DÙNG BẤM "TÌM KIẾM XE" */
    function handleFilterSubmit(event) {

        // Chặn hành vi mặc định của form (load lại trang / chuyển trang)
        event.preventDefault();

        // Đọc giá trị đang chọn của từng select.
        // Riêng "Hãng xe" và "Dòng xe" có option mặc định dạng
        const filters = {
            brand: selectHang.value.startsWith('--') ? '' : selectHang.value,
            type: selectDong.value.startsWith('--') ? '' : selectDong.value,
            year: selectNam.value,
            priceRange: selectGia.value,
            transmission: selectHopSo.value,
            fuel: selectNhienLieu.value,
            condition: selectTinhTrang.value
        };

        // Đếm số xe còn hiển thị sau khi lọc
        let visibleCount = 0;

        // Duyệt qua từng card xe đã có sẵn trong HTML, chỉ ẩn/hiện,
        // KHÔNG tạo lại danh sách, KHÔNG dùng innerHTML
        carLinks.forEach(function (card) {
            const matched = isCardMatch(card, filters);

            if (matched) {
                // Xóa display inline để CSS gốc (responsive) tự quyết định
                // cách hiển thị (flex/grid/block...), không phá layout
                card.style.display = '';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Nếu không có xe nào khớp thì hiện thông báo, ngược lại thì ẩn
        noResultMsg.style.display = (visibleCount === 0) ? 'block' : 'none';
    }
    searchForm.addEventListener('submit', handleFilterSubmit);

});