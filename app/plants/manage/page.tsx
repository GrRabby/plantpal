"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Eye, Trash2, PlusCircle, Loader2 } from "lucide-react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useDeletePlant, useMyPlants } from "@/hooks/usePlants";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatPrice, formatDate } from "@/lib/utils";

function ManageContent() {
  const { data: plants, isLoading } = useMyPlants();
  const deletePlant = useDeletePlant();
  const [pendingId, setPendingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this listing? This can't be undone.")) return;
    setPendingId(id);
    await deletePlant.mutateAsync(id);
    setPendingId(null);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="nursery-tag text-moss">Your listings</p>
          <h1 className="mt-1 font-display text-3xl font-semibold text-ink">Manage plants</h1>
        </div>
        <Link href="/plants/add">
          <Button size="sm">
            <PlusCircle size={16} /> Add plant
          </Button>
        </Link>
      </div>

      {isLoading && (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-canopy" size={26} />
        </div>
      )}

      {plants && plants.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-card border border-dashed border-sand bg-white/50 py-20 text-center">
          <p className="text-ink/60">You haven&apos;t listed any plants yet.</p>
          <Link href="/plants/add" className="mt-3">
            <Button size="sm">List your first plant</Button>
          </Link>
        </div>
      )}

      {plants && plants.length > 0 && (
        <div className="overflow-hidden rounded-card border border-sand bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-sand bg-sand/40 text-xs uppercase tracking-wide text-ink/50">
              <tr>
                <th className="px-4 py-3">Plant</th>
                <th className="hidden px-4 py-3 sm:table-cell">Price</th>
                <th className="hidden px-4 py-3 md:table-cell">Status</th>
                <th className="hidden px-4 py-3 lg:table-cell">Listed</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {plants.map((plant) => (
                <tr key={plant._id} className="border-b border-sand last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-tag bg-sand">
                        <Image
                          src={plant.images[0] || "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=200&q=60"}
                          alt={plant.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-ink line-clamp-1">{plant.title}</p>
                        <p className="text-xs text-ink/50">{plant.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 font-mono text-ink/80 sm:table-cell">{formatPrice(plant.price)}</td>
                  <td className="hidden px-4 py-3 md:table-cell">
                    <Badge tone={plant.status === "Active" ? "canopy" : "sand"}>{plant.status}</Badge>
                  </td>
                  <td className="hidden px-4 py-3 text-ink/50 lg:table-cell">{formatDate(plant.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/plants/${plant._id}`}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-ink/60 hover:bg-sand"
                        aria-label="View plant"
                      >
                        <Eye size={15} />
                      </Link>
                      <button
                        onClick={() => handleDelete(plant._id)}
                        disabled={pendingId === plant._id}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-ink/60 hover:bg-clay/10 hover:text-clay disabled:opacity-40"
                        aria-label="Delete plant"
                      >
                        {pendingId === plant._id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function ManagePlantsPage() {
  return (
    <ProtectedRoute>
      <ManageContent />
    </ProtectedRoute>
  );
}
