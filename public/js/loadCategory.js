// Hàm load danh sách category
async function loadCategoryList() {
  try {
    const response = await fetch("/categories/fetchCategoryList");
    const data = await response.json();

    const tbody = document.getElementById("categoryListTableBody");
    tbody.innerHTML = "";

    if (data.success) {
      data.data.forEach((category) => {
        const row = document.createElement("tr");

        // Format ngày tháng
        const createdAt = new Date(category.created_at).toLocaleString("vi-VN");
        const updatedAt = new Date(category.updated_at).toLocaleString("vi-VN");

        // Format trạng thái
        let statusText = "";
        switch (category.status) {
          case 1:
            statusText = "Bản thảo";
            break;
          case 2:
            statusText = "Phát hành";
            break;
          case 3:
            statusText = "Lưu trữ";
            break;
          default:
            statusText = "Không xác định";
        }

        // Hiển thị avatar nếu có
        const avatarHtml = category.avatar
          ? `<img src="${category.avatar}" alt="Avatar" style="width: 50px; height: 50px; object-fit: cover;">`
          : "Không có";

        row.innerHTML = `
          <td>${category.name}</td>
          <td>${category.parent_name || "Không có"}</td>
          <td>${statusText}</td>
          <td>${avatarHtml}</td>
          <td>${category.created_by_name || "Không xác định"}</td>
          <td>${createdAt}</td>
          <td>${updatedAt}</td>
        `;

        tbody.appendChild(row);
      });

      // Khởi tạo lại DataTable
      if ($.fn.DataTable.isDataTable("#categoryList")) {
        $("#categoryList").DataTable().destroy();
      }
      new DataTable("#categoryList", {
        layout: {
          topStart: {
            buttons: ["copy", "excel", "pdf", "colvis"],
          },
        },
        language: {
          url: "//cdn.datatables.net/plug-ins/1.13.7/i18n/vi.json",
        },
      });
    }
  } catch (error) {
    console.error("Lỗi khi load danh sách category:", error);
  }
}

// Gọi hàm load khi trang tải xong
document.addEventListener("DOMContentLoaded", function () {
  loadCategoryList();
});
