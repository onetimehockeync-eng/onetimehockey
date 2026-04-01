# One Time Hockey — Website

Hockey skills training center · Raleigh, NC  
**onetimehockey.com** (buy this domain at namecheap.com)

---

## File Structure

```
onetimehockey/
  index.html       ← Homepage
  lanes.html       ← The Six Lanes
  pricing.html     ← Pricing + Memberships
  book.html        ← Book a Lane
  coaches.html     ← For Coaches
  about.html       ← About
  contact.html     ← Contact
  css/
    style.css      ← All styles
  js/
    main.js        ← Nav, FAQ accordion, form
  README.md        ← This file
```

No build process. No npm. No dependencies. Pure HTML/CSS/JS.

---

## Deploy to GitHub Pages (Free)

1. Create a GitHub account at github.com
2. Click **New Repository** → name it `onetimehockey`
3. Make it **Public**
4. Upload all files (maintain the folder structure above)
   - Drag and drop the entire folder contents into the repo
   - OR use GitHub Desktop / git command line
5. Go to **Settings → Pages**
6. Under **Source** → select **Deploy from a branch**
7. Select branch: `main`, folder: `/ (root)`
8. Click **Save**

Your site goes live at:  
`https://yourusername.github.io/onetimehockey`

---

## Connect a Custom Domain (onetimehockey.com)

### Step 1: Buy the domain
Go to **namecheap.com** and buy `onetimehockey.com` (~$12/yr).  
Also check: `onetimehockey.net` or `onetimehockey.hockey`

### Step 2: Add domain to GitHub Pages
- In your repo → Settings → Pages → Custom domain
- Type: `onetimehockey.com` → Save
- Check **Enforce HTTPS**

### Step 3: Update DNS at Namecheap
- Log into Namecheap → Domain List → Manage → Advanced DNS
- Delete any existing A records
- Add these **A records** (@ host):

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A Record | @ | 185.199.108.153 | Auto |
| A Record | @ | 185.199.109.153 | Auto |
| A Record | @ | 185.199.110.153 | Auto |
| A Record | @ | 185.199.111.153 | Auto |

- Add this **CNAME record**:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| CNAME | www | yourusername.github.io | Auto |

DNS propagation takes up to 24 hours (usually faster).

---

## TODO Checklist Before Launch

Go through each file and replace all `<!-- TODO -->` comments:

### Contact & Info
- [ ] `index.html` footer — add phone number and email
- [ ] `contact.html` — add phone number
- [ ] `contact.html` — replace map placeholder with Google Maps embed
- [ ] `book.html` — add phone number in booking placeholder
- [ ] All footers — add address once lease is signed

### Social Media (all pages — replace `#` with real URLs)
- [ ] Instagram URL
- [ ] Facebook URL  
- [ ] TikTok URL
- [ ] YouTube URL

### Formspree (contact form)
1. Go to https://formspree.io → Create free account
2. Click **New Form** → copy the endpoint URL
3. In `contact.html`, replace `YOUR_FORMSPREE_ENDPOINT`:
   ```html
   action="https://formspree.io/f/YOUR_FORMSPREE_ENDPOINT"
   ```
4. Free tier: 50 submissions/month. Upgrade at ~$10/mo for more.

### Booking System
When you have a booking system, replace the placeholder in `book.html`:
```html
<!-- Find the .booking-ph div and replace it with your embed code -->
```
Compatible systems: Mindbody, IceTime, Bookeo, Calendly, Square Appointments

### Operating Hours
Search for `hours TBD` across all files and update with real hours.

### Google Maps Embed
1. Go to maps.google.com
2. Search your address
3. Click **Share → Embed a map**
4. Copy the `<iframe>` code
5. In `contact.html`, replace the `.map-ph` div with the iframe

### Phase 2 Email List
In `about.html`, update the form action with your email provider:
- Mailchimp: use their embed form action URL
- Klaviyo: use their subscriber API endpoint
- Simple option: use another Formspree form

### OG Image for Social Sharing
- Create a 1200×630px image (your logo on dark background)
- Save as `images/og-image.jpg`
- Update the `og:image` meta tags in each HTML file

---

## Upgrade Path (when ready)

| When | Switch to | Why |
|------|-----------|-----|
| Need working contact form now | Formspree free (50/mo) | Already wired in — just add endpoint |
| Want form + more features free | Netlify free tier | Same code, add form handling |
| Want drag-and-drop editing | Squarespace $16/mo | Rebuild in their platform |
| Need booking + forms + email | Netlify + booking widget | Best of both worlds |

Netlify migration (when ready): Sign up at netlify.com → drag your folder into the deploy area → done. 5 minutes.

---

## Support

For help with GitHub Pages: https://docs.github.com/pages  
For Namecheap DNS: https://namecheap.com/support  
For Formspree: https://help.formspree.io
