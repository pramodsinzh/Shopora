import Container from '@/components/Container' 
import { getCategories } from '@/sanity/queries'
import { Category } from '@/sanity.types' 
import HomeBanner from '@/components/home/HomeBanner'
import ProductGrid from '@/components/product/ProductGrid'
import HomeCategories from '@/components/home/HomeCategories'
import ShopByBrands from '@/components/shop/ShopByBrands'
import LatestBlog from '@/components/blog/LatestBlog'

type CategoryWithCount = Category & { productCount: number }

const Home = async() => {
  const categories = (await getCategories(6)) as CategoryWithCount[] 
  return (
    <Container >
      <HomeBanner />
      <ProductGrid />
      <HomeCategories categories={categories} />
      <ShopByBrands />
      <LatestBlog />
    </Container>
  )
}

export default Home
