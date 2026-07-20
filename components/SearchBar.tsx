"use client";

import { Search } from "lucide-react";
import { useState } from "react"; // ⚠️ import the component, not the page route
import ProductSearchbar from "./ProductSearchbar";

const SearchBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)} aria-label="Open search">
        <Search className="w-5 h-5 hover:text-shop_light_green hoverEffect" />
      </button>
      <ProductSearchbar open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default SearchBar;