class MemoizeService {
  constructor() {
    this.cache = new Map();
  }

  async memoize(key, promiseFn, ttl = Infinity) {
    const now = Date.now();

    if (this.cache.has(key)) {
      const entry = this.cache.get(key);
      if (now - entry.timestamp < ttl) {
        return entry.promise;
      } else {
        this.cache.delete(key);
      }
    }

    const promise = promiseFn().then((data) => {
      if (!data || (Array.isArray(data) && data.length === 0)) {
        this.cache.delete(key);
        throw new Error("Empty or invalid data received.");
      }
      return data;
    });

    this.cache.set(key, { promise, timestamp: now });
    return promise;
  }

  clearCache(key) {
    this.cache.delete(key);
  }

  clearAllCache() {
    this.cache.clear();
  }
}

export const memoizeService = new MemoizeService();
