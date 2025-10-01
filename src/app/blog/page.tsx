'use client';

import { useState, useEffect } from 'react';
import matter from 'gray-matter';

interface PostData {
  title: string;
  date: string;
}

const BlogPost = () => {
  const [post, setPost] = useState<{ data: PostData; content: string } | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch('/api/blog');
      const data = await response.json();
      const { data: frontmatter, content } = matter(data.content);
      setPost({ data: frontmatter as PostData, content });
    };

    fetchPost();
  }, []);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.data.title}</h1>
      <p>{post.data.date}</p>
      <div>{post.content}</div>
    </div>
  );
};

export default BlogPost;
