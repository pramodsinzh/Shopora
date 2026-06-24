import Container from '@/components/Container'
import HomeBanner from '@/components/HomeBanner'
import HomeCategories from '@/components/HomeCategories'
import ProductGrid from '@/components/ProductGrid'
import ShopByBrands from '@/components/ShopByBrands'
import { getCategories } from '@/sanity/queries'
import { Category } from '@/sanity.types'
import LatestBlog from '@/components/LatestBlog'

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
