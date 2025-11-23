# BCI Scenario Planning Dashboard - Project Documentation

## Project Overview

This is an interactive web-based educational dashboard demonstrating the complete 8-stage scenario planning methodology using Brain-Computer Interfaces (BCI) as the focal question. It serves as a comprehensive pedagogical tool for teaching strategic scenario planning at the MBA level.

**Purpose**: Educational demonstration of scenario planning methodology in practice
**Owner**: Gustomind.ai (Dr. Bruno Oliveira)
**Target Audience**: University of Bath MN32041 Strategic Management students
**Copyright**: © 2025 Gustomind.ai. All Rights Reserved.

## Live Deployment

**Production URL**: https://bci-dashboard-1ar5g6hzm-brunos-projects-452d4835.vercel.app

**Routes**:
- `/` - Landing page (GustoMind AI Lab homepage)
- `/mn32041/bci-scenarios-intro` - Introduction version (Stages 1-4 only)
- `/mn32041/bci-scenarios-dashboard` - Full dashboard (All 8 stages)

## Technical Stack

### Core Technologies
- **React** 19.1.1 - UI framework
- **React Router DOM** 7.9.5 - Client-side routing
- **Vite** 7.1.7 - Build tool and dev server
- **Tailwind CSS** 3.4.18 - Utility-first CSS framework
- **Lucide React** 0.552.0 - Icon library

### Development Tools
- **ESLint** - Code linting
- **PostCSS** & **Autoprefixer** - CSS processing
- **Git** - Version control
- **Vercel CLI** - Deployment management

## Project Structure

```
bci-dashboard/
├── src/
│   ├── App.jsx                              # Main app with routing
│   ├── BCIScenarioPlanning.jsx              # Full dashboard (8 stages)
│   ├── BCIScenarioPlanning_Part1_Final.jsx  # Intro dashboard (4 stages)
│   ├── pages/
│   │   └── LandingPage.jsx                  # GustoMind AI Lab landing page
│   ├── assets/                              # Images and media
│   ├── index.css                            # Global styles
│   └── main.jsx                             # App entry point
├── public/                                   # Static assets
├── vercel.json                              # Vercel deployment config
├── vite.config.js                           # Vite configuration
├── tailwind.config.js                       # Tailwind CSS config
├── package.json                             # Dependencies
└── PROJECT_DOCUMENTATION.md                 # This file
```

## Key Features

### 1. Interactive 8-Stage Scenario Planning Process
1. **Stage 1: Scenario Scope** - Define focal question and time horizon
2. **Stage 2: Key Factors** - PESTLE analysis with interactive mindmap
3. **Stage 3: Driving Forces** - Impact vs uncertainty matrix
4. **Stage 4: Scenario Logic** - Critical uncertainties on 2x2 matrix
5. **Stage 5: Scenario Narratives** - Four detailed future scenarios
6. **Stage 6: Implications** - Strategic implications for each scenario
7. **Stage 7: Indicators** - Early warning signs and monitoring
8. **Stage 8: Strategy** - Strategic options and robust strategies

### 2. Two Dashboard Versions
- **Intro Version** (`BCIScenarioPlanning_Part1_Final.jsx`): Stages 1-4 for initial teaching
- **Full Version** (`BCIScenarioPlanning.jsx`): All 8 stages for complete methodology

### 3. Interactive Visualizations

#### Mindmap View (Stage 2)
- **Default view**: Mindmap opens by default (not list view)
- **Hover tooltips**: Detailed explanations appear on hover
- **Info banner**: Blue banner with lightbulb icon explains interactivity
- **PESTLE categories**: Color-coded Political, Economic, Social, Technological, Legal, Environmental factors
- **Category filtering**: Filter by specific PESTLE categories

#### Impact-Uncertainty Matrix (Stage 3)
- Interactive scatter plot with hover details
- Color-coded by PESTLE category
- Bubble size represents relative importance

#### Critical Uncertainties Matrix (Stage 4)
- 2x2 matrix visualization
- Interactive selection of key uncertainties

### 4. Visual Assets
- **BCI Image**: Brain-computer interface visualization (800px max width)
- **Scenario Images**: Four unique images for each scenario in Stage 6:
  - Augmented Humanity (pink border)
  - Neural Divide (purple border)
  - Regulated Revolution (blue border)
  - Tech Restraint (green border)

### 5. Branding & Attribution
- **Title**: Bright pink color (#e800c5) for visibility
- **Top Attribution**: Dashboard created by Dr. Bruno Oliveira with AI assistance
- **Copyright Notices**: "© 2025 Gustomind.ai. All Rights Reserved." in both top and footer
- **Footer**: Complete attribution with University of Bath affiliation

### 6. Landing Page
- GustoMind AI Lab branding
- "MBA-Level AI Strategy, Simplified" tagline
- Professional purple gradient design
- Direct link access model
- Link to gustomind.ai website

## Development Workflow

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Runs on http://localhost:5173

# Build for production
npm run build

# Preview production build
npm preview
```

### Git Repository

The project is version-controlled with Git:

```bash
# View current status
git status

# View commit history
git log --oneline

# View recent commits
git log --oneline -5

# Create a new commit
git add .
git commit -m "Your commit message"
```

**Recent Commits**:
1. Set mindmap as default view for Stage 2 in intro dashboard
2. Update footer copyright to Gustomind.ai
3. Add copyright notice and mindmap info banners to both dashboard versions
4. Update Introduction styling with bright pink title and white text

## Deployment to Vercel

### Vercel Configuration

**File**: `vercel.json`
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This configuration ensures client-side routing works properly - all routes redirect to index.html for React Router to handle.

### Deployment Process

```bash
# Deploy to production
vercel --prod

# View all deployments
vercel ls

# Check logs for a specific deployment
vercel inspect [deployment-url] --logs
```

### Automatic Deployments
Each `vercel --prod` command creates a new production deployment with a unique URL. Vercel automatically:
- Builds the project using Vite
- Optimizes assets
- Generates a production-ready build
- Deploys to global CDN
- Provides instant rollback capability

### Deployment Timeline
- **Initial deployment**: Basic dashboard structure
- **Mid-project**: Added BCI image, scenario images, PESTLE mindmap
- **Recent updates**: Copyright notices, mindmap default view, info banners
- **Latest**: Mindmap as default for intro dashboard

## Making Changes

### To Update Content

1. **Edit the appropriate file**:
   - Intro dashboard: `src/BCIScenarioPlanning_Part1_Final.jsx`
   - Full dashboard: `src/BCIScenarioPlanning.jsx`
   - Landing page: `src/pages/LandingPage.jsx`

2. **Test locally**:
   ```bash
   npm run dev
   ```

3. **Commit changes**:
   ```bash
   git add [files]
   git commit -m "Description of changes"
   ```

4. **Deploy to production**:
   ```bash
   vercel --prod
   ```

### Common Customizations

#### Change Default View (List vs Mindmap)
```javascript
// In BCIScenarioPlanning.jsx or BCIScenarioPlanning_Part1_Final.jsx
const [viewType, setViewType] = useState('mindmap'); // or 'list'
```

#### Update Copyright Notice
Search for "© 2025 Gustomind.ai" and update the year or company name in:
- Top attribution section (around line 560)
- Footer section (around line 4635)

#### Add New Images
1. Place images in `src/assets/` or `public/`
2. Import in component: `import myImage from './assets/myImage.png'`
3. Use in JSX: `<img src={myImage} alt="Description" />`

#### Modify Colors
Key color variables used:
- Title pink: `#e800c5`
- Purple background: `rgba(45, 3, 234, 0.35)`
- Scenario borders: Pink, purple, blue, green (search for border colors in Stage 6)

## Important Design Decisions

### 1. Mindmap as Default
**Rationale**: The mindmap view is more engaging and visual than the list view, making it better for first-time users. Students can hover over factors to see detailed explanations, which is more interactive than reading a list.

**Implementation**: Changed `useState('list')` to `useState('mindmap')` in both dashboard files.

### 2. Copyright Protection
**Rationale**: Clear copyright notices establish Gustomind.ai's intellectual property ownership, preventing university claims of ownership. Two placement locations ensure visibility.

**Implementation**:
- Top section: Below "Dashboard created by" with pedagogical note
- Footer: Standalone copyright notice at page bottom

### 3. Two Dashboard Versions
**Rationale**:
- **Intro version**: Allows teaching Stages 1-4 without overwhelming students
- **Full version**: Complete methodology for advanced learning

Both versions share the same structure and styling for consistency.

### 4. Interactive Tooltips
**Rationale**: Hover-based explanations keep the interface clean while providing depth on demand. The info banner trains users to discover this functionality.

**Implementation**: Blue banner with lightbulb icon above mindmap view.

### 5. Client-Side Routing
**Rationale**: Single-page application (SPA) provides instant navigation without page reloads. Vercel rewrites ensure direct URL access works.

**Implementation**: React Router with Vercel rewrites configuration.

## Reusing This Project for Other Clients

### Adaptation Steps

1. **Clone and Rename**:
   ```bash
   cp -r bci-dashboard new-client-dashboard
   cd new-client-dashboard
   ```

2. **Update Package.json**:
   - Change `name` field
   - Update `description`

3. **Customize Content**:
   - Replace BCI focal question with client's strategic question
   - Update all 8 stages with client-specific content
   - Replace images with client-relevant visuals
   - Modify PESTLE factors for client's industry

4. **Update Branding**:
   - Change title and colors to match client brand
   - Update copyright notices
   - Modify landing page content
   - Replace GustoMind AI Lab branding (or keep it)

5. **Deploy to New Vercel Project**:
   ```bash
   vercel # First deployment creates new project
   vercel --prod # Production deployment
   ```

6. **Custom Domain** (Optional):
   ```bash
   vercel domains add client-domain.com
   ```

### Client Customization Checklist

- [ ] Update focal question and scenario scope
- [ ] Replace PESTLE factors with industry-specific factors
- [ ] Rewrite driving forces for client context
- [ ] Create new critical uncertainties matrix
- [ ] Develop 4 new scenario narratives
- [ ] Generate scenario-specific images
- [ ] Update implications for client's business
- [ ] Define relevant indicators
- [ ] Propose client-specific strategies
- [ ] Modify colors to match client brand
- [ ] Update copyright to client name
- [ ] Set up new Vercel project
- [ ] Configure custom domain (if needed)

## Technical Notes

### State Management
React hooks (`useState`, `useEffect`, `useRef`) manage:
- `activeStage`: Current stage being viewed (-1 = intro)
- `viewType`: 'list' or 'mindmap' for Stage 2
- `selectedCategory`: PESTLE filter ('all' or specific category)
- `selectedUncertainty`: Selected uncertainty in Stage 4
- `hoveredDriver`: Currently hovered factor in mindmap

### Responsive Design
Tailwind CSS utility classes provide:
- Mobile-first responsive breakpoints
- Flexible layouts that adapt to screen size
- Touch-friendly interactive elements
- Readable typography at all sizes

### Performance Optimizations
- Vite's fast HMR (Hot Module Replacement) for development
- Optimized production builds with code splitting
- Lazy loading of images
- CSS purging removes unused Tailwind classes

### Browser Compatibility
Tested and working on:
- Chrome/Edge (Chromium)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Issue: Routes not working after deployment
**Solution**: Ensure `vercel.json` has the rewrites configuration to redirect all routes to index.html.

### Issue: Images not loading
**Solution**:
1. Check image imports are correct
2. Ensure images are in `src/assets/` or `public/`
3. Verify build includes images in dist folder

### Issue: Mindmap hover not working
**Solution**: Check that `onMouseEnter` and `onMouseLeave` handlers are attached to the factor elements.

### Issue: Stage not opening
**Solution**: Verify `setActiveStage(stageNumber)` is called correctly in the button's onClick handler.

### Issue: Development server not starting
**Solution**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## Future Enhancement Ideas

### Potential Features
1. **Export Functionality**: Download scenarios as PDF or Word document
2. **Collaborative Editing**: Multiple users working on scenarios together
3. **Template Library**: Pre-built scenario templates for different industries
4. **AI-Powered Suggestions**: AI-generated factors, uncertainties, scenarios
5. **Progress Tracking**: Save user progress through the 8 stages
6. **Comments & Notes**: Allow students to annotate and comment
7. **Comparison View**: Compare multiple scenario sets side-by-side
8. **Mobile App**: Native iOS/Android versions
9. **Integration**: Connect with learning management systems (LMS)
10. **Analytics Dashboard**: Track how students use the tool

### Technical Improvements
1. **TypeScript**: Add type safety for better development experience
2. **Testing**: Jest + React Testing Library for unit tests
3. **Accessibility**: WCAG 2.1 AA compliance for screen readers
4. **Internationalization**: Multi-language support
5. **Dark Mode**: Toggle between light and dark themes
6. **Print Styles**: Optimized printing of scenarios
7. **Offline Mode**: Service worker for offline access
8. **Database**: Backend to store user-created scenarios

## Contact & Support

**Creator**: Dr. Bruno Oliveira
**Company**: Gustomind.ai
**Website**: https://www.gustomind.ai
**University**: University of Bath, School of Management
**Course**: MN32041 Strategic Management

---

## Version History

### v1.3 (Current) - November 2025
- Set mindmap as default view for Stage 2 in both dashboards
- Added interactive info banners with lightbulb icon
- Updated copyright notices to Gustomind.ai in top and footer
- Bright pink title (#e800c5) for better visibility

### v1.2 - November 2025
- Added BCI image (800px max width)
- Added four scenario-specific images with color-coded borders
- Changed Stage 2 default view to mindmap
- Improved attribution text contrast (white color)

### v1.1 - November 2025
- Created intro dashboard version (Stages 1-4)
- Set up React Router with landing page
- Configured Vercel deployment with rewrites
- Established GustoMind AI Lab branding

### v1.0 - November 2025
- Initial full dashboard with all 8 stages
- PESTLE mindmap with hover tooltips
- Impact-uncertainty matrix visualization
- Critical uncertainties 2x2 matrix
- Four detailed scenario narratives
- Complete strategic implications and indicators

---

**Last Updated**: November 2025
**Document Version**: 1.0
**Maintained By**: Dr. Bruno Oliveira / Gustomind.ai
