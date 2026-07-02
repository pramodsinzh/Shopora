import Container from '@/components/Container'
import { SubTitle } from '@/components/ui/text'
import React from 'react'

const SingleBlogPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  
  return (
    <div>
      <Container>
        <SubTitle>Single Blog Post</SubTitle>
        <p>{slug}</p>
      </Container>
    </div>
  )
}

export default SingleBlogPage