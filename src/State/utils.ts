export function pathnameToBucket(path: string): string {
  return path.replace(/\//g, '.').slice(2);
}

export function bucketToPathname(bucket: string): string {
  return `#/${bucket.replace(/\./g, '/')}`;
}
