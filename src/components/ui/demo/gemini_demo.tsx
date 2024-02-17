import React from "react";
import { useScroll, useTransform } from "framer-motion";
import { GoogleGeminiEffect } from "../google-gemini-effect";

export function GoogleGeminiEffectDemo() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  // const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  // const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  // const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  // const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  return (
    <div
      className="h-[400vh] bg-black w-full dark:border dark:border-white/[0.1] rounded-md relative overflow-hidden pt-40 "
      ref={ref}
    >
      <GoogleGeminiEffect
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
        title="Connecting educators and learners"
        description="Korsera is a platform that connects educators and learners. We provide a platform for educators to create and sell courses, and for learners to learn from the best educators in the world."
      />
    </div>
  );
}
