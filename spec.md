# Venthogai Foundation

## Current State
Full-stack NGO platform with Home, Stories, Story Detail, Volunteer, and Admin pages. Home page shows hardcoded stats (1,200+ stories, 340+ volunteers, 85+ communities, 5,000+ lives touched). No donations page.

## Requested Changes (Diff)

### Add
- New Donate/Collect Funds page (/donate) with a donation form (donor name, email, amount, message) and confirmation state. Add to navbar and router.

### Modify
- Reset all stats on home page to 0.
- Change all text/font colors on non-hero sections to black or near-black.
- Add Donate link to Navbar.

### Remove
- Nothing.

## Implementation Plan
1. Update HomePage.tsx stats to show 0.
2. Fix text colors across HomePage.tsx, Navbar.tsx, Footer.tsx to black/dark.
3. Create DonatePage.tsx with fund collection form.
4. Update App.tsx with /donate route.
5. Update Navbar.tsx with Donate link.
