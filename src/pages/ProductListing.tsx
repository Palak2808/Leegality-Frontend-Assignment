import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FiltersSidebar from "../components/products/FiltersSidebar";
import ProductCard from "../components/products/ProductCard";
import Pagination from "../components/products/Pagination";
import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import {
  getCategories,
  getProducts,
} from "../services/productService";
import type { Product, ProductCategory } from "../types/product";

const PRODUCTS_PER_PAGE = 8;

const ProductListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const search = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "";
  const selectedBrands = searchParams.getAll("brand");
  const minPrice = searchParams.get("min") || "";
  const maxPrice = searchParams.get("max") || "";
  const currentPage = Math.max(
    1,
    Number(searchParams.get("page") || 1)
  );

  const updateFilters = (
    updates: Record<string, string | string[] | null>,
    resetPage = true
  ) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      params.delete(key);

      if (Array.isArray(value)) {
        value.forEach((item) => params.append(key, item));
      } else if (value !== null && value !== "") {
        params.set(key, value);
      }
    });

    if (resetPage) {
      params.delete("page");
    }

    setSearchParams(params);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [productResponse, categoryResponse] = await Promise.all([
        getProducts(),
        getCategories(),
      ]);

      setProducts(productResponse.products);
      setCategories(categoryResponse);
    } catch {
      setError("Unable to load products. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const brands = useMemo(() => {
    return Array.from(
      new Set(
        products
          .map((product) => product.brand)
          .filter((brand): brand is string => Boolean(brand))
      )
    ).sort((a, b) => a.localeCompare(b));
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase()) ||
        (product.brand || "").toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;

      const matchesBrand =
        selectedBrands.length === 0 ||
        (product.brand && selectedBrands.includes(product.brand));

      const matchesMinPrice =
        minPrice === "" || product.price >= Number(minPrice);

      const matchesMaxPrice =
        maxPrice === "" || product.price <= Number(maxPrice);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesMinPrice &&
        matchesMaxPrice
      );
    });
  }, [
    products,
    search,
    selectedCategory,
    selectedBrands,
    minPrice,
    maxPrice,
  ]);

  const totalPages = Math.ceil(
    filteredProducts.length / PRODUCTS_PER_PAGE
  );

  const safePage = Math.min(
    currentPage,
    Math.max(totalPages, 1)
  );

  const visibleProducts = useMemo(() => {
    const startIndex = (safePage - 1) * PRODUCTS_PER_PAGE;

    return filteredProducts.slice(
      startIndex,
      startIndex + PRODUCTS_PER_PAGE
    );
  }, [filteredProducts, safePage]);

  const handleBrandChange = (brand: string) => {
    const updatedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((item) => item !== brand)
      : [...selectedBrands, brand];

    updateFilters({ brand: updatedBrands });
  };

  const handlePriceApply = (min: string, max: string) => {
    const validMin = min.trim();
    const validMax = max.trim();

    if (
      (validMin && Number(validMin) < 0) ||
      (validMax && Number(validMax) < 0) ||
      (validMin && validMax && Number(validMin) > Number(validMax))
    ) {
      return;
    }

    updateFilters({
      min: validMin || null,
      max: validMax || null,
    });
  };

  const handlePageChange = (page: number) => {
    updateFilters({ page: String(page) }, false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="mx-auto min-h-screen max-w-[1400px] px-4 py-7 sm:px-6 lg:px-8">
      <div className="mb-7">
        <p className="mb-2 text-sm text-gray-500">
          Home / Products
        </p>

        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Product Listing Page
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Explore our collection and find products you'll love.
        </p>
      </div>

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchData} />
      ) : (
        <div className="flex flex-col gap-6 lg:flex-row">
          <FiltersSidebar
            categories={categories}
            brands={brands}
            selectedCategory={selectedCategory}
            selectedBrands={selectedBrands}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onCategoryChange={(category) =>
              updateFilters({ category: category || null })
            }
            onBrandChange={handleBrandChange}
            onPriceApply={handlePriceApply}
          />

          <section className="min-w-0 flex-1">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  All Products
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Showing {filteredProducts.length} products
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSearchParams({})}
                className="text-sm font-medium text-blue-600 transition hover:text-blue-800"
              >
                Clear Filters
              </button>
            </div>

            {visibleProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
                  {visibleProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}
                </div>

                <Pagination
                  currentPage={safePage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-gray-200 bg-white px-5 text-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  No products found
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Try changing your search or filter options.
                </p>

                <button
                  type="button"
                  onClick={() => setSearchParams({})}
                  className="mt-4 rounded-md bg-blue-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
};

export default ProductListing;