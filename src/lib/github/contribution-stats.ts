import type {
  ContributionDay,
  ContributionSummary,
  MonthlyContribution,
  MonthlySummary,
  WeeklyActivityPoint,
} from "@/lib/github/types";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function flattenContributionDays(
  weeks: {
    contributionDays: { date: string; contributionCount: number }[];
  }[]
): ContributionDay[] {
  return weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
    }))
  );
}

export function calculateStreaks(days: ContributionDay[]): {
  currentStreak: number;
  longestStreak: number;
} {
  if (days.length === 0) return { currentStreak: 0, longestStreak: 0 };

  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let longest = 0;
  let current = 0;
  let run = 0;
  let prevDate: Date | null = null;

  for (const day of sorted) {
    if (day.count === 0) {
      run = 0;
      prevDate = null;
      continue;
    }

    const d = new Date(day.date);
    d.setHours(0, 0, 0, 0);

    if (prevDate) {
      const diff = (d.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24);
      run = diff === 1 ? run + 1 : 1;
    } else {
      run = 1;
    }

    longest = Math.max(longest, run);
    prevDate = d;
  }

  const activeDays = sorted.filter((d) => d.count > 0);
  if (activeDays.length > 0) {
    let streak = 0;
    let check = new Date(today);

    const dayMap = new Map(activeDays.map((d) => [d.date, d.count]));

    while (true) {
      const key = check.toISOString().slice(0, 10);
      const count = dayMap.get(key);
      if (count && count > 0) {
        streak++;
        check.setDate(check.getDate() - 1);
      } else if (streak === 0) {
        check.setDate(check.getDate() - 1);
        const yesterday = check.toISOString().slice(0, 10);
        if (dayMap.get(yesterday)) {
          continue;
        }
        break;
      } else {
        break;
      }

      if (streak > 400) break;
    }
    current = streak;
  }

  return { currentStreak: current, longestStreak: longest };
}

export function getWeeklyActivity(
  days: ContributionDay[],
  weekCount = 12
): WeeklyActivityPoint[] {
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  const recent = sorted.slice(-weekCount * 7);

  const buckets: WeeklyActivityPoint[] = [];
  for (let i = 0; i < recent.length; i += 7) {
    const slice = recent.slice(i, i + 7);
    if (slice.length === 0) continue;

    const commits = slice.reduce((sum, d) => sum + d.count, 0);
    const start = new Date(slice[0].date);
    const label = start.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    buckets.push({
      week: slice[0].date,
      commits,
      label,
    });
  }

  return buckets.slice(-weekCount);
}

export function getMonthlyContributions(
  days: ContributionDay[]
): MonthlyContribution[] {
  const year = new Date().getFullYear();
  const monthly = Array.from({ length: 12 }, (_, i) => ({
    month: MONTH_NAMES[i],
    monthIndex: i,
    commits: 0,
  }));

  for (const day of days) {
    const d = new Date(day.date);
    if (d.getFullYear() !== year) continue;
    monthly[d.getMonth()].commits += day.count;
  }

  return monthly.filter((m) => m.commits > 0);
}

export function getContributionSummary(
  days: ContributionDay[]
): ContributionSummary {
  const year = new Date().getFullYear();
  const thisYearDays = days.filter(
    (d) => new Date(d.date).getFullYear() === year
  );
  const thisYearContributions = thisYearDays.reduce(
    (sum, d) => sum + d.count,
    0
  );

  const weeksWithData = Math.max(1, Math.ceil(thisYearDays.length / 7));
  const averagePerWeek = Math.round(thisYearContributions / weeksWithData);

  const monthly = getMonthlyContributions(days);
  const mostActive =
    monthly.length > 0
      ? monthly.reduce((a, b) => (b.commits > a.commits ? b : a)).month
      : "—";

  const { currentStreak, longestStreak } = calculateStreaks(days);

  return {
    thisYearContributions,
    averagePerWeek,
    mostActiveMonth: mostActive,
    currentStreak,
    longestStreak,
  };
}

export function getMonthlySummary(
  days: ContributionDay[]
): MonthlySummary {
  const year = new Date().getFullYear();
  const monthly = getMonthlyContributions(days);

  if (monthly.length === 0) {
    return {
      mostProductiveMonth: "—",
      averageMonthlyCommits: 0,
      yearlyGrowthPercent: 0,
    };
  }

  const mostProductive = monthly.reduce((a, b) =>
    b.commits > a.commits ? b : a
  );
  const averageMonthlyCommits = Math.round(
    monthly.reduce((s, m) => s + m.commits, 0) / monthly.length
  );

  const lastYearDays = days.filter(
    (d) => new Date(d.date).getFullYear() === year - 1
  );
  const thisYearTotal = days
    .filter((d) => new Date(d.date).getFullYear() === year)
    .reduce((s, d) => s + d.count, 0);
  const lastYearTotal = lastYearDays.reduce((s, d) => s + d.count, 0);

  const yearlyGrowthPercent =
    lastYearTotal > 0
      ? Math.round(((thisYearTotal - lastYearTotal) / lastYearTotal) * 100)
      : thisYearTotal > 0
        ? 100
        : 0;

  return {
    mostProductiveMonth: mostProductive.month,
    averageMonthlyCommits,
    yearlyGrowthPercent,
  };
}
