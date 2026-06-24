import Container from '@/components/Container'
import ProductCard from '@/components/ProductCard'
import { SubTitle } from '@/components/ui/text'
import { getDealProducts } from '@/sanity/queries' 

const DealPage = async() => {
    const products = await getDealProducts()
  return (
    <div className='py-10 bg-deal_bg'>
        <Container className=''>
            <SubTitle className='mb-5 underline underline-offset-4 decoration-[1px] text-base tracking-wide uppercase'>Hot deals of the week</SubTitle>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {products?.map((product)=> (
                    // @ts-ignore
                    <ProductCard key={product?._id} product={product} />
                ))}
            </div>
        </Container>
    </div>
  )
}

export default DealPage