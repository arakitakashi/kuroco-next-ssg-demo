import { GetStaticProps } from 'next'
import { SEO } from '@/components/SEO'
import { FeaturedArticles } from '@/components/FeaturedArticles'
import { LatestNews } from '@/components/LatestNews'
import { featuredArticles } from '@/lib/mockData'
import { Article } from '@/types/api'

interface HomePageProps {
  featuredArticles: Article[]
}

export default function HomePage({ featuredArticles }: HomePageProps) {
  const featuredIds = featuredArticles.map(article => article.topics_id)
  
  return (
    <>
      <SEO
        title="テクノロジーニュースの最新情報をキュレーション"
        description="AI、ブロックチェーン、環境技術、量子コンピュータなど、最新のテクノロジーニュースをキュレーションしてお届け。未来を変える技術情報を分かりやすく解説し、ビジネスへの影響も詳しく分析します。"
        type="website"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ヒーロー・コンセプトセクション */}
        <section className="text-center py-12 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            🚀 未来を変える
            <br />
            <span className="text-blue-600">テクノロジーニュース</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            複雑なテクノロジーニュースを分かりやすくキュレーション。
            AI、ブロックチェーン、環境技術など、
            <strong>あなたのビジネスと未来に影響する技術情報</strong>を厳選してお届けします。
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
              ⚡ 静的生成でSEO最適化
            </div>
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
              🔄 リアルタイム最新記事
            </div>
            <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-semibold">
              📊 構造化データ対応
            </div>
          </div>
        </section>

        {/* キュレーションの価値説明 */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            💎 キュレーションが届ける価値
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-semibold text-gray-900 mb-2">厳選された情報</h3>
              <p className="text-sm text-gray-600">
                専門編集チームが膨大なニュースから、
                ビジネスインパクトの高い記事を厳選
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold text-gray-900 mb-2">スピーディな配信</h3>
              <p className="text-sm text-gray-600">
                最新情報をいち早くキャッチし、
                重要度に応じて優先配信
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🧠</div>
              <h3 className="font-semibold text-gray-900 mb-2">深い洞察</h3>
              <p className="text-sm text-gray-600">
                技術トレンドの背景と
                ビジネスへの影響を分析して解説
              </p>
            </div>
          </div>
        </section>

        {/* 注目記事（SSG） */}
        <FeaturedArticles articles={featuredArticles} />

        {/* 最新記事（クライアントサイドフェッチ） */}
        <LatestNews excludeIds={featuredIds} />

        {/* 技術検証情報 */}
        <section className="bg-gray-100 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            🧪 技術検証プロジェクト
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">SSG（静的サイト生成）</h3>
              <ul className="space-y-1 text-gray-600">
                <li>✅ ビルド時にSEO最適化されたHTMLを生成</li>
                <li>✅ 構造化データ（JSON-LD）を静的埋め込み</li>
                <li>✅ OGPタグとメタデータの完全対応</li>
                <li>✅ Core Web Vitalsスコア最適化</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Client Fetch（SWR）</h3>
              <ul className="space-y-1 text-gray-600">
                <li>✅ 最新記事を5分間隔で自動更新</li>
                <li>✅ キャッシュファーストでパフォーマンス向上</li>
                <li>✅ エラーハンドリングとローディング状態</li>
                <li>✅ リアルタイム性とSEOの両立</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Kuroco APIから注目記事を取得
    const apiUrl = process.env.KUROCO_API || 'https://kuroco-ssg-mock.g.kuroco.app'
    const response = await fetch(`${apiUrl}/rcms-api/3/community/article?topics_flg=1&cnt=5`)
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }
    
    const data = await response.json()
    const articles = data.list || []
    
    return {
      props: {
        featuredArticles: articles,
      },
    }
  } catch (error) {
    console.error('Failed to fetch featured articles:', error)
    
    // APIエラー時はモックデータを使用
    return {
      props: {
        featuredArticles: featuredArticles,
      },
    }
  }
}