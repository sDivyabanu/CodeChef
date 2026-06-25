// Mock Blog Data

export interface BlogPost {
  id: string;
  category: string;
  title: string;
  date: string;
  about: string;
  content: string;
  icon: "terminal" | "cpu";
}

export const ALL_BLOGS_DATA: BlogPost[] = [
  {
    id: "featured-1",
    category: "ALGORITHMS AND DATA STRUCTURES",
    title: "MASTER COMPETITIVE PROGRAMMING",
    date: "2026-06-20",
    about: "Your complete roadmap from a beginner coder to a seasoned competitor in CodeChef contests.",
    content: "Competitive programming is a mind sport that tests your coding speed, logical skills, and algorithm knowledge. This blog walks through the step-by-step roadmap to master data structures, learn complex algorithms, and optimize time complexity to rank higher in global leaderboards.\n\nTo master competitive programming, consistency is key. Start by learning a language like C++ or Java, then dive deep into Arrays, Linked Lists, Stacks, Queues, and Trees. Once comfortable, explore advanced algorithms like Dijkstra's, Segment Trees, and Dynamic Programming. Competing in short contests like CodeChef Starters will sharpen your skills under pressure and build logical intuition.",
    icon: "cpu",
  },
  {
    id: "blog-1",
    category: "WEB",
    title: "RUST FOR WEB DEVELOPMENT: WHY IT MATTERS?",
    date: "2026-06-15",
    about: "SAFETY SPEED AND CONCURRENCY. DISCOVER WHY INDUSTRY CHHOSING RUST.",
    content: "Rust is taking the web development ecosystem by storm. With its memory safety guarantees, zero-cost abstractions, and fearless concurrency, it provides unparalleled speed and security. Learn how frameworks like Actix-web and Axum are reshaping high-performance web servers.\n\nUnlike traditional interpreted languages or runtime-heavy frameworks, Rust compiles directly to native machine code without a garbage collector. This results in minimal memory footprints and blazing-fast response times. The borrow checker ensures data races are caught at compile time, guaranteeing thread-safe concurrency that can handle millions of active requests efficiently.",
    icon: "terminal",
  },
  {
    id: "blog-2",
    category: "WEB",
    title: "RUST FOR WEB DEVELOPMENT: WHY IT MATTERS?",
    date: "2026-06-10",
    about: "SAFETY SPEED AND CONCURRENCY. DISCOVER WHY INDUSTRY CHHOSING RUST.",
    content: "Hardware layouts significantly impact execution speeds. In competitive programming, a cache miss can be the difference between an Accepted solution and a Time Limit Exceeded error. We dive into cache lines, spatial locality, and how array traversal orders affect cache utilization.\n\nModern CPUs access cache memory orders of magnitude faster than system RAM. Writing cache-friendly code means keeping data contiguous. For example, traversing nested arrays row-by-row utilizes cache lines effectively (spatial locality), whereas traversing column-by-column causes constant cache misses and degrades performance significantly.",
    icon: "cpu",
  },
  {
    id: "blog-3",
    category: "WEB",
    title: "RUST FOR WEB DEVELOPMENT: WHY IT MATTERS?",
    date: "2026-06-05",
    about: "SAFETY SPEED AND CONCURRENCY. DISCOVER WHY INDUSTRY CHHOSING RUST.",
    content: "HTTP/3 represents a major shift from TCP to UDP-based QUIC. By doing so, it eliminates head-of-line blocking at the transport layer, allows connection migration across networks without reconnecting, and secures handshakes in a single round-trip. Discover how this impacts modern web applications.\n\nBy building on top of UDP, QUIC manages its own packet delivery mechanism. When packet loss occurs on a connection, only the affected stream is paused while other streams continue loading, preventing the TCP head-of-line block. Connection migration also allows your mobile device to switch from Wi-Fi to cellular data seamlessly without dropping your active websocket streams or file downloads.",
    icon: "terminal",
  },
  {
    id: "blog-4",
    category: "WEB",
    title: "RUST FOR WEB DEVELOPMENT: WHY IT MATTERS?",
    date: "2026-06-01",
    about: "SAFETY SPEED AND CONCURRENCY. DISCOVER WHY INDUSTRY CHHOSING RUST.",
    content: "Choosing a database depends on schema stability, scale vector, and transactional guarantees. This article compares Relational Databases (like PostgreSQL) with Document Stores (like MongoDB), mapping out their trade-offs in consistency, scalability, and querying convenience.\n\nRelational databases excel when schemas are rigid and complex joins or strict ACID compliance is required. NoSQL databases, on the other hand, shine in handling unstructured data and scaling horizontally across multiple shards. Choose SQL for financial transactions and structured platforms, and NoSQL for rapid iteration, real-time analytics, or high-volume logging systems.",
    icon: "cpu",
  },
];

// Helper
export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};
