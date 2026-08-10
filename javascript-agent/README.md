# JavaScript agent example

This dependency-free Node module searches LinkedIn, X, and Reddit through SocialListeningAPI.
It returns one newest-first list, per-source errors, credits used, and public source URLs.

## Run it

Requires Node.js 18 or newer because it uses native `fetch`.

```bash
export SOCIALLISTENING_API_KEY="your_key"
node index.js "YOUR_BRAND" linkedin,x,reddit
```

Search one competitor the same way:

```bash
node index.js "YOUR_COMPETITOR pricing" linkedin,x,reddit
```

Each source is called independently. If one source fails, the output keeps results from the
others and records the problem in `errors`.

## Reuse the function

```js
import { searchConversations } from "./index.js";

const results = await searchConversations(
  "YOUR_COMPETITOR launched",
  ["linkedin", "x", "reddit"],
);

console.log(results.items);
console.log(results.errors);
```

The exported function trusts its internal caller contract. Query and platform validation only
happens in the CLI entry point. Your application should validate user input at its own boundary.

## Add monitoring outside the API

Your application must schedule runs, save prior URLs, remove duplicates, classify findings, and
send alerts. SocialListeningAPI performs the public searches and returns normalized data. Review
the source links before taking action.
