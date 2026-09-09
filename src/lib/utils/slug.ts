/**
 * Chuyển đổi chuỗi Tiếng Việt có dấu thành Slug đường dẫn URL đẹp & chuẩn SEO
 * Ví dụ: "Nex - Cafe & Restaurant" -> "nex-cafe-restaurant"
 * Ví dụ: "Tài Ký Mì Gia - Hủ Tiếu & Mì - Vĩnh Khánh" -> "tai-ky-mi-gia-hu-tieu-mi-vinh-khanh"
 */
export function slugify(str: string): string {
  if (!str) return '';

  let slug = str.toLowerCase();

  // Đổi ký tự có dấu thành không dấu
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ặ|ẵ|â|ấ|ầ|ẩ|ậ|ẫ/g, 'a');
  slug = slug.replace(/é|è|ẻ|ẹ|ẽ|ê|ế|ề|ể|ệ|ễ/g, 'e');
  slug = slug.replace(/i|í|ì|ỉ|ị|ĩ/g, 'i');
  slug = slug.replace(/ó|ò|ỏ|ọ|õ|ô|ố|ồ|ổ|ộ|ỗ|ơ|ớ|ờ|ở|ợ|ỡ/g, 'o');
  slug = slug.replace(/ú|ù|ủ|ụ|ũ|ư|ứ|ừ|ử|ự|ữ/g, 'u');
  slug = slug.replace(/ý|ỳ|ỷ|ỵ|ỹ/g, 'y');
  slug = slug.replace(/đ/g, 'd');

  // Xóa các ký tự đặc biệt
  slug = slug.replace(/[^a-z0-9 -]/g, '');

  // Đổi khoảng trắng và nhiều dấu gạch ngang thành 1 dấu gạch ngang
  slug = slug.replace(/\s+/g, '-').replace(/-+/g, '-');

  // Xóa gạch ngang ở đầu và cuối
  return slug.replace(/^-+|-+$/g, '');
}

/**
 * Tạo URL chi tiết nhà hàng thân thiện SEO (Ưu tiên dùng slug, nếu không có thì fallback sang id)
 */
export function getRestaurantUrl(restaurant: { slug?: string; id?: string; _id?: string; name?: string; tenQuan?: string }): string {
  if (restaurant.slug) {
    return `/restaurant/${restaurant.slug}`;
  }
  
  const name = restaurant.name || restaurant.tenQuan;
  const id = restaurant.id || restaurant._id;

  if (name && id) {
    const generatedSlug = slugify(name);
    return `/restaurant/${generatedSlug}-${id}`;
  }

  return `/restaurant/${id || 'detail'}`;
}
