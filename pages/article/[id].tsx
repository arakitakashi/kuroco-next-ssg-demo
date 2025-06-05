import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import { SEO } from '@/components/SEO'
import { mockArticles } from '@/lib/mockData'
import { Article } from '@/types/api'

interface ArticlePageProps {
  article: Article
}

export default function ArticlePage({ article }: ArticlePageProps) {
  return (
    <>
      <SEO
        title={article.title}
        description={article.plain_body.substring(0, 160)}
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}/article/${article.topics_id}`}
        image={article.thumbnail?.url}
        article={article}
        type="article"
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* パンくずナビ */}
        <nav className="mb-8" aria-label="パンくず">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-blue-600">ホーム</Link>
            </li>
            <li>/</li>
            <li>
              <span className="text-blue-600">{article.contents_type_nm}</span>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">記事詳細</li>
          </ol>
        </nav>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* アイキャッチ画像 */}
          {article.thumbnail && (
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={article.thumbnail.url}
                alt={article.thumbnail.desc || article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8">
            {/* メタ情報 */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {article.contents_type_nm}
              </span>
              <time
                dateTime={article.inst_ymdhi}
                className="text-sm text-gray-500"
              >
                公開: {new Date(article.inst_ymdhi).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </time>
              {article.update_ymdhi !== article.inst_ymdhi && (
                <time
                  dateTime={article.update_ymdhi}
                  className="text-sm text-gray-500"
                >
                  更新: {new Date(article.update_ymdhi).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </time>
              )}
            </div>

            {/* タイトル */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>

            {/* 著者情報 */}
            {article.member_info && (
              <div className="flex items-center mb-8 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {article.member_info.username?.charAt(0) || 'N'}
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">
                    {article.member_info.username}
                  </div>
                  <div className="text-sm text-gray-600">
                    {article.member_info.about}
                  </div>
                </div>
              </div>
            )}

            {/* 記事本文 */}
            <div 
              className="article-content prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.body }}
            />

            {/* エンゲージメント情報 */}
            <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center space-x-6">
                <div className="flex items-center text-gray-600">
                  <span className="text-red-500 text-lg mr-1">❤️</span>
                  <span className="text-sm font-medium">{article.favorite_cnt}</span>
                  <span className="text-sm ml-1">お気に入り</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="text-blue-500 text-lg mr-1">💬</span>
                  <span className="text-sm font-medium">{article.comment_cnt}</span>
                  <span className="text-sm ml-1">コメント</span>
                </div>
              </div>
              
              {/* ソーシャルシェア */}
              <div className="flex items-center space-x-4">
                <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                  🔗 シェア
                </button>
                <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                  📋 コピー
                </button>
              </div>
            </div>

            {/* SEO検証情報 */}
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">
                🔍 SEO検証ポイント
              </h3>
              <div className="text-sm text-yellow-700 space-y-1">
                <p>✅ 記事詳細ページがSSGで静的生成済み</p>
                <p>✅ 構造化データ（Article Schema）が埋め込み済み</p>
                <p>✅ OGPタグとTwitter Cardが動的生成済み</p>
                <p>✅ パンくずナビとHeading構造が適切に配置</p>
                <p>✅ 画像alt属性とメタデータが最適化済み</p>
              </div>
            </div>
          </div>
        </article>

        {/* 関連記事ナビゲーション */}
        <div className="mt-8 text-center">
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            ← 記事一覧に戻る
          </Link>
        </div>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // 全記事のパスを生成
  const paths = mockArticles.map((article) => ({
    params: { id: article.topics_id.toString() }
  }))

  return {
    paths,
    fallback: false // 静的エクスポートのため動的生成を無効化
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = parseInt(params?.id as string)
  const article = mockArticles.find(article => article.topics_id === id)

  if (!article) {
    return {
      notFound: true
    }
  }

  // 記事詳細にメンバー情報を追加
  const articleWithMember = {
    ...article,
    member_info: {
      member_id: 1,
      avatar: null,
      username: 'ニュース編集部',
      user_id: 'news_editor',
      user_type: 'editor',
      about: 'テクノロジーニュースの専門編集チーム'
    }
  }

  return {
    props: {
      article: articleWithMember
    }
  }
}