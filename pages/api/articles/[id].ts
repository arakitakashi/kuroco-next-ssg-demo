import { NextApiRequest, NextApiResponse } from 'next'
import { mockArticles } from '@/lib/mockData'
import { ArticleDetailResponse } from '@/types/api'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ArticleDetailResponse>
) {
  const { id, data_format = 'json' } = req.query
  const articleId = parseInt(id as string)
  
  // 無効なIDの場合
  if (isNaN(articleId) || articleId <= 0) {
    return res.status(400).json({
      errors: [{ code: 'BAD_REQUEST', message: 'パラメータが不正です' }],
      messages: [],
      details: null as any
    })
  }
  
  const article = mockArticles.find(article => article.topics_id === articleId)
  
  if (!article) {
    return res.status(404).json({
      errors: [{ code: 'NOT_FOUND', message: '指定された記事が見つかりません' }],
      messages: [],
      details: null as any
    })
  }
  
  // 公開フラグチェック
  if (article.open_flg !== 1 || article.topics_flg !== 1) {
    return res.status(404).json({
      errors: [{ code: 'NOT_FOUND', message: '指定された記事が見つかりません' }],
      messages: [],
      details: null as any
    })
  }
  
  const response: ArticleDetailResponse = {
    errors: [],
    messages: [],
    details: {
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
  }
  
  res.status(200).json(response)
}