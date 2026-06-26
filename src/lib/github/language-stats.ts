import type { LanguageStat } from "@/lib/github/types";

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  "C#": "#178600",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Shell: "#89e051",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
};

export function aggregateLanguages(
  repos: {
    languages: {
      edges: { size: number; node: { name: string; color: string | null } }[];
    };
  }[]
): LanguageStat[] {
  const totals = new Map<string, { lines: number; color: string }>();

  for (const repo of repos) {
    for (const edge of repo.languages.edges) {
      const name = edge.node.name;
      const existing = totals.get(name);
      totals.set(name, {
        lines: (existing?.lines ?? 0) + edge.size,
        color:
          edge.node.color ||
          LANGUAGE_COLORS[name] ||
          existing?.color ||
          "#8b8b8b",
      });
    }
  }

  const totalLines = [...totals.values()].reduce((s, v) => s + v.lines, 0);
  if (totalLines === 0) return [];

  return [...totals.entries()]
    .map(([name, { lines, color }]) => ({
      name,
      lines,
      color,
      percentage: Math.round((lines / totalLines) * 100),
    }))
    .sort((a, b) => b.lines - a.lines)
    .slice(0, 8);
}
