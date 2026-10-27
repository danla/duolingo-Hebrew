import type { VercelConfig } from "@vercel/config/v1";

export const config: VercelConfig = {
  // Create the tables and load the courses into an empty database first.
  buildCommand: "pnpm db:setup && pnpm build",
  ignoreCommand:
    "git diff HEAD^ HEAD --name-only | grep -qEv '(\.md$|LICENSE$|\.env\.example$|^\.github/|^\.vscode/)' && exit 1 || exit 0",
  trailingSlash: false,
};
