"use client";

import { useMemo } from "react";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Leaf, Star, DollarSign, PlusCircle } from "lucide-react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useSession } from "@/lib/auth-client";
import { useMyPlants } from "@/hooks/usePlants";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";

function DashboardContent() {
  const { data: session } = useSession();
  const { data: plants, isLoading } = useMyPlants();

  const stats = useMemo(() => {
    if (!plants) return null;
    const totalValue = plants.reduce((sum, p) => sum + p.price, 0);
    const avgRating = plants.length
      ? plants.reduce((sum, p) => sum + p.rating, 0) / plants.filter((p) => p.rating > 0).length || 0
      : 0;
    const active = plants.filter((p) => p.status === "Active").length;

    const byCategory = plants.reduce<Record<string, number>>((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});

    const chartData = Object.entries(byCategory).map(([category, count]) => ({ category, count }));

    return { totalValue, avgRating, active, chartData };
  }, [plants]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="nursery-tag text-moss">Your dashboard</p>
          <h1 className="mt-1 font-display text-3xl font-semibold text-ink">
            Welcome back, {session?.user.name.split(" ")[0]}
          </h1>
        </div>
        <Link href="/plants/add">
          <Button size="sm">
            <PlusCircle size={16} /> Add plant
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={Leaf} label="Active listings" value={stats ? String(stats.active) : "—"} />
        <StatCard icon={DollarSign} label="Total listed value" value={stats ? formatPrice(stats.totalValue) : "—"} />
        <StatCard icon={Star} label="Average rating" value={stats && stats.avgRating > 0 ? stats.avgRating.toFixed(1) : "No ratings yet"} />
      </div>

      <div className="mt-8 rounded-card border border-sand bg-white p-6 shadow-card">
        <h2 className="font-display text-xl font-semibold text-ink">Listings by category</h2>
        {isLoading && <p className="mt-4 text-sm text-ink/50">Loading…</p>}
        {stats && stats.chartData.length === 0 && (
          <p className="mt-4 text-sm text-ink/50">List a plant to see your stats here.</p>
        )}
        {stats && stats.chartData.length > 0 && (
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E1D3" />
                <XAxis dataKey="category" tick={{ fontSize: 12, fill: "#1B1F17" }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: "#1B1F17" }} />
                <Tooltip contentStyle={{ borderRadius: 10, borderColor: "#E4E1D3" }} />
                <Bar dataKey="count" fill="#24402A" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

const StatCard = ({ icon: Icon, label, value }: { icon: typeof Leaf; label: string; value: string }) => (
  <div className="flex items-center gap-4 rounded-card border border-sand bg-white p-5 shadow-card">
    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-moss/15 text-canopy">
      <Icon size={18} />
    </span>
    <div>
      <p className="text-xs text-ink/50">{label}</p>
      <p className="font-display text-xl font-semibold text-ink">{value}</p>
    </div>
  </div>
);

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
