import { useEffect, useState } from "react";
import type { ProductCategory } from "../../types/product";

interface FiltersSidebarProps {
  categories: ProductCategory[];
  brands: string[];
  selectedCategory: string;
  selectedBrands: string[];
  minPrice: string;
  maxPrice: string;
  onCategoryChange: (category: string) => void;
  onBrandChange: (brand: string) => void;
  onPriceApply: (min: string, max: string) => void;
}

const FiltersSidebar = ({
  categories,
  brands,
  selectedCategory,
  selectedBrands,
  minPrice,
  maxPrice,
  onCategoryChange,
  onBrandChange,
  onPriceApply,
}: FiltersSidebarProps) => {
  const [minValue, setMinValue] = useState(minPrice);
  const [maxValue, setMaxValue] = useState(maxPrice);

  useEffect(() => {
    setMinValue(minPrice);
    setMaxValue(maxPrice);
  }, [minPrice, maxPrice]);

  return (
    <aside className="w-full shrink-0 rounded-lg border border-gray-200 bg-white p-4 lg:w-[230px]">
      <h2 className="mb-5 text-base font-semibold text-gray-900">
        Filters
      </h2>

      <div className="border-b border-gray-100 pb-5">
        <h3 className="mb-3 text-sm font-semibold text-gray-800">
          Categories
        </h3>

        <div className="flex max-h-52 flex-col gap-2 overflow-y-auto">
          {categories.map((category) => (
            <label
              key={category.slug}
              className="flex cursor-pointer items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <input
                type="checkbox"
                checked={selectedCategory === category.slug}
                onChange={() =>
                  onCategoryChange(
                    selectedCategory === category.slug
                      ? ""
                      : category.slug
                  )
                }
                className="h-3.5 w-3.5 accent-blue-500"
              />

              <span>{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-b border-gray-100 py-5">
        <h3 className="mb-3 text-sm font-semibold text-gray-800">
          Price Range
        </h3>

        <div className="flex gap-2">
          <input
            type="number"
            min="0"
            value={minValue}
            onChange={(event) => setMinValue(event.target.value)}
            placeholder="Min"
            className="w-1/2 rounded-md border border-gray-200 px-2 py-2 text-sm outline-none focus:border-blue-500"
          />

          <input
            type="number"
            min="0"
            value={maxValue}
            onChange={(event) => setMaxValue(event.target.value)}
            placeholder="Max"
            className="w-1/2 rounded-md border border-gray-200 px-2 py-2 text-sm outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="button"
          onClick={() => onPriceApply(minValue, maxValue)}
          className="mt-3 w-full rounded-md bg-blue-500 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
        >
          Apply
        </button>
      </div>

      <div className="pt-5">
        <h3 className="mb-3 text-sm font-semibold text-gray-800">
          Brands
        </h3>

        <div className="flex max-h-52 flex-col gap-2 overflow-y-auto">
          {brands.map((brand) => (
            <label
              key={brand}
              className="flex cursor-pointer items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => onBrandChange(brand)}
                className="h-3.5 w-3.5 accent-blue-500"
              />

              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FiltersSidebar;