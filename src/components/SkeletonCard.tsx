export const CookbookSkeleton = () => {
  return (
    <div className="cookbook-card animate-pulse">
      <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      <div className="absolute top-3 right-3 w-6 h-6 bg-gray-300 rounded-full"></div>
    </div>
  );
};

export const RecipeSkeleton = () => {
  return (
    <div className="recipe-card animate-pulse">
      <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      <div className="absolute top-3 right-3 w-6 h-6 bg-gray-300 rounded-full"></div>
    </div>
  );
};

export const SkeletonGrid = ({ count = 6, type = "cookbook" }: { count?: number; type?: "cookbook" | "recipe" }) => {
  const SkeletonComponent = type === "cookbook" ? CookbookSkeleton : RecipeSkeleton;
  
  return (
    <div className="grid grid-cols-2 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonComponent key={index} />
      ))}
    </div>
  );
};
