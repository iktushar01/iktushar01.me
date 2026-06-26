import { ProjectFormPage } from "../page";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: PageProps) {
  const { id } = await params;
  return <ProjectFormPage id={id} />;
}
