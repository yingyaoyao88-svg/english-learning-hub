# Deployment

- Directory: https://imaomyying.com/english
- Portfolio project: https://imaomyying.com/#/project/english-learning-hub
- Page source: Sites commit b3f18761a904b1dd543d143224c82a710f692192.
- Vercel serves the resource directory, search, filters and spatial cards under the /english base path.
- The portfolio proxies /english and its assets to the English Vercel project and embeds the actual directory in the project detail page.
- Recommendations and admin review open the existing Sites service and retain its access policy. Its Cloudflare D1 database is not migrated to Vercel. Newly reviewed resources must be copied into the directory source to appear on this deployment.
