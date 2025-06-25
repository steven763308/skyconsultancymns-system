"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isLoginPage = pathname.startsWith("/");
    const loggedIn = localStorage.getItem("sky_logged_in");

    if (!loggedIn && !isLoginPage) {
      router.push("/");
    }
  }, [pathname]);

  return <>{children}</>;
}
