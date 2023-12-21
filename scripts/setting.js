"use strict";
if (isLogin()) {
  const input_page_size = document.getElementById("input-page-size");
  const input_category = document.getElementById("input-category");
  const btn_submit = document.getElementById("btn-submit");

  // Hiện pagesize lên input khi vào setting
  input_page_size.value = userLogin.pagesize;
  // Hiện thị category
  input_category.value = userLogin.category;

  btn_submit.addEventListener("click", function () {
    if (validate()) {
      if (confirm("Bạn có chắc chắn lưu ?")) {
        // Lưu lại thông tin được nhập từ input vào trong mảng
        userLogin.pagesize = input_page_size.value;
        userLogin.category = input_category.value;
        // Lưu vào storage của thông tin đăng nhập
        saveToStorage(KEY_LOGIN, userLogin);

        // Thay đổi pagesize và category trong mảng userArr
        // Tìm kiếm phàn tử có cùng UserName
        const change = userArr.find((el) => el.userName == userLogin.userName);
        // Thay đổi dữ liệu trong phần tử đó theo input
        change.pagesize = input_page_size.value;
        change.category = input_category.value;
        // Thay phần tử đó vào mảng
        userArr[userArr.indexOf(change)] = change;
        // Lưu lại
        saveToStorage(KEY, userArr);

        alert("Bạn đã lưu thay đổi !");
      }
    }
  });

  // Hàm kiểm tra dữ liệu
  function validate() {
    // kiểm tra người dùng đã nhập input hay chưa
    if (input_page_size.value == "") {
      alert("Hãy nhập số bài hiển thị trên trang !");
      return false;
      // nếu số trang nhỏ hơn 0 thì nhập lại
    } else if (input_page_size.value <= 0) {
      alert("Số bài viết trên trang Web phải lớn hơn 0 !");
      return false;
    } else {
      return true;
    }
  }
}
