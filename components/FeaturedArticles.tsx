import Link from 'next/link'
import { Article } from '@/types/api'

interface FeaturedArticlesProps {
  articles: Article[]
}

export function FeaturedArticles({ articles }: FeaturedArticlesProps) {
  const mainArticle = articles[0]
  const subArticles = articles.slice(1, 5)

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        📊 注目記事
        <span className="ml-2 text-sm font-normal text-gray-600">
          (ビルド時生成)
        </span>
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* メイン記事 */}
        <div className="lg:col-span-2">
          <article className="news-card h-full">
            <Link href={`/article/${mainArticle.topics_id}`}>
              {mainArticle.thumbnail && (
                <img
                  src={mainArticle.thumbnail.url}
                  alt={mainArticle.thumbnail.desc || mainArticle.title}
                  className="w-full h-64 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                    FEATURED
                  </span>
                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {mainArticle.contents_type_nm}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                  {mainArticle.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {mainArticle.plain_body.substring(0, 200)}...
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <time dateTime={mainArticle.inst_ymdhi}>
                    {new Date(mainArticle.inst_ymdhi).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  <div className="flex items-center space-x-4">
                    <span>❤️ {mainArticle.favorite_cnt}</span>
                    <span>💬 {mainArticle.comment_cnt}</span>
                  </div>
                </div>
              </div>
            </Link>
          </article>
        </div>
        
        {/* サブ記事 */}
        <div className="space-y-4">
          {subArticles.map((article, index) => (
            <article key={article.topics_id} className="news-card">
              <Link href={`/article/${article.topics_id}`}>
                <div className="flex">
                  {article.thumbnail && (
                    <img
                      src={article.thumbnail.url}
                      alt={article.thumbnail.desc || article.title}
                      className="w-24 h-24 object-cover rounded-l-lg"
                    />
                  )}
                  <div className="p-4 flex-1">
                    <div className="flex items-center mb-2">
                      <span className="text-lg font-bold text-blue-600">
                        #{index + 2}
                      </span>
                      <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        {article.contents_type_nm}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2 hover:text-blue-600 transition-colors">
                      {article.title}
                    </h4>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <time dateTime={article.inst_ymdhi}>
                        {new Date(article.inst_ymdhi).toLocaleDateString('ja-JP', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </time>
                      <span>❤️ {article.favorite_cnt}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}