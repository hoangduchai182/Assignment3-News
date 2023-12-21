"use strict";
if (isLogin()) {
  const input_task = document.getElementById("input-task");
  const btn_add = document.getElementById("btn-add");
  const todo_list = document.getElementById("todo-list");
  //const close = document.getElementsByClassName("close");

  // Hiển thị lên màn hình những task đã thiết lập từ trước
  renderToDo(filterTodo(todoArr));

  btn_add.addEventListener("click", function () {
    if (validate()) {
      // Tạo user mới chứa dữ liệu thêm vào
      const toDo = new Task(input_task.value, userLogin.userName, false);
      // Thêm user vào mảng todoArr
      todoArr.push(toDo);
      // Lưu storage
      saveToStorage(KEY_TODO, todoArr);
      // Lọc để lấy những phần tử có cùng userName của userLogin
      // Hiển thị trên màn hình
      renderToDo(filterTodo(todoArr));
      clearInput();
    }
  });

  function validate() {
    if (input_task.value.trim().length == 0) {
      alert("Điền thông tin vào Task");
      return false;
    } else if (
      // Vì không có id cho từng task thêm vào nên
      // Thêm điều kiện nội dung thêm mới không trùng với nội dung đã có
      // Để tránh việc bị trùng lặp task khi xóa sẽ xóa nhầm task
      todoArr.find(
        (item) =>
          item.task === input_task.value && item.owner === userLogin.userName
      )
    ) {
      alert("Task này đã có trên danh sách");
      return false;
    }
    return true;
  }

  function clearInput() {
    input_task.value = "";
  }

  // Hàm lọc các phần tử có cùng userName
  function filterTodo(arr) {
    return arr.filter((el) => el.owner == userLogin.userName);
  }

  function renderToDo(arr) {
    let html = "";
    // Tạo các thẻ hiển thị
    arr.forEach((el) => {
      html += `
    <li class=${el.isDone == true ? "checked" : ""}>${
        el.task
      }<span class="close">x</span></li>
    `;
    });
    todo_list.innerHTML = html;

    toggleTask();
    deleteTask();
  }

  function toggleTask() {
    // Chọn toàn bộ Li trong ul rồi lựa chọn từng cái một
    document.querySelectorAll("#todo-list li").forEach((liTask) => {
      liTask.addEventListener("click", function (e) {
        // Vì li còn có thẻ span dấu x nên khi target cần loại bỏ khả năng
        // ấn chuột vào dấu x sẽ gây hiện tượng chồng chéo Click
        if (e.target != liTask.children[0]) {
          //Bật tắt class checked khi click vào task
          liTask.classList.toggle("checked");
          // Tìm kiếm task có userName và task tương ứng
          const todoEl = todoArr.find((item) => {
            return (
              item.owner === userLogin.userName &&
              // Vì thuộc tính textContent hiển thị toàn bộ nội dung trong thẻ nên phải thêm dấu x
              item.task + "x" === liTask.textContent
            );
          });
          // Chỉnh sửa thuộc tính isDone dựa theo class Checked
          todoEl.isDone = liTask.classList.contains("checked") ? true : false;
          // Lưu lại
          saveToStorage(KEY_TODO, todoArr);
        }
      });
    });
  }

  function deleteTask() {
    // Lựa chọn tất cả các thẻ span rồi chọn từng thẻ một
    document.querySelectorAll("#todo-list .close").forEach((liTask) => {
      liTask.addEventListener("click", function () {
        if (confirm("Bạn có chắc chắn xóa ?")) {
          // Lọc để lấy thẻ span có nội dung đúng với thẻ đang click
          const deleteEl = todoArr.find((item) => {
            return (
              item.owner === userLogin.userName &&
              // Thuộc tính parentElement trả về phần tử cha của phần tử span
              item.task + "x" === liTask.parentElement.textContent
            );
          });
          // loại bỏ thẻ đó khỏi mảng
          todoArr.splice(todoArr.indexOf(deleteEl), 1);
          // lưu
          saveToStorage(KEY_TODO, todoArr);
          // In lại trên màn hình
          renderToDo(filterTodo(todoArr));
        }
      });
    });
  }
}
