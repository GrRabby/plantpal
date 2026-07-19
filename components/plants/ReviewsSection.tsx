"use client";

import { useState } from "react";
import { Star, Trash2 } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { useCreateReview, useDeleteReview, useReviews } from "@/hooks/useReviews";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Field";
import { formatDate, cn } from "@/lib/utils";

export const ReviewsSection = ({ plantId }: { plantId: string }) => {
  const { data: session } = useSession();
  const { data: reviews, isLoading } = useReviews(plantId);
  const createReview = useCreateReview(plantId);
  const deleteReview = useDeleteReview(plantId);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(0);

  const alreadyReviewed = reviews?.some((r) => r.userId === session?.user.id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    await createReview.mutateAsync({ rating, comment });
    setComment("");
    setRating(5);
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-ink">
        Reviews {reviews && reviews.length > 0 && <span className="text-ink/40">({reviews.length})</span>}
      </h2>

      {session && !alreadyReviewed && (
        <form onSubmit={handleSubmit} className="mt-4 rounded-card border border-sand bg-white p-4">
          <p className="mb-2 text-sm font-medium text-ink">Leave a review</p>
          <div className="mb-3 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                type="button"
                key={i}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(i)}
                aria-label={`Rate ${i} stars`}
              >
                <Star
                  size={22}
                  className={cn(
                    i <= (hover || rating) ? "fill-clay text-clay" : "fill-transparent text-ink/25"
                  )}
                />
              </button>
            ))}
          </div>
          <Textarea
            placeholder="How is this plant doing for you?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[80px]"
          />
          <Button type="submit" size="sm" className="mt-3" loading={createReview.isPending}>
            Submit review
          </Button>
        </form>
      )}

      <div className="mt-6 space-y-4">
        {isLoading && <p className="text-sm text-ink/50">Loading reviews…</p>}
        {reviews && reviews.length === 0 && (
          <p className="text-sm text-ink/50">No reviews yet — be the first to share your experience.</p>
        )}
        {reviews?.map((review) => (
          <div key={review._id} className="rounded-card border border-sand bg-white p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-ink">{review.userName}</p>
                <div className="mt-1 flex items-center gap-1.5">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        size={13}
                        className={i <= review.rating ? "fill-clay text-clay" : "fill-transparent text-ink/20"}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-ink/40">{formatDate(review.createdAt)}</span>
                </div>
              </div>
              {session?.user.id === review.userId && (
                <button
                  onClick={() => deleteReview.mutate(review._id)}
                  className="text-ink/30 hover:text-clay"
                  aria-label="Delete review"
                >
                  <Trash2 size={15} />
                </button>
              )}
            </div>
            <p className="mt-2 text-sm text-ink/70">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
