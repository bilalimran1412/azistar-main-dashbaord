export function truncateString(label, truncateLimit = 50) {
  return label.length > truncateLimit
    ? label.substring(0, truncateLimit) + '...'
    : label;
}
