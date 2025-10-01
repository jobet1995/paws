import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';
import matter from 'gray-matter';

export async function GET(): Promise<NextResponse> {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = await fs.readdir(postsDirectory);

  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = await fs.readFile(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      return {
        ...data,
        content,
      };
    })
  );

  return NextResponse.json({ posts });
}
