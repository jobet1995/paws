import { blogPosts } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id,
  }));
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogPosts.find((p) => p.id === params.id);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center space-x-2 text-amber-600 hover:text-amber-700 mb-8 font-medium"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Blog</span>
        </Link>

        <article className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="relative h-96">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
              priority
            />
            <div className="absolute top-4 left-4 bg-amber-600 text-white px-4 py-2 rounded-full font-semibold">
              {post.category}
            </div>
          </div>

          <div className="p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center space-x-2 text-gray-600">
                <User className="h-5 w-5 text-amber-600" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="h-5 w-5 text-amber-600" />
                <span>{format(new Date(post.date), "MMMM d, yyyy")}</span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                {post.excerpt}
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                {post.content}
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                At our shelter, we believe that every animal deserves a second
                chance at happiness. Through our dedicated team of volunteers
                and staff, we work tirelessly to ensure each animal receives the
                care, love, and attention they need while waiting for their
                forever home.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Whether you&apos;re considering adoption, volunteering, or
                simply want to support our mission, we invite you to be part of
                our compassionate community. Together, we can make a real
                difference in the lives of animals in need.
              </p>
              <blockquote className="border-l-4 border-amber-600 pl-6 py-2 my-8 bg-amber-50 rounded-r-lg">
                <p className="text-gray-700 italic text-lg">
                  &ldquo;Saving one animal won&apos;t change the world, but it
                  will change the world for that one animal.&rdquo;
                </p>
              </blockquote>
              <p className="text-gray-700 leading-relaxed">
                If you have questions about adoption, volunteering, or how you
                can help, please don&apos;t hesitate to reach out to our team.
                We&apos;re here to support you every step of the way.
              </p>
            </div>
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Related Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                  <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {format(new Date(relatedPost.date), "MMM d, yyyy")}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
