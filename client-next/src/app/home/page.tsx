import Footer from "@/components/Footer/Footer";

import JoinUsMarquee from "@/sections/home/JoinUsMarquee";
import Alumni from "@/sections/home/Alumni";
import Video from "@/sections/home/Video";
import Companies from "@/sections/home/Companies";

export default function HomePage() {
  return (
    <>
    <Video />
      

      <JoinUsMarquee />
    

      {/* <Hero /> */}

      <Alumni />
<JoinUsMarquee />
      

      <Companies />

      <Footer />
    </>
  );
}
