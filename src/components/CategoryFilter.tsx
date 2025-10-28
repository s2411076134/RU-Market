import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const categories = [
  { name: "All", slug: "all" },
  { name: "Mobile", slug: "mobile" },
  { name: "Laptop", slug: "laptop" },
  { name: "Tablet", slug: "tablet" },
  { name: "Desktop", slug: "desktop" },
  { name: "Camera", slug: "camera" },
  { name: "Headphone", slug: "headphone" },
  { name: "Smart Watch", slug: "smart-watch" },
  { name: "Refrigerator", slug: "refrigerator" },
  { name: "Furniture", slug: "furniture" },
  { name: "Cycle", slug: "cycle" },
  { name: "Book", slug: "book" },
  { name: "Stationery", slug: "stationery" },
  { name: "Sports Item", slug: "sports-item" },
  { name: "Kitchen Item", slug: "kitchen-item" },
  { name: "Beauty Product", slug: "beauty-product" },
  { name: "Home Decor", slug: "home-decor" },
  { name: "Electronics", slug: "electronics" },
];

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex gap-2 pb-4">
        {categories.map((category) => (
          <Button
            key={category.slug}
            variant={selectedCategory === category.slug ? "default" : "outline"}
            onClick={() => onCategoryChange(category.slug)}
            className="flex-shrink-0"
          >
            {category.name}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
