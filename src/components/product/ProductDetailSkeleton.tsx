
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const ProductDetailSkeleton = () => {
  return (
    <>
      <Header />
      <main className="pt-24 px-4 container mx-auto max-w-7xl">
        <div className="animate-pulse mt-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-2/3">
              <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-800 rounded-lg mb-4"></div>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square bg-gray-200 dark:bg-gray-800 rounded"></div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/3 space-y-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
              <div className="h-24 bg-gray-200 dark:bg-gray-800 rounded"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded"></div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
