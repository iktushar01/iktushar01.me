import { BlogFormPage } from "../page";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: PageProps) {
  const { id } = await params;
  return <BlogFormPage id={id} />;
}
