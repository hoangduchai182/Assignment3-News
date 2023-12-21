"use strict";
const login_modal = document.getElementById("login-modal");
const main_content = document.getElementById("main-content");
const welcome_message = document.getElementById("welcome-message");
const btn_logout = document.getElementById("btn-logout");

// Kiểm tra xem có thông tin đăng nhập hay không bằng việc sử dụng thuộc tính length của mảng login
if (userLogin.length == 0) {
  // ẩn nút logout và hiển thị nút login và Register
  login_modal.classList.remove("d-none");
  main_content.classList.add("d-none");
} else {
  welcome_message.innerHTML = "Welcome " + userLogin.userName;
  // Ẩn nút login và register
  login_modal.classList.add("d-none");
  // Hiển thị logout
  main_content.classList.remove("d-none");
}

// bắt sự kiện nút logout
btn_logout.addEventListener("click", function () {
  // xóa item login hiện của Login trong storage
  localStorage.removeItem(KEY_LOGIN);
  // chuyển trang login
  window.location.href = "./pages/login.html";
});
