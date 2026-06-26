import { ActivityFormPage } from "../page";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditActivityPage({ params }: PageProps) {
  const { slug } = await params;
  return <ActivityFormPage slug={slug} />;
}
