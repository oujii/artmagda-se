import {PortableText, type PortableTextComponents, type PortableTextBlock} from 'next-sanity'

export default function CustomPortableText({
  className,
  value,
}: {
  className?: string
  value: PortableTextBlock[]
}) {
  const components: PortableTextComponents = {
    marks: {
      link: ({children, value: link}) => {
        const href = link?.href || '#'
        const isExternal = href.startsWith('http')
        return (
          <a
            href={href}
            {...(isExternal ? {target: '_blank', rel: 'noreferrer'} : {})}
          >
            {children}
          </a>
        )
      },
    },
  }

  return (
    <div className={`prose prose-a:text-accent ${className || ''}`}>
      <PortableText components={components} value={value} />
    </div>
  )
}
