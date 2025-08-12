import { NextResponse } from 'next/server'
import { getAllBlogPosts } from '@/lib/blog-utils'

export async function GET() {
  try {
    const posts = await getAllBlogPosts()
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json([], { status: 500 })
  }
}