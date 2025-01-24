export function sortAsc(arr: any[], propName: string) {
  return arr.sort((a, b) =>
    a[propName].toLowerCase() > b[propName].toLowerCase() ? 1 : -1
  );
}
