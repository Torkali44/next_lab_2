export function serializeProduct(doc) {
  if (!doc) return null;

  const title = doc.title;
  const image = doc.image || "";

  return {
    id: doc._id.toString(),
    title,
    price: doc.price,
    brand: doc.brand || "",
    image: image || null,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

export function serializeProducts(docs) {
  return docs.map((doc) => serializeProduct(doc));
}
