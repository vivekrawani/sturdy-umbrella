export function getStringBetween(str: string | null): string[] {
    const result = str!.split(/[//]/);
    return result;
}
export function delay(ms:number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  