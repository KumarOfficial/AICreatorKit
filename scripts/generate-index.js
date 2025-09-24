#!/usr/bin/env node

import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')

// Create index.html for Pages deployment
const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>aiCreatorKit - Link in Bio Tool</title>
  <meta name="description" content="Create beautiful link in bio pages with aiCreatorKit. Share all your links in one place." />
  <link rel="icon" href="/favicon.ico" />
  <link rel="manifest" href="/manifest.json" />
  <script type="module" crossorigin src="/assets/entry.client-BxCqSuAx.js"></script>
  <link rel="stylesheet" crossorigin href="/assets/root-C09zQp9r.css">
</head>
<body>
  <div id="root">
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: system-ui, sans-serif;">
      <div style="text-align: center;">
        <h1>aiCreatorKit</h1>
        <p>Loading your link in bio tool...</p>
        <div style="margin-top: 20px;">
          <div style="width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
        </div>
      </div>
    </div>
  </div>
  <style>
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
</body>
</html>`

// Write index.html
writeFileSync(join(projectRoot, 'build/client/index.html'), indexHtml)

console.log('✅ Generated index.html for Pages deployment')
