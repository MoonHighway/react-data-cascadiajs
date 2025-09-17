#!/bin/bash

# Script to update all package.json files with latest React 19 and Next.js 15

# Define the folders to update
folders=(
  "01-server-components/checkpoint"
  "01-server-components/complete"
  "02-react-patterns/start"
  "02-react-patterns/checkpoint"
  "02-react-patterns/complete"
  "03-tanstack-query/start"
  "03-tanstack-query/checkpoint"
  "03-tanstack-query/complete"
  "04-advanced-patterns/start"
  "04-advanced-patterns/checkpoint"
  "04-advanced-patterns/complete"
)

# Function to update package.json
update_package_json() {
  local folder=$1
  local port=$2

  echo "Updating $folder..."

  # Update package.json
  cat > "$folder/package.json" << EOF
{
  "name": "$(basename "$folder" | tr '/' '-')",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p $port",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "lucide-react": "^0.454.0",
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/node": "^22",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "autoprefixer": "^10.4.20",
    "eslint": "^9",
    "eslint-config-next": "^15.0.0",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.14",
    "typescript": "^5.6.3"
  }
}
EOF

  # Update next.config.js if it exists
  if [ -f "$folder/next.config.js" ]; then
    cat > "$folder/next.config.js" << EOF
/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: [],
}

module.exports = nextConfig
EOF
  fi
}

# Update TanStack Query folders (need additional dependencies)
update_tanstack_package_json() {
  local folder=$1
  local port=$2

  echo "Updating $folder (with TanStack Query)..."

  # Update package.json with TanStack Query
  cat > "$folder/package.json" << EOF
{
  "name": "$(basename "$folder" | tr '/' '-')",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p $port",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@tanstack/react-query": "^5.59.0",
    "@tanstack/react-query-devtools": "^5.59.0",
    "clsx": "^2.1.1",
    "lucide-react": "^0.454.0",
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/node": "^22",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "autoprefixer": "^10.4.20",
    "eslint": "^9",
    "eslint-config-next": "^15.0.0",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.14",
    "typescript": "^5.6.3"
  }
}
EOF

  # Update next.config.js if it exists
  if [ -f "$folder/next.config.js" ]; then
    cat > "$folder/next.config.js" << EOF
/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: [],
}

module.exports = nextConfig
EOF
  fi
}

# Update each folder with appropriate port
port=3002
for folder in "${folders[@]}"; do
  if [[ $folder == *"tanstack"* ]] || [[ $folder == *"advanced"* ]]; then
    update_tanstack_package_json "$folder" "$port"
  else
    update_package_json "$folder" "$port"
  fi
  port=$((port + 1))
done

echo "All package.json files updated!"
echo "Run 'npm install' in each folder to install the new dependencies."