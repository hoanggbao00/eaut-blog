import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { editorExtension } from "./default-extension";
import { generateHTML } from "@tiptap/html";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatDescription(html: string, slice?: number) {
  let value = html.replace(/<[^>]*>/g, " ");

  if (slice) value = value.slice(0, slice);

  return value;
}

export function formatContent(value: string) {
  const json = JSON.parse(value);
  return generateHTML(json, editorExtension);
}

export function formatDate(date: string) {
  const value = date.split("T");

  return `${value[0]} ${value[1].slice(0, 5)}`;
}

export function slugify(s: string) {
  if (!s) return "";

  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-");
}
