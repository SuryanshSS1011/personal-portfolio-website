import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import { ErrorBoundary } from '@/components/atoms/error-handling'

interface MDXRendererProps {
  content: string
}

// Custom processing for MDX-like content
const processMDXContent = async (content: string): Promise<string> => {
  // Process Callout components
  let processedContent = content.replace(
    /<Callout type="(.*?)"(?:\s+title="(.*?)")?>([\s\S]*?)<\/Callout>/g,
    (match, type, title, children) => {
      const typeStyles = {
        info: 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50',
        warning: 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/50',
        error: 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/50',
        success: 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/50',
        tip: 'border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/50'
      }
      
      const iconMap = {
        info: '💡',
        warning: '⚠️',
        error: '❌',
        success: '✅',
        tip: '💡'
      }
      
      const titleText = title || type.charAt(0).toUpperCase() + type.slice(1)
      
      return `
<div class="border-l-4 p-4 my-6 rounded-r-lg ${typeStyles[type as keyof typeof typeStyles] || typeStyles.info}">
  <div class="flex items-start gap-3">
    <span class="text-lg">${iconMap[type as keyof typeof iconMap] || iconMap.info}</span>
    <div class="flex-1">
      <div class="font-semibold mb-2 text-foreground">${titleText}</div>
      <div class="text-sm leading-relaxed text-muted-foreground">${children.trim()}</div>
    </div>
  </div>
</div>
      `.trim()
    }
  )
  
  // Process CodeBlock components (convert to regular code blocks for now)
  processedContent = processedContent.replace(
    /<CodeBlock(?:\s+language="(.*?)")?(?:\s+title="(.*?)")?>([^]*?)<\/CodeBlock>/g,
    (match, language, title, code) => {
      return `${title ? `\n### ${title}\n` : ''}\`\`\`${language || ''}\n${code.trim()}\n\`\`\``
    }
  )
  
  // Remove InteractiveDemo components for now (too complex for server-side)
  processedContent = processedContent.replace(
    /<InteractiveDemo[^>]*>[\s\S]*?<\/InteractiveDemo>/g,
    ''
  )
  
  return processedContent
}

export const MDXRenderer = async ({ content }: MDXRendererProps) => {
  // First process custom MDX components
  const processedContent = await processMDXContent(content)
  
  // Then process with unified/remark
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeHighlight)
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(processedContent)
    
  const htmlContent = result.toString()
  
  return (
    <div 
      className="prose prose-lg dark:prose-invert max-w-none
        [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:mb-6 [&>h1]:text-foreground [&>h1]:mt-0
        [&>h2]:text-3xl [&>h2]:font-semibold [&>h2]:mb-4 [&>h2]:mt-8 [&>h2]:text-foreground
        [&>h3]:text-2xl [&>h3]:font-medium [&>h3]:mb-3 [&>h3]:mt-6 [&>h3]:text-foreground
        [&>h4]:text-xl [&>h4]:font-medium [&>h4]:mb-2 [&>h4]:mt-4 [&>h4]:text-foreground
        [&>h5]:text-lg [&>h5]:font-medium [&>h5]:mb-2 [&>h5]:mt-3 [&>h5]:text-foreground
        [&>h6]:text-base [&>h6]:font-medium [&>h6]:mb-2 [&>h6]:mt-3 [&>h6]:text-foreground
        [&>p]:mb-4 [&>p]:leading-relaxed [&>p]:text-muted-foreground [&>p]:text-base
        [&>ul]:mb-4 [&>ul]:pl-6 [&>ul]:space-y-2 [&>ul]:list-disc
        [&>ol]:mb-4 [&>ol]:pl-6 [&>ol]:space-y-2 [&>ol]:list-decimal
        [&>li]:text-muted-foreground
        [&>blockquote]:border-l-4 [&>blockquote]:border-primary/30 [&>blockquote]:pl-4 
        [&>blockquote]:py-2 [&>blockquote]:my-6 [&>blockquote]:italic [&>blockquote]:bg-muted/50 
        [&>blockquote]:rounded-r
        [&>code]:bg-muted [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-sm 
        [&>code]:font-mono [&>code]:text-primary
        [&>pre]:mb-6 [&>pre]:p-4 [&>pre]:bg-muted/50 [&>pre]:border [&>pre]:border-border 
        [&>pre]:rounded-lg [&>pre]:overflow-x-auto
        [&>pre>code]:bg-transparent [&>pre>code]:p-0 [&>pre>code]:text-foreground
        [&>hr]:my-8 [&>hr]:border-border
        [&>table]:w-full [&>table]:border-collapse [&>table]:border [&>table]:border-border 
        [&>table]:rounded-lg [&>table]:mb-6
        [&>th]:border [&>th]:border-border [&>th]:px-4 [&>th]:py-2 [&>th]:bg-muted 
        [&>th]:text-left [&>th]:font-semibold
        [&>td]:border [&>td]:border-border [&>td]:px-4 [&>td]:py-2
        [&>strong]:font-semibold [&>strong]:text-foreground
        [&>em]:italic
        [&_a]:text-primary [&_a]:hover:text-primary/80 [&_a]:underline [&_a]:underline-offset-2 
        [&_a]:transition-colors
      "
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
}

export const MDXRendererSafe = ({ content }: MDXRendererProps) => {
  return (
    <ErrorBoundary>
      <MDXRenderer content={content} />
    </ErrorBoundary>
  )
}