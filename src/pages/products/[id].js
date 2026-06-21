import Link from "next/link";
import PagesLayout from "@/components/PagesLayout";
import ProductImage from "@/components/ProductImage";
import { getApiBaseUrl } from "@/lib/api-base";
import { serializeProps } from "@/lib/serialize-props";

export default function ProductDetails({ product }) {
  if (!product?.id) {
    return (
      <PagesLayout title="Product not found" subtitle="This product does not exist.">
        <Link href="/products" className="btn btn-outline">
          Back to products
        </Link>
      </PagesLayout>
    );
  }

  return (
    <PagesLayout title={product.title} subtitle="Product details (GET by id)">
      <div className="detail-card card card-product">
        <ProductImage product={product} large priority />
        <div className="card-body">
          <p className="price-tag">${product.price}</p>
          <p>Brand: {product.brand || "N/A"}</p>
          <Link href="/products" className="btn btn-outline">
            Back to products
          </Link>
        </div>
      </div>
    </PagesLayout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const baseUrl = getApiBaseUrl(context.req);

  const response = await fetch(`${baseUrl}/api/products/${id}`, {
    headers: {
      cookie: context.req.headers.cookie || "",
    },
  });

  const product = response.ok ? await response.json() : null;

  return {
    props: serializeProps({
      product,
    }),
  };
}
