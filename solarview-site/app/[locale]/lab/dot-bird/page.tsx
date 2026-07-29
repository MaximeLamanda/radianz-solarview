import { DotBirdFlight } from "@/components/dot-bird-flight";

export default function DotBirdLabPage() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-[#1a2250] p-8">
      <DotBirdFlight size="min(100%, 28rem)" fit="stage" className="mx-auto" />
    </main>
  );
}
