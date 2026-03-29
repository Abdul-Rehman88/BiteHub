function CardSkeleton() {
  return (
    <div className="w-full h-[215px] md:h-60 lg:h-[290px] relative overflow-hidden rounded-md shadow-sm">
      
      {/* image placeholder */}
      <div className="w-full h-full animate-shimmer" />

      {/* price tag placeholder */}
      <div className="absolute top-3 right-3 z-30 w-16 h-7 rounded-full animate-shimmer" />

      {/* text area placeholder */}
      <div className="absolute top-[50%] md:top-[42%] lg:top-[75%] w-full h-full left-0 z-20 flex flex-col gap-2 px-2 py-2 md:py-2 lg:py-3 bg-gray-900/20 backdrop-blur-xs lg:backdrop-blur-sm">
        
        {/* title placeholder */}
        <div className="w-3/4 h-5 md:h-6 lg:h-7 mx-auto rounded animate-shimmer" />

        {/* description placeholder */}
        <div className="w-full h-4 mx-auto rounded animate-shimmer" />
        <div className="w-2/3 h-4 mx-auto rounded animate-shimmer" />

        {/* button placeholder */}
        <div className="w-full h-8 lg:h-9 mt-1 lg:mt-3 rounded-md animate-shimmer" />

      </div>
    </div>
  );
}

export default CardSkeleton;