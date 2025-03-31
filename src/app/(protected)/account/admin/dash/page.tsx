import { getUserOrRedirect, isUserAdmin } from "@/lib/auth";
import { DashboardService } from "@/services";
import { startOfDay, startOfMonth, startOfWeek, startOfYear } from "date-fns";
import { ActivityIcon, UserRoundPlus } from "lucide-react";
import { redirect } from "next/navigation";
import { DashCard } from "./components/dash-card";
import { UsersTable } from "./components/users-table";

export default async function AdminDashPage() {
  const user = await getUserOrRedirect();

  if (!isUserAdmin(user.role)) {
    redirect("/");
  }

  const now = new Date();
  const yearStart = startOfYear(new Date(1970, 0, 1));
  const weekStart = startOfWeek(now);
  const monthStart = startOfMonth(now);
  const dayStart = startOfDay(now);

  const [yearCount, monthCount, weekCount, dayCount] = await Promise.all([
    DashboardService.getRegisteredUsersCount(yearStart, now),
    DashboardService.getRegisteredUsersCount(monthStart, now),
    DashboardService.getRegisteredUsersCount(weekStart, now),
    DashboardService.getRegisteredUsersCount(dayStart, now),
  ]);

  const [activeYearCount, activeMonthCount, activeWeekCount, activeDayCount] =
    await Promise.all([
      DashboardService.getActiveUsersCount(yearStart, now),
      DashboardService.getActiveUsersCount(monthStart, now),
      DashboardService.getActiveUsersCount(weekStart, now),
      DashboardService.getActiveUsersCount(dayStart, now),
    ]);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-4 gap-4">
        <DashCard
          title="Today"
          description="registered users"
          icon={<UserRoundPlus />}
        >
          {dayCount}
        </DashCard>
        <DashCard
          title="This week"
          description="registered users"
          icon={<UserRoundPlus />}
        >
          {weekCount}
        </DashCard>
        <DashCard
          title="This month"
          description="registered users"
          icon={<UserRoundPlus />}
        >
          {monthCount}
        </DashCard>
        <DashCard
          title="All time"
          description="registered users"
          icon={<UserRoundPlus />}
        >
          {yearCount}
        </DashCard>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <DashCard
          title="Today"
          description="active users"
          icon={<ActivityIcon />}
        >
          {activeDayCount}
        </DashCard>
        <DashCard
          title="This week"
          description="active users"
          icon={<ActivityIcon />}
        >
          {activeWeekCount}
        </DashCard>
        <DashCard
          title="This month"
          description="active users"
          icon={<ActivityIcon />}
        >
          {activeMonthCount}
        </DashCard>
        <DashCard
          title="All time"
          description="active users"
          icon={<ActivityIcon />}
        >
          {activeYearCount}
        </DashCard>
      </div>

      <UsersTable />
    </div>
  );
}
