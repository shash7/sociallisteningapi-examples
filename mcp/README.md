# Social listening in Cursor with MCP

The SocialListeningAPI Cursor plugin connects to the hosted MCP at
`https://api.sociallisteningapi.com/mcp`. Cursor opens the SocialListeningAPI OAuth flow when you
connect. Sign in and approve access to your workspace credits.

Do not put an API key in Cursor, a prompt, or this repository. The MCP connection uses OAuth.

## Connect locally before marketplace publication

1. Place this repository at `~/.cursor/plugins/local/sociallisteningapi`.
2. Restart Cursor or run `Developer: Reload Window`.
3. Open Customize and select the SocialListeningAPI plugin.
4. Connect the MCP and complete the browser sign-in.
5. Ask Cursor to call `get_supported_sources` to confirm the connection.

## Brand conversation snapshot

```text
Use the SocialListeningAPI MCP to search public LinkedIn, X, and Reddit posts for "YOUR_BRAND".

Call search_social_posts once for each source. Keep successful results if one source fails. Sort
useful posts newest first. Group them into questions, praise, problems, and purchase interest.
Cite the public post URL for every finding. List failed sources and uncertain matches. Do not infer
sentiment or intent when the post does not state it. End with three items I should review first.
```

## Brand-versus-competitor comparison

```text
Use the SocialListeningAPI MCP to run two separate public searches across LinkedIn, X, and Reddit:
1. "YOUR_BRAND"
2. "YOUR_COMPETITOR"

Call search_social_posts once per query and source. Keep the query label attached to each result.
Compare recurring questions, product problems, pricing mentions, and launch mentions. Cite every
claim with a public post URL. Report source failures and irrelevant-name collisions. Give me a
short evidence table, then five review actions. Do not claim share of voice from this small search.
```

## Weekly competitor research brief

```text
Use the SocialListeningAPI MCP to research these competitor queries across LinkedIn, X, and Reddit:
- "YOUR_COMPETITOR pricing"
- "YOUR_COMPETITOR launched"
- "YOUR_COMPETITOR problem"
- "switching from YOUR_COMPETITOR"

Call search_social_posts once per query and source. Compare returned URLs with the prior-URL list I
provide and omit URLs already reviewed. Prepare a brief with:
- What changed
- Pricing and launch mentions
- Problems and switching signals
- Possible marketing actions
- Search gaps

Cite every finding with its public URL. Separate facts from possible actions. Do not invent results
when a source fails or returns nothing. Return the new URL list so I can store it outside
SocialListeningAPI.
```

## Credit examples

LinkedIn searches cost 2 credits. X and Reddit post searches cost 1 credit each. One query across
all three sources costs 4 credits when every request succeeds.

- Brand snapshot: 4 credits.
- Brand-versus-competitor comparison: 8 credits.
- Four-query weekly brief: 16 credits.

Facebook searches cost 7 credits. Reddit comment searches cost 2 credits. Other current MCP
requests cost 1 credit. Failed requests use 0 credits.

## Current limits

The MCP searches available public data and may not find every matching result. It does not provide
continuous monitoring, scheduling, stored history, native alerts, sentiment analysis, lead scoring,
or reply automation. Cursor performs the grouping, comparison, and summary requested in your
prompt.

Discourse search is available through the SocialListeningAPI HTTP API and is not currently exposed
through the MCP.
