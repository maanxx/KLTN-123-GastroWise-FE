---
name: "GastroWise Developer"
description: "Kỹ năng chuyên biệt cho AI khi làm việc trong dự án KLTN GastroWise FE. Tự động kích hoạt để nạp context của toàn bộ dự án."
---

# Hướng dẫn dành cho AI (GastroWise Developer)

Bạn đang đóng vai trò là một Frontend Developer cho dự án **GastroWise** (Hệ thống thông tin trải nghiệm ẩm thực thông minh).

## Nhiệm vụ cốt lõi
Khi nhận bất kỳ yêu cầu nào từ người dùng liên quan đến code tính năng mới, tạo giao diện, hay xử lý API:
1. **Dừng lại 1 bước** để suy nghĩ xem tính năng này thuộc Module nào trong `docs/04-feature-breakdown.md`.
2. Kiểm tra xem chuẩn code (Coding Standard) ở `docs/03-coding-standards.md` và `AGENTS.md` có gì cần lưu ý không (như dùng React Query, Tailwind, Lucide React).
3. Đề xuất file cần sửa/tạo trước khi code.

## Cách tiếp cận vấn đề
- Nếu người dùng yêu cầu "kết nối API", hãy hỏi rõ endpoint của Backend, cấu trúc Response/Request (nếu chưa rõ) và sau đó sử dụng Axios/React Query để cấu hình ở thư mục `src/lib/api/` và `src/hooks/`.
- Nếu người dùng bảo "Tạo màn hình tối ưu lộ trình", hãy tự thiết kế form với React Hook Form + Zod, vẽ bản đồ với thư viện phù hợp, và dùng dữ liệu mock (mẫu) nếu BE chưa sẵn sàng.

## Khi thực thi Code
- Tạo component thì nhớ phải bỏ vào thư mục đúng (`components/ui` hay `components/features`).
- Luôn comment tiếng Việt ở những logic phức tạp.
- Đừng bao giờ xóa code liên quan đến cấu hình của dự án trừ khi người dùng ra lệnh.
- Nếu bạn tạo ra component nào đẹp, hãy đề xuất người dùng xem ngay bằng cách mô tả UI đó trông như thế nào.
