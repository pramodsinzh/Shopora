"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import ProductSearchbar from "./product/ProductSearchbar";

const SearchBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center">
      <button
        onClick={() => setOpen(true)}
        aria-label="Open search"
        className="group hidden md:flex items-center gap-2 h-9 px-3 rounded-full border border-gray-200 text-darkColor/50 hover:border-shop_light_green hover:text-shop_dark_green transition-colors duration-200 min-w-[40px] hover:min-w-[160px] overflow-hidden"
      >
        <Search className="w-[18px] h-[18px] shrink-0" />
        <span className="text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-75">
          Search products...
        </span>
      </button>

      <button
        onClick={() => setOpen(true)}
        aria-label="Open search"
        className="md:hidden flex items-center justify-center w-9 h-9 rounded-full text-darkColor/70 hover:text-shop_dark_green hover:bg-shop_light_green/10 transition-colors duration-200"
      >
        <Search className="w-[18px] h-[18px]" />
      </button>

      <ProductSearchbar open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default SearchBar;