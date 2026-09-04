"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Cpu, Loader2, ArrowUpRight } from "lucide-react";
import Footer from "@/components/Footer/Footer";
import { BlogPost, slugify, portableTextToPlainText } from "./blogsData";
import { client } from "@/lib/sanityClient";

// Fetch blogs from Sanity
async function fetchBlogsFromSanity(): Promise<BlogPost[]> {
  const query = `*[_type == "blogs"] | order(date desc)`;
  const data = await client.fetch(query);
  if (Array.isArray(data)) {
    return data.map((b: any, index: number) => ({
      id: b._id,
      title: b.heading || "Untitled Blog",
      about: b.about || "",
      content: portableTextToPlainText(b.blog),
      date: b.date || new Date().toISOString().split("T")[0],
      imageUrl: b.imageUrl || "/images/codechef_team_photo.png",
      category: "TECH & INSIGHTS",
      icon: index % 2 === 0 ? "terminal" : "cpu",
    }));
  }
  return [];
}

export default function BlogsPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        const data = await fetchBlogsFromSanity();
        setBlogs(data);
      } catch (err) {
        console.error("Error retrieving blogs: ", err);
        setError("Failed to retrieve blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  const featuredBlog = blogs[0];
  const standardBlogs = blogs.slice(1);
  const visibleBlogs = standardBlogs.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, standardBlogs.length));
  };

  return (
    <>
      <main className="relative min-h-screen bg-[#4A6FA5] py-20 px-4 md:px-8 overflow-hidden select-none">
        <div className="flex flex-col items-center text-center mt-8 md:mt-12 mb-12 md:mb-16 relative z-10">
          <h1 className="font-bebas text-white text-[clamp(4.5rem,24vw,10rem)] tracking-[0.05em] leading-none">
            CODECHEF
          </h1>
          <h1 
            className="font-bebas text-[clamp(3.5rem,18vw,8.125rem)] tracking-[0.05em] leading-none uppercase"
            style={{ WebkitTextStroke: "2.5px #FFFFFF", color: "transparent" }}
          >
            BLOGS
          </h1>
        </div>

        {/* Tilted Marquee Banner */}
        <div className="relative w-[calc(100vw+2rem)] -left-4 md:w-[calc(100vw+4rem)] md:-left-8 py-4 mb-16 md:mb-24 overflow-hidden z-20 border-y-2 border-white bg-[#4A6FA5] transform -rotate-[4.8deg] scale-105">
          <div className="animate-marquee flex whitespace-nowrap">
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className="font-bebas text-white text-3xl md:text-4xl mx-8 tracking-widest"
              >
                LATEST BLOGS &nbsp; ✦
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto z-10 relative">
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <Loader2 className="w-16 h-16 text-[#FEFED7] animate-spin" />
              <p className="font-bebas text-[#FEFED7] text-2xl tracking-widest">LOADING BLOGS...</p>
            </div>
          ) : error ? (
            <div className="text-center py-32 bg-black/40 rounded-3xl p-8 border border-white/10">
              <p className="font-bebas text-[#FEFED7] text-3xl tracking-wide mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-6 py-2 bg-[#FEFED7] text-black font-bebas text-lg rounded-full hover:bg-white transition-all"
              >
                RETRY
              </button>
            </div>
          ) : (
            <>
              {/* Featured Article Card */}
              {featuredBlog && (
                <section className="mb-20">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="w-full relative overflow-hidden bg-black/85 border border-white/10 rounded-[28px] md:rounded-[50px] p-5 sm:p-8 md:p-14 shadow-2xl flex flex-col justify-between min-h-[400px] md:min-h-[460px]"
                    style={{
                      backgroundImage: featuredBlog.imageUrl
                        ? `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.85)), url(${featuredBlog.imageUrl})`
                        : undefined,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                      <span className="font-bebas text-[#FFFFFF] text-2xl tracking-wider">
                        {featuredBlog.category}
                      </span>
                      <span className="self-start md:self-auto px-6 py-2 bg-[#FEFED7]/90 text-[#2C2C2C] font-semibold text-sm rounded-full font-sans shadow-md">
                        Featured Article
                      </span>
                    </div>

                    <div className="my-6">
                      <h2 className="font-bebas text-white text-4xl sm:text-5xl md:text-8xl tracking-wide leading-tight break-words">
                        {featuredBlog.title}
                      </h2>
                      <p className="mt-4 text-white/80 font-sans text-base md:text-lg max-w-3xl leading-relaxed">
                        {featuredBlog.about}
                      </p>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                      <button
                        onClick={() => router.push(`/blogs/${slugify(featuredBlog.title)}`)}
                        className="group flex items-center gap-2 px-7 md:px-8 py-3 bg-[#FEFED7] border-2 border-[#2C2C2C] text-[#1E1E1E] font-bebas text-2xl md:text-3xl rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg"
                      >
                        READ
                        <ArrowUpRight className="w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </button>
                      <span className="text-white/60 text-sm font-sans">
                        {new Date(featuredBlog.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </motion.div>
                </section>
              )}

              {/* Blogs Grid */}
              <section className="max-w-[1466px] w-full md:w-[90%] mx-auto mb-24 z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
                  {visibleBlogs.map((blog) => (
                    <motion.div
                      key={blog.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="bg-[#FEFED7] w-full max-w-[559px] min-h-[418px] p-5 sm:p-6 flex flex-col justify-between border-2 border-black/10 shadow-[10px_4px_4px_rgba(0,0,0,0.25)] hover:shadow-[12px_6px_6px_rgba(0,0,0,0.35)] hover:-translate-y-1 transition-all duration-300 relative text-black mx-auto"
                    >
                      <div>
                        <div className="w-full max-w-[466px] aspect-[466/181] mx-auto bg-[#D8D6D7] border-[1.5px] border-black flex items-center justify-center relative shadow-inner overflow-hidden">
                          {blog.imageUrl ? (
                            <img
                              src={blog.imageUrl}
                              alt={blog.title}
                              className="w-full h-full object-cover"
                            />
                          ) : blog.icon === "terminal" ? (
                            <span className="font-mono text-5xl font-bold text-[#1E1E1E] tracking-tighter select-none">&gt;_</span>
                          ) : (
                            <Cpu className="w-12 h-12 text-[#1E1E1E]" strokeWidth={2.5} />
                          )}
                        </div>

                        <div className="flex flex-col mt-4 px-0 sm:px-4">
                          <div className="px-4 py-0.5 bg-[#060606] text-white text-[16px] font-bebas tracking-wider rounded-[50px] w-fit">
                            {blog.category}
                          </div>
                          <h3 className="font-bebas text-[#000000] text-[30px] sm:text-[32px] leading-[36px] sm:leading-[38px] tracking-wide uppercase mt-2 line-clamp-2 select-text">
                            {blog.title}
                          </h3>
                          <p className="text-[#6F6F6F] font-bebas text-[14px] leading-[17px] mt-1 select-text line-clamp-3">
                            {blog.about}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end px-0 sm:px-4 mb-2">
                        <button
                          onClick={() => router.push(`/blogs/${slugify(blog.title)}`)}
                          className="px-[18px] py-[6px] bg-[#060606] text-white font-bebas text-[16px] leading-[19px] rounded-[50px] hover:bg-[#1C1C1C] transition-all duration-300"
                        >
                          READ MORE
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {visibleCount < standardBlogs.length && (
                <div className="flex justify-center mb-20">
                  <button
                    onClick={handleLoadMore}
                    className="w-[224px] h-[55px] bg-[#FEFED7]/93 text-[#2C2C2C] font-sans font-bold text-[20px] leading-none rounded-[70px] hover:bg-[#FEFED7] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center shadow-lg cursor-pointer"
                  >
                    LOAD MORE
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
      {/* Footer component */}
      <Footer />
    </>
  );
}
