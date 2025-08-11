"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from "@/components/atoms"
import { SectionWrapper } from "@/components/organisms"
import { BookOpen, Code, Brain, Zap, Clock, User, ArrowRight, Filter, X, ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react"
import type { BlogPostMeta } from "@/data/blog-posts"

interface BlogsSectionProps {
  blogPosts: BlogPostMeta[]
}

export const BlogsSection = ({ blogPosts }: BlogsSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedTag, setSelectedTag] = useState<string>("")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [showAllTags, setShowAllTags] = useState<boolean>(false)

  const categories = ["All", "Research", "Development", "Insights", "Tutorial"]
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags))).sort()
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "title-asc", label: "Title (A-Z)" },
    { value: "title-desc", label: "Title (Z-A)" }
  ]

  const visibleTags = showAllTags ? allTags : allTags.slice(0, 5)
  const hasMoreTags = allTags.length > 5

  const filteredPosts = useMemo(() => {
    let filtered = blogPosts.filter(post => {
      const categoryMatch = selectedCategory === "All" || post.category === selectedCategory
      const tagMatch = !selectedTag || post.tags.includes(selectedTag)
      return categoryMatch && tagMatch
    })

    // Sort the filtered posts
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "title-asc":
          return a.title.localeCompare(b.title)
        case "title-desc":
          return b.title.localeCompare(a.title)
        default:
          return 0
      }
    })

    return filtered
  }, [selectedCategory, selectedTag, sortBy])

  const clearFilters = () => {
    setSelectedCategory("All")
    setSelectedTag("")
    setSortBy("newest")
  }

  const getCategoryColor = (category: BlogPostMeta["category"]) => {
    switch (category) {
      case "Research":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "Development":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Tutorial":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "Insights":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <SectionWrapper id="blogs" title="Blog" background={false} maxWidth="6xl">
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Sharing insights from AI research, software development, and technical innovation. 
            Exploring the intersection of cutting-edge technology and real-world applications.
          </p>
        </motion.div>

        {/* Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 p-6 bg-card/50 rounded-lg border border-primary/10"
        >
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Filter Posts</h3>
            {(selectedCategory !== "All" || selectedTag || sortBy !== "newest") && (
              <button
                onClick={clearFilters}
                className="ml-auto flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <X className="w-4 h-4" />
                Clear filters
              </button>
            )}
          </div>
          
          <div className="space-y-4">
            {/* Category Filter */}
            <div role="group" aria-labelledby="category-filter-label">
              <div id="category-filter-label" className="text-sm font-medium text-muted-foreground mb-2 block">
                Category
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    aria-pressed={selectedCategory === category}
                    aria-label={`Filter by ${category} category`}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Tag Filter */}
            <div role="group" aria-labelledby="tag-filter-label">
              <div id="tag-filter-label" className="text-sm font-medium text-muted-foreground mb-2 block">
                Tags
              </div>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedTag("")}
                    aria-pressed={!selectedTag}
                    aria-label="Show all tags"
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      !selectedTag
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    All Tags
                  </button>
                  {visibleTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      aria-pressed={selectedTag === tag}
                      aria-label={`Filter by ${tag} tag`}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        selectedTag === tag
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                {hasMoreTags && (
                  <button
                    onClick={() => setShowAllTags(!showAllTags)}
                    aria-expanded={showAllTags}
                    aria-controls="tag-filter-label"
                    className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    {showAllTags ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        Show {allTags.length - 5} More Tags
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Sort Filter */}
            <div>
              <label htmlFor="blog-sort-select" className="text-sm font-medium text-muted-foreground mb-2 block">
                Sort By
              </label>
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                <select
                  id="blog-sort-select"
                  name="blogSort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-md border border-primary/20 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                  aria-label="Sort blog posts by"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-muted-foreground mb-4"
        >
          Showing {filteredPosts.length} of {blogPosts.length} posts
          {selectedCategory !== "All" && (
            <span> in <strong>{selectedCategory}</strong></span>
          )}
          {selectedTag && (
            <span> tagged with <strong>{selectedTag}</strong></span>
          )}
          {sortBy !== "newest" && (
            <span> • sorted by <strong>{sortOptions.find(opt => opt.value === sortBy)?.label}</strong></span>
          )}
        </motion.div>

        <div className="grid gap-8">
          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="text-muted-foreground mb-4">
                <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg">No posts found matching your filters</p>
                <p className="text-sm">Try adjusting your filter criteria</p>
              </div>
            </motion.div>
          ) : (
            filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.01 }}
              >
                <Link href={`/blogs/${post.id}`} className="block">
                  <Card className="border-l-4 border-l-primary shadow-lg hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary/50 cursor-pointer">
                    <CardHeader>
                      <div className="flex flex-col space-y-3">
                        <div className="flex justify-between items-start flex-wrap gap-2">
                          <Badge 
                            variant="outline" 
                            className={getCategoryColor(post.category)}
                          >
                            {post.category}
                          </Badge>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{post.readTime}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <User className="w-4 h-4" />
                              <span>{new Date(post.date).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric' 
                              })}</span>
                            </div>
                          </div>
                        </div>
                        
                        <CardTitle className="text-2xl text-primary hover:text-primary/80 transition-colors flex items-center justify-between group">
                          <span>{post.title}</span>
                          <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </CardTitle>
                        
                        <CardDescription className="text-base leading-relaxed">
                          {post.excerpt}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        <div className="pt-4 border-t border-primary/10">
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag, tagIndex) => (
                              <Badge
                                key={tagIndex}
                                variant="secondary"
                                className="text-xs bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </SectionWrapper>
  )
}