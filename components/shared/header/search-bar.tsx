"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Thread } from "@/type";
import { Loader2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import CategoryTag from "../category-tag";
import Link from "next/link";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [searchData, setData] = useState<Thread[]>([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!input) return setLoading(false);
    const res = await fetch(`/api/thread/search?q=${input}`);
    const data = await res.json();
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(timer);
  }, [input]);

  return (
    <div>
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          setOpen(true);
        }}
      >
        <Search size="16" />
      </Button>
      {open && (
        <div className="fixed inset-0 bg-foreground/15">
          <div className="flex flex-col items-center justify-center gap-2 pt-[10vh] sm:pt-[20vh]">
            <div className="flex w-[90%] items-center justify-end sm:w-2/3">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Close
              </Button>
            </div>
            <div className="w-[90%] sm:w-2/3">
              <Input
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (!e.target.value) setData([]);
                }}
                placeholder="Search threads..."
                className="h-auto bg-background text-xl"
              />
            </div>
            <div className="max-h-[50vh] w-[90%] space-y-2 overflow-auto rounded-md border bg-background p-2 sm:w-2/3">
              {!isLoading &&
                searchData &&
                searchData.map((t) => (
                  <div
                    key={t.id}
                    className="rounded-md p-2 shadow-md dark:border"
                  >
                    <CategoryTag data={t.cat} />
                    <Link
                      className="block font-medium hover:underline"
                      href={`/thread/${t.slug}`}
                    >
                      {t.title}
                    </Link>
                  </div>
                ))}
              {isLoading && (
                <p>
                  <Loader2 className="mr-2 inline-block size-5 animate-spin" />
                  Searching <b>{input}</b>...
                </p>
              )}
              {!isLoading &&
                input &&
                (!searchData || searchData.length === 0) && (
                  <p>
                    There is no content match <b>{input}</b>
                  </p>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
