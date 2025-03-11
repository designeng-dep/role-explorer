interface CourseBadgeProps {
  type: "bestseller" | "hot" | "highest"
}

export default function CourseBadge({ type }: CourseBadgeProps) {
  const labels = {
    bestseller: "Bestseller",
    hot: "Hot & New",
    highest: "Highest Rated",
  }

  return (
    <span className="inline-block bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded">{labels[type]}</span>
  )
}

