"use strict";

// Hàm lưu dữ liệu
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Hàm lấy dữ liệu từ Storage
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Tạo các mảng sử dụng trong nhiều trang
const KEY = "USER_ARRAY";
const users = getFromStorage(KEY) ? getFromStorage(KEY) : [];
// Lấy dữ liệu từ storage (dữ liệu dưới dạng js object)
// chuyển dữ liệu từ JS object thành class instance
console.log(users);
const userArr = users.map((el) => parseUser(el));
console.log(userArr);

const KEY_LOGIN = "currentUser";
const userLogin = getFromStorage(KEY_LOGIN) ? getFromStorage(KEY_LOGIN) : [];

const KEY_TODO = "todoUser";
const todos = getFromStorage(KEY_TODO) ? getFromStorage(KEY_TODO) : [];
// Chuyển dữ liệu sang class instance
const todoArr = todos.map((el) => parseUserTodo(el));

// khai báo biến Page là số trang đang được hiển thị
// Khai báo trong file storage để sử dụng cho file news và file search
let page = 1;

// Do lưu xuống storage là lưu JS object mà không phải class instance
// Hàm chuyển từ JS object thành class instance
function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.userName,
    userData.passWord,
    // Khởi tạo thêm 2 thuộc tính mặc định khi tạo 1 tài khoản mới là category và pagesize
    // Sử dụng trong file setting
    userData.category,
    userData.pagesize
  );
  return user;
}
// Hàm chuyển từ JS object thành class instance
function parseUserTodo(userData) {
  const toDo = new Task(userData.task, userData.owner, userData.isDone);
  return toDo;
}

// Hàm kiểm tra xem người dùng đã login hay không để vào các chức năng khác
function isLogin() {
  // Kiểm tra bằng độ dài mảng login nếu bằng 0 là chưa login
  if (userLogin.length == 0) {
    alert("Bạn phải đăng nhập để thực hiện chức năng này !");
    window.location.href = "../index.html";
    return false;
  }
  return true;
}
