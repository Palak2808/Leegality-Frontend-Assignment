import { useEffect, useState } from "react";
import { ArrowLeft, Package } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import StarRating from "../components/products/StarRating";
import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import { getProductById } from "../services/productService";
import type { Product } from "../types/product";

const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProduct = async () => {
    if (!id || !Number.isInteger(Number(id)) || Number(id) <= 0) {
      setError("Invalid product ID.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await getProductById(Number(id));

      setProduct(response);
    } catch {
      setError("Unable to load product details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return (
    <main className="mx-auto min-h-screen max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
      <Link
        to={`/${location.search}`}
        className="mb-7 inline-flex items-center gap-2 rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
      >
        <ArrowLeft size={17} />
        Back
      </Link>

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchProduct} />
      ) : product ? (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex min-h-[400px] flex-col justify-between border-b border-gray-100 p-6 sm:p-10 lg:border-b-0 lg:border-r">
              <div className="flex flex-1 items-center justify-center">
                <img
                  src={product.images?.[0] || product.thumbnail}
                  alt={product.title}
                  className="max-h-[440px] w-full object-contain"
                />
              </div>

              {product.images && product.images.length > 1 && (
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  {product.images.slice(0, 5).map((image, index) => (
                    <div
                      key={`${image}-${index}`}
                      className="flex h-16 w-16 items-center justify-center rounded-md border border-gray-200 p-1"
                    >
                      <img
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 sm:p-10">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.title}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="text-2xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>

                <StarRating rating={product.rating} />
              </div>

              <div className="mt-6 space-y-2 border-b border-gray-100 pb-6 text-sm">
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-800">
                    Brand:
                  </span>{" "}
                  {product.brand || "Not specified"}
                </p>

                <p className="text-gray-600">
                  <span className="font-semibold text-gray-800">
                    Category:
                  </span>{" "}
                  <span className="capitalize">{product.category}</span>
                </p>

                <p className="flex items-center gap-2 text-gray-600">
                  <Package size={16} />
                  <span>
                    <span className="font-semibold text-gray-800">
                      Stock:
                    </span>{" "}
                    {product.stock} units available
                  </span>
                </p>
              </div>

              <section className="border-b border-gray-100 py-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Description
                </h2>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                  {product.description}
                </p>
              </section>

              <section className="pt-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Reviews
                </h2>

                {product.reviews && product.reviews.length > 0 ? (
                  <div className="mt-5 space-y-5">
                    {product.reviews.map((review, index) => (
                      <article
                        key={`${review.reviewerEmail}-${index}`}
                        className="border-b border-gray-100 pb-4 last:border-0"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="text-sm font-semibold text-gray-900">
                            {review.reviewerName}
                          </h3>

                          <StarRating
                            rating={review.rating}
                            showValue
                          />
                        </div>

                        <p className="mt-2 text-sm leading-6 text-gray-600">
                          {review.comment}
                        </p>

                        <p className="mt-2 text-xs text-gray-400">
                          {new Date(review.date).toLocaleDateString()}
                        </p>
                      </article>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-gray-500">
                    No reviews available for this product.
                  </p>
                )}
              </section>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
};

export default ProductDetails;