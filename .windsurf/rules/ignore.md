---
trigger: always_on
---

# Dependencies

node_modules/
.pnp
.pnp.js

# Production builds

.next/
out/
build/
dist/

# Environment variables

.env\*
.env
!.env.example

# Database

_.db
_.sqlite
/prisma/migrations/dev.db\*

# Logs

npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# Runtime data

pids
_.pid
_.seed
\*.pid.lock

# Coverage directory used by tools like istanbul

coverage/
\*.lcov

# IDE files

.vscode/
.idea/
_.swp
_.swo
\*~

# OS generated files

.DS*Store
.DS_Store?
.*\*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Medical data (if any test files)

/test-data/
/sample-medical-records/

# Temporary files

_.tmp
_.temp
/temp/
