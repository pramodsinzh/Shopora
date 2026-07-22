"use client";

import { Product } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import useStore from "@/store";
import { Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import PriceFormatter from "../PriceFormatter";
import PriceView from "../PriceView";
import QuantityButtons from "../QuantityButtons";
import Logo from "../Logo";

interface Props {
  open: boolean;
  onClose: () => void;
}

const SEARCH_PRODUCTS_QUERY = `*[_type == "product" && defined(slug.current)] | order(name asc){
  _id,
  name,
  slug,
  images,
  price,
  discount,
  stock,
  "categories": categories[]->title
}`;

const ProductSearchbar = ({ open, onClose }: Props) => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { getItemCount } = useStore();

  // Portals need a client-mounted check to avoid SSR mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open && products.length === 0) {
      setLoading(true);
      client
        .fetch(SEARCH_PRODUCTS_QUERY)
        .then((data) => setProducts(data ?? []))
        .catch((error) => console.error("Error fetching products:", error))
        .finally(() => setLoading(false));
    }
  }, [open, products.length]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    return products.filter((p) =>
      p?.name?.toLowerCase().includes(query.trim().toLowerCase())
    );
  }, [products, query]);

  const showAllList = query.trim().length === 0;
  const showNoResults = query.trim().length > 0 && filtered.length === 0;

  if (!open || !mounted) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-md shadow-lg p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-darkColor">Product Searchbar</h2>
          <button onClick={onClose} aria-label="Close search">
            <X className="w-5 h-5 hover:text-shop_light_green hoverEffect" />
          </button>
        </div>

        <div className="relative mb-3">
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your product here..."
            className="w-full border border-lightColor/30 rounded-md py-2 pl-4 pr-20 text-sm outline-none focus:border-shop_dark_green hoverEffect"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-10 top-1/2 -translate-y-1/2 px-2"
              aria-label="Clear search"
            >
              <X className="w-4 h-4 text-lightColor" />
            </button>
          )}
          <span className="absolute right-0 top-0 h-full px-3 flex items-center border-l border-lightColor/30">
            <Search className="w-4 h-4 text-lightColor" />
          </span>
        </div>

        {loading && (
          <p className="text-sm text-lightColor py-6 text-center">
            Loading products...
          </p>
        )}

        {!loading && showNoResults && (
          <>
            <p className="bg-gray-100 text-sm font-medium p-3 rounded-md mb-2 text-darkColor">
              Nothing match with the keyword{" "}
              <span className="text-red-500 font-semibold">{query}</span>.
              Please try something else.
            </p>
            <div className="max-h-72 overflow-y-auto">
              <ProductNameList products={products} onClose={onClose} />
            </div>
          </>
        )}

        {!loading && showAllList && (
          <>
            <div className="bg-gray-100 flex items-center gap-1 p-3 rounded-md mb-2 text-sm font-medium text-darkColor">
              <span>Search and explore your products from</span>
              <Logo className="text-sm" />
            </div>
            <div className="max-h-72 overflow-y-auto">
              <ProductNameList products={products} onClose={onClose} />
            </div>
          </>
        )}

        {!showAllList && !showNoResults && (
          <div className="border border-lightColor/20 rounded-md max-h-72 overflow-y-auto">
            <div className="divide-y divide-lightColor/15">
              {filtered.map((product) => {
                const itemCount = getItemCount(product?._id);
                return (
                  <div key={product._id} className="flex items-center gap-4 p-3">
                    {product?.images && product.images[0] && (
                      <Image
                        src={urlFor(product.images[0]).url()}
                        alt={product?.name ?? "product image"}
                        width={100}
                        height={100}
                        className="w-20 h-20 rounded-md object-cover border border-shop_dark_green/10"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <p className="font-semibold text-darkColor line-clamp-2">
                          {product?.name}
                        </p>
                        <PriceView
                          price={product?.price}
                          discount={product?.discount}
                          className="shrink-0"
                        />
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-lightColor">Quantity</span>
                        <QuantityButtons product={product} />
                      </div>
                      <div className="flex items-center justify-between border-t pt-1 mt-1">
                        <span className="text-sm font-semibold text-darkColor">Subtotal</span>
                        <PriceFormatter
                          amount={product?.price ? product.price * itemCount : 0}
                          className="text-shop_dark_green font-semibold"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

const ProductNameList = ({
  products,
  onClose,
}: {
  products: Product[];
  onClose: () => void;
}) => (
  <div>
    {products.map((product) => (
      <Link
        key={product._id}
        href={`/product/${product?.slug?.current}`}
        onClick={onClose}
        className="flex items-center gap-2 py-2 px-2 rounded-md hover:bg-shop_light_green/10 hoverEffect"
      >
        <Search className="w-4 h-4 text-lightColor shrink-0" />
        <span className="text-sm text-darkColor line-clamp-1">{product?.name}</span>
      </Link>
    ))}
  </div>
);

export default ProductSearchbar;