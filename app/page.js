"use client";

import JobsSection from "./components/JobsSection";
import SearchAndFilter from "./components/SearchAndFilter";

export default function Home() {
  return (
    <>
      <SearchAndFilter />
      <JobsSection />
    </>
  )
}
