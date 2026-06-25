const mainImage = document.getElementById("mainImage");
const thumbnails = document.querySelectorAll(".thumbnail");
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener("click", () => {
        const img = thumbnail.querySelector("img");
        mainImage.src = img.src;
        thumbnails.forEach(item => {
            item.classList.remove("active");
        });
        thumbnail.classList.add("active");

    });

});