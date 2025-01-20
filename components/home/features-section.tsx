import { Shield, Edit, Search, Moon, Smartphone, Globe } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure Authentication",
    description:
      "Rock-solid security with Clerk authentication. Your data is protected with enterprise-grade security.",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900",
  },
  {
    icon: Edit,
    title: "Easy Publishing",
    description:
      "Create and edit posts with our intuitive editor. Focus on writing while we handle the rest.",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900",
  },
  {
    icon: Search,
    title: "Powerful Search",
    description:
      "Find exactly what you're looking for with our advanced search and filtering capabilities.",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900",
  },
  {
    icon: Moon,
    title: "Dark Mode",
    description:
      "Switch between light and dark themes for the perfect reading experience any time of day.",
    color: "text-yellow-600 dark:text-yellow-400",
    bgColor: "bg-yellow-100 dark:bg-yellow-900",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description:
      "Fully responsive design that works beautifully on all devices, from phones to desktops.",
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-100 dark:bg-red-900",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "Share your stories with readers around the world. No boundaries, just pure storytelling.",
    color: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-100 dark:bg-indigo-900",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything You Need to Blog
          </h2>
          <p className="mb-12 text-lg text-muted-foreground">
            ModernBlog comes packed with features designed to make your writing
            experience seamless and enjoyable.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg border bg-background p-6 transition-all hover:shadow-lg"
            >
              <div className="flex items-center space-x-4">
                <div className={`rounded-full p-3 ${feature.bgColor}`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">
                    {feature.title}
                  </h3>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
