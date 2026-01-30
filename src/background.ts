const GITHUB_REPO_PATTERN = /^https?:\/\/github\.com\/([^/]+)\/([^/]+)/;

function extractGitHubRepo(url: string): { owner: string; repo: string } | null {
  const match = url.match(GITHUB_REPO_PATTERN);
  if (!match) return null;
  return { owner: match[1], repo: match[2] };
}

function toDeepWikiUrl(owner: string, repo: string): string {
  return `https://deepwiki.com/${owner}/${repo}`;
}

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.url) return;

  const repoInfo = extractGitHubRepo(tab.url);
  if (!repoInfo) {
    console.log("Not a GitHub repository page");
    return;
  }

  const deepWikiUrl = toDeepWikiUrl(repoInfo.owner, repoInfo.repo);
  await chrome.tabs.create({ url: deepWikiUrl });
});
