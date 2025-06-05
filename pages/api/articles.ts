import { NextApiRequest, NextApiResponse } from 'next'
import { mockArticles } from '@/lib/mockData'
import { ArticleListResponse } from '@/types/api'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ArticleListResponse>
) {
  const { 
    perPage = '20', 
    pageNo = '1',
    order_by = 'inst_ymdhi',
    order = 'desc',
    contents_type,
    topics_group_id,
    keyword,
    data_format = 'json'
  } = req.query

  let filteredArticles = [...mockArticles]

  // キーワード検索
  if (keyword && typeof keyword === 'string') {
    const searchTerm = keyword.toLowerCase()
    filteredArticles = filteredArticles.filter(article =>
      article.title.toLowerCase().includes(searchTerm) ||
      article.plain_body.toLowerCase().includes(searchTerm) ||
      article.subject.toLowerCase().includes(searchTerm)
    )
  }

  // コンテンツタイプフィルタ
  if (contents_type && typeof contents_type === 'string') {
    const typeId = parseInt(contents_type)
    filteredArticles = filteredArticles.filter(article => 
      article.contents_type === typeId
    )
  }

  // トピックグループIDフィルタ
  if (topics_group_id && typeof topics_group_id === 'string') {
    const groupId = parseInt(topics_group_id)
    filteredArticles = filteredArticles.filter(article => 
      article.topics_group_id === groupId
    )
  }

  // ソート処理
  const orderBy = order_by as string
  const sortOrder = order as string
  
  filteredArticles.sort((a, b) => {
    let aVal, bVal
    
    switch (orderBy) {
      case 'inst_ymdhi':
        aVal = new Date(a.inst_ymdhi).getTime()
        bVal = new Date(b.inst_ymdhi).getTime()
        break
      case 'update_ymdhi':
        aVal = new Date(a.update_ymdhi).getTime()
        bVal = new Date(b.update_ymdhi).getTime()
        break
      case 'ymd':
        aVal = new Date(a.ymd).getTime()
        bVal = new Date(b.ymd).getTime()
        break
      default:
        aVal = new Date(a.inst_ymdhi).getTime()
        bVal = new Date(b.inst_ymdhi).getTime()
    }
    
    return sortOrder === 'desc' ? bVal - aVal : aVal - bVal
  })

  // ページング処理
  const page = parseInt(pageNo as string)
  const limit = Math.min(parseInt(perPage as string), 100) // 最大100件
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex)
  
  const response: ArticleListResponse = {
    errors: [],
    messages: [],
    list: paginatedArticles,
    pageInfo: {
      totalCnt: filteredArticles.length,
      perPage: limit,
      totalPageCnt: Math.ceil(filteredArticles.length / limit),
      pageNo: page,
      firstIndex: startIndex + 1,
      lastIndex: Math.min(endIndex, filteredArticles.length),
      path: '/rcms-api/3/community/article',
      param: `?data_format=${data_format}`,
      startPageNo: 1,
      endPageNo: Math.ceil(filteredArticles.length / limit)
    }
  }
  
  res.status(200).json(response)
}