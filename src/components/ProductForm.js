"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DEFAULT_PRODUCT_IMAGE } from "@/lib/product-images";

const initialState = {
  error: "",
  success: false,
};

async function saveProduct(prevState, formData) {
  const id = formData.get("id");
  const title = formData.get("title");
  const price = formData.get("price");
  const brand = formData.get("brand");
  const image = formData.get("image");

  if (!title || !price) {
    return { error: "Title and price are required", success: false };
  }

  const response = await fetch(id ? `/api/products/${id}` : "/api/products", {
    method: id ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      price: Number(price),
      brand,
      image,
    }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    return {
      error: data.message || "Failed to save product",
      success: false,
    };
  }

  return { error: "", success: true };
}

export default function ProductForm({ product = null }) {
  const router = useRouter();
  const isEdit = Boolean(product?.id);
  const [previewImage, setPreviewImage] = useState(product?.image || DEFAULT_PRODUCT_IMAGE);

  const [state, formAction, isPending] = useActionState(saveProduct, initialState);

  useEffect(() => {
    if (state.success) {
      router.push("/products");
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="form-card">
      {isEdit && <input type="hidden" name="id" value={product.id} />}

      <div>
        <span className="badge">{isEdit ? "PUT" : "POST"}</span>
        <h2 style={{ marginTop: "0.75rem" }}>{isEdit ? "Edit Product" : "Add Product"}</h2>
        <p className="text-muted">Same component handles create and update using useActionState.</p>
      </div>

      <input
        className="input"
        name="title"
        placeholder="Title"
        defaultValue={product?.title || ""}
        required
      />
      <input
        className="input"
        name="price"
        type="number"
        placeholder="Price"
        defaultValue={product?.price ?? ""}
        required
      />
      <input
        className="input"
        name="brand"
        placeholder="Brand"
        defaultValue={product?.brand || ""}
      />
      <input
        className="input"
        name="image"
        type="url"
        placeholder="Image URL"
        defaultValue={product?.image || ""}
        onChange={(event) =>
          setPreviewImage(event.target.value || DEFAULT_PRODUCT_IMAGE)
        }
      />

      <div className="product-preview">
        <p className="text-muted">Image preview</p>
        <img src={previewImage} alt="Product preview" className="product-preview-img" />
      </div>

      {state.error && <p className="alert alert-error">{state.error}</p>}

      <button type="submit" className="btn btn-primary" disabled={isPending}>
        {isPending ? "Saving..." : isEdit ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}
