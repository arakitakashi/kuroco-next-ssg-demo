# API設計書 - ニュースキュレーションサイト

## 1. API概要

### 1.1 ベースURL
```
https://[site-name].g.kuroco.app
```

### 1.2 認証方式
- **認証なし**: 公開記事取得API

### 1.3 レスポンス形式
- **データ形式**: JSON
- **文字エンコーディング**: UTF-8
- **Content-Type**: `application/json`

### 1.4 共通レスポンス構造
```json
{
  "errors": [],
  "messages": [],
  "list": [...],        // 一覧取得時
  "details": {...},     // 詳細取得時
  "pageInfo": {...}     // 一覧取得時のページング情報
}
```

## 2. 記事関連API

### 2.1 記事一覧取得

#### エンドポイント
```
GET /rcms-api/3/community/article
```

#### パラメータ
| パラメータ | 型 | 必須 | デフォルト | 説明 |
|-----------|----|----|----------|-----|
| `pageNo` | integer | No | 1 | ページ番号 |
| `perPage` | integer | No | 20 | 1ページあたりの記事数（最大100） |
| `contents_type` | integer | No | - | コンテンツタイプID |
| `topics_group_id` | integer | No | - | トピックグループID |
| `keyword` | string | No | - | キーワード検索 |
| `order_by` | string | No | `inst_ymdhi` | ソート項目 (`inst_ymdhi`, `update_ymdhi`, `ymd`) |
| `order` | string | No | `desc` | ソート順 (`asc`, `desc`) |
| `data_format` | string | No | `json` | データ形式 |

#### 実際のレスポンス例
```json
{
  "errors": [],
  "messages": [],
  "list": [
    {
      "topics_id": 4,
      "ymd": "2025-02-16",
      "contents_type": 15,
      "subject": "コンビニチョコレート",
      "topics_flg": 1,
      "open_flg": 1,
      "regular_flg": 0,
      "inst_ymdhi": "2025-02-16T04:43:35+09:00",
      "update_ymdhi": "2025-02-17T17:55:58+09:00",
      "topics_group_id": 7,
      "slug": "",
      "order_no": 0,
      "favorite_cnt": 0,
      "comment_cnt": 0,
      "my_favorite_flg": false,
      "group_nm": "ユーザーコンテンツ",
      "group_description": "",
      "contents_type_cnt": 1,
      "contents_type_nm": "ユーザーコンテンツ",
      "contents_type_slug": null,
      "contents_type_parent_nm": null,
      "category_parent_id": null,
      "contents_type_ext_col_01": null,
      "contents_type_ext_col_02": null,
      "contents_type_ext_col_03": null,
      "contents_type_ext_col_04": null,
      "contents_type_ext_col_05": null,
      "contents_type_list": [15],
      "thumbnail": {
        "id": "4_ext_01_0",
        "url": "https://takashia.g.kuroco-img.app/v=1739782558/files/topics/4_ext_1_0.jpg",
        "desc": "",
        "url_org": "https://takashia.g.kuroco-img.app/files/topics/4_ext_1_0.jpg"
      },
      "title": "コンビニチョコレート",
      "body": "<p>コンビニチョコレート</p>",
      "plain_body": "コンビニチョコレート",
      "thumbnail_base64": "",
      "theme": ""
    },
    {
      "topics_id": 3,
      "ymd": "2025-02-16",
      "contents_type": 15,
      "subject": "フランス展",
      "topics_flg": 1,
      "open_flg": 1,
      "regular_flg": 0,
      "inst_ymdhi": "2025-02-16T04:41:14+09:00",
      "update_ymdhi": "2025-02-17T17:55:50+09:00",
      "topics_group_id": 7,
      "slug": "",
      "order_no": 0,
      "favorite_cnt": 0,
      "comment_cnt": 0,
      "my_favorite_flg": false,
      "group_nm": "ユーザーコンテンツ",
      "group_description": "",
      "contents_type_cnt": 1,
      "contents_type_nm": "ユーザーコンテンツ",
      "contents_type_slug": null,
      "contents_type_parent_nm": null,
      "category_parent_id": null,
      "contents_type_ext_col_01": null,
      "contents_type_ext_col_02": null,
      "contents_type_ext_col_03": null,
      "contents_type_ext_col_04": null,
      "contents_type_ext_col_05": null,
      "contents_type_list": [15],
      "thumbnail": {
        "id": "3_ext_01_0",
        "url": "https://takashia.g.kuroco-img.app/v=1739782550/files/topics/3_ext_1_0.jpg",
        "desc": "フランスチョコレート",
        "url_org": "https://takashia.g.kuroco-img.app/files/topics/3_ext_1_0.jpg"
      },
      "title": "フランス展",
      "body": "<p>珍しいフランス製チョコレートがありました。</p>",
      "plain_body": "珍しいフランス製チョコレートがありました。",
      "thumbnail_base64": "",
      "theme": ""
    }
  ],
  "pageInfo": {
    "totalCnt": 2,
    "perPage": 20,
    "totalPageCnt": 1,
    "pageNo": 1,
    "firstIndex": 1,
    "lastIndex": 2,
    "path": "/rcms-api/3/community/article",
    "param": "?data_format=json",
    "startPageNo": 1,
    "endPageNo": 1
  }
}
```

### 2.2 記事詳細取得

#### エンドポイント
```
GET /rcms-api/3/community/article/{topics_id}
```

#### パラメータ
| パラメータ | 型 | 必須 | 説明 |
|-----------|----|----|-----|
| `topics_id` | integer | Yes | 記事ID |
| `data_format` | string | No | `json` | データ形式 |

#### 実際のレスポンス例
```json
{
  "errors": [],
  "messages": [],
  "details": {
    "topics_id": 4,
    "ymd": "2025-02-16",
    "contents_type": 15,
    "subject": "コンビニチョコレート",
    "topics_flg": 1,
    "open_flg": 1,
    "regular_flg": 0,
    "inst_ymdhi": "2025-02-16T04:43:35+09:00",
    "update_ymdhi": "2025-02-17T17:55:58+09:00",
    "topics_group_id": 7,
    "slug": "",
    "order_no": 0,
    "favorite_cnt": 0,
    "comment_cnt": 0,
    "member_info": {
      "member_id": 1,
      "avatar": null,
      "username": null,
      "user_id": null,
      "user_type": null,
      "about": null
    },
    "group_nm": "ユーザーコンテンツ",
    "group_description": "",
    "contents_type_cnt": 1,
    "contents_type_nm": "ユーザーコンテンツ",
    "contents_type_slug": null,
    "contents_type_parent_nm": null,
    "category_parent_id": null,
    "contents_type_ext_col_01": null,
    "contents_type_ext_col_02": null,
    "contents_type_ext_col_03": null,
    "contents_type_ext_col_04": null,
    "contents_type_ext_col_05": null,
    "contents_type_list": [15],
    "thumbnail": {
      "id": "4_ext_01_0",
      "url": "https://takashia.g.kuroco-img.app/v=1739782558/files/topics/4_ext_1_0.jpg",
      "desc": "",
      "url_org": "https://takashia.g.kuroco-img.app/files/topics/4_ext_1_0.jpg"
    },
    "title": "コンビニチョコレート",
    "body": "<p>コンビニチョコレート</p>",
    "plain_body": "コンビニチョコレート",
    "thumbnail_base64": "",
    "theme": ""
  }
}
```

## 3. フィールド定義

### 3.1 記事フィールド一覧

| フィールド名 | 型 | 説明 |
|------------|----|----|
| `topics_id` | integer | 記事の一意ID |
| `ymd` | string | 記事の日付（YYYY-MM-DD） |
| `contents_type` | integer | コンテンツタイプID |
| `subject` | string | 記事のサブジェクト |
| `title` | string | 記事タイトル |
| `body` | string | 記事本文（HTML形式） |
| `plain_body` | string | 記事本文（プレーンテキスト） |
| `topics_flg` | integer | トピックフラグ（1: 有効） |
| `open_flg` | integer | 公開フラグ（1: 公開） |
| `regular_flg` | integer | 定期フラグ |
| `inst_ymdhi` | string | 作成日時（ISO 8601形式） |
| `update_ymdhi` | string | 更新日時（ISO 8601形式） |
| `topics_group_id` | integer | トピックグループID |
| `slug` | string | URL用スラッグ |
| `order_no` | integer | 表示順序 |
| `favorite_cnt` | integer | お気に入り数 |
| `comment_cnt` | integer | コメント数 |
| `my_favorite_flg` | boolean | 自分のお気に入りフラグ |
| `group_nm` | string | グループ名 |
| `group_description` | string | グループ説明 |
| `contents_type_cnt` | integer | コンテンツタイプ数 |
| `contents_type_nm` | string | コンテンツタイプ名 |
| `contents_type_slug` | string\|null | コンテンツタイプスラッグ |
| `contents_type_parent_nm` | string\|null | 親コンテンツタイプ名 |
| `category_parent_id` | integer\|null | 親カテゴリID |
| `contents_type_ext_col_01` ~ `05` | string\|null | 拡張カラム1-5 |
| `contents_type_list` | array | コンテンツタイプリスト |
| `thumbnail_base64` | string | サムネイルBase64（通常は空） |
| `theme` | string | テーマ |

### 3.2 サムネイルオブジェクト

| フィールド名 | 型 | 説明 |
|------------|----|----|
| `id` | string | 画像ID |
| `url` | string | 最適化済み画像URL |
| `url_org` | string | オリジナル画像URL |
| `desc` | string | 画像説明文 |

### 3.3 メンバー情報オブジェクト（詳細のみ）

| フィールド名 | 型 | 説明 |
|------------|----|----|
| `member_id` | integer | メンバーID |
| `avatar` | string\|null | アバター画像URL |
| `username` | string\|null | ユーザー名 |
| `user_id` | string\|null | ユーザーID |
| `user_type` | string\|null | ユーザータイプ |
| `about` | string\|null | ユーザー説明 |

### 3.4 ページング情報オブジェクト

| フィールド名 | 型 | 説明 |
|------------|----|----|
| `totalCnt` | integer | 総件数 |
| `perPage` | integer | 1ページあたりの件数 |
| `totalPageCnt` | integer | 総ページ数 |
| `pageNo` | integer | 現在のページ番号 |
| `firstIndex` | integer | ページ内の最初のインデックス |
| `lastIndex` | integer | ページ内の最後のインデックス |
| `path` | string | APIパス |
| `param` | string | パラメータ |
| `startPageNo` | integer | ページネーション開始番号 |
| `endPageNo` | integer | ページネーション終了番号 |

## 4. エラーレスポンス

### 4.1 共通エラー形式
```json
{
  "errors": [
    {
      "code": "NOT_FOUND",
      "message": "指定された記事が見つかりません"
    }
  ],
  "messages": [],
  "details": null
}
```

### 4.2 よくあるエラー
- **404 Not Found**: 指定したtopics_idの記事が存在しない
- **400 Bad Request**: パラメータが不正
- **500 Internal Server Error**: サーバー内部エラー

## 5. Next.js実装例

### 5.1 記事一覧取得（SSG）
```javascript
// pages/index.js
export async function getStaticProps() {
  try {
    const response = await fetch(`${process.env.KUROCO_API}/rcms-api/3/community/article?perPage=10&order_by=inst_ymdhi&order=desc`)
    const data = await response.json()
    
    if (data.errors.length > 0) {
      throw new Error('API Error: ' + data.errors[0].message)
    }
    
    return {
      props: {
        articles: data.list,
        pageInfo: data.pageInfo
      },
      revalidate: 3600 // 1時間ごとに再生成
    }
  } catch (error) {
    console.error('Failed to fetch articles:', error)
    return {
      props: {
        articles: [],
        pageInfo: null
      }
    }
  }
}

export default function HomePage({ articles, pageInfo }) {
  return (
    <div>
      <h1>最新ニュース</h1>
      {articles.map(article => (
        <article key={article.topics_id}>
          <h2>{article.title}</h2>
          <p>{article.plain_body}</p>
          {article.thumbnail && (
            <img 
              src={article.thumbnail.url} 
              alt={article.thumbnail.desc || article.title}
            />
          )}
          <time dateTime={article.inst_ymdhi}>
            {new Date(article.inst_ymdhi).toLocaleDateString('ja-JP')}
          </time>
        </article>
      ))}
    </div>
  )
}
```

### 5.2 記事詳細取得（SSG）
```javascript
// pages/article/[id].js
export async function getStaticPaths() {
  try {
    const response = await fetch(`${process.env.KUROCO_API}/rcms-api/3/community/article?perPage=100`)
    const data = await response.json()
    
    const paths = data.list.map((article) => ({
      params: { id: article.topics_id.toString() }
    }))

    return { 
      paths, 
      fallback: 'blocking' // 新しい記事に対して動的に生成
    }
  } catch (error) {
    console.error('Failed to generate paths:', error)
    return {
      paths: [],
      fallback: 'blocking'
    }
  }
}

export async function getStaticProps({ params }) {
  try {
    const response = await fetch(`${process.env.KUROCO_API}/rcms-api/3/community/article/${params.id}`)
    const data = await response.json()
    
    if (data.errors.length > 0) {
      return { notFound: true }
    }
    
    const article = data.details
    
    return {
      props: {
        article,
        seo: {
          title: `${article.title} | ニュースサイト`,
          description: article.plain_body.substring(0, 160),
          canonical: `${process.env.SITE_URL}/article/${params.id}`,
          openGraph: {
            title: article.title,
            description: article.plain_body.substring(0, 160),
            url: `${process.env.SITE_URL}/article/${params.id}`,
            type: 'article',
            images: article.thumbnail ? [{
              url: article.thumbnail.url,
              width: 1200,
              height: 630,
              alt: article.thumbnail.desc || article.title
            }] : [],
            article: {
              publishedTime: article.inst_ymdhi,
              modifiedTime: article.update_ymdhi,
              section: article.contents_type_nm,
              authors: [article.member_info?.username || 'Unknown']
            }
          }
        }
      },
      revalidate: 3600 // 1時間ごとに再生成
    }
  } catch (error) {
    console.error('Failed to fetch article:', error)
    return { notFound: true }
  }
}

export default function ArticlePage({ article, seo }) {
  return (
    <>
      <NextSeo {...seo} />
      <article>
        <h1>{article.title}</h1>
        
        {article.thumbnail && (
          <img 
            src={article.thumbnail.url} 
            alt={article.thumbnail.desc || article.title}
            className="w-full h-64 object-cover mb-4"
          />
        )}
        
        <div className="article-meta">
          <time dateTime={article.inst_ymdhi}>
            公開: {new Date(article.inst_ymdhi).toLocaleDateString('ja-JP')}
          </time>
          {article.update_ymdhi !== article.inst_ymdhi && (
            <time dateTime={article.update_ymdhi}>
              更新: {new Date(article.update_ymdhi).toLocaleDateString('ja-JP')}
            </time>
          )}
          <span>カテゴリ: {article.contents_type_nm}</span>
        </div>
        
        <div 
          className="article-content"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />
        
        <div className="article-stats">
          <span>お気に入り: {article.favorite_cnt}</span>
          <span>コメント: {article.comment_cnt}</span>
        </div>
      </article>
    </>
  )
}
```

### 5.3 最新記事取得（Client-side）
```javascript
// components/LatestNews.js
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then(res => res.json())

export function LatestNews({ excludeIds = [] }) {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_KUROCO_API}/rcms-api/3/community/article?perPage=5&order_by=inst_ymdhi&order=desc`,
    fetcher,
    {
      refreshInterval: 300000, // 5分間隔で更新
      revalidateOnFocus: false,
      revalidateOnReconnect: true
    }
  )

  if (error) return <div className="error">最新ニュースの取得に失敗しました</div>
  if (isLoading) return <div className="loading">読み込み中...</div>
  if (!data || data.errors.length > 0) return <div className="error">データを取得できませんでした</div>

  // 除外IDでフィルタリング
  const filteredArticles = data.list.filter(article => 
    !excludeIds.includes(article.topics_id)
  )

  return (
    <section className="latest-news">
      <h2>最新ニュース</h2>
      <div className="news-list">
        {filteredArticles.map(article => (
          <article key={article.topics_id} className="news-item">
            <a href={`/article/${article.topics_id}`}>
              {article.thumbnail && (
                <img 
                  src={article.thumbnail.url} 
                  alt={article.thumbnail.desc || article.title}
                  className="news-thumbnail"
                />
              )}
              <div className="news-content">
                <h3>{article.title}</h3>
                <p>{article.plain_body.substring(0, 100)}...</p>
                <time dateTime={article.inst_ymdhi}>
                  {new Date(article.inst_ymdhi).toLocaleDateString('ja-JP')}
                </time>
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
```

### 5.4 型定義（TypeScript）
```typescript
// types/api.ts
export interface Article {
  topics_id: number
  ymd: string
  contents_type: number
  subject: string
  title: string
  body: string
  plain_body: string
  topics_flg: number
  open_flg: number
  regular_flg: number
  inst_ymdhi: string
  update_ymdhi: string
  topics_group_id: number
  slug: string
  order_no: number
  favorite_cnt: number
  comment_cnt: number
  my_favorite_flg: boolean
  group_nm: string
  group_description: string
  contents_type_cnt: number
  contents_type_nm: string
  contents_type_slug: string | null
  contents_type_parent_nm: string | null
  category_parent_id: number | null
  contents_type_ext_col_01: string | null
  contents_type_ext_col_02: string | null
  contents_type_ext_col_03: string | null
  contents_type_ext_col_04: string | null
  contents_type_ext_col_05: string | null
  contents_type_list: number[]
  thumbnail: Thumbnail | null
  thumbnail_base64: string
  theme: string
  member_info?: MemberInfo // 詳細取得時のみ
}

export interface Thumbnail {
  id: string
  url: string
  url_org: string
  desc: string
}

export interface MemberInfo {
  member_id: number
  avatar: string | null
  username: string | null
  user_id: string | null
  user_type: string | null
  about: string | null
}

export interface PageInfo {
  totalCnt: number
  perPage: number
  totalPageCnt: number
  pageNo: number
  firstIndex: number
  lastIndex: number
  path: string
  param: string
  startPageNo: number
  endPageNo: number
}

export interface ArticleListResponse {
  errors: any[]
  messages: any[]
  list: Article[]
  pageInfo: PageInfo
}

export interface ArticleDetailResponse {
  errors: any[]
  messages: any[]
  details: Article
}
```

## 6. 画像最適化

### 6.1 next.config.js設定
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['takashia.g.kuroco-img.app'],
    deviceSizes: [640, 768, 1024, 1280, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    unoptimized: true // 静的エクスポート時
  }
}
```

### 6.2 画像コンポーネント例
```javascript
// components/ArticleImage.js
import Image from 'next/image'

export function ArticleImage({ thumbnail, title, className = '' }) {
  if (!thumbnail) return null

  return (
    <div className={`relative ${className}`}>
      <Image
        src={thumbnail.url}
        alt={thumbnail.desc || title}
        width={800}
        height={400}
        className="object-cover w-full h-full"
        priority={false}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      />
    </div>
  )
}
```
