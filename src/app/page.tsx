import Navbar from "@/components/modules/homepage/navbar";
import Header from "@/components/modules/homepage/header";
import AboutMe from "@/components/modules/homepage/aboutme";
import Skills from "@/components/modules/homepage/skills";
import Education from "@/components/modules/homepage/education";
export default function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <AboutMe />
      <Skills />
      <Education />
    </div>
  );
}
