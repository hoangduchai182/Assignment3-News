"use strict";

const input_username = document.getElementById("input-username");
const input_password = document.getElementById("input-password");
const btn_submit = document.getElementById("btn-submit");

btn_submit.addEventListener("click", function () {
  if (validate()) {
    // tìm kiếm user có cùng username vs password
    const user = userArr.find(
      (el) =>
        el.userName == input_username.value &&
        el.passWord == input_password.value
    );
    if (user) {
      // nếu tìm thấy thì lưu xuống storage
      alert("Đăng Nhập Thành Công !");
      saveToStorage(KEY_LOGIN, user);
      // chuyển trang home
      window.location.href = "../index.html";
    } else {
      alert("Thông tin đăng nhập không chính xác, vui lòng kiểm tra lại !");
    }
  }
});
// Hàm kiểm tra input
const validate = () => {
  if (
    input_username.value.trim().length === 0 ||
    input_password.value.trim().length === 0
  ) {
    alert("Fill all Input!");
    return false;
  }
  return true;
};
