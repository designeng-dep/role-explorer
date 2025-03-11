interface StarRatingProps {
  rating: number
  reviewCount: number
}

export default function StarRating({ rating, reviewCount }: StarRatingProps) {
  // Convert rating to stars (e.g. 4.8 -> 4 full stars, 1 half star)
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  return (
    <div className="flex items-center gap-1">
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-lg">
            {i < fullStars ? "★" : i === fullStars && hasHalfStar ? "★" : "☆"}
          </span>
        ))}
      </div>
      <span className="text-lg font-medium">{rating}</span>
      <span className="text-muted-foreground">({reviewCount.toLocaleString()})</span>
    </div>
  )
}

