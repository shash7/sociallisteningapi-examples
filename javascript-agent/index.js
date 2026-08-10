import { fileURLToPath } from "node:url";

const apiBaseUrl = "https://api.sociallisteningapi.com/api/v1";

const sourceConfig = {
  linkedin: {
    path: "/linkedin/search",
  },
  x: {
    path: "/x/search",
  },
  reddit: {
    path: "/reddit/search-posts",
  },
};

async function searchSource(query, platform, apiKey) {
  const config = sourceConfig[platform];
  const searchParams = new URLSearchParams({ query });
  const requestUrl = `${apiBaseUrl}${config.path}?${searchParams.toString()}`;

  try {
    const response = await fetch(requestUrl, {
      headers: {
        "x-api-key": apiKey,
      },
    });
    const body = await response.json();

    if (!response.ok || body.success !== true) {
      let message = `Request failed with status ${response.status}.`;

      // API error bodies can omit details, so preserve a useful source error.
      if (body.error && body.error.message) {
        message = body.error.message;
      }

      return {
        error: {
          platform,
          message,
          status: response.status,
        },
      };
    }

    const items = body.data.items.map((item) => ({
      ...item,
      matched_query: query,
      source_platform: platform,
    }));

    return {
      creditsUsed: body.credits_used,
      items,
    };
  } catch (error) {
    return {
      error: {
        platform,
        message: `Could not search ${platform}: ${error.message}`,
        status: null,
      },
    };
  }
}

function sortNewestFirst(items) {
  return items.sort((firstItem, secondItem) => {
    const firstDate = Date.parse(firstItem.published_at || "1970-01-01");
    const secondDate = Date.parse(secondItem.published_at || "1970-01-01");

    return secondDate - firstDate;
  });
}

/**
 * Search public conversations on the selected platforms.
 *
 * @param {string} query Search phrase supplied by the caller.
 * @param {string[]} platforms Any of linkedin, x, and reddit.
 * @returns {Promise<object>} Combined items, errors, credits, and source URLs.
 */
export async function searchConversations(query, platforms) {
  const apiKey = process.env.SOCIALLISTENING_API_KEY;
  const items = [];
  const errors = [];
  let creditsUsed = 0;

  // Environment configuration is checked here so imported callers cannot start bad requests.
  if (!apiKey) {
    throw new Error("Missing SOCIALLISTENING_API_KEY. No request was made.");
  }

  for (const platform of platforms) {
    const result = await searchSource(query, platform, apiKey);

    if (result.error) {
      errors.push(result.error);
      continue;
    }

    creditsUsed += result.creditsUsed;
    items.push(...result.items);
  }

  const sourceUrls = [];

  for (const item of items) {
    if (sourceUrls.indexOf(item.url) === -1) {
      sourceUrls.push(item.url);
    }
  }

  return {
    query,
    searchedPlatforms: platforms,
    items: sortNewestFirst(items),
    errors,
    creditsUsed,
    sourceUrls,
  };
}

async function runCli() {
  const query = process.argv[2];
  const platformValue = process.argv[3] || "linkedin,x,reddit";

  // Query text is CLI input and must exist before a paid request is made.
  if (!query || !query.trim()) {
    throw new Error("Usage: node index.js \"YOUR_BRAND\" linkedin,x,reddit");
  }

  const platforms = platformValue.split(",").map((platform) => platform.trim());

  for (const platform of platforms) {
    // Reject unknown CLI values so a typo cannot call an unintended route.
    if (!sourceConfig[platform]) {
      throw new Error(`Unsupported platform: ${platform}`);
    }
  }

  const result = await searchConversations(query.trim(), platforms);
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

const currentFilePath = fileURLToPath(import.meta.url);

if (process.argv[1] === currentFilePath) {
  runCli().catch((error) => {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  });
}
