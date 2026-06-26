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
import { getGitHubJourneyData } from "@/lib/github/get-github-journey";
import {
  fetchActivities,
  fetchCertificates,
  fetchProjects,
} from "@/lib/api/portfolio";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [projects, certificates, activities, latestPosts, githubResult] =
    await Promise.all([
      fetchProjects(),
      fetchCertificates(),
      fetchActivities(),
      getLatestPosts(4),
      getGitHubJourneyData()
        .then((data) => ({ data, error: null as string | null }))
        .catch((err: unknown) => ({
          data: null,
          error:
            err instanceof Error ? err.message : "Failed to load GitHub data",
        })),
    ]);

  return (
    <div>
      <Navbar />
      <Header />
      <AboutMe />
      <Skills />
      <Education />
      <Projects projects={projects} limit={3} showAllButton />
      <Certificates certificates={certificates} />
      <Activities activities={activities} />
      <GitHubJourney data={githubResult.data} errorMessage={githubResult.error} />
      <LatestBlogs posts={latestPosts} limit={4} />
      <Contact />
      <Footer />
    </div>
  );
}
