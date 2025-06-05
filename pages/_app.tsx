import { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import '@/styles/globals.css'

const defaultSEO = {
  title: 'テックニュースキュレーション',
  description: '最新のテクノロジーニュースをキュレーションしてお届け。AI、ブロックチェーン、環境技術、量子コンピュータなど、未来を変える技術情報を分かりやすく解説します。',
  canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
    siteName: 'テックニュースキュレーション',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'テックニュースキュレーション',
      },
    ],
  },
  twitter: {
    handle: '@technews_jp',
    site: '@technews_jp',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
    {
      name: 'language',
      content: 'Japanese',
    },
  ],
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...defaultSEO} />
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <a href="/" className="text-2xl font-bold text-blue-600">
                  🚀 TechNews
                </a>
                <span className="ml-2 text-sm text-gray-600">
                  キュレーション
                </span>
              </div>
              <nav className="hidden md:flex space-x-8">
                <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                  ホーム
                </a>
                <a href="#technology" className="text-gray-700 hover:text-blue-600 transition-colors">
                  テクノロジー
                </a>
                <a href="#environment" className="text-gray-700 hover:text-blue-600 transition-colors">
                  環境
                </a>
                <a href="#blockchain" className="text-gray-700 hover:text-blue-600 transition-colors">
                  ブロックチェーン
                </a>
              </nav>
            </div>
          </div>
        </header>
        
        <main>
          <Component {...pageProps} />
        </main>
        
        <footer className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  🚀 TechNews キュレーション
                </h3>
                <p className="text-gray-400 text-sm">
                  最新のテクノロジーニュースをキュレーションして、
                  未来を変える技術情報をお届けします。
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-4">カテゴリ</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#ai" className="hover:text-white">AI・機械学習</a></li>
                  <li><a href="#blockchain" className="hover:text-white">ブロックチェーン</a></li>
                  <li><a href="#environment" className="hover:text-white">環境技術</a></li>
                  <li><a href="#quantum" className="hover:text-white">量子技術</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-4">技術仕様</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>⚡ Next.js SSG</li>
                  <li>🔄 SWR Client Fetch</li>
                  <li>🎯 SEO最適化</li>
                  <li>📱 レスポンシブ対応</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
              <p>&copy; 2024 TechNews キュレーション. All rights reserved.</p>
              <p className="mt-2">
                🧪 SSG + Client Fetch 検証プロジェクト
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}