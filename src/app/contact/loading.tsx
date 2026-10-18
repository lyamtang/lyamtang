import { Skeleton } from '@/components/ui/skeleton';

export default function ContactLoading() {
  return (
    <main className="bg-background px-4 pb-12 pt-4 sm:px-6 sm:pb-16 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100svh-11rem)] max-w-7xl lg:grid-cols-2">
        <div className="order-2 py-12 sm:py-16 lg:order-2 lg:pl-16">
          <Skeleton className="h-3 w-36" />
          <Skeleton className="mt-5 h-12 w-72 max-w-full" />
          <Skeleton className="mt-4 h-5 w-full max-w-md" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
          </div>
          <Skeleton className="mt-5 h-16" />
          <Skeleton className="mt-5 h-48" />
        </div>
        <div className="order-1 py-12 sm:py-16 lg:order-1 lg:pr-16">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="mt-5 h-10 w-64" />
          <Skeleton className="mt-4 h-5 w-full max-w-sm" />
          <Skeleton className="mx-auto mt-12 h-56 w-72 rounded-2xl" />
        </div>
      </div>
    </main>
  );
}
