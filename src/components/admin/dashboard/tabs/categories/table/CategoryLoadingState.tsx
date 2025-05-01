
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export const CategoryLoadingState = () => {
  return (
    <>
      <div className="flex justify-between mb-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-28" />
      </div>
      <div className="border rounded-md overflow-hidden">
        <div className="bg-muted/50 p-3">
          <div className="grid grid-cols-7 gap-4">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <Skeleton key={i} className="h-6" />
            ))}
          </div>
        </div>
        <div className="divide-y">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="p-4">
              <div className="grid grid-cols-7 gap-4">
                {[1, 2, 3, 4, 5, 6, 7].map((j) => (
                  <Skeleton key={j} className="h-8" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
