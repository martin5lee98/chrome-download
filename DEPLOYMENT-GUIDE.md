# Universal Software Download Center - Deployment Guide

A comprehensive download page for browsers, VPN clients, and proxy tools with mirror support for users in restricted regions.

## 📦 What's Included

- **Browser**: Chrome (all channels: Stable, Beta, Dev, Canary)
- **VPN**: Outline VPN
- **Proxy Tools**: 
  - Shadowsocks (Windows, macOS, Android, Linux)
  - Clash Verge
  - v2rayN
  - Qv2ray
  - NekoRay

## 🏗️ Architecture

```
Frontend (HTML/JS) → Cloudflare Worker (API) → GitHub API / Chrome API / Google Developers
                                                         ↓
                                                  Mirror Links (ghproxy)
```

## 🚀 Quick Start

### Step 1: Deploy the Cloudflare Worker

1. **Log in to Cloudflare Dashboard**
   - Go to https://dash.cloudflare.com/
   - Navigate to **Workers & Pages**

2. **Create a new Worker**
   - Click **Create Application** → **Create Worker**
   - Name it: `download-api` (or any name you prefer)
   - Click **Deploy**

3. **Edit the Worker code**
   - Click **Edit Code**
   - Delete all default code
   - Copy and paste the **entire** content of `download-api-worker.js`
   - Click **Save and Deploy**

4. **Note your Worker URL**
   - It will be: `https://download-api.YOUR-SUBDOMAIN.workers.dev`
   - You'll need this for the next step

### Step 2: Configure and Deploy the Frontend

1. **Edit `universal-download.html`**
   - Open the file in a text editor
   - Find this line (around line 450):
     ```javascript
     API_URL: 'https://your-worker-name.workers.dev',
     ```
   - Replace with your actual Worker URL:
     ```javascript
     API_URL: 'https://download-api.YOUR-SUBDOMAIN.workers.dev',
     ```
   - Save the file

2. **Deploy to GitHub Pages**

   **Option A: Direct Upload**
   - Create a new GitHub repository
   - Upload `universal-download.html` and rename it to `index.html`
   - Go to Settings → Pages
   - Enable Pages from main branch
   - Your site will be at: `https://YOUR-USERNAME.github.io/REPO-NAME/`

   **Option B: Using Git**
   ```bash
   git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
   cd YOUR-REPO
   cp universal-download.html index.html
   git add index.html
   git commit -m "Add download center"
   git push origin main
   ```

3. **Or Deploy to Cloudflare Pages**
   - Push your code to GitHub first
   - In Cloudflare Dashboard → Workers & Pages → Pages
   - Connect to Git and select your repository
   - Build settings: leave blank
   - Deploy!

### Step 3: Test

1. Visit your deployed page
2. Try downloading a file
3. Test the mirror links
4. Check different software tabs

## 📝 Configuration

### Adding New Software

Edit `download-api-worker.js` and add to `SOFTWARE_CONFIG`:

```javascript
'your-software': {
  name: 'Your Software Name',
  apiType: 'github-releases',
  github: { owner: 'username', repo: 'repo-name' },
  cacheTime: 21600
}
```

Then update the frontend `SOFTWARE_INFO` in `universal-download.html`:

```javascript
'your-software': { name: 'Your Software', icon: '🎯' }
```

### Adjusting Cache Time

In the Worker, find `cacheTime` for each software:

```javascript
cacheTime: 21600  // 6 hours in seconds
```

Modify as needed:
- 3600 = 1 hour
- 21600 = 6 hours
- 86400 = 24 hours

### Using GitHub Personal Access Token (Optional)

To increase GitHub API rate limits from 60 to 5000 requests/hour:

1. Generate a token at: https://github.com/settings/tokens
2. In Cloudflare Worker settings, add an environment variable:
   - Name: `GITHUB_TOKEN`
   - Value: your token

3. Modify the Worker code to use it:
   ```javascript
   const response = await fetch(apiUrl, {
     headers: {
       'User-Agent': 'Cloudflare-Worker-Download-API',
       'Accept': 'application/vnd.github.v3+json',
       'Authorization': `Bearer ${env.GITHUB_TOKEN}` // Add this line
     }
   });
   ```

## 🔧 Advanced Features

### Custom Domain

**For GitHub Pages:**
1. Add a CNAME record in your DNS:
   - Type: CNAME
   - Name: download (or @)
   - Value: YOUR-USERNAME.github.io
2. In GitHub repo settings → Pages → Add custom domain
3. Enable "Enforce HTTPS"

**For Cloudflare Pages:**
1. Your domain must be in Cloudflare
2. Go to Pages → Custom domains
3. Add your domain

### Rate Limiting Protection

The Worker automatically caches responses to avoid hitting GitHub's rate limits:
- Chrome: 1 hour cache
- Others: 6 hour cache
- Cached at Cloudflare edge for fast global access

### Mirror Service Alternatives

Current mirrors used:
- `gh-proxy.org` (Cloudflare)
- `cdn.gh-proxy.org` (Fastly)
- `edgeone.gh-proxy.org` (Tencent Cloud)

To use different mirrors, edit `MIRRORS` in the Worker:

```javascript
const MIRRORS = {
  cloudflare: 'https://your-mirror-1.com/',
  fastly: 'https://your-mirror-2.com/',
  edgeone: 'https://your-mirror-3.com/'
};
```

## 🐛 Troubleshooting

### Issue 1: "Failed to load data"

**Check:**
1. Is your Worker URL correct in the HTML?
2. Is the Worker deployed and accessible?
3. Open browser console (F12) for detailed errors

**Test your Worker directly:**
```
https://your-worker-url.workers.dev/api/list
```

Should return JSON with software list.

### Issue 2: GitHub Rate Limit

**Symptoms:** Some software fails to load after many requests

**Solutions:**
1. Worker caches responses (should prevent this)
2. Use GitHub Personal Access Token (see above)
3. Check Worker logs in Cloudflare Dashboard

### Issue 3: Download Links Don't Work in China

**This is expected** - GitHub releases may be blocked

**Solution:** That's why we provide mirror links!
- Click "Mirror Downloads" button
- Choose EdgeOne (Tencent Cloud) for best results in China
- Or use Cloudflare/Fastly mirrors

### Issue 4: Some Software Shows "Not Found"

**Possible reasons:**
1. Repository was renamed/deleted
2. No releases published yet
3. Private repository

**Check:**
- Visit the GitHub repo directly
- Verify releases exist
- Update the repo name in config if changed

### Issue 5: Outline VPN Shows Wrong Version

Outline uses static download links from Google Developers, so version info comes from GitHub releases which may not match. This is normal.

## 📊 Performance Tips

1. **Enable Cloudflare Pages** instead of GitHub Pages for better global performance
2. **Use a CDN** for the HTML file
3. **Keep Worker code updated** to handle API changes
4. **Monitor Worker usage** in Cloudflare Dashboard

## 🔒 Security Notes

1. **No API keys needed** for basic usage
2. **If using GitHub token**, store it as Worker environment variable (secure)
3. **All downloads** link to official sources
4. **We don't modify** or host any files

## 💰 Costs

**Completely FREE** with Cloudflare free plan:
- Workers: 100,000 requests/day
- Pages: Unlimited bandwidth
- More than enough for personal/small team use

**GitHub Pages** (if used):
- Also free
- 100GB bandwidth/month

## 📈 Monitoring

Check Worker stats in Cloudflare Dashboard:
- Requests count
- Error rate
- Cache hit ratio
- Response time

## 🆘 Support

If you encounter issues:

1. Check browser console (F12 → Console)
2. Check Worker logs (Cloudflare Dashboard → Worker → Logs)
3. Test Worker API endpoints directly
4. Verify all URLs are correct

## 🔄 Updates

To update software list:
1. Edit Worker config
2. Save and deploy Worker
3. Frontend will automatically pick up changes (no code change needed)

## 📚 API Documentation

Your Worker exposes these endpoints:

**GET /api/list**
Returns list of all available software

**GET /api/software/:name**
Returns download info for specific software
Example: `/api/software/chrome`

**GET /api/all**
Returns all software info in one request (used by frontend)

## 🎉 You're Done!

Your universal download center is now live and ready to use!

**Features you now have:**
- ✅ Always up-to-date download links
- ✅ Mirror support for restricted regions
- ✅ Multiple browsers and proxy tools
- ✅ Beautiful, responsive UI
- ✅ Fast global CDN delivery
- ✅ Completely free hosting

Enjoy! 🚀
