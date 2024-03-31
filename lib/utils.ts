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
  if (!value) return "<div></div>";
  const json = JSON.parse(value);
  return generateHTML(json, editorExtension);
}

export function formatDate(date: string, showTime?: boolean) {
  const value = date.split("T");
  const time = value[1].slice(0, 5);
  return `${value[0]} ${showTime ? time : ""}`;
}

export function slugify(s: string) {
  if (!s) return "";

  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-");
}

/**
 * check has fromDate arrived to currentDate or not
 * @param fromDate start date
 * @param currentDate current date
 * @returns true if 1 > 2
 */


/**
 * getISOLocalString
 * reference: https://www.flypenguin.de/2021/08/18/javascript-iso-date-with-local-timezone/
 * @returns local date time
 */
export function getISOLocalString() {
  let date = new Date();
  let tzo = -date.getTimezoneOffset();

  if (tzo === 0) {

    return new Date()

  } else {

    let pad = function(num:number, digits=2) {
      return String(num).padStart(digits, "0");
    };

    const value = date.getFullYear() +
      '-' + pad(date.getMonth() + 1) +
      '-' + pad(date.getDate()) +
      'T' + pad(date.getHours()) +
      ':' + pad(date.getMinutes()) +
      ':' + pad(date.getSeconds()) +
      '.' + pad(date.getMilliseconds(), 3) + 'Z';

      return (new Date(value))
  }
}

export function CompareDate(fromDate: Date, currentDate:Date) {
  // create new date using Date Object => new Date (Year, Month, Date, Hr, Min, Sec);

  //Note: 10 is month i.e. Oct
  return (currentDate > fromDate)
}
