const mainImage = document.getElementById("mainImage");
const thumbnails = document.querySelectorAll(".thumbnail");
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener("click", () => {
        // Lấy ảnh trong thumbnail nhỏ dưới
        const img = thumbnail.querySelector("img");
        // Đổi lên ảnh lớn
        mainImage.src = img.src;
        // Xóa cái cũ 
        thumbnails.forEach(item => {
            item.classList.remove("active");
        });
        // Thêm ảnh mới
        thumbnail.classList.add("active");

    });

});