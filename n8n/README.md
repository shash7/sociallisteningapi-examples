# n8n brand and competitor monitor

This workflow searches one brand and one competitor on LinkedIn, X, and Reddit. It removes
source URLs seen in earlier workflow executions, then prepares a short review digest. Slack is
included but disabled. No LLM or model credential is required.

## Setup

1. Import `brand-competitor-monitor.json` into n8n.
2. Create a **Header Auth** credential named `SocialListeningAPI`.
3. Set the header name to `x-api-key` and the value to your API key.
4. Open **Search public posts** and select that credential. The imported placeholder credential
   may show as missing until you do this.
5. Open **Monitoring settings** and replace `YOUR_BRAND` and `YOUR_COMPETITOR`.
6. Check **Workflow settings** and choose your timezone.
7. Run **Manual Trigger** once. Review the output from **Prepare review digest**.
8. To use Slack, select your Slack credential and channel in **Send digest to Slack**, then enable
   that node.
9. Publish the workflow. The 9:00 AM schedule only runs while the workflow is published.

n8n uses the workflow timezone. If none is set, it uses the instance timezone.

## What happens on each run

1. Two labels are created: `brand` and `competitor`.
2. Each query expands to LinkedIn, X, and Reddit, creating six searches.
3. Each request continues independently. A failed source is added to the digest.
4. Successful `data.items` are flattened and keep their query label and platform.
5. **Remove seen source URLs** stores up to 10,000 dedupe keys at workflow scope.
6. A short digest lists new source links and failures for human review.
7. If searches return no new URLs and no failures, no digest or Slack message is created.

One full run costs 8 credits when all six requests succeed: 4 credits for the brand and 4 for
the competitor.

## Important limits

The Remove Duplicates history belongs to n8n, not SocialListeningAPI. Clearing n8n execution or
deduplication data can make old URLs appear again. SocialListeningAPI performs public search;
n8n supplies the schedule, history, deduplication, digest, and optional Slack delivery.

Search results need human review. A matching word does not always mean the post is about your
brand. The digest does not apply sentiment analysis, lead scoring, or automatic classification.

## Validation

The workflow was imported with n8n 2.33.7. Its Remove Duplicates node uses `Value Is New`, the
source URL as the dedupe value, workflow scope, and a 10,000-item history.
