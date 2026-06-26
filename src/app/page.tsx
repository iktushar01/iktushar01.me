import Navbar from "@/components/modules/homepage/navbar";
import Header from "@/components/modules/homepage/header";
import AboutMe from "@/components/modules/homepage/aboutme";
import Skills from "@/components/modules/homepage/skills";
import Education from "@/components/modules/homepage/education";
import Projects from "@/components/modules/homepage/projects";
import Contact from "@/components/modules/homepage/contactUs";
import Footer from "@/components/modules/homepage/footer";
import Certificates from "@/components/modules/homepage/certificates";
export default function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <AboutMe />
      <Skills />
      <Education />
      <Projects limit={3} showAllButton />
      <Certificates />
      <Contact />
      <Footer />
    </div>
  );
}
