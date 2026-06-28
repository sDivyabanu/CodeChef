export default function Marquee() {
  return (
    <div className="bg-[#ECE9C7] overflow-hidden border-y-2 border-black py-3">
      <div className="animate-marquee flex whitespace-nowrap">
        {Array.from({ length: 16 }).map((_, i) => (
          <span
            key={i}
            className="text-black text-3xl tracking-widest mx-8 select-none"
            style={{ fontFamily: "Bebas Neue" }}
          >
            JOIN US MARQUEE!!! &nbsp;&nbsp;&nbsp; ✦
          </span>
        ))}
      </div>
    </div>
  );
}