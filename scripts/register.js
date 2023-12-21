"use strict";

const input_firstname = document.getElementById("input-firstname"),
  input_lastname = document.getElementById("input-lastname"),
  input_username = document.getElementById("input-username"),
  input_password = document.getElementById("input-password"),
  input_password_confirm = document.getElementById("input-password-confirm"),
  btn_submit = document.getElementById("btn-submit");

btn_submit.addEventListener("click", function () {
  // lấy dữ liệu từ form và đưa vào một user mới tạo
  const user = new User(
    input_firstname.value,
    input_lastname.value,
    input_username.value,
    input_password.value
  );
  // Kiểm tr dữ liệu
  if (validate(user)) {
    // Thêm vào mảng
    userArr.push(user);
    // lưu
    saveToStorage(KEY, userArr);
    alert("Đăng kí thành công !");
    clearInput();
    // Chuyển trang login
    window.location.href = "../pages/login.html";
  }
});

// Hàm kiểm tra dữ liệu
const validate = (user) => {
  if (
    // Hàm trim để loại bỏ khoảng trắng
    // Kiểm tra xem người dùng nhập thông tin vào các ô input hay chưa
    user.firstName.trim().length == 0 ||
    user.lastName.trim().length == 0 ||
    user.userName.trim().length == 0 ||
    user.passWord.trim().length == 0 ||
    input_password_confirm.value.trim().length == 0
  ) {
    alert("Hãy điền đầy đủ thông tin !");
    return false;
  } else if (userArr.find((el) => el.userName == user.userName)) {
    // Kiểm tra user name mới nhập có bị trùng hay không
    //find trả về phần tử thỏa mãn điều kiện
    alert("Username này đã được đăng kí !");
    return false;
  } else if (user.passWord.length < 8) {
    // Kiểm tra độ dài mật khẩu
    alert("Mật khẩu không được ngắn hơn 8 ký tự !");
    return false;
  } else if (user.passWord != input_password_confirm.value) {
    // Đối chiếu mật khẩu
    alert("Xác nhận mật khẩu phải trùng với mật khẩu !");
    return false;
  } else {
    return true;
  }
};
const clearInput = () => {
  input_firstname.value = "";
  input_lastname.value = "";
  input_username.value = "";
  input_password.value = "";
  input_password_confirm.value = "";
};
