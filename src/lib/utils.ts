import type { Product } from "./types";
export function getStringBetween(str: string | null): string[] {
  const result = str!.split(/[//]/);
  return result;
}
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const searchRegEx =  (word : string, arr :Product[]) => {
  const regex = new RegExp(word, "gi");
  const filteredArr = arr.filter((item) => regex.test(item.name));
  return filteredArr;
};

