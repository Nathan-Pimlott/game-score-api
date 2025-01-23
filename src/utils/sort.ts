export function sortAsc(arr: any[], propName: string) {
  return arr.sort((a, b) => (a[propName] > b[propName] ? 1 : -1));
}
