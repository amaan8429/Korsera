"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        users={users}
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Unleash your skills <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                with Korsera
              </span>
            </h1>
          </>
        }
      />
    </div>
  );
}

export const users = [
  {
    name: "Manu Arora",
    designation: "Founder, Algochurn",
    image: "https://i3.ytimg.com/vi/o2CSJYXJBpc/hqdefault.jpg",
    badge: "Mentor",
  },
  {
    name: "Sarah Singh",
    designation: "Founder, Sarah's Kitchen",
    image: "https://img.youtube.com/vi/c8_tafixiAs/mqdefault.jpg",
    badge: "Mentor",
  },
  {
    name: "John Doe",
    designation: "Software Engineer, Tech Corp",
    image: "https://img.youtube.com/vi/wm5gMKuwSYk/mqdefault.jpg",
    badge: "Mentor",
  },
  {
    name: "Manu Arora",
    designation: "Founder, Algochurn",
    image: "https://i3.ytimg.com/vi/o2CSJYXJBpc/hqdefault.jpg",
    badge: "Mentor",
  },
  {
    name: "Sarah Singh",
    designation: "Founder, Sarah's Kitchen",
    image: "https://img.youtube.com/vi/c8_tafixiAs/mqdefault.jpg",
    badge: "Mentor",
  },
  {
    name: "John Doe",
    designation: "Software Engineer, Tech Corp",
    image: "https://img.youtube.com/vi/wm5gMKuwSYk/mqdefault.jpg",
    badge: "Mentor",
  },
  {
    name: "Manu Arora",
    designation: "Founder, Algochurn",
    image: "https://i3.ytimg.com/vi/o2CSJYXJBpc/hqdefault.jpg",
    badge: "Mentor",
  },
  {
    name: "Sarah Singh",
    designation: "Founder, Sarah's Kitchen",
    image: "https://img.youtube.com/vi/c8_tafixiAs/mqdefault.jpg",
    badge: "Mentor",
  },
  {
    name: "John Doe",
    designation: "Software Engineer, Tech Corp",
    image: "https://img.youtube.com/vi/wm5gMKuwSYk/mqdefault.jpg",
    badge: "Mentor",
  },
  {
    name: "Manu Arora",
    designation: "Founder, Algochurn",
    image: "https://i3.ytimg.com/vi/o2CSJYXJBpc/hqdefault.jpg",
    badge: "Mentor",
  },
  {
    name: "Sarah Singh",
    designation: "Founder, Sarah's Kitchen",
    image: "https://img.youtube.com/vi/c8_tafixiAs/mqdefault.jpg",
    badge: "Mentor",
  },
  {
    name: "John Doe",
    designation: "Software Engineer, Tech Corp",
    image: "https://img.youtube.com/vi/wm5gMKuwSYk/mqdefault.jpg",
    badge: "Mentor",
  },
  {
    name: "Manu Arora",
    designation: "Founder, Algochurn",
    image: "https://i3.ytimg.com/vi/o2CSJYXJBpc/hqdefault.jpg",
    badge: "Mentor",
  },
  {
    name: "Sarah Singh",
    designation: "Founder, Sarah's Kitchen",
    image: "https://img.youtube.com/vi/c8_tafixiAs/mqdefault.jpg",
    badge: "Mentor",
  },
  {
    name: "John Doe",
    designation: "Software Engineer, Tech Corp",
    image: "https://img.youtube.com/vi/wm5gMKuwSYk/mqdefault.jpg",
    badge: "Mentor",
  },
  {
    name: "Manu Arora",
    designation: "Founder, Algochurn",
    image: "https://i3.ytimg.com/vi/o2CSJYXJBpc/hqdefault.jpg",
    badge: "Mentor",
  },
  {
    name: "Sarah Singh",
    designation: "Founder, Sarah's Kitchen",
    image: "https://img.youtube.com/vi/c8_tafixiAs/mqdefault.jpg",
    badge: "Mentor",
  },
  {
    name: "John Doe",
    designation: "Software Engineer, Tech Corp",
    image: "https://img.youtube.com/vi/wm5gMKuwSYk/mqdefault.jpg",
    badge: "Mentor",
  },
  {
    name: "Manu Arora",
    designation: "Founder, Algochurn",
    image: "https://i3.ytimg.com/vi/o2CSJYXJBpc/hqdefault.jpg",
    badge: "Mentor",
  },
  {
    name: "Sarah Singh",
    designation: "Founder, Sarah's Kitchen",
    image: "https://img.youtube.com/vi/c8_tafixiAs/mqdefault.jpg",
    badge: "Mentor",
  },
];
