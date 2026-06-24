"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer/Footer";
import { BlogPost, ALL_BLOGS_DATA, slugify } from "../blogsData";

// asynchronous API fetch by slug
const dummyFetchBlogBySlug = (slug: string): Promise<BlogPost | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const matched = ALL_BLOGS_DATA.find((b) => slugify(b.title) === slug);
      resolve(matched);
    }, 600);
  });
};

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    
    const loadBlogData = async () => {
      setLoading(true);
      const data = await dummyFetchBlogBySlug(slug);
      setBlog(data || null);
      setLoading(false);
    };

    loadBlogData();
  }, [slug]);

  return (
    <>
      <main className="relative min-h-screen bg-[#4A6FA5] py-20 px-4 md:px-8 overflow-hidden select-none">
        
        <div className="max-w-[1290px] mx-auto z-10 relative mb-4">
          <button
            onClick={() => router.push("/blogs")}
            className="flex items-center gap-2 text-white/80 hover:text-white font-bebas text-xl tracking-wider hover:-translate-x-1 transition-all duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            BACK TO BLOGS
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-48 gap-4">
            <Loader2 className="w-16 h-16 text-[#FEFED7] animate-spin" />
            <p className="font-bebas text-[#FEFED7] text-2xl tracking-widest">LOADING ARTICLE...</p>
          </div>
        ) : !blog ? (
          <div className="max-w-4xl mx-auto text-center py-32 bg-black/40 rounded-3xl p-8 border border-white/10 relative z-10">
            <h2 className="font-bebas text-[#FEFED7] text-4xl tracking-wide mb-4">BLOG NOT FOUND</h2>
            <p className="text-white/60 mb-8">We could not find the article you are looking for.</p>
            <button 
              onClick={() => router.push("/blogs")} 
              className="px-8 py-3 bg-[#FEFED7] text-black font-bebas text-xl rounded-full hover:bg-white transition-all shadow-md"
            >
              GO TO BLOGS
            </button>
          </div>
        ) : (
          <div className="max-w-[1290px] mx-auto relative z-10">
            
            <div className="flex flex-col items-center text-center mt-6 mb-12">
              <h1 
                className="font-bebas text-white text-[90px] md:text-[128px] tracking-[0.05em] leading-none uppercase"
                style={{ textShadow: "0px 0px 40px rgba(255,255,255,0.7)" }}
              >
                BLOG
              </h1>
              <p className="text-[#FEFED7]/80 font-mono text-sm tracking-widest uppercase mt-2">
                {blog.category} &nbsp;✦&nbsp; {new Date(blog.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>

            <section className="mb-14 overflow-hidden border-2 border-black/10 shadow-[0_12px_32px_rgba(0,0,0,0.15)] bg-black/25">
              <img
                src="/images/codechef_team_photo.png"
                alt="CodeChef Team"
                className="w-full h-auto max-h-[699px] object-cover"
              />
            </section>

            <div className="mb-8">
              <h2 className="font-bebas text-[#FEFED7] text-4xl md:text-6xl tracking-wide leading-tight uppercase">
                {blog.title}
              </h2>
              <div className="w-20 h-1 bg-[#FEFED7] mt-3" />
            </div>

            <article className="text-white font-cera text-xl md:text-[32px] md:leading-[45px] tracking-wide font-light max-w-[1280px] mx-auto mt-8 mb-16 whitespace-pre-line select-text text-justify">
              {blog.content}
            </article>

          </div>
        )}
      </main>

      {/* Footer component */}
      <Footer />
    </>
  );
}
