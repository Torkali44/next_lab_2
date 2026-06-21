import ProductForm from "@/components/ProductForm";
import Link from "next/link";
import PagesLayout from "@/components/PagesLayout";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getApiBaseUrl } from "@/lib/api-base";
import { serializeProps } from "@/lib/serialize-props";

export default function ProductFormPage({ product }) {
  return (
    <PagesLayout
      title={product ? "Edit Product" : "Add Product"}
      subtitle="POST and PUT share the same form component."
      showAuth={false}
    >
      <Link href="/products" className="btn btn-outline" style={{ marginBottom: "1rem" }}>
        Back to products
      </Link>
      <ProductForm product={product} />
    </PagesLayout>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/products",
        permanent: false,
      },
    };
  }

  const { id } = context.query;
  let product = null;

  if (id) {
    const baseUrl = getApiBaseUrl(context.req);
    const response = await fetch(`${baseUrl}/api/products/${id}`, {
      headers: {
        cookie: context.req.headers.cookie || "",
      },
    });

    if (response.ok) {
      product = await response.json();
    }
  }

  return {
    props: serializeProps({
      product,
    }),
  };
}
