import { Skeleton } from '@/components/ui/skeleton';

export default function ContactLoading() {
  return (
    <main className="bg-muted/30 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <Skeleton className="h-10 w-52" />
        <Skeleton className="mt-3 h-5 w-96 max-w-full" />

        <div className="mt-10 rounded-[28px] border p-6 sm:p-8">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="mt-3 h-4 w-80 max-w-full" />
          <Skeleton className="mt-8 h-14 w-full rounded-xl" />
          <Skeleton className="mt-3 h-14 w-full rounded-xl" />
          <Skeleton className="mt-3 h-14 w-full rounded-xl" />
        </div>
      </div>
    </main>
  );
}
