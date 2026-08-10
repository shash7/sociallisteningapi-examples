# Manual social listening with MCP

These prompts are for an MCP client that has an authenticated HTTP-request tool. Configure the
tool to send `x-api-key` from a secret store to `https://api.sociallisteningapi.com`. Do not put
the key in a prompt.

This repository does not include a SocialListeningAPI MCP server. MCP use here is manual
research. Your MCP client does not gain scheduling, saved history, deduplication, or alerts from
these prompts.

## Brand conversation snapshot

```text
Search public LinkedIn, X, and Reddit posts for "YOUR_BRAND".

Use these GET routes with the query parameter named query:
- /api/v1/linkedin/search
- /api/v1/x/search
- /api/v1/reddit/search-posts

Keep successful results if one route fails. Sort posts newest first. Group useful posts into
questions, praise, problems, and purchase intent. Cite the public post URL for every finding.
List failed sources and uncertain matches. Do not infer sentiment or intent when the post does
not state it. End with three items a marketer should review first.
```

## Brand-versus-competitor comparison

```text
Run two separate public searches across LinkedIn, X, and Reddit:
1. "YOUR_BRAND"
2. "YOUR_COMPETITOR"

Use /api/v1/linkedin/search, /api/v1/x/search, and /api/v1/reddit/search-posts. Keep the query
label attached to each result. Compare the recurring questions, product problems, pricing
mentions, and launch mentions. Cite every claim with a public post URL. Report source failures
and irrelevant-name collisions. Give a short evidence table, then five review actions. Do not
claim share of voice from this small search.
```

## Weekly competitor research brief

```text
Research these competitor queries across LinkedIn, X, and Reddit:
- "YOUR_COMPETITOR pricing"
- "YOUR_COMPETITOR launched"
- "YOUR_COMPETITOR problem"
- "switching from YOUR_COMPETITOR"

Use /api/v1/linkedin/search, /api/v1/x/search, and /api/v1/reddit/search-posts. Compare returned
URLs with the prior-URL list I provide and omit URLs already reviewed. Prepare a brief with:
- What changed
- Pricing and launch mentions
- Problems and switching signals
- Possible marketing actions
- Search gaps

Cite every finding with its public URL. Separate facts from possible actions. Do not invent
results when a source fails or returns nothing. Return the new URL list so I can store it outside
the API for next week.
```

One query across all three routes costs 4 credits. The brand-versus-competitor prompt costs
8 credits when all six requests succeed. The four-query weekly prompt costs 16 credits when all
12 requests succeed.
