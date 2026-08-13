# Luồng Sự Kiện Trang Hồ Sơ Người Dùng (User Profile Flow)

Tài liệu này mô tả chi tiết luồng hoạt động (Event Flow) của trang Hồ Sơ Người Dùng trong ứng dụng GastroWise, phục vụ cho việc đính kèm vào báo cáo Khóa Luận Tốt Nghiệp (KLTN).

## 1. Giới thiệu chức năng

Trang Hồ sơ cá nhân (Profile Page) cho phép người dùng:
1. **Xem thông tin**: Hiển thị họ tên, email, số điện thoại, và các thống kê liên quan đến ứng dụng (số km tiết kiệm, chi tiêu, lộ trình).
2. **Cập nhật thông tin**: Chỉnh sửa họ tên, số điện thoại thông qua Form cập nhật.
3. **Đăng xuất**: Hủy bỏ phiên đăng nhập và xóa token lưu trữ.

## 2. Sơ đồ Luồng Hoạt Động (Sequence Diagram)

Dưới đây là sơ đồ Mermaid mô tả tương tác giữa Người dùng (Client), Trình duyệt (Frontend), và Máy chủ (Backend NestJS) khi thực hiện các chức năng trên trang.

```mermaid
sequenceDiagram
    autonumber
    actor User as Người dùng
    participant FE as Frontend (Next.js)
    participant AuthStore as Zustand Auth Store
    participant Query as React Query
    participant BE as Backend (NestJS)
    participant DB as MongoDB

    %% 1. Tải trang và lấy dữ liệu
    rect rgb(235, 245, 255)
        note right of User: Giai đoạn 1: Truy cập trang Hồ sơ
        User->>FE: Mở trang /profile
        FE->>AuthStore: Kiểm tra trạng thái isAuthenticated
        alt Chưa đăng nhập
            FE-->>User: Chuyển hướng về /login
        else Đã đăng nhập
            FE->>Query: Gọi hook useGetProfile()
            Query->>BE: GET /auth/profile (kèm Bearer Token)
            BE->>DB: Truy vấn thông tin User bằng ID
            DB-->>BE: Trả về dữ liệu User
            BE-->>Query: Trả về JSON (200 OK)
            Query-->>FE: Lưu vào Cache & Trả dữ liệu
            FE-->>User: Hiển thị giao diện Hồ sơ cá nhân
        end
    end

    %% 2. Cập nhật thông tin
    rect rgb(235, 255, 240)
        note right of User: Giai đoạn 2: Cập nhật thông tin cá nhân
        User->>FE: Bấm nút "Cài đặt" (Settings)
        FE-->>User: Hiển thị Form (Input: Họ tên, SĐT)
        User->>FE: Nhập dữ liệu và bấm "Lưu"
        FE->>Query: Gọi hook useUpdateProfile.mutate(formData)
        Query->>BE: PATCH /auth/profile (Payload: full_name, phone)
        BE->>DB: Cập nhật dữ liệu vào Collection Users
        DB-->>BE: Trả về User đã cập nhật
        BE-->>Query: Trả về JSON User mới (200 OK)
        Query->>Query: Cập nhật lại Cache dữ liệu Profile
        Query->>AuthStore: Đồng bộ dữ liệu mới (Zustand)
        Query-->>FE: Kích hoạt onSuccess callback
        FE-->>User: Hiển thị Toast "Cập nhật thành công" & Đóng Form
    end

    %% 3. Đăng xuất
    rect rgb(255, 240, 240)
        note right of User: Giai đoạn 3: Đăng xuất (Logout)
        User->>FE: Bấm nút "Đăng xuất" (Logout)
        FE->>AuthStore: Gọi hàm logout()
        AuthStore->>AuthStore: Xóa trạng thái isAuthenticated & Xóa Token
        FE-->>User: Hiển thị Toast "Đã đăng xuất"
        FE-->>User: Chuyển hướng về trang /login
    end
```

## 3. Kiến trúc State Management

- **Zustand (`useAuthStore`)**: Quản lý trạng thái đăng nhập toàn cục (`isAuthenticated`) và chứa một bản sao thông tin thiết yếu của User (để hiển thị trên Header, Navbar...).
- **React Query (`useGetProfile`, `useUpdateProfile`)**: Quản lý việc gọi API, lưu cache (caching), trạng thái tải (isLoading) và cập nhật dữ liệu tự động mà không cần refresh trang. Khi gọi API `PATCH` thành công, React Query sẽ tự động ghi đè bản cache cũ và báo cho Zustand cập nhật.

## 4. Ghi chú cho Báo cáo

Bạn có thể copy đoạn mã `mermaid` trên và dán vào các công cụ hỗ trợ như [Mermaid Live Editor](https://mermaid.live/) hoặc chèn trực tiếp vào các file Markdown có hỗ trợ (như GitHub, Notion, Obsidian) để nó tự render ra thành hình ảnh biểu đồ.
