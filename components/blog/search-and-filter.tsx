"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";

const categories = [
  "All Categories",
  "Technology",
  "Lifestyle",
  "Business",
  "Health",
  "Travel",
  "Food",
  "Fashion",
  "Sports",
];

export default function SearchAndFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(
    searchParams.get("category") || "All Categories",
  );

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category && category !== "All Categories")
      params.set("category", category);

    router.push(`/blog?${params.toString()}`);
  };

  const handleClear = () => {
    setSearch("");
    setCategory("All Categories");
    router.push("/blog");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search posts by title or content..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyPress}
            className="pl-10"
          />
        </div>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button onClick={handleSearch} className="flex-1 sm:flex-none">
            Search
          </Button>
          <Button variant="outline" onClick={handleClear} size="icon">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
