"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FileText, FolderKanban, Award, Sparkles, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getMe, logoutAdmin } from "@/lib/api/admin";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/certificates", label: "Certificates", icon: Award },
  { href: "/admin/activities", label: "Activities", icon: Sparkles },
  { href: "/admin/blogs", label: "Blogs", icon: FileText },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (pathname === "/admin/login") {
      setLoading(false);
      return;
    }

    getMe()
      .then((res) => {
        const user = res.data as { role?: string; name?: string; email?: string } | undefined;
        const role = user?.role;
        if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
          router.replace("/admin/login");
          return;
        }
        setUserName(user?.name || user?.email || "Admin");
        setLoading(false);
      })
      .catch(() => {
        router.replace("/admin/login");
      });
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground">
        Loading admin...
      </div>
    );
  }

  const handleLogout = async () => {
    await logoutAdmin().catch(() => undefined);
    router.replace("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <aside className="w-64 border-r border-border p-4 flex flex-col gap-6">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Portfolio</p>
          <h1 className="text-lg font-semibold">Admin Panel</h1>
          <p className="text-xs text-muted-foreground mt-1">{userName}</p>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 text-sm border border-transparent",
                  active && "border-border bg-muted"
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Button variant="outline" className="mt-auto justify-start" onClick={handleLogout}>
          <LogOut className="size-4" />
          Logout
        </Button>
      </aside>

      <main className="flex-1 p-6 sm:p-8 overflow-auto">{children}</main>
    </div>
  );
}
