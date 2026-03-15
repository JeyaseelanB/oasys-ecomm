"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CompassionateAppointmentPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/personnel/human-resource/recruitment-process/compassionate-appointment/list");
  }, [router]);
  return null;
}
