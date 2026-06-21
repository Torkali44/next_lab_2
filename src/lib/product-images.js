export const DEFAULT_PRODUCT_IMAGE =
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80";

export const productImagesByTitle = {
  "iPhone 14":
    "https://images.unsplash.com/photo-1678652197950-641316e62484?w=600&auto=format&fit=crop&q=80",
  "Galaxy S24":
    "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80",
  "Redmi Note":
    "https://images.unsplash.com/photo-1598327272324-d430f2091776?w=600&auto=format&fit=crop&q=80",
  "Pixel 8":
    "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&auto=format&fit=crop&q=80",
  "OnePlus 12":
    "https://images.unsplash.com/photo-1565849902801-08a057247465?w=600&auto=format&fit=crop&q=80",
};

export function getProductImage(title, image) {
  if (image) return image;
  return productImagesByTitle[title] || DEFAULT_PRODUCT_IMAGE;
}
