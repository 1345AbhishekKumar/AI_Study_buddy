---
trigger: manual
---

ai-study-buddy/
├── .github/                  # GitHub workflows and issue templates
├── .husky/                   # Git hooks
├── public/                   # Static assets
│   ├── images/               # App images
│   ├── fonts/                # Custom fonts
│   └── robots.txt            # SEO configuration
├── src/
│   ├── app/                  # App router (Next.js 13+)
│   │   ├── (auth)/           # Authentication routes
│   │   ├── (main)/           # Main app routes
│   │   ├── api/              # API routes
│   │   │   ├── ai/           # AI-specific endpoints
│   │   │   ├── auth/         # Authentication endpoints
│   │   │   └── ...           # Other API endpoints
│   │   └── layout.tsx        # Root layout
│   ├── components/           # Reusable components
│   │   ├── ui/               # UI primitives (buttons, inputs)
│   │   ├── ai/               # AI-specific components
│   │   └── ...               # Other components
│   ├── config/               # App configuration
│   │   ├── constants.ts      # App constants
│   │   └── routes.ts         # Route definitions
│   ├── contexts/             # React contexts
│   ├── hooks/                # Custom hooks
│   ├── lib/                  # Utility libraries
│   │   ├── ai/               # AI utilities
│   │   ├── api/              # API clients
│   │   └── ...               # Other utilities
│   ├── models/               # TypeScript interfaces/types
│   ├── services/             # Business logic services
│   ├── stores/               # State management (Zustand/Jotai)
│   ├── styles/               # Global styles
│   ├── test/                 # Test utilities
│   └── utils/                # Helper functions
├── .env.local                # Local environment variables
├── .env.production           # Production environment variables
├── next.config.js            # Next.js configuration
├── package.json              # Project dependencies
└── tsconfig.json             # TypeScript configuration