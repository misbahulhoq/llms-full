import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/constants";

type Props = {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
};

const CategoryFilter = (props: Props) => {
  const { activeCategory, setActiveCategory } = props;

  return (
    <div className="mb-5">
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;

          return (
            <Button
              key={cat.id}
              variant={isActive ? "default" : "outline"}
              size="sm"
              className={`gap-1.5 rounded-full text-xs h-8 ${
                isActive
                  ? "bg-blue-50 dark:bg-blue-950 text-blue-700 border-blue-200"
                  : "border-foreground/30 text-gray-600"
              }`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <Icon className="h-3.5 w-3.5" />
              {cat.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
