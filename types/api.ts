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
  member_info?: MemberInfo
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