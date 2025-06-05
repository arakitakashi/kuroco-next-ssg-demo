import { NextSeo, ArticleJsonLd, WebPageJsonLd } from 'next-seo'
import { Article } from '@/types/api'

interface SEOProps {
  title: string
  description: string
  canonical?: string
  image?: string
  article?: Article
  type?: 'website' | 'article'
}

export function SEO({ 
  title, 
  description, 
  canonical, 
  image,
  article,
  type = 'website' 
}: SEOProps) {
  const siteName = 'テックニュースキュレーション'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'
  const fullTitle = `${title} | ${siteName}`
  const fullCanonical = canonical || siteUrl
  const defaultImage = `${siteUrl}/og-image.jpg`
  
  return (
    <>
      <NextSeo
        title={fullTitle}
        description={description}
        canonical={fullCanonical}
        openGraph={{
          type: type,
          title: title,
          description: description,
          url: fullCanonical,
          siteName: siteName,
          images: [
            {
              url: image || defaultImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
          ...(article && {
            article: {
              publishedTime: article.inst_ymdhi,
              modifiedTime: article.update_ymdhi,
              section: article.contents_type_nm,
              authors: [article.member_info?.username || 'ニュース編集部'],
              tags: [article.contents_type_nm, article.theme],
            },
          }),
        }}
        twitter={{
          cardType: 'summary_large_image',
          site: '@technews_jp',
          handle: '@technews_jp',
        }}
        additionalMetaTags={[
          {
            property: 'keywords',
            content: article 
              ? `${article.contents_type_nm}, ${article.theme}, テクノロジー, ニュース`
              : 'テクノロジー, ニュース, AI, ブロックチェーン, 環境技術'
          },
          {
            property: 'author',
            content: article?.member_info?.username || 'ニュース編集部'
          },
        ]}
      />
      
      {/* 構造化データ */}
      {type === 'article' && article && (
        <ArticleJsonLd
          url={fullCanonical}
          title={article.title}
          images={article.thumbnail ? [article.thumbnail.url] : []}
          datePublished={article.inst_ymdhi}
          dateModified={article.update_ymdhi}
          authorName={article.member_info?.username || 'ニュース編集部'}
          publisherName={siteName}
          publisherLogo={`${siteUrl}/logo.jpg`}
          description={article.plain_body.substring(0, 160)}
        />
      )}
      
      {type === 'website' && (
        <WebPageJsonLd
          description={description}
          id={fullCanonical}
        />
      )}
    </>
  )
}