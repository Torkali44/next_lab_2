import Image from "next/image";
import { getProductImage } from "@/lib/product-images";

export default function ProductImage({ product, priority = false, large = false }) {
  const src = getProductImage(product.title, product.image);

  return (
    <div className={`product-image-wrap ${large ? "product-image-wrap-lg" : ""}`}>
      <Image
        src={src}
        alt={product.title}
        fill
        sizes={large ? "(max-width: 768px) 100vw, 420px" : "(max-width: 768px) 100vw, 280px"}
        className="product-image"
        priority={priority}
      />
    </div>
  );
}
