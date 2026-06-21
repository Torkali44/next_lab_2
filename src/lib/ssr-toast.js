const FALLBACK_QUOTE = {
  content: "The only way to do great work is to love what you do.",
  author: "Steve Jobs",
};

const FALLBACK_NEWS = {
  title: "Space exploration continues to inspire innovation on Earth.",
};

async function fetchWithTimeout(url, timeoutMs = 2500) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    return response;
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchSsrToastData() {
  let quote = null;
  let news = null;

  try {
    const quoteRes = await fetchWithTimeout("https://api.quotable.io/random");
    if (quoteRes.ok) {
      quote = await quoteRes.json();
    } else {
      quote = FALLBACK_QUOTE;
    }
  } catch {
    quote = FALLBACK_QUOTE;
  }

  try {
    const newsRes = await fetchWithTimeout(
      "https://api.spaceflightnewsapi.net/v4/articles/?limit=1"
    );
    if (newsRes.ok) {
      const data = await newsRes.json();
      news = data.results?.[0] ?? FALLBACK_NEWS;
    } else {
      news = FALLBACK_NEWS;
    }
  } catch {
    news = FALLBACK_NEWS;
  }

  return { quote, news };
}
