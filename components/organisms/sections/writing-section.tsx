"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { Button, ErrorBoundary } from "@/components/atoms";
import { SectionWrapper } from "@/components/organisms";
import { BlogPostMeta } from "@/types";

export const WritingSection = () => {
  const [featuredPosts, setFeaturedPosts] = useState<BlogPostMeta[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch blog posts client-side
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/blog-posts");
        if (response.ok) {
          const posts = await response.json();
          // Get featured posts or latest 3 posts
          const featured = posts
            .filter((post: BlogPostMeta) => post.featured)
            .slice(0, 3);
          if (featured.length > 0) {
            setFeaturedPosts(featured);
          } else {
            setFeaturedPosts(posts.slice(0, 3));
          }
        }
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <ErrorBoundary>
      <SectionWrapper id="articles" title="Articles" maxWidth="6xl">
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-full bg-card border border-border rounded-lg p-6">
                  <div className="h-4 bg-muted rounded w-1/4 mb-3"></div>
                  <div className="h-6 bg-muted rounded mb-3"></div>
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                  <div className="flex gap-4">
                    <div className="h-3 bg-muted rounded w-20"></div>
                    <div className="h-3 bg-muted rounded w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : featuredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group h-full"
              >
                <Link href={`/blogs/${post.id}`} className="block h-full">
                  <div className="h-full bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                    {post.featured && (
                      <div className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded mb-3">
                        Featured
                      </div>
                    )}

                    <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No articles available at the moment.
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link href="/blogs">
            <Button size="lg" className="group">
              <BookOpen className="mr-2 h-5 w-5" />
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </SectionWrapper>
    </ErrorBoundary>
  );
};
