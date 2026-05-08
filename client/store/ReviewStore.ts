import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Review } from "@/lib/types";

interface ReviewStore {
  reviews: Review[];
  current: Review | null;

  addReview: (r: Review) => void;
  setCurrent: (r: Review | null) => void;

  clearAll: () => void;
}

export const useReviewStore = create<ReviewStore>()(
  persist(
    (set) => ({
      reviews: [],
      current: null,

      addReview: (r) =>
        set((s) => ({
          reviews: [r, ...s.reviews].slice(0, 50),
        })),

      setCurrent: (r) =>
        set({
          current: r,
        }),

      clearAll: () =>
        set({
          reviews: [],
          current: null,
        }),
    }),
    {
      name: "review-store",
    }
  )
);