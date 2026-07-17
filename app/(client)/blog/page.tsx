import { getAllBlogs } from '@/sanity/queries'
import React from 'react'

const BlogPage = async() => {
  const blogs = await getAllBlogs(10)
  console.log(blogs)
  return (
    <div>
      Blogs
    </div>
  )
}

export default BlogPage
