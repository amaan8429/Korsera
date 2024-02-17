"use client";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "Our ",
    },
    {
      text: "teachers",
    },
    {
      text: "are",
    },
    {
      text: "from",
    },
    {
      text: "the",
    },
    {
      text: "future",
    },
    {
      text: "- Korsera",
      className: "text-primary dark:text-primary-400",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem] bg-black ">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        The road to freedom starts from here
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <button className="w-40 h-10 rounded-xl bg-primary text-primary-foreground text-md">
          Join now
        </button>
        <button className="w-40 h-10 rounded-xl bg-white text-black text-md">
          Login
        </button>
      </div>
    </div>
  );
}
