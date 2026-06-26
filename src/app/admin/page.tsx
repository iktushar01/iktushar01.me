"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { getDashboardStats } from "@/lib/api/admin";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    projects: 0,
    certificates: 0,
    activities: 0,
    blogs: 0,
    drafts: 0,
  });

  useEffect(() => {
    getDashboardStats()
      .then((res) => {
        const summary = res.data?.portfolioSummary;
        if (!summary) return;

        setStats({
          projects: summary.projects.total,
          certificates: summary.certificates,
          activities: summary.activities,
          blogs: summary.blogs.total,
          drafts: summary.blogs.drafts,
        });
      })
      .catch(() => undefined);
  }, []);

  const cards = [
    { label: "Projects", value: stats.projects, href: "/admin/projects" },
    { label: "Certificates", value: stats.certificates, href: "/admin/certificates" },
    { label: "Activities", value: stats.activities, href: "/admin/activities" },
    { label: "Blog Posts", value: stats.blogs, href: "/admin/blogs" },
    { label: "Draft Blogs", value: stats.drafts, href: "/admin/blogs" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Overview</p>
        <h2 className="text-2xl font-semibold">Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="border border-border p-5 hover:bg-muted transition-colors"
          >
            <p className="text-xs text-muted-foreground">{card.label}</p>
            <p className="text-3xl font-semibold mt-2">{card.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
