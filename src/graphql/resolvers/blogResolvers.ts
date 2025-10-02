import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { v4 as uuidv4 } from "uuid";
import {
  Post,
  Author,
  Category,
  PostFilterInput,
  SortInput,
  PostConnection,
  PostEdge,
  PageInfo,
} from "../types";

// Mock data - In a real app, this would come from a database
const AUTHORS: Record<string, Author> = {
  "sarah-johnson": {
    id: "1",
    name: "Sarah Johnson",
    role: "Veterinarian",
    bio: "Certified veterinarian with 10+ years of experience in pet care.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  "michael-chen": {
    id: "2",
    name: "Michael Chen",
    role: "Animal Behaviorist",
    bio: "Specializes in pet behavior and training.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  "emily-rodriguez": {
    id: "3",
    name: "Emily Rodriguez",
    role: "Shelter Manager",
    bio: "Dedicated to finding forever homes for shelter animals.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
};

const CATEGORIES: Record<string, Category> = {
  "pet-care": {
    id: "1",
    name: "Pet Care",
    slug: "pet-care",
    description: "Tips and advice for taking care of your pets",
  },
  adoption: {
    id: "2",
    name: "Adoption",
    slug: "adoption",
    description: "Stories and information about pet adoption",
  },
  "success-stories": {
    id: "3",
    name: "Success Stories",
    slug: "success-stories",
    description: "Heartwarming stories of successful adoptions",
  },
};

// Helper function to process markdown files
async function getPostsFromFiles(): Promise<Post[]> {
  const postsDirectory = path.join(process.cwd(), "posts");
  try {
    const filenames = await fs.readdir(postsDirectory);

    const posts = await Promise.all(
      filenames.map(async (filename) => {
        const filePath = path.join(postsDirectory, filename);
        const fileContents = await fs.readFile(filePath, "utf8");
        const { data, content } = matter(fileContents);

        // Calculate reading time
        const stats = readingTime(content);

        // Get author data
        const authorSlug =
          data.author?.toLowerCase().replace(/\s+/g, "-") || "unknown";
        const author = AUTHORS[authorSlug] || {
          id: "unknown",
          name: data.author || "Anonymous",
        };

        // Get categories
        const categories = (data.categories || []).map((cat: string) => {
          const slug = cat.toLowerCase().replace(/\s+/g, "-");
          return (
            CATEGORIES[slug] || {
              id: slug,
              name: cat,
              slug,
            }
          );
        });

        // Create slug from filename
        const slug = filename.replace(/\.md$/, "");

        return {
          id: data.id || uuidv4(),
          title: data.title || "Untitled",
          slug: data.slug || slug,
          excerpt: data.excerpt || content.substring(0, 200) + "...",
          content,
          featuredImage: data.image || data.featuredImage,
          author,
          categories,
          tags: data.tags || [],
          publishedAt: data.date || new Date().toISOString(),
          updatedAt: data.updatedAt,
          readingTime: Math.ceil(stats.minutes),
          status: data.status || "PUBLISHED",
          featured: !!data.featured,
          seo: data.seo,
        } as Post;
      }),
    );

    return posts;
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}

// Helper function to apply filters to posts
function applyFilters(posts: Post[], filter?: PostFilterInput): Post[] {
  if (!filter) return posts;

  return posts.filter((post) => {
    // Filter by status
    if (filter.status && post.status !== filter.status) return false;

    // Filter by category
    if (filter.category) {
      const hasCategory = post.categories.some(
        (cat) => cat.id === filter.category || cat.slug === filter.category,
      );
      if (!hasCategory) return false;
    }

    // Filter by tag
    if (filter.tag && !post.tags?.includes(filter.tag)) {
      return false;
    }

    // Filter by featured
    if (filter.featured !== undefined && post.featured !== filter.featured) {
      return false;
    }

    // Filter by author
    if (filter.author && post.author.id !== filter.author) {
      return false;
    }

    // Search in title and content
    if (filter.search) {
      const search = filter.search.toLowerCase();
      const inTitle = post.title.toLowerCase().includes(search);
      const inContent = post.content.toLowerCase().includes(search);
      const inExcerpt = post.excerpt?.toLowerCase().includes(search) || false;

      if (!inTitle && !inContent && !inExcerpt) {
        return false;
      }
    }

    return true;
  });
}

// Helper function to sort posts
function sortPosts(posts: Post[], sort?: SortInput[]): Post[] {
  if (!sort || sort.length === 0) {
    // Default sort by publishedAt descending
    return [...posts].sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
  }

  return [...posts].sort((a, b) => {
    for (const { field, order = "ASC" } of sort || []) {
      // Handle nested fields (e.g., 'author.name')
      const getValue = (
        obj: Record<string, unknown>,
        path: string,
      ): unknown => {
        return path.split(".").reduce<unknown>((o: unknown, key: string) => {
          if (o && typeof o === "object" && key in o) {
            return (o as Record<string, unknown>)[key];
          }
          return undefined;
        }, obj);
      };

      const aValue = getValue(a, field);
      const bValue = getValue(b, field);

      // If either value is undefined or null, skip to next sort field
      if (aValue == null || bValue == null) continue;

      // Handle different value types
      if (typeof aValue === "string" && typeof bValue === "string") {
        const compareResult = aValue.localeCompare(bValue);
        if (compareResult !== 0) {
          return order === "ASC" ? compareResult : -compareResult;
        }
      } else if (typeof aValue === "number" && typeof bValue === "number") {
        if (aValue < bValue) return order === "ASC" ? -1 : 1;
        if (aValue > bValue) return order === "ASC" ? 1 : -1;
      } else if (aValue instanceof Date && bValue instanceof Date) {
        if (aValue.getTime() < bValue.getTime())
          return order === "ASC" ? -1 : 1;
        if (aValue.getTime() > bValue.getTime())
          return order === "ASC" ? 1 : -1;
      } else if (typeof aValue === "boolean" && typeof bValue === "boolean") {
        const aBool = aValue ? 1 : 0;
        const bBool = bValue ? 1 : 0;
        if (aBool < bBool) return order === "ASC" ? -1 : 1;
        if (aBool > bBool) return order === "ASC" ? 1 : -1;
      }
      // If values are equal or types don't match, continue to next sort field
    }
    return 0;
  });
}

function paginatePosts(
  posts: Post[],
  first: number,
  after?: string,
): { edges: PostEdge[]; pageInfo: PageInfo; totalCount: number } {
  // If after is provided, find the index of the cursor
  let startIndex = 0;
  if (after) {
    const cursorIndex = posts.findIndex((post) => post.id === after);
    if (cursorIndex !== -1) {
      startIndex = cursorIndex + 1;
    }
  }

  const paginated = posts.slice(startIndex, startIndex + first);
  const hasNextPage = startIndex + first < posts.length;
  const hasPreviousPage = startIndex > 0;

  const edges: PostEdge[] = paginated.map((post) => ({
    node: post,
    cursor: post.id,
  }));

  const pageInfo: PageInfo = {
    hasNextPage,
    hasPreviousPage,
    startCursor: edges[0]?.cursor,
    endCursor: edges[edges.length - 1]?.cursor,
  };

  return {
    edges,
    pageInfo,
    totalCount: posts.length,
  };
}

export const blogResolvers = {
  Query: {
    posts: async (
      _: unknown,
      {
        first = 10,
        after,
        filter,
        sort,
      }: {
        first?: number;
        after?: string;
        filter?: PostFilterInput;
        sort?: SortInput[];
      },
    ): Promise<PostConnection> => {
      let posts = await getPostsFromFiles();

      // Apply filters
      posts = applyFilters(posts, filter);

      // Sort posts
      posts = sortPosts(posts, sort);

      // Apply pagination
      return paginatePosts(posts, first, after);
    },

    post: async (
      _: unknown,
      { id, slug }: { id?: string; slug?: string },
    ): Promise<Post | null> => {
      if (!id && !slug) {
        throw new Error("Either id or slug must be provided");
      }

      const posts = await getPostsFromFiles();
      return posts.find((p) => p.id === id || p.slug === slug) || null;
    },

    categories: (): Category[] => {
      return Object.values(CATEGORIES);
    },

    tags: async (): Promise<string[]> => {
      const posts = await getPostsFromFiles();
      const allTags = new Set<string>();

      posts.forEach((post) => {
        post.tags?.forEach((tag) => allTags.add(tag));
      });

      return Array.from(allTags);
    },

    authors: (): Author[] => {
      return Object.values(AUTHORS);
    },

    searchPosts: async (
      _: unknown,
      { query, first = 10 }: { query: string; first?: number },
    ): Promise<Post[]> => {
      const posts = await getPostsFromFiles();
      const search = query.toLowerCase();

      return posts
        .filter((post) => {
          const inTitle = post.title.toLowerCase().includes(search);
          const inContent = post.content.toLowerCase().includes(search);
          const inExcerpt =
            post.excerpt?.toLowerCase().includes(search) || false;

          return inTitle || inContent || inExcerpt;
        })
        .slice(0, first);
    },
  },

  // Resolvers for specific fields
  Post: {
    // If you need to resolve any fields that require additional processing
  },

  Author: {
    // Resolve any author-specific fields
  },

  Category: {
    // Resolve any category-specific fields
  },
};
