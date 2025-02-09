export function parseJSON(jsonString) {
  try {
    const parsedData = JSON.parse(jsonString);
    return parsedData;
  } catch (error) {
    return '';
  }
}
