export function getStringBetween(str: string): string {
    const result = str.split(/[//]/);
    return result[2];
}