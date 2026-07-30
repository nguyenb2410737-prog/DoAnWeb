document.addEventListener('DOMContentLoaded', function () {
    // Lắng nghe sự kiện DOMContentLoaded: Chờ cây HTML dựng xong hoàn toàn mới cho chạy script bên trong

    const searchForm = document.querySelector('.car-search');
    // Truy xuất phần tử HTML đầu tiên có class "car-search" (đóng vai trò là Form lọc xe)

    if (!searchForm) return;
    // Kỹ thuật Guard Clause: Nếu trang không có form ".car-search" thì lập tức thoát hàm, tránh báo lỗi script

    const selects = searchForm.querySelectorAll('select');
    // Lấy tất cả các thẻ chọn <select> nằm bên trong form ".car-search" trả về dưới dạng một NodeList

    const selectHang      = selects[0]; // Thẻ select vị trí 1 (index 0): Chọn Hãng xe (BMW, Mercedes...)
    const selectDong      = selects[1]; // Thẻ select vị trí 2 (index 1): Chọn Dòng xe (Sedan, SUV...)
    const selectNam       = selects[2]; // Thẻ select vị trí 3 (index 2): Chọn Năm sản xuất
    const selectGia       = selects[3]; // Thẻ select vị trí 4 (index 3): Chọn Khoảng giá
    const selectHopSo     = selects[4]; // Thẻ select vị trí 5 (index 4): Chọn loại Hộp số
    const selectNhienLieu = selects[5]; // Thẻ select vị trí 6 (index 5): Chọn loại Nhiên liệu
    const selectTinhTrang = selects[6]; // Thẻ select vị trí 7 (index 6): Chọn Tình trạng xe (Mới/Cũ)

    // Khu vực chứa tất cả các card xe
    const cardsWrapper = document.querySelector('.featured__cards');
    // Truy xuất thẻ cha chứa danh sách các thẻ xe có class "featured__cards"

    const carLinks = document.querySelectorAll('.featured__cards > .car-link');
    // Lấy danh sách tất cả các thẻ con ".car-link" nằm trực tiếp bên trong ".featured__cards"

    // Tạo thông báo khi không tìm thấy xe
    const noResultMsg = document.createElement('p');
    // Khởi tạo động một thẻ đoạn văn <p> mới hoàn toàn bằng JS trong bộ nhớ

    noResultMsg.textContent = 'Không tìm thấy xe phù hợp.';
    // Gán nội dung văn bản thông báo vào bên trong thẻ <p> vừa tạo

    noResultMsg.style.display = 'none';
    // Mặc định ẩn thông báo này đi khi mới tải trang

    noResultMsg.style.width = '100%';
    // Thiết lập chiều rộng 100% để thẻ thông báo chiếm trọn một hàng ngang

    noResultMsg.style.textAlign = 'center';
    // Căn chữ thông báo ra chính giữa khung hình

    noResultMsg.style.padding = '30px 0';
    // Tạo khoảng cách đệm trên/dưới 30px giúp thông báo không bị dính sát các phần tử khác

    noResultMsg.style.fontSize = '18px';
    // Đặt cỡ chữ 18px để người dùng dễ đọc

    noResultMsg.style.color = '#666';
    // Đặt màu chữ xám trung tính (#666) giúp giao diện trông dịu mắt

    if (cardsWrapper) {
        cardsWrapper.appendChild(noResultMsg);
        // Gắn thẻ thông báo <p> vừa tạo vào vị trí cuối cùng bên trong khối chứa "cardsWrapper"
    }

    /* HÀM KIỂM TRA KHOẢNG GIÁ */
    function isPriceInRange(price, rangeText) {
        // Hàm nhận vào giá xe (dạng số) và khoảng giá được chọn (dạng chuỗi) để so sánh

        switch (rangeText) { 
            // So sánh chuỗi rangeText với từng trường hợp khoảng giá:

            case 'Dưới 2 tỷ':
                return price < 2000000000;
                // Trả về true nếu giá xe nhỏ hơn 2 tỷ VNĐ

            case '2 - 4 tỷ':
                return price >= 2000000000 && price < 4000000000;
                // Trả về true nếu giá xe nằm từ 2 tỷ đến dưới 4 tỷ VNĐ

            case '4 - 6 tỷ':
                return price >= 4000000000 && price < 6000000000;
                // Trả về true nếu giá xe nằm từ 4 tỷ đến dưới 6 tỷ VNĐ

            case 'Trên 6 tỷ':
                return price >= 6000000000;
                // Trả về true nếu giá xe lớn hơn hoặc bằng 6 tỷ VNĐ

            default:
                return true;
                // Nếu người dùng không chọn khoảng giá nào, mặc định trả về true (không lọc theo giá)
        }
    }

    /* HÀM KIỂM TRA CARD CÓ KHỚP BỘ LỌC */
    function isCardMatch(card, filters) {
        // Hàm nhận vào thẻ xe (card) và đối tượng chứa các điều kiện lọc (filters)

        // Đọc dữ liệu ẩn từ thuộc tính data-* của thẻ xe thông qua dataset trong HTML
        const brand        = card.dataset.brand;        // Đọc data-brand
        const type         = card.dataset.type;         // Đọc data-type
        const year         = card.dataset.year;         // Đọc data-year
        const price        = Number(card.dataset.price); // Đọc data-price và chuyển chuỗi thành dạng Số
        const transmission = card.dataset.transmission; // Đọc data-transmission
        const fuel         = card.dataset.fuel;         // Đọc data-fuel
        const condition    = card.dataset.condition;    // Đọc data-condition

        // Kiểm tra điều kiện (Áp dụng Early Return - Thoát sớm):
        // Nếu tiêu chí có chọn (khác '') và dữ liệu của xe KHÔNG KHỚP với tiêu chí -> Trả về false ngay lập tức
        if (filters.brand !== '' && brand !== filters.brand) return false;
        if (filters.type !== '' && type !== filters.type) return false;
        if (filters.year !== '' && year !== filters.year) return false;
        if (filters.transmission !== '' && transmission !== filters.transmission) return false;
        if (filters.fuel !== '' && fuel !== filters.fuel) return false;
        if (filters.condition !== '' && condition !== filters.condition) return false;

        // Gọi hàm isPriceInRange để kiểm tra xem giá xe có nằm trong khoảng giá đã chọn không
        if (filters.priceRange !== '' && !isPriceInRange(price, filters.priceRange)) return false;

        // Trả về true nếu xe thỏa mãn đầy đủ tất cả các điều kiện lọc
        return true;
    }
    
    /* HÀM XỬ LÝ CHÍNH KHI BẤM NÚT TÌM KIẾM */
    function handleFilterSubmit(event) {
        // Hàm thực thi khi người dùng bấm nộp Form tìm kiếm

        event.preventDefault(); 
        // Ngăn chặn hành vi mặc định của form (chặn việc tải lại trang web)

        // Gom toàn bộ giá trị đang được chọn ở các ô select vào 1 đối tượng Javascript (Object):
        const filters = {
            brand: selectHang.value.startsWith('--') ? '' : selectHang.value,
            // Sử dụng toán tử 3 ngôi: Nếu option bắt đầu bằng "--" thì gán chuỗi rỗng '', ngược lại lấy giá trị chọn

            type: selectDong.value.startsWith('--') ? '' : selectDong.value,
            year: selectNam.value.startsWith('--') ? '' : selectNam.value,
            priceRange: selectGia.value.startsWith('--') ? '' : selectGia.value,
            transmission: selectHopSo.value.startsWith('--') ? '' : selectHopSo.value,
            fuel: selectNhienLieu.value.startsWith('--') ? '' : selectNhienLieu.value,
            condition: selectTinhTrang.value.startsWith('--') ? '' : selectTinhTrang.value
        };

        let visibleCount = 0;
        // Biến đếm số lượng xe phù hợp với điều kiện tìm kiếm (khởi tạo bằng 0)

        // Duyệt qua từng thẻ xe trong danh sách bằng vòng lặp forEach:
        carLinks.forEach(function (card) {
            const matched = isCardMatch(card, filters);
            // Kiểm tra thẻ xe hiện tại có khớp với bộ lọc không (trả về true/false)

            if (matched) {
                card.style.display = ''; 
                // Nếu khớp: Xóa thuộc tính display: none để hiển thị lại xe
                
                visibleCount++;
                // Tăng biến đếm số xe tìm thấy lên 1
            } else {
                card.style.display = 'none'; 
                // Nếu không khớp: Ẩn xe đi bằng thuộc tính display = 'none'
            }
        });

        // Tự động cuộn trang web xuống phần tử có id="fil" (khu vực kết quả lọc)
        document.getElementById("fil").scrollIntoView({
            behavior: "smooth", // Cuộn mượt mà
            block: "start"      // Căn đỉnh của phần tử trùng với đỉnh màn hình
        });

        // Nếu visibleCount bằng 0 (không tìm thấy xe) -> Hiện thông báo; Ngược lại -> Ẩn thông báo
        noResultMsg.style.display = (visibleCount === 0) ? 'block' : 'none';
    }

    // Đăng ký sự kiện 'submit' cho searchForm, khi submit sẽ chạy hàm handleFilterSubmit
    searchForm.addEventListener('submit', handleFilterSubmit);
});


/* Hàm chuẩn hóa liên kết khi tải trang -> Đính kèm Tham số Query String (fromItem) chứa ID của xe */
function generateHoverLinks(){
    const carLinks = document.querySelectorAll(".car-link");
    // Lấy tất cả các thẻ thẻ liên kết xe có class ".car-link"

    carLinks.forEach(link => {
        const baseHref = link.getAttribute("href"); // Lấy giá trị đường dẫn gốc từ thuộc tính href
        const carId = link.getAttribute("id");      // Lấy giá trị mã định danh từ thuộc tính id

        if (baseHref && carId) {
            // Nếu thẻ xe có đầy đủ cả href và id:
            const finalLink = `${baseHref}?fromItem=${carId}`;
            // Nối chuỗi tạo đường dẫn mới chứa ID xe (VD: detail.html?fromItem=car01)

            link.setAttribute("href", finalLink);
            // Cập nhật lại đường dẫn mới cho thuộc tính href của thẻ <a>
        }
    });
}

// Lắng nghe sự kiện "load" của cửa sổ trang web (chạy khi toàn bộ trang và tài nguyên ảnh/CSS đã tải xong hẳn)
window.addEventListener("load", () => {
    generateHoverLinks(); // Thực thi hàm tạo đường dẫn liên kết xe
});