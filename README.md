## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Structure

```bash
src/
├── app/                      # Next.js routes (page, layout, loading, error,...)
│   ├── dashboard/
│   │   ├── page.tsx
│   │   └── layout.tsx
│   └── settings/
│       └── page.tsx
│
├── features/                 # Mỗi tính năng (feature) độc lập, có UI và logic riêng
│   ├── dashboard/
│   │   ├── components/       # Các UI component riêng của Dashboard
│   │   │   ├── Sidebar.tsx
│   │   │   └── TopNav.tsx
│   │   ├── ui/DashboardFeature.tsx     # UI chính của Dashboard (feature-level)
│   │   └── hooks/            # Hooks riêng cho feature
│   │       └── useDashboard.ts
│   └── auth/
│       ├── LoginForm.tsx
│       ├── RegisterForm.tsx
│       └── hooks/
│           └── useAuth.ts
│
├── components/               # UI phụ, tái sử dụng khắp app (shared components)
│   ├── Button.tsx
│   ├── Modal.tsx
│   ├── Input.tsx
│   └── Card.tsx
│
│
└── styled-system/            # Cấu hình style (PandaCSS hoặc CSS System tương tự)
```
