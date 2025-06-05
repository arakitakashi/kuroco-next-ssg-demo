import useSWR from 'swr'
import Link from 'next/link'
import { ArticleListResponse } from '@/types/api'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface LatestNewsProps {
  excludeIds?: number[]
}

export function LatestNews({ excludeIds = [] }: LatestNewsProps) {
  // 外部APIまたはフォールバック用のローカルモックデータを使用
  const apiUrl = process.env.NEXT_PUBLIC_KUROCO_API 
    ? `${process.env.NEXT_PUBLIC_KUROCO_API}/rcms-api/3/community/article?perPage=5&order_by=inst_ymdhi&order=desc`
    : '/api/articles?perPage=5&order_by=inst_ymdhi&order=desc'

  const { data, error, isLoading } = useSWR<ArticleListResponse>(
    apiUrl,
    fetcher,
    {
      refreshInterval: 300000, // 5分間隔で更新
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 30000, // 30秒間は同じリクエストを重複排除
    }
  )

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">最新ニュースの取得に失敗しました</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="news-card">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!data || data.errors.length > 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800">データを取得できませんでした</p>
      </div>
    )
  }

  // フィルタリングなしで全記事を表示
  const filteredArticles = data.list

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          🔥 最新ニュース
          <span className="ml-2 text-sm font-normal text-green-600">
            (リアルタイム更新)
          </span>
        </h2>
        <div className="text-xs text-gray-500">
          5分間隔で自動更新
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <article key={article.topics_id} className="news-card">
            <Link href={`/article/${article.topics_id}`}>
              {article.thumbnail && (
                <img
                  src={article.thumbnail.url}
                  alt={article.thumbnail.desc || article.title}
                  className="news-thumbnail"
                />
              )}
              <div className="news-content">
                <h3 className="news-title">{article.title}</h3>
                <p className="news-excerpt">{article.plain_body.substring(0, 100)}...</p>
                <div className="news-meta">
                  <time dateTime={article.inst_ymdhi}>
                    {new Date(article.inst_ymdhi).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </time>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {article.contents_type_nm}
                  </span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
      
      
      {data.list.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          記事が見つかりませんでした
        </div>
      )}
    </section>
  )
}