import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";
import matter from "gray-matter";

// Types
type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
  author?: {
    name: string;
    avatar?: string;
  };
  image?: string;
  tags?: string[];
  status?: "draft" | "published";
  readingTime?: number;
};

type GetBlogPostsParams = {
  page: number;
  limit: number;
  tag?: string;
  status?: "draft" | "published";
  sortBy?: "newest" | "oldest" | "title-asc" | "title-desc";
};

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);

    // Parse and type the query parameters
    const params: GetBlogPostsParams = {
      page: parseInt(searchParams.get("page") || "1", 10),
      limit: parseInt(searchParams.get("limit") || "10", 10),
      tag: searchParams.get("tag") || undefined,
      status: searchParams.get("status") as "draft" | "published" | undefined,
      sortBy:
        (searchParams.get("sortBy") as GetBlogPostsParams["sortBy"]) ||
        "newest",
    };

    const { page, limit, tag, status, sortBy } = params;

    const postsDirectory = path.join(process.cwd(), "posts");

    try {
      const filenames = await fs.readdir(postsDirectory);

      let posts: BlogPost[] = await Promise.all(
        filenames
          .filter(
            (filename) => filename.endsWith(".md") || filename.endsWith(".mdx"),
          )
          .map(async (filename) => {
            const filePath = path.join(postsDirectory, filename);
            const fileContents = await fs.readFile(filePath, "utf8");
            const { data, content } = matter(fileContents);

            // Calculate reading time (assuming 200 words per minute)
            const words = content.trim().split(/\s+/).length;
            const readingTime = Math.ceil(words / 200);

            return {
              id: data.id || filename.replace(/\.[^/.]+$/, ""),
              title: data.title || "Untitled",
              slug:
                data.slug ||
                filename
                  .replace(/\.[^/.]+$/, "")
                  .toLowerCase()
                  .replace(/\s+/g, "-"),
              excerpt: data.excerpt || content.substring(0, 160) + "...",
              content,
              publishedAt: data.date || new Date().toISOString(),
              updatedAt: data.updatedAt || null,
              author: data.author || { name: "Anonymous" },
              image: data.image || null,
              tags: data.tags || [],
              status: data.status || "published",
              readingTime,
            };
          }),
      );

      // Filtering
      if (status) {
        posts = posts.filter((post) => post.status === status);
      }

      if (tag) {
        posts = posts.filter((post) => post.tags?.includes(tag));
      }

      // Sorting
      switch (sortBy) {
        case "oldest":
          posts.sort(
            (a, b) =>
              new Date(a.publishedAt).getTime() -
              new Date(b.publishedAt).getTime(),
          );
          break;
        case "title-asc":
          posts.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "title-desc":
          posts.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case "newest":
        default:
          posts.sort(
            (a, b) =>
              new Date(b.publishedAt).getTime() -
              new Date(a.publishedAt).getTime(),
          );
      }

      // Pagination
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedPosts = posts.slice(startIndex, endIndex);
      const totalPages = Math.ceil(posts.length / limit);

      return NextResponse.json(
        {
          success: true,
          data: paginatedPosts,
          pagination: {
            currentPage: page,
            totalPages,
            totalItems: posts.length,
            itemsPerPage: limit,
            hasNextPage: endIndex < posts.length,
            hasPreviousPage: startIndex > 0,
          },
        },
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
          },
        },
      );
    } catch (error) {
      console.error("Error reading blog posts:", error);
      return NextResponse.json(
        { success: false, message: "Failed to read blog posts" },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ status: 500 });
  }
}
