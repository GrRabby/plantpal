import { cn } from "@/lib/utils";

const tones: Record<string, string> = {
  canopy: "bg-canopy text-paper",
  clay: "bg-clay text-paper",
  sand: "bg-sand text-ink",
  outline: "border border-ink/15 text-ink/70",
};

export const Badge = ({
  children,
  tone = "sand",
  className,
}: {
  children: React.ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) => (
  <span
    className={cn(
      "nursery-tag inline-flex items-center gap-1 rounded-tag px-2 py-1",
      tones[tone],
      className
    )}
  >
    {children}
  </span>
);
