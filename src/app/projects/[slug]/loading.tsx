import { Skeleton } from '@/components/ui/skeleton';

export default function ProjectDetailLoading() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
      <Skeleton className="mb-8 h-5 w-32" />
      <Skeleton className="h-4 w-40" />
      <Skeleton className="mt-3 h-12 w-3/4" />
      <Skeleton className="mt-4 h-5 w-full" />
      <Skeleton className="mt-2 h-5 w-5/6" />

      <div className="mt-10">
        <Skeleton className="aspect-video w-full rounded-xl" />
      </div>

      <div className="mt-10 rounded-xl border p-6">
        <Skeleton className="h-6 w-52" />
        <Skeleton className="mt-4 h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-11/12" />
        <Skeleton className="mt-2 h-4 w-10/12" />
      </div>
    </main>
  );
}
