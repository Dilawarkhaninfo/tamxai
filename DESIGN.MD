# TAMx Design System
**Technology & AI-Driven Solutions Platform**

Version: 1.0  
Last Updated: February 2026  
Reference: Antimatter AI (antimatter.ai)

---

## Table of Contents
1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Layout & Grid](#layout--grid)
5. [Components](#components)
6. [Animations & Interactions](#animations--interactions)
7. [Responsive Design](#responsive-design)
8. [Accessibility](#accessibility)

---

## Design Philosophy

### Core Principles
- **Futuristic Minimalism**: Clean layouts with subtle complexity
- **Technology-Forward**: AI and digital transformation aesthetic
- **Premium Feel**: High-end, professional presentation
- **User-Centric**: Intuitive navigation and clear information hierarchy

### Visual Theme
- Dark mode primary (deep navy/black backgrounds)
- Purple-to-blue gradient accents
- Glass morphism effects
- Particle/dot matrix patterns
- Smooth animations and transitions
- Floating card layouts

---

## Color System

### Primary Palette

**Purple Spectrum (Brand Identity)**Primary Purple:   #9333EA
Light Purple:     #A855F7
Lavender:         #C084FC
Purple Glow:      #9333EA with 40% opacity

**Blue Spectrum (Technology)**Primary Blue:     #3B82F6
Light Blue:       #60A5FA
Cyan Accent:      #06B6D4
Blue Glow:        #3B82F6with 30% opacity

### Neutral Palette

**Backgrounds**Primary Dark:     #0F172A (slate-900)
Secondary Dark:   #1E293B (slate-800)
Card Background:  #1E293B with 60% opacity
Overlay:          #000000 with 80% opacity

**Text Colors**Primary Text:     #F1F5F9 (slate-100)
Secondary Text:   #94A3B8 (slate-400)
Muted Text:       #64748B (slate-500)
White:            #FFFFFF

### Gradient Definitions

**Hero Gradient (Top to Bottom)**
```cssbackground: linear-gradient(
180deg,
#1E293B 0%,
#0F172A 50%,
#000000 100%
);

**Purple-Blue Gradient**
```cssbackground: linear-gradient(
135deg,
#9333EA 0%,
#3B82F6 100%
);

**Card Glow Effect**
```cssbox-shadow:
0 0 40px rgba(147, 51, 234, 0.3),
0 0 80px rgba(59, 130, 246, 0.2);

---

## Typography

### Font Families

**Primary Font: Inter**
- Headings: 600-700 weight
- Body: 400-500 weight
- Links/Buttons: 500-600 weight

**Accent Font: Space Grotesk** (for hero titles)
- Display headings: 700 weight

**Monospace: JetBrains Mono** (for code/tech elements)
- Tech labels: 400 weight

### Type ScaleDisplay (Hero):      48px - 72px (3rem - 4.5rem)
H1:                  36px - 48px (2.25rem - 3rem)
H2:                  30px - 36px (1.875rem - 2.25rem)
H3:                  24px - 30px (1.5rem - 1.875rem)
H4:                  20px - 24px (1.25rem - 1.5rem)
Body Large:          18px - 20px (1.125rem - 1.25rem)
Body:                16px (1rem)
Small:               14px (0.875rem)
Caption:             12px (0.75rem)

### Line HeightsDisplay:             1.1
Headings:            1.2
Body:                1.6
Small Text:          1.5

### Font WeightsLight:               300
Regular:             400
Medium:              500
Semibold:            600
Bold:                700

---

## Layout & Grid

### Container SizesMobile:              100% (with 16px padding)
Tablet:              768px
Desktop:             1024px
Large Desktop:       1280px
Extra Large:         1536px

### Grid System
- **12-column grid** for desktop
- **6-column grid** for tablet
- **4-column grid** for mobile
- **Gap**: 24px (1.5rem)

### Spacing Scalexs:     4px   (0.25rem)
sm:     8px   (0.5rem)
md:     16px  (1rem)
lg:     24px  (1.5rem)
xl:     32px  (2rem)
2xl:    48px  (3rem)
3xl:    64px  (4rem)
4xl:    96px  (6rem)
5xl:    128px (8rem)

### Section SpacingSection Padding (Y):     80px - 120px
Component Margin:        40px - 60px
Card Padding:            24px - 32px

---

## Components

### 1. Navigation Bar

**Structure:**
- Fixed top position
- Transparent background with blur
- Backdrop filter: blur(12px)
- Border bottom: 1px solid rgba(255,255,255,0.1)

**Elements:**
- Logo (left): 32px height
- Nav links (center): 16px, medium weight
- CTA button (right): Primary purple gradient

**States:**
- Default: Transparent with blur
- Scrolled: Slight background opacity increase
- Hover: Links scale 1.05, color shift to purple

---

### 2. Hero Section

**Layout:**
- Full viewport height (min-height: 100vh)
- Centered content
- Particle background effect
- Gradient overlay

**Components:**
- Main heading: 48px-72px, Space Grotesk, bold
- Subheading: 18px-20px, regular weight, muted color
- CTA buttons: Primary + Secondary
- Stats bar: 3-4 metrics with animated counters

**Background Effect:**
- Animated particle dots
- Purple/blue glow effects
- Subtle gradient movement

---

### 3. Service Cards (Bento Grid Layout)

**Card Structure:**
- Glass morphism background
- Border: 1px solid rgba(255,255,255,0.1)
- Border radius: 16px
- Padding: 24px-32px
- Backdrop filter: blur(8px)

**Card Variants:**Small:      1 column x 1 row
Medium:     2 columns x 1 row
Large:      2 columns x 2 rows
Tall:       1 column x 2 rows

**Card Content:**
- Icon/Number: Top left, 48px
- Title: 24px, semibold
- Description: 16px, muted
- Arrow icon: Bottom right
- Hover: Lift effect, glow increase

**Hover Effect:**
```csstransform: translateY(-8px);
box-shadow: 0 20px 60px rgba(147, 51, 234, 0.4);

---

### 4. Feature Sections

**Layout Pattern:**
- Alternating left-right content
- 50/50 split on desktop
- Stack on mobile

**Content Side:**
- Heading: 36px-48px
- Description: 18px, line-height 1.6
- Feature list: Checkmarks, 16px
- CTA button

**Visual Side:**
- Screenshot/illustration
- Floating effect
- Shadow and glow
- Optional: Video/animation

---

### 5. Buttons

**Primary Button:**
```cssbackground: linear-gradient(135deg, #9333EA, #3B82F6);
padding: 12px 32px;
border-radius: 8px;
font-weight: 600;
transition: all 0.3s;&:hover {
transform: scale(1.05);
box-shadow: 0 8px 24px rgba(147, 51, 234, 0.4);
}

**Secondary Button:**
```cssbackground: transparent;
border: 2px solid rgba(147, 51, 234, 0.5);
padding: 12px 32px;
border-radius: 8px;&:hover {
border-color: #9333EA;
background: rgba(147, 51, 234, 0.1);
}

**Ghost Button:**
```cssbackground: transparent;
color: #A855F7;
padding: 12px 24px;&:hover {
background: rgba(147, 51, 234, 0.1);
}

---

### 6. Cards & Containers

**Glass Card:**
```cssbackground: rgba(30, 41, 59, 0.6);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 16px;
padding: 32px;

**Glowing Card:**
```cssbackground: rgba(30, 41, 59, 0.8);
border: 1px solid rgba(147, 51, 234, 0.3);
box-shadow:
0 0 40px rgba(147, 51, 234, 0.2),
inset 0 0 20px rgba(147, 51, 234, 0.1);

---

### 7. Input Fields

**Text Input:**
```cssbackground: rgba(30, 41, 59, 0.6);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 8px;
padding: 12px 16px;
color: #F1F5F9;&:focus {
border-color: #9333EA;
box-shadow: 0 0 0 3px rgba(147, 51, 234, 0.2);
}

---

### 8. Statistics/Metrics

**Counter Display:**
- Large number: 48px, bold, gradient text
- Label: 14px, muted
- Animated count-up on scroll into view
- Optional: Icon or symbol

**Layout:**
- Horizontal row on desktop
- Stack on mobile
- Equal spacing
- Dividers between items

---

### 9. Testimonials

**Card Style:**
- Quote icon: Top left
- Quote text: 18px, italic
- Author info: Name, title, company
- Photo: 48px circle, left of info
- Rating stars (optional)

**Layout:**
- Carousel/slider on mobile
- 3-column grid on desktop
- Auto-rotate (optional)

---

### 10. Footer

**Structure:**
- 4-column grid on desktop
- Stack on mobile
- Dark background (#0F172A)
- Top border: Gradient line

**Sections:**
- Company info + logo
- Quick links
- Services
- Contact info
- Social media icons

**Bottom Bar:**
- Copyright
- Privacy policy
- Terms of service
- Back to top button

---

## Animations & Interactions

### Scroll Animations

**Fade In Up:**Initial: opacity 0, translateY(40px)
Animate: opacity 1, translateY(0)
Duration: 0.6s
Easing: ease-out

**Scale In:**Initial: opacity 0, scale(0.9)
Animate: opacity 1, scale(1)
Duration: 0.5s

**Stagger Children:**Parent delay: 0s
Child delay: 0.1s increment

### Hover Animations

**Card Hover:**
- Transform: translateY(-8px)
- Shadow: Increase glow
- Border: Brighten color
- Duration: 0.3s

**Button Hover:**
- Transform: scale(1.05)
- Shadow: Add glow
- Background: Slight brighten
- Duration: 0.2s

**Link Hover:**
- Color: Shift to purple
- Transform: translateX(4px) for arrows
- Underline: Expand from left

### Page Transitions
- Fade in/out: 0.3s
- Smooth scroll behavior
- Loading states with skeleton screens

### Micro-interactions
- Button press: Scale down to 0.95
- Input focus: Glow effect
- Checkbox: Checkmark animation
- Toggle: Slide animation

---

## Responsive Design

### Breakpoints
```cssmobile:       320px - 639px
tablet:       640px - 1023px
desktop:      1024px - 1279px
large:        1280px - 1535px
xlarge:       1536px+

### Mobile Adaptations
- Stack all columns
- Full-width buttons
- Hamburger menu
- Simplified animations
- Touch-friendly (44px min tap target)
- Reduced padding/margins

### Tablet Adaptations
- 2-column layouts
- Condensed navigation
- Adjusted font sizes
- Optimized images

### Desktop Enhancements
- Multi-column layouts
- Advanced hover effects
- Larger typography
- More whitespace
- Parallax effects (optional)

---

## Accessibility

### Color Contrast
- Minimum 4.5:1 for body text
- Minimum 3:1 for large text
- Ensure readability on all backgrounds

### Keyboard Navigation
- All interactive elements accessible via Tab
- Focus indicators clearly visible
- Skip to main content link
- Logical tab order

### Screen Readers
- Semantic HTML5 elements
- ARIA labels where needed
- Alt text for all images
- Descriptive link text

### Motion
- Respect prefers-reduced-motion
- Disable animations if requested
- Ensure functionality without animations

### Forms
- Clear labels
- Error messages
- Success feedback
- Visible focus states

---

## Design Assets

### Icons
- Use Lucide React or Heroicons
- 24px standard size
- Consistent stroke width (2px)
- Monochrome or gradient fill

### Images
- High-quality, optimized
- WebP format preferred
- Lazy loading
- Proper alt text
- Aspect ratios maintained

### Illustrations
- Consistent style (flat, gradient, or 3D)
- Purple/blue color scheme
- Technology/AI themed
- SVG format when possible

---

## Brand Voice & Messaging

### Tone
- Professional yet approachable
- Innovative and forward-thinking
- Confident but not arrogant
- Clear and concise

### Key Messages
- "Building Digital Solutions That Matter"
- AI-driven transformation
- Scalable and future-proof
- Trusted by industry leaders

---

## Implementation Checklist

- [ ] Set up design tokens (colors, spacing, typography)
- [ ] Create component library in Figma
- [ ] Build reusable UI components
- [ ] Implement animation system
- [ ] Test responsive layouts
- [ ] Validate accessibility
- [ ] Optimize performance
- [ ] Cross-browser testing
- [ ] Get client approval on mockups
- [ ] Hand off to development

---

**Document prepared by:** CascadingXol Private Limited  
**For project:** TAMx Website Development  
**Reference:** antimatter.ai  
**Status:** Ready for development