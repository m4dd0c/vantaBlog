import BlogList from "@/components/blog/blog-list";
import SearchAndFilter from "@/components/blog/search-and-filter";

export const metadata = {
  title: "Blog - ModernBlog",
  description: "Explore all stories and articles on ModernBlog",
};

export default function BlogPage() {
  return (
    <div className="container py-8 mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">All Stories</h1>
        <p className="text-muted-foreground">
          Discover amazing content from our community of writers
        </p>
      </div>

      <SearchAndFilter />
      <BlogList />
    </div>
  );
}
