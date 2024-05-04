// Hàm điền thông tin vào các ô input
function fillForm() {
    // Lấy giá trị từ ô input

    // Điền thông tin vào các ô input
    document.getElementById("name").value = "haha5";
    document.getElementById("email").value = "h5@gmail.com";
    document.getElementById("birth").value = "2024-04-19"; //yyyy-MM-dd
    document.getElementById("phonum").value = "090456789";
    document.getElementById("Gerne").value = "Nam";
    document.getElementById("addr").value = "HTP http";
    document.getElementById("khoa").value = "Khoa A";
    document.getElementById("ngaykham").value = "2024-04-19";//yyyy-MM-ddThh:mm
    //document.getElementById("buoi").value = "Buổi sáng";
    document.getElementById("sick").value = "mệt quá nha";
}

// Lắng nghe sự kiện click của nút "Điền Thông Tin"
document.addEventListener("DOMContentLoaded", function() {
    fillForm();
});
