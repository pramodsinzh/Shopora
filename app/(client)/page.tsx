import Container from '@/components/Container'
import HomeBanner from '@/components/HomeBanner'
import HomeCategories from '@/components/HomeCategories'
import ProductGrid from '@/components/ProductGrid'
import ShopByBrands from '@/components/ShopByBrands'
import { getCategories } from '@/sanity/queries'
import { Category } from '@/sanity.types'

type CategoryWithCount = Category & { productCount: number }

const Home = async() => {
  const categories = (await getCategories(6)) as CategoryWithCount[] 
  return (
    <Container >
      <HomeBanner />
      <ProductGrid />
      <HomeCategories categories={categories} />
      <ShopByBrands />
    </Container>
  )
}

export default Home
