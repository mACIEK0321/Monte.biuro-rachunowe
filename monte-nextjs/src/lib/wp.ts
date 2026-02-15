const WP_API_BASE = process.env.WP_API_BASE?.replace(/\/+$/, '');
const FETCH_TIMEOUT = 10000;

export interface WPFetchOptions {
  revalidate?: number;
  tags?: string[];
}

export async function wpFetchJson<T>(
  path: string,
  options?: WPFetchOptions
): Promise<T> {
  if (!WP_API_BASE) {
    throw new Error('Missing WP_API_BASE in environment');
  }

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const url = `${WP_API_BASE}/${cleanPath}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      next: {
        revalidate: options?.revalidate ?? 300,
        tags: options?.tags,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(
        `WordPress API error: ${response.status} ${response.statusText} (${url})`
      );
    }

    return (await response.json()) as T;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`WordPress API timeout after ${FETCH_TIMEOUT / 1000}s: ${url}`);
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error(`Unknown error fetching WordPress API: ${url}`);
  }
}

export async function wpFetchJsonSafe<T>(
  path: string,
  options?: WPFetchOptions
): Promise<T | null> {
  try {
    return await wpFetchJson<T>(path, options);
  } catch (error) {
    console.error('WordPress API fetch failed:', error);
    return null;
  }
}
