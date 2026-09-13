import { Skeleton } from '@/components/ui/skeleton';

export default function ProjectsLoading() {
  return (
    <main className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <Skeleton className="h-10 w-56" />
        <Skeleton className="mt-3 h-5 w-80 max-w-full" />

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-[19rem] rounded-xl border border-border/50 p-5">
              <div className="mb-4 flex gap-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="mt-2 h-4 w-1/3" />
              <Skeleton className="mt-5 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-5/6" />
              <div className="mt-6 flex gap-2">
                <Skeleton className="h-5 w-14 rounded-full" />
                <Skeleton className="h-5 w-12 rounded-full" />
              </div>
              <Skeleton className="mt-8 h-4 w-24" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
