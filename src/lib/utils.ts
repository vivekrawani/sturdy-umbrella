export function getStringBetween(str: string): string {
    const result = str.split(/[//]/);
    return result[2];
}
export function delay(ms:number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  