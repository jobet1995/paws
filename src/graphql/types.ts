export type Author = {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
  role?: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
};

export type SEO = {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
};

export type PostStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  author: Author;
  categories: Category[];
  tags?: string[];
  publishedAt: string;
  updatedAt?: string;
  readingTime?: number;
  status: PostStatus;
  featured: boolean;
  seo?: SEO;
};

export type PostFilterInput = {
  status?: PostStatus;
  category?: string;
  tag?: string;
  featured?: boolean;
  author?: string;
  search?: string;
};

export type SortOrder = "ASC" | "DESC";

export type SortInput = {
  field: string;
  order: SortOrder;
};

export type PageInfo = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
  endCursor?: string;
};

export type PostEdge = {
  node: Post;
  cursor: string;
};

export type PostConnection = {
  edges: PostEdge[];
  pageInfo: PageInfo;
  totalCount: number;
};
