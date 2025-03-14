# Spectrum AI Labs Website

A modern, high-performance website for Spectrum AI Labs showcasing AI solutions and services with interactive elements and smooth animations.

![Spectrum AI Labs](https://spectrum-ai-labs.com/og-image.png)

## 🚀 Features

- **Modern Design**: Sleek, responsive UI with dark theme and animated elements
- **Performance Optimized**: Dynamic imports, code splitting, and optimized loading sequences
- **Interactive Elements**:
  - Animated workflow visualization
  - Chat simulation component
  - Voice waveform visualization
  - Metrics chart with dynamic data
- **Comprehensive Sections**:
  - Hero with animated background
  - About us with company overview
  - Services showcase with interactive cards
  - Process visualization with step-by-step animation
  - Industries served with detailed use cases
  - Team profiles with hover effects
  - Testimonials carousel
  - Pricing plans with feature comparison
  - FAQ with expandable answers
  - Contact form with multi-step process
- **Calendar Integration**: Cal.com booking system for scheduling meetings
- **Animations**: Smooth transitions and micro-interactions using Framer Motion
- **SEO Optimized**: Meta tags, semantic HTML, and performance optimizations

## 📂 Project Structure

```
spectrum-ai-labs-website/
├── public/               # Static assets
│   ├── fonts/            # Custom fonts
│   │   ├── images/           # Image assets
│   │   └── logos/            # Company and partner logos
│   │   └── pricing/          # Pricing-related assets
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── layout/       # Layout components (Navbar, Footer, etc.)
│   │   │   ├── sections/     # Main page sections
│   │   │   └── ui/           # Reusable UI components
│   │   ├── pages/            # Next.js pages
│   │   ├── styles/           # Global styles and theme
│   │   └── types/            # TypeScript type definitions
│   ├── .env                  # Environment variables
│   ├── next.config.js        # Next.js configuration
│   ├── package.json          # Dependencies and scripts
│   └── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 🧩 Key Components

### Layout Components
- **Navbar**: Navigation with smooth scrolling to sections
- **Footer**: Site links, social media, and contact information
- **AnimatedBackground**: Dynamic particle background
- **LoadingScreen**: Initial loading animation
- **DelayedFooter**: Footer with delayed rendering for performance

### UI Components
- **GlowingButton**: Button with glow effect on hover
- **GradientButton**: Button with gradient background
- **CalendarBooking**: Cal.com calendar integration wrapper

### Interactive Components
- **ChatSimulation**: Simulated AI chat interface
- **VoiceWaveform**: Audio visualization component
- **WorkflowAnimation**: Animated workflow process visualization
- **MetricsChart**: Dynamic data visualization

### Page Sections
- **Hero**: Main landing section with call-to-action
- **About**: Company overview and mission
- **Services**: AI service offerings with details
- **Process**: Step-by-step workflow visualization
- **Industries**: Industry-specific AI solutions
- **Team**: Team member profiles
- **Testimonials**: Client testimonials and success stories
- **Pricing**: Service tiers and pricing options
- **FAQ**: Frequently asked questions
- **Contact**: Multi-step contact form with calendar booking

## 🛠️ Technologies

- **Framework**: Next.js 15.1.7
- **UI Library**: React 19.0.0
- **Language**: TypeScript 5
- **Styling**: 
  - Tailwind CSS 3.4.1
  - CSS Modules
- **Animations**: Framer Motion 12.4.7
- **Icons**: 
  - Heroicons 2.2.0
  - React Icons 5.5.0
- **UI Components**: Headless UI 2.2.0
- **Calendar Integration**: Cal.com Embed React 1.5.2
- **Development Tools**:
  - ESLint 9
  - PostCSS 8

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/spectrum-ai-labs-website.git
   cd spectrum-ai-labs-website
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_CAL_NAMESPACE=your-cal-namespace
   NEXT_PUBLIC_CAL_LINK=your-cal-link
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Building for Production

```bash
npm run build
# or
yarn build
```

To start the production server:
```bash
npm run start
# or
yarn start
```

## 📱 Cal.com Calendar Integration

The website includes Cal.com calendar integration for scheduling meetings:

1. Create an account on [Cal.com](https://cal.com)
2. Set up your availability and event types
3. Update the `.env` file with your Cal.com details
4. The integration is implemented in `src/components/ui/CalendarBooking.tsx`
5. The calendar is displayed in the Contact section

## 🧪 Performance Optimization

- Dynamic imports for non-critical components
- Lazy loading of sections below the fold
- Optimized loading sequence with prioritized critical content
- Reduced initial bundle size through code splitting
- Animated background with optimized rendering

## 🔧 Customization

### Styling

The project uses Tailwind CSS for styling. Customize the design by modifying:
- `tailwind.config.ts` - Theme colors, fonts, and other design tokens
- `src/styles/globals.css` - Global styles and custom CSS

### Content

Update the website content by modifying the section components in:
- `src/components/sections/`

### Adding New Sections

1. Create a new component in `src/components/sections/`
2. Import and add it to the main page in `src/pages/index.tsx`

## 📄 License

[MIT](LICENSE)

## 👥 Contributors

- [Your Name](https://github.com/yourusername)

## 🔗 Links

- [Live Demo](https://spectrum-ai-labs.com)
- [GitHub Repository](https://github.com/your-username/spectrum-ai-labs-website)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
#   s p e c t r u m - a i - l a b s 
 
 