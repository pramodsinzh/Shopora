import CategoryProducts from '@/components/CategoryProducts'
import Container from '@/components/Container'
import { SubTitle } from '@/components/ui/text'
import { getCategories } from '@/sanity/queries'  

const CategoryPage = async({params}:{params: Promise<{slug: string}>}) => {
  const categories = await getCategories() as any[]
  const {slug} = await params;
  return (
    <div className='py-10'>
      <Container >
        <SubTitle>Products by category:{" "}
          <span className='font-bold text-green-600 tracking-wide capitalize'>
            {slug && slug}
          </span>
        </SubTitle>
        <CategoryProducts categories={categories} slug={slug} />
      </Container>
    </div>
  )
}

export default CategoryPage