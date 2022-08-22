export const get = async <T = any>(url: string): Promise<T> => {
  const result = await fetch(url);
  return result.json();
}