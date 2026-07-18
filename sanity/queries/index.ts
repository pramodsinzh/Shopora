import { sanityFetch } from "../lib/live";
import { BRAND_QUERY, BRANDS_QUERY, DEAL_PRODUCTS, GET_ALL_BLOG, LATEST_BLOG_QUERY, MY_ORDERS_QUERY, PRODUCT_BY_SLUG_QUERY, SINGLE_BLOG_QUERY } from "./query";

const getCategories = async (quantity?: number) => {
    try {
        const query = quantity
            ? `*[_type == 'category'] | order(name asc) [0...$quantity] {
        ...,
        "productCount": count(*[_type == "product" && references(^._id)])
        }`
            : `*[_type == 'category'] | order(name asc){
        ...,
        "productCount": count(*[_type == "product" && references(^._id)])
        }`;

        const { data } = await sanityFetch({ query, params: quantity ? { quantity } : {} });
        return data;

    } catch (error) {
        console.error("Error fetching categories", error)
        return []
    }
}

const getAllBrands = async () => {
    try {
        const { data } = await sanityFetch({ query: BRANDS_QUERY })
        return data ?? [];
    } catch (error) {
        console.error("Error fetching all brands", error)
        return [];
    }
}
const getLatestBlogs = async () => {
    try {
        const { data } = await sanityFetch({ query: LATEST_BLOG_QUERY })
        return data ?? [];
    } catch (error) {
        console.error("Error fetching latest blogs", error)
        return [];
    }
}

const getAllBlogs = async (quantity: number) => {
    try {
        const { data } = await sanityFetch({ query: GET_ALL_BLOG, params: { quantity } })
        return data ?? [];
    } catch (error) {
        console.error("Error fetching all blogs", error)
        return [];
    }
}
const getSingleBlog = async (slug: string) => {
    try {
        const { data } = await sanityFetch({ query: SINGLE_BLOG_QUERY, params: { slug } })
        return data ?? [];
    } catch (error) {
        console.error("Error fetching blog", error)
        return [];
    }
}

const getDealProducts = async () => {
    try {
        const { data } = await sanityFetch({ query: DEAL_PRODUCTS })
        return data ?? [];
    } catch (error) {
        console.error("Error fetching deal products", error)
        return [];
    }
}
const getProductBySlug = async (slug: string) => {
    try {
        const product = await sanityFetch({ query: PRODUCT_BY_SLUG_QUERY, params: { slug } })
        return product?.data || null;
    } catch (error) {
        console.error("Error fetching product by ID:", error)
        return null;
    }
}
const getBrand = async (slug: string) => {
    try {
        const product = await sanityFetch({ query: BRAND_QUERY, params: { slug } })
        return product?.data || null;
    } catch (error) {
        console.error("Error fetching product by ID:", error)
        return null;
    }
}
const getMyOrders = async (userId: string) => {
    try {
        const orders = await sanityFetch({ query: MY_ORDERS_QUERY, params: { userId } })
        return orders?.data || null;
    } catch (error) {
        console.error("Error fetching orders:", error)
        return null;
    }
}

export { getCategories, getAllBrands, getLatestBlogs, getAllBlogs, getSingleBlog, getDealProducts, getProductBySlug, getBrand, getMyOrders }