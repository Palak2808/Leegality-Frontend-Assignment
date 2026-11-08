import { useEffect, useState } from "react";
import {
  Menu,
  Search,
  ShoppingCart,
  Clock3,
  UserRound,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState(
    new URLSearchParams(location.search).get("search") || ""
  );

  useEffect(() => {
    setSearchText(
      new URLSearchParams(location.search).get("search") || ""
    );
  }, [location.search]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const params = new URLSearchParams(location.search);

    if (searchText.trim()) {
      params.set("search", searchText.trim());
    } else {
      params.delete("search");
    }

    params.delete("page");

    const query = params.toString();

    navigate(query ? `/?${query}` : "/");
  };

  return (
    <header className="sticky top-0 z-50 bg-[#293d55] text-white shadow-md">
      <div className="mx-auto flex h-[64px] max-w-[1400px] items-center gap-5 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          aria-label="Menu"
          className="rounded-md p-2 transition hover:bg-white/10"
        >
          <Menu size={23} />
        </button>

        <form
          onSubmit={handleSearch}
          className="mx-auto flex w-full max-w-[540px] items-center overflow-hidden rounded-lg bg-white text-gray-700 shadow-sm"
        >
          <Search size={18} className="ml-3 shrink-0 text-gray-400" />

          <input
            type="text"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search products..."
            className="h-10 w-full bg-transparent px-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
          />

          <button
            type="submit"
            aria-label="Search"
            className="h-10 px-3 text-gray-500 transition hover:text-gray-900"
          >
            <Search size={17} />
          </button>
        </form>

        <div className="flex shrink-0 items-center gap-3 sm:gap-5">
          <button
            type="button"
            aria-label="Shopping cart"
            className="transition hover:text-gray-300"
          >
            <ShoppingCart size={21} />
          </button>

          <button
            type="button"
            aria-label="Recently viewed"
            className="transition hover:text-gray-300"
          >
            <Clock3 size={20} />
          </button>

          <button
            type="button"
            aria-label="User account"
            className="transition hover:text-gray-300"
          >
            <UserRound size={21} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;