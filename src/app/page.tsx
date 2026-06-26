import Navbar from "@/components/modules/homepage/navbar";
import Header from "@/components/modules/homepage/header";
import AboutMe from "@/components/modules/homepage/aboutme";
import Skills from "@/components/modules/homepage/skills";
import Education from "@/components/modules/homepage/education";
import Projects from "@/components/modules/homepage/projects";
import Contact from "@/components/modules/homepage/contactUs";
import Footer from "@/components/modules/homepage/footer";
import Certificates from "@/components/modules/homepage/certificates";
import Activities from "@/components/modules/homepage/activities";
import LatestBlogs from "@/components/modules/homepage/latest-blogs";
import GitHubJourney from "@/components/modules/homepage/github-journey";
import { getLatestPosts } from "@/lib/blog";

export default function Home() {
  const latestPosts = getLatestPosts(4);

  return (
    <div>
      <Navbar />
      <Header />
      <AboutMe />
      <Skills />
      <Education />
      <Projects limit={3} showAllButton />
      <Certificates />
      <Activities />
      <GitHubJourney />
      <LatestBlogs posts={latestPosts} limit={4} />
      <Contact />
      <Footer />
    </div>
  );
}
