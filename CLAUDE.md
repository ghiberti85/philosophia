# Claude Code Development Guidelines for Philosophia

## Git Workflow (MANDATORY)

All feature implementations must follow this workflow:

### 1. Create Feature Branch
```bash
git checkout -b claude/<feature-name>
```

### 2. Make Commits
- Clear, descriptive commit messages
- Format: `feat(area): description` or `fix(area): description`
- Include `Co-Authored-By: Claude <noreply@anthropic.com>` footer

Example:
```
feat(i18n): traduzir nomes dos filósofos para português

Descrição detalhada das mudanças...

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_xxx
```

### 3. Open Pull Request
```bash
git push -u origin claude/<feature-name>
gh pr create --title "Feature title" --body "PR description"
```

### 4. Merge to Main
After PR review/approval:
```bash
gh pr merge <PR-NUMBER> --merge
```

### 5. Vercel Auto-Deploy
- Merging to `main` automatically triggers Vercel deployment
- Check deployment status: https://vercel.com/ghiberti85s-projects/philosophia

---

## DO NOT
- ❌ Push directly to `main` without PR
- ❌ Skip PR creation for any feature
- ❌ Force push to `main`
- ❌ Commit without clear messages

## DO
- ✅ Always create feature branch
- ✅ Always open PR before merge
- ✅ Always merge via `gh pr merge` (not manual merge)
- ✅ Wait for build to complete on Vercel

---

## Code Standards

### TypeScript
- Strict mode enabled
- No `any` types
- All text fields must be `Localized` type: `{ en: string; pt: string }`

### Components
- Bilingual by default: accept `locale: Locale` prop
- Use `t()` function for all translatable strings
- Example:
  ```ts
  <span>{t(philosopher.name, locale)}</span>
  ```

### New Types
If adding a new data structure:
1. Define in `src/data/types.ts`
2. All user-facing text must be `Localized`
3. Run `npm test` to validate

### Documentation
- Update `docs/ADDING-CONTENT.md` when adding new content types
- Update `docs/ARCHITECTURE.md` if changing component structure
- Examples: philosopher name is `Localized`, events have bilingual names, etc.

---

## Testing Before Merge

```bash
npm run build        # Full build check
npm test             # Content integrity + unit tests
```

Both must pass before creating PR.

---

## Key Files

- **Data**: `src/data/` (philosophers, schools, quizzes, events, historical data)
- **Components**: `src/components/` (UI, modals, panels)
- **Styling**: `src/components/dashboard/dashboard.css`
- **i18n**: `src/lib/i18n.ts` (translation function `t()`)
- **Documentation**: `docs/` (guides for future dev)

---

## Current Feature State

- ✅ 8 schools with 23 philosophers
- ✅ Historical events timeline (with bilingual names, SVG icons)
- ✅ Philosopher names in Portuguese (Localized)
- ✅ PWA support with custom icons
- ✅ All text fully bilingual (EN/PT-BR)

---

**Last Updated**: 2026-06-22
**Updated By**: Claude Haiku 4.5
**Session**: https://claude.ai/code/session_011QduBMDeUJ6AoFUno8fRZL
