export { v4 as seedID } from 'uuid';

export function getYoutubeThumbnail(url) {
  const videoIdMatch = url.match(
    /(?:youtube\.com.*(?:v=|embed\/)|youtu\.be\/)([^&\n?]+)/
  );
  const videoId = videoIdMatch ? videoIdMatch[1] : null;
  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
  }
  return '';
}
