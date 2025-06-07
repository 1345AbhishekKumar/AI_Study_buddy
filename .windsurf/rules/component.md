---
trigger: model_decision
description: a description for components 
---

# Component Development Rules

## General Component Guidelines

### 1. Component Structure
- Use functional components with hooks exclusively
- Follow the Single Responsibility Principle
- Keep components under 200 lines of code
- Extract complex logic into custom hooks
- Use TypeScript interfaces for all props

### 2. Naming Conventions
- Use PascalCase for component names
- Use descriptive names that indicate purpose
- Prefix custom hooks with "use"
- Use kebab-case for file names
- Group related components in folders

### 3. Component Architecture
```typescript
// Example component structure
interface ComponentProps {
  // Props definition
}

export const Component: React.FC<ComponentProps> = ({
  // Destructured props
}) => {
  // Hooks (useState, useEffect, custom hooks)
  // Event handlers
  // Computed values
  // Early returns for loading/error states
  
  return (
    // JSX with proper accessibility
  );
};

Component.displayName = 'Component';
export default Component;
```

## Specific Component Types

### 1. UI Components (src/components/ui/)
- Build on top of shadcn/ui components
- Make components highly reusable and composable
- Include proper TypeScript variants
- Implement proper forwarding of refs
- Include comprehensive prop documentation

### 2. Feature Components (src/components/features/)
- Handle specific application features
- Can consume multiple UI components
- Manage their own state when needed
- Handle business logic interactions

### 3. Layout Components (src/components/layout/)
- Handle page structure and navigation
- Implement responsive design patterns
- Manage global UI state (theme, sidebar, etc.)

### 4. AI-Specific Components
- Handle loading states for AI operations
- Implement streaming text display
- Include error handling for AI failures
- Provide feedback for long-running operations

## Component Best Practices

### 1. Props and State
```typescript
// Use proper TypeScript interfaces
interface StudySessionProps {
  sessionId: string;
  userId: string;
  onComplete?: (result: StudyResult) => void;
  className?: string;
}

// Use default props when appropriate
const StudySession: React.FC<StudySessionProps> = ({
  sessionId,
  userId,
  onComplete,
  className = ''
}) => {
  // Component logic
};
```

### 2. Event Handling
```typescript
// Use proper event typing
const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  // Handle submission
}, [dependencies]);

// Avoid inline functions in render
const handleClick = useCallback(() => {
  // Handle click
}, [dependencies]);
```

### 3. Conditional Rendering
```typescript
// Use early returns for loading states
if (isLoading) {
  return <LoadingSpinner />;
}

if (error) {
  return <ErrorMessage error={error} />;
}

// Use logical operators for simple conditions
return (
  <div>
    {user && <WelcomeMessage user={user} />}
    {items.length > 0 && (
      <ItemList items={items} />
    )}
  </div>
);
```

### 4. Accessibility Requirements
- Include proper ARIA labels and roles
- Ensure keyboard navigation works
- Implement proper focus management
- Use semantic HTML elements
- Test with screen readers

### 5. Performance Optimization
- Use React.memo for expensive components
- Implement proper key props for lists
- Use useCallback and useMemo appropriately
- Lazy load heavy components
- Optimize re-renders with proper dependencies

## Component Testing
- Test component rendering
- Test user interactions
- Test accessibility
- Mock external dependencies
- Test error states and edge cases

## File Organization
```
components/
├── ui/                 # Basic UI components
│   ├── Button/
│   ├── Input/
│   └── Modal/
├── features/          # Feature-specific components
│   ├── StudySession/
│   ├── AIChat/
│   └── Progress/
├── layout/           # Layout components
│   ├── Header/
│   ├── Sidebar/
│   └── Footer/
└── common/           # Common components
    ├── LoadingSpinner/
    ├── ErrorBoundary/
    └── NotFound/
```