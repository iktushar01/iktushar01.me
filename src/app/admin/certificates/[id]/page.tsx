import { CertificateFormPage } from "../page";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCertificatePage({ params }: PageProps) {
  const { id } = await params;
  return <CertificateFormPage id={id} />;
}
