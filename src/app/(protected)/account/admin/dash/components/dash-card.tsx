import { PropsWithChildren } from "react";

type Props = {
  title: string;
  icon?: React.ReactNode;
  description?: string;
};

export function DashCard({
  title,
  icon,
  description,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
        <h3 className="text-sm font-medium tracking-tight">{title}</h3>
        {icon}
      </div>
      <div className="p-6 pt-0">
        <div className="text-2xl font-bold">{children}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
