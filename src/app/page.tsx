import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <Button>Click me</Button>
        </div>
      </div>
    </div>
  );
}
