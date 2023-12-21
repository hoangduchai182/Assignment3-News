"use strict";

if (isLogin()) {
  const input_query = document.getElementById("input-query");
  const btn_submit = document.getElementById("btn-submit");
  const nav_page_num = document.getElementById("nav-page-num");

  const news_container = document.getElementById("news-container");
  const btn_prev = document.getElementById("btn-prev");
  const btn_next = document.getElementById("btn-next");
  const page_num = document.getElementById("page-num");

  // ẩn đi nút next , pre khi mới vào trang
  nav_page_num.style.display = "none";

  // bắt sự kiện nút search
  btn_submit.addEventListener("click", function () {
    // kiểm tra
    if (validate()) {
      // in ra dữ liệu
      getAPI(page, userLogin.pagesize, input_query.value);
    }
  });

  // Phần bắt sự kiện nút next và pre giống hệt như trang news
  btn_prev.addEventListener("click", function () {
    page = page - 1;
    page_num.innerHTML = page;
    getAPI(page, userLogin.pagesize, input_query.value);
  });
  btn_next.addEventListener("click", function () {
    page = page + 1;
    page_num.innerHTML = page;
    getAPI(page, userLogin.pagesize, input_query.value);
  });

  // Lấy API cũng gần giống trang new
  // Thay đổi tham số category thành search, giữ 2 tham số còn lại
  async function getAPI(page, pageSize, search) {
    try {
      // Link thay đổi có thêm thuộc tính q=search để tìm kiếm
      // thay evething để tìm kiếm nhiều kết quả hơn
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${search}&page=${page}&pageSize=${pageSize}&apiKey=38d44a83eba0446892ececdfbdf45d80`
      );
      const data = await response.json();

      console.log(data);
      // Nếu không tìm thấy bài viết nào
      if (data.totalResults == 0) {
        // Hiển thị thông báo lên màn hình
        news_container.style.fontSize = "x-large";
        news_container.innerHTML =
          "Không tìm thấy bài viết nào bằng từ khóa " + search;
        nav_page_num.style.display = "none";
        // throw new Error("Không tìm thấy bài viết nào bằng từ khóa " + search);
      } else {
        // Nếu tìm thấy thì hiển thị nút next và pre
        news_container.style.fontSize = "medium";
        nav_page_num.style.display = "block";
        // In ra màn hình
        renderData(data, pageSize);
      }
    } catch (er) {
      alert(er.message);
    }
  }

  // Hàm kiểm tra dữ liệu
  function validate() {
    // Nếu người dùng không nhập từ khóa
    if (input_query.value.trim().length == 0) {
      alert("Hãy nhập từ khóa tìm kiếm !");
      return false;
    }
    return true;
  }

  // Hàm hiển thị bài viết giống hệt như trang new
  function renderData(data, pageSize) {
    const totalResults = data.totalResults;
    page == 1
      ? btn_prev.classList.add("d-none")
      : btn_prev.classList.remove("d-none");

    // 2 trường hợp, nếu tổng số bài chia hết số bài 1 trang thì trang cuối sẽ ẩn nút next
    // còn nếu chia dư thì nút next sẽ ẩn ở trang cuối cộng 1
    if (totalResults % pageSize != 0) {
      page == Math.floor(totalResults / pageSize) + 1
        ? btn_next.classList.add("d-none")
        : btn_next.classList.remove("d-none");
    } else {
      page == totalResults / pageSize
        ? btn_next.classList.add("d-none")
        : btn_next.classList.remove("d-none");
    }

    let html = "";
    data.articles.forEach((el) => {
      html += `
    <div class="card flex-row flex-wrap">
    <div class="card mb-3">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src=${el.urlToImage} class="card-img"/>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${el.title}</h5>
            <p class="card-text">${el.description}</p>
            <a href=${el.url} class="btn btn-primary">View</a>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
    });
    news_container.innerHTML = html;
  }
}
