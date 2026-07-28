/* Sử dụng các thông báo*/
function showToast(message, type = "success") {

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.classList.remove("success", "error", "warning", "info");
    toast.classList.add(type);
    toast.classList.add("show");

    clearTimeout(toast.timer);

    toast.timer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}