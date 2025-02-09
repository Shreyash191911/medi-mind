// medi-mind/src/app/(routes)/medical-analysis/features/telehealth/[doctorId]/page.tsx
import DoctorProfileContent from "../DoctorProfileContent"; 

interface PageProps {
  params: Promise<{ doctorId: string }>;
}

export default async function Page({ params }: PageProps) {
  // Await the params promise to get the actual parameters object
  const resolvedParams = await params;
  const doctorId = resolvedParams.doctorId;
  return <DoctorProfileContent doctorId={doctorId} />;
}
