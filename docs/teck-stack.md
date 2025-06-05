# ニュースキュレーションサイト 技術スタック設計書

## 1. アーキテクチャ概要

### 1.1 システム構成

- **フロントエンド**: React + Next.js (SSG特化)
- **バックエンド**: Kuroco (Headless CMS)
- **ホスティング**: KurocoFront (静的ホスティング)
- **データベース**: Kuroco内蔵DB
- **CDN**: Kuroco CDN

### 1.2 アーキテクチャパターン

- **Jamstack** (JavaScript + API + Markup)
- **Static-First** アーキテクチャ
- **API-Driven** コンテンツ管理
- **Hybrid Data Fetching** (SSG + Client-side)

## 2. フロントエンド技術スタック

### 2.1 コアフレームワーク

#### React 18+

- **理由**: コンポーネントベース開発による再利用性
- **機能**: Concurrent Features、Suspense対応
- **SEO対応**: 静的HTML生成によるクローラビリティ向上

#### Next.js 14+ (SSG特化設定)

- **選定理由**: 静的ホスティング環境でのSEO最優先対応
- **主要機能**:
  - **Static Site Generation (SSG)**: ビルド時の静的HTML生成でCDN配信最適化
  - **App Router**: ファイルベースルーティング
  - **getStaticProps**: ビルド時データフェッチによる高速化
  - **getStaticPaths**: 動的ルートの静的生成
  - **next export**: 完全静的ファイル出力対応
  - **自動最適化**: 画像、フォント、バンドル最適化
  - **メタデータAPI**: 静的SEOタグ生成
  - **構造化データ対応**: JSON-LD静的出力

### 2.2 SEO最適化ライブラリ

#### next-seo

```bash
npm install next-seo
```

- 静的メタタグ管理
- OGP/Twitter Card自動生成
- 構造化データ対応

#### next-sitemap

```bash
npm install next-sitemap
```

- XMLサイトマップ自動生成
- robots.txt生成
- 多言語サイトマップ対応

### 2.3 UI・スタイリング

#### Tailwind CSS

```bash
npm install tailwindcss postcss autoprefixer
```

- **理由**: ユーティリティファーストによる高速開発
- **SEO対応**: 軽量CSS、Core Web Vitals最適化

#### Headless UI

```bash
npm install @headlessui/react
```

- アクセシブルなUIコンポーネント
- WAI-ARIA準拠

### 2.4 データフェッチング戦略

#### 静的データフェッチング (ビルド時)

```bash
npm install axios
```

- **getStaticProps**: KurocoAPIからのビルド時データ取得
- **静的コンテンツ**: カテゴリ、主要記事、サイト構造

#### 動的データフェッチング (クライアント側)

```bash
npm install swr
```

- **理由**: 最新記事など頻繁に更新されるコンテンツ用
- **機能**: キャッシュファーストアプローチ、自動再検証
- **Next.js公式推奨**: SSG + Client-side fetching

## 3. バックエンド技術スタック

### 3.1 Kuroco Headless CMS

#### 主要機能

- **API-First設計**: REST API完全対応
- **コンテンツ管理**: 記事、カテゴリ、メディア管理
- **ユーザー管理**: 認証・認可システム
- **カスタムAPI**: 独自エンドポイント作成可能
- **外部API連携**: ニュースサイトREST API統合
- **バッチ処理**: 定期的なデータ取得・更新

#### Kuroco特有の機能

- **日本製CMS**: 日本語完全対応
- **エンタープライズ対応**: セキュリティ、スケーラビリティ
- **CDN内蔵**: 高速コンテンツ配信
- **Swagger UI**: API開発・テスト環境
- **カスタムスクリプト**: PHP/JavaScript実行環境

### 3.2 データ構造設計

#### Kurocoコンテンツ構造

```
- Articles (記事)
  - title: テキスト
  - description: テキストエリア
  - content_url: URL (外部記事リンク)
  - category: リレーション (Categories)
  - source: リレーション (News Sources)
  - published_at: 日時
  - image: ファイル
  - tags: タグ
  - priority: 数値
  - seo_title: テキスト
  - seo_description: テキストエリア
  - slug: テキスト (URL用)

- Categories (カテゴリ)
  - name: テキスト
  - slug: テキスト
  - description: テキストエリア
  - sort_order: 数値
  - is_active: チェックボックス

- News_Sources (ニュースソース)
  - name: テキスト
  - api_endpoint: URL
  - api_key: テキスト (暗号化)
  - api_params: テキストエリア (JSON)
  - rate_limit: 数値
  - is_active: チェックボックス
  - last_fetched: 日時
```

## 4. インフラ・ホスティング

### 4.1 ホスティング戦略

#### フロントエンド: KurocoFront (静的ホスティング)

- **理由**: Kurocoとの統合環境、CDN最適化
- **機能**:
  - GitHub Actions自動デプロイ
  - 静的ファイル配信 (HTML/CSS/JS)
  - CDN統合配信
  - カスタムドメイン対応
  - TLS証明書自動発行
  - 基本認証・IP制限

#### 設定ファイル (kuroco_front.json)

```json
{
  "rewrites": [
    { "source": ".*", "destination": "/index.html" }
  ],
  "redirects": [],
  "basic": [],
  "ip_restrictions": []
}
```

#### バックエンド: Kuroco Cloud

- **理由**: Kurocoに最適化されたインフラ
- **機能**:
  - 自動スケーリング
  - CDN統合
  - セキュリティ対策
  - バックアップ・復旧

### 4.2 CDN・パフォーマンス

#### Kuroco CDN

- 静的HTML/CSS/JS配信最適化
- API レスポンスキャッシュ
- 画像・メディア最適化配信
- グローバル配信ネットワーク

## 5. 開発・運用ツール

### 5.1 開発環境

#### TypeScript

```bash
npm install typescript @types/react @types/node
```

- 型安全性によるバグ削減
- 開発効率向上
- Next.js完全対応

#### ESLint + Prettier

```bash
npm install eslint prettier eslint-config-next
```

- コード品質維持
- 自動フォーマット

### 5.2 監視・分析

#### Google Analytics 4

- ユーザー行動分析
- コンバージョン追跡

#### Google Search Console

- SEO パフォーマンス監視
- インデックス状況確認

#### KurocoFront Analytics

- 配信パフォーマンス監視
- CDN使用状況分析

## 6. セキュリティ

### 6.1 フロントエンド

- **HTTPS強制**: KurocoFront自動対応
- **CSP設定**: Content Security Policy (kuroco_front.json)
- **XSS対策**: Next.js自動エスケープ
- **静的ファイル**: サーバーサイド攻撃面の最小化

### 6.2 バックエンド (Kuroco)

- **API認証**: JWT、OAuth対応
- **レート制限**: API呼び出し制限
- **IP制限**: アクセス制御
- **WAF**: Web Application Firewall
- **DDoS対策**: 自動対策

## 7. 外部API連携

### 7.1 ニュースAPI統合

#### サポート対象API例

- NewsAPI
- Guardian API  
- New York Times API
- 国内ニュースサイトAPI

#### Kuroco統合方法

- **カスタムAPI**: Kurocoのカスタム機能でREST API統合
- **バッチ処理**: 定期的なデータ取得・更新
- **エラーハンドリング**: API障害時の対応

## 8. パフォーマンス最適化

### 8.1 静的サイト最適化戦略

- **SSG特化**: 全ページ静的生成によるCDN最適化
- **Critical CSS**: インライン化による初期表示高速化
- **Code Splitting**: Next.js自動対応
- **Image Optimization**: next/imageによる最適化
- **Font Optimization**: next/fontによるフォント最適化
- **Bundle Analysis**: @next/bundle-analyzer

### 8.2 SEO最適化技術

- **Static HTML**: 完全な静的HTML生成によるクローラビリティ向上
- **Build-time SEO**: getStaticPropsでのメタデータ生成
- **構造化データ**: JSON-LD静的埋め込み
- **XMLサイトマップ**: ビルド時自動生成
- **Preloading**: 重要リソースの事前読み込み
- **Lazy Loading**: 画像・コンポーネントの遅延読み込み

## 9. 開発フロー

### 9.1 Git戦略

- **ブランチ戦略**: Git Flow
- **コミット規約**: Conventional Commits
- **自動デプロイ**: GitHub Actions連携

### 9.2 CI/CD (KurocoFront特化)

- **GitHub Actions**: 自動ビルド・デプロイ
- **ビルドプロセス**: npm run build → next export
- **静的ファイル生成**: out/ディレクトリの完全静的ファイル
- **デプロイ**: KurocoFrontへの自動アップロード
- **テスト**: Jest + Testing Library
- **型チェック**: TypeScript
- **Lint**: ESLint実行

## 10. 推奨パッケージ構成

### 10.1 package.json (静的ホスティング特化)

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "export": "next export",
    "build-export": "next build && next export",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "tailwindcss": "^3.4.0",
    "next-seo": "^6.4.0",
    "swr": "^2.2.0",
    "axios": "^1.6.0",
    "@headlessui/react": "^1.7.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/react": "^18.0.0",
    "@types/node": "^20.0.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0",
    "prettier": "^3.0.0",
    "next-sitemap": "^4.2.0",
    "@next/bundle-analyzer": "^14.0.0"
  }
}
```

## 12. 静的ホスティング環境での実装戦略

### 12.1 SSG最適化設定

#### next.config.js設定

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 静的エクスポート有効化
  trailingSlash: true,  // KurocoFront対応
  images: {
    unoptimized: true  // 静的エクスポート用
  },
  experimental: {
    optimizeCss: true  // CSS最適化
  }
}

module.exports = nextConfig
```

#### ビルド・デプロイ戦略

```yaml
# .github/workflows/deploy.yml
name: Deploy to KurocoFront
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Build and Export
        run: npm run build-export
      - name: Deploy to KurocoFront
        # KurocoFront自動デプロイ設定
```

### 12.2 ハイブリッドデータフェッチング戦略

#### 静的コンテンツ (SSG)

```javascript
// pages/index.js - トップページ
export async function getStaticProps() {
  // ビルド時に主要記事を静的生成
  const featuredArticles = await fetch(`${process.env.KUROCO_API}/articles?featured=1&limit=10`)
  const categories = await fetch(`${process.env.KUROCO_API}/categories`)
  
  return {
    props: { 
      featuredArticles: await featuredArticles.json(),
      categories: await categories.json()
    }
  }
}
```

#### 動的コンテンツ (Client-side)

```javascript
// components/LatestNews.js - 最新記事の動的取得
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then(res => res.json())

export function LatestNews() {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_KUROCO_API}/articles/latest`,
    fetcher,
    {
      refreshInterval: 300000,  // 5分間隔で更新
      revalidateOnFocus: false,
      revalidateOnReconnect: true
    }
  )

  if (error) return <div>エラーが発生しました</div>
  if (!data) return <div>読み込み中...</div>

  return (
    <section>
      <h2>最新ニュース</h2>
      {data.list.map(article => (
        <NewsItem key={article.id} article={article} />
      ))}
    </section>
  )
}
```

### 12.3 SEO最適化実装

#### 静的メタデータ生成

```javascript
// pages/article/[slug].js
import { NextSeo } from 'next-seo'

export async function getStaticProps({ params }) {
  const article = await fetch(`${process.env.KUROCO_API}/articles/${params.slug}`)
  const articleData = await article.json()
  
  return {
    props: {
      article: articleData,
      seo: {
        title: `${articleData.title} | ニュースサイト名`,
        description: articleData.description,
        canonical: `${process.env.SITE_URL}/article/${params.slug}`,
        openGraph: {
          title: articleData.title,
          description: articleData.description,
          url: `${process.env.SITE_URL}/article/${params.slug}`,
          type: 'article',
          images: [{
            url: articleData.image_url,
            width: 1200,
            height: 630,
            alt: articleData.title
          }]
        },
        twitter: {
          cardType: 'summary_large_image'
        }
      }
    }
  }
}

export default function Article({ article, seo }) {
  return (
    <>
      <NextSeo {...seo} />
      <article>
        <h1>{article.title}</h1>
        <p>{article.content}</p>
      </article>
    </>
  )
}
```

#### 構造化データ実装

```javascript
// components/StructuredData.js
export function ArticleStructuredData({ article }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "description": article.description,
    "image": article.image_url,
    "datePublished": article.published_at,
    "dateModified": article.updated_at,
    "author": {
      "@type": "Organization",
      "name": article.source.name
    },
    "publisher": {
      "@type": "Organization",
      "name": "ニュースサイト名"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
```

## 13. 想定される課題と対策

### 13.1 静的ホスティング制約

- **課題**: サーバーサイド処理が不可
- **対策**: ビルド時処理 + クライアントサイドAPI連携

### 13.2 コンテンツ更新遅延

- **課題**: 静的生成のため即座な更新が困難
- **対策**: 重要コンテンツは静的、最新情報はクライアントサイドフェッチ

### 13.3 ビルド時間増加

- **課題**: 大量記事による長時間ビルド
- **対策**: 主要記事のみ静的生成、詳細はAPI経由

### 13.4 SEO対応

- **課題**: クライアントサイド部分のSEO
- **対策**: 重要コンテンツは静的生成、追加情報のみ動的取得

## 14. 成功指標とモニタリング

### 14.1 パフォーマンス指標

- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **PageSpeed Insights**: モバイル/デスクトップ 90+
- **ビルド時間**: < 5分以内

### 14.2 SEO指標

- **検索順位**: 主要キーワードでの順位向上
- **インデックス率**: 95%以上
- **構造化データ**: エラー率 < 5%

### 14.3 ユーザー体験指標

- **直帰率**: < 50%
- **セッション継続時間**: > 2分
- **ページビュー/セッション**: > 2.5
