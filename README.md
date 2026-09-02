# SocialListeningAPI Cursor plugin and examples

This repository installs the SocialListeningAPI MCP in Cursor. It also includes working brand and
competitor research examples for n8n, OpenClaw, and JavaScript.

SocialListeningAPI searches current public social posts and web results. Cursor can use those
results while researching a market, checking product feedback, finding public conversations, or
collecting source links for a report.

## Connect SocialListeningAPI to Cursor

1. Create a [SocialListeningAPI](https://sociallisteningapi.com) account.
2. Install the SocialListeningAPI plugin from the Cursor Marketplace.
3. Open the plugin in Cursor and connect the MCP.
4. Sign in to SocialListeningAPI and approve access to your workspace credits.
5. Ask Cursor to search one or more supported public sources.

The Cursor plugin uses OAuth. You do not need to paste an API key into Cursor or this repository.

During local plugin testing, place this repository at
`~/.cursor/plugins/local/sociallisteningapi`, then reload Cursor. The marketplace version will use
the same MCP configuration from [`mcp.json`](mcp.json).

Try this prompt after connecting:

```text
Use SocialListeningAPI to search LinkedIn, X, and Reddit for public posts about
"social listening API pricing". Group useful results by common question or problem. Include the
public source URL for every finding, and list any source that failed.
```

## What Cursor can search

The MCP can:

- search public posts from LinkedIn, X, Reddit, Facebook, Hacker News, TikTok, and YouTube;
- retrieve Google results;
- search Instagram users, hashtags, and places, then retrieve a public Instagram profile;
- search public Reddit comments or retrieve comments from one Reddit post;
- retrieve an X profile, user posts, thread, or tweet replies;
- retrieve public posts from one LinkedIn profile.

Facebook searches cost 7 workspace credits. LinkedIn requests and Reddit comment searches cost
2 credits. Other current MCP requests cost 1 credit. Failed requests use 0 credits.

Results depend on public source availability and may be incomplete. SocialListeningAPI does not
provide native scheduling, saved history, alerts, sentiment analysis, lead scoring, or reply
automation through this plugin.

See [`mcp/README.md`](mcp/README.md) for more Cursor prompts, current limits, and credit examples.

## Other examples in this repository

The n8n, OpenClaw, and JavaScript examples search LinkedIn, X, and Reddit for one brand and one
competitor. They remove source URLs already reviewed and prepare a sourced digest.

Allow about 10 minutes for the JavaScript or OpenClaw example. The n8n workflow usually takes
about 20 minutes because you must add credentials, choose a timezone, and connect Slack if you
want delivery.

Unlike the Cursor plugin, these examples use a SocialListeningAPI API key. Store the key in an
environment variable or your tool's credential store. Never paste it into a script, prompt, or
exported workflow.

### What one API example run costs

| Public search | Route | Credits |
| --- | --- | ---: |
| LinkedIn posts | `/api/v1/linkedin/search` | 2 |
| X posts | `/api/v1/x/search` | 1 |
| Reddit posts | `/api/v1/reddit/search-posts` | 1 |

One query across all three sources costs 4 credits. A brand query plus a competitor query costs
8 credits when all six requests succeed. SocialListeningAPI uses one-time credit packs, and
credits do not expire.

## Real Apify example

On August 10, 2026, the n8n workflow searched `apify` across LinkedIn, X, and Reddit. It returned
77 new source URLs, used 4 credits, and reported 0 source failures. Results change as public posts
change. Review each source before using it in marketing work.

![n8n workflow searching LinkedIn, X, and Reddit](assets/n8n-workflow.png)

![Apify review digest with 77 new source URLs and 0 failures](assets/apify-review-digest.png)

## Dedupe proof

On August 12, 2026, n8n execution #7 returned 77 source URLs. The workflow kept 0 and discarded
all 77 as previously seen. It reported 0 source failures and did not create an empty digest. This
proof run used 4 credits.

![n8n dedupe proof showing 77 results and 0 kept items](assets/n8n-dedupe-proof.png)

## Run an API example

1. Create a SocialListeningAPI account and copy your API key.
2. Choose an example:
   - `openclaw/` for an installable agent skill;
   - `n8n/` for a scheduled, no-LLM review workflow;
   - `javascript-agent/` for a dependency-free Node.js example.
3. Add the API key through an environment variable or credential store.
4. Replace the example brand and competitor names.
5. Run once manually and review the source links before adding a schedule.

### OpenClaw

Install the local skill from this repository:

```bash
openclaw skills install ./openclaw/social-listening-monitor
```

Set `SOCIALLISTENING_API_KEY` in the OpenClaw process environment. The skill passes search input
through environment values and uses a fixed command, so query text is never placed in a shell
command.

### n8n

Import `n8n/brand-competitor-monitor.json`, then follow `n8n/README.md`. The workflow runs
manually or every day at 9:00 AM, remembers up to 10,000 source URLs, prepares a short digest, and
has a disabled Slack step ready for your credential and channel.

### JavaScript

```bash
cd javascript-agent
SOCIALLISTENING_API_KEY=your_key node index.js "YOUR_BRAND" linkedin,x,reddit
```

The module exports `searchConversations(query, platforms)` for reuse in an agent or internal
marketing tool.

## What happens outside SocialListeningAPI

Scheduling, stored history, deduplication, classification, Slack delivery, and alerts happen in
OpenClaw, n8n, your JavaScript application, Cursor, or another external tool. SocialListeningAPI
searches public data and returns the available results.

## Tested versions

- Node.js 24.14.0
- OpenClaw 2026.6.1
- n8n 2.33.7

No Make example is included. Add one only after exporting and validating a real Make scenario.
