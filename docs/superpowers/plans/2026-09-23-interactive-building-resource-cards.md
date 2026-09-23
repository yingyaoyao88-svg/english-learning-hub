# Interactive Building Resource Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homepage's rectangular website cards with mixed illustrated buildings that reveal one accessible floating resource flashcard at a time.

**Architecture:** Keep the existing resource model, API merge, filters, and submission workflow unchanged. Add a pure category-to-building mapping, a presentational SVG building component, an accessible flashcard, and a controlled building-card interaction owned by `ResourceDirectory` so only one resource can be open.

**Tech Stack:** React 19, TypeScript, Vinext, Tailwind CSS 4, inline SVG, Vitest, Testing Library.

**Spec:** `docs/superpowers/specs/2026-09-23-interactive-building-resource-cards-design.md`

## Global Constraints

- Preserve the existing search, category, level, and price filters.
- Preserve the resource API, submission, moderation, database, and external-link behavior.
- Use CSS and inline SVG only; add no image or animation dependency.
- Only one resource flashcard may be expanded at a time.
- Desktop flashcards float beside a building; mobile flashcards expand below it without horizontal overflow.
- Respect `prefers-reduced-motion` and retain full keyboard operation.
- Do not add maps, rooms, characters, points, progress, accounts, or social features.

## Review Focus

- An unrecognized category must render a safe learning-center building instead of crashing; Task 1 tests this fallback.
- A resource name containing punctuation or a long word must remain readable and must not alter SVG markup; Task 2 tests visible text rendering outside the SVG.
- Rapidly selecting two buildings must leave only the second flashcard open; Task 4 tests controlled single-selection behavior.
- Pressing Escape after opening must close the flashcard and restore focus to its building; Task 3 tests this keyboard contract.
- Changing search or category while a resource is open must close stale details; Task 4 tests filter-driven reset.

---

### Task 1: Define the building visual vocabulary

**Files:**
- Create: `lib/resources/buildings.ts`
- Create: `tests/building-types.test.ts`

**Interfaces:**
- Consumes: `ResourceCategory` from `lib/resources/types.ts`.
- Produces: `BuildingKind`, `BuildingTheme`, `buildingThemeFor(category: ResourceCategory | string, seed?: string): BuildingTheme`.

- [ ] **Step 1: Write the failing mapping tests**

```ts
import { describe, expect, it } from "vitest";
import { buildingThemeFor } from "@/lib/resources/buildings";

describe("buildingThemeFor", () => {
  it("maps resource categories to distinct building kinds", () => {
    expect(buildingThemeFor("listening").kind).toBe("clock-tower");
    expect(buildingThemeFor("reading").kind).toBe("bookshop");
    expect(buildingThemeFor("ielts").kind).toBe("academy-castle");
    expect(buildingThemeFor("github-skills").kind).toBe("inventor-workshop");
  });

  it("falls back to the learning center for an unknown category", () => {
    expect(buildingThemeFor("future-category").kind).toBe("learning-center");
  });

  it("uses the seed to choose a stable palette variant", () => {
    expect(buildingThemeFor("reading", "gutenberg")).toEqual(
      buildingThemeFor("reading", "gutenberg"),
    );
  });
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npx vitest run tests/building-types.test.ts --reporter=verbose`

Expected: FAIL because `@/lib/resources/buildings` does not exist.

- [ ] **Step 3: Implement the pure mapping**

```ts
import type { ResourceCategory } from "./types";

export type BuildingKind =
  | "learning-center" | "clock-tower" | "cafe-cabin" | "bookshop"
  | "writing-workshop" | "language-lab" | "office" | "academy-castle"
  | "international-academy" | "inventor-workshop";

export type BuildingTheme = {
  kind: BuildingKind;
  wall: string;
  roof: string;
  accent: string;
};

const kinds: Record<ResourceCategory, BuildingKind> = {
  general: "learning-center", listening: "clock-tower", speaking: "cafe-cabin",
  reading: "bookshop", writing: "writing-workshop", "vocabulary-grammar": "language-lab",
  business: "office", ielts: "academy-castle", toefl: "international-academy",
  "github-skills": "inventor-workshop",
};

const palettes = [
  { wall: "#f5d6a1", roof: "#b9553f", accent: "#ffcf65" },
  { wall: "#cfe4dd", roof: "#286b63", accent: "#f39a62" },
  { wall: "#d9d2ee", roof: "#68558f", accent: "#ffd46b" },
];

export function buildingThemeFor(category: ResourceCategory | string, seed = ""):
BuildingTheme {
  const score = [...seed].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return { kind: kinds[category as ResourceCategory] ?? "learning-center", ...palettes[score % palettes.length] };
}
```

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `npx vitest run tests/building-types.test.ts --reporter=verbose`

Expected: 3 tests PASS.

- [ ] **Step 5: Commit the mapping**

```bash
git add lib/resources/buildings.ts tests/building-types.test.ts
git commit -m "feat: map resource categories to buildings"
```

### Task 2: Render mixed illustrated buildings

**Files:**
- Create: `components/building-illustration.tsx`
- Create: `tests/building-illustration.test.tsx`

**Interfaces:**
- Consumes: `BuildingTheme` from `lib/resources/buildings.ts` plus `active: boolean`.
- Produces: `BuildingIllustration({ theme, active }: { theme: BuildingTheme; active: boolean })`.

- [ ] **Step 1: Write the failing presentation tests**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BuildingIllustration } from "@/components/building-illustration";
import { buildingThemeFor } from "@/lib/resources/buildings";

describe("BuildingIllustration", () => {
  it("labels the decorative building kind without putting website text in SVG", () => {
    const { container } = render(
      <BuildingIllustration theme={buildingThemeFor("reading", "A&B/LongName")} active={false} />,
    );
    expect(screen.getByLabelText("书店建筑")).toBeVisible();
    expect(container.querySelector("svg text")).toBeNull();
  });

  it("marks the building as lit when active", () => {
    render(<BuildingIllustration theme={buildingThemeFor("listening")} active />);
    expect(screen.getByLabelText("钟楼建筑")).toHaveAttribute("data-lit", "true");
  });
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npx vitest run tests/building-illustration.test.tsx --reporter=verbose`

Expected: FAIL because the component does not exist.

- [ ] **Step 3: Implement reusable SVG primitives and kind-specific details**

Create an SVG with a shared ground, body, roof, door, windows, and sign anchor. Use a `labels` record for Chinese accessible names. Switch only the structural details: clock face and tower for `clock-tower`, shelves/awning for `bookshop`, mugs/awning for `cafe-cabin`, turrets for castle/academy, gears/chimney for `inventor-workshop`, and a safe shared learning-center silhouette for fallback. Apply colors from `theme`, set `aria-label={labels[theme.kind]}`, `data-lit={String(active)}`, and keep all website text outside the SVG.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `npx vitest run tests/building-illustration.test.tsx --reporter=verbose`

Expected: 2 tests PASS.

- [ ] **Step 5: Commit the illustration**

```bash
git add components/building-illustration.tsx tests/building-illustration.test.tsx
git commit -m "feat: add mixed resource building illustrations"
```

### Task 3: Build the accessible floating resource flashcard

**Files:**
- Create: `components/resource-flashcard.tsx`
- Create: `components/building-resource-card.tsx`
- Create: `tests/building-resource-card.test.tsx`

**Interfaces:**
- Consumes: `Resource`, `expanded`, and `onToggle`.
- Produces: `BuildingResourceCard({ resource, expanded, onToggle }: { resource: Resource; expanded: boolean; onToggle: () => void })`.
- Produces: `ResourceFlashcard({ resource, panelId }: { resource: Resource; panelId: string })`.

- [ ] **Step 1: Write failing interaction and external-link tests**

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BuildingResourceCard } from "@/components/building-resource-card";
import { curatedResources } from "@/lib/resources/catalog";

const resource = curatedResources[0];

describe("BuildingResourceCard", () => {
  it("exposes a labelled building button and its expanded panel", () => {
    const onToggle = vi.fn();
    const { rerender } = render(
      <BuildingResourceCard resource={resource} expanded={false} onToggle={onToggle} />,
    );
    const building = screen.getByRole("button", { name: `查看 ${resource.name}` });
    fireEvent.click(building);
    expect(onToggle).toHaveBeenCalledOnce();
    rerender(<BuildingResourceCard resource={resource} expanded onToggle={onToggle} />);
    expect(building).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("region", { name: `${resource.name} 详情` })).toBeVisible();
    expect(screen.getByRole("link", { name: `进入 ${resource.name}` })).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("closes on Escape and returns focus to the building", () => {
    const onToggle = vi.fn();
    render(<BuildingResourceCard resource={resource} expanded onToggle={onToggle} />);
    const building = screen.getByRole("button", { name: `查看 ${resource.name}` });
    fireEvent.keyDown(screen.getByRole("region"), { key: "Escape" });
    expect(onToggle).toHaveBeenCalledOnce();
    expect(building).toHaveFocus();
  });
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npx vitest run tests/building-resource-card.test.tsx --reporter=verbose`

Expected: FAIL because the components do not exist.

- [ ] **Step 3: Implement the controlled building and flashcard**

Use `useRef<HTMLButtonElement>` in `BuildingResourceCard`. The building button gets `aria-expanded`, `aria-controls`, and a stable panel ID based on `resource.id`; render the website name in an HTML sign below the SVG. When the panel receives Escape, call `onToggle()` and focus the building ref. `ResourceFlashcard` renders the existing skills, description, level, price, optional `sourceUpdatedAt`, and the external link with `target="_blank" rel="noopener noreferrer"`.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `npx vitest run tests/building-resource-card.test.tsx --reporter=verbose`

Expected: 2 tests PASS.

- [ ] **Step 5: Commit the interaction unit**

```bash
git add components/resource-flashcard.tsx components/building-resource-card.tsx tests/building-resource-card.test.tsx
git commit -m "feat: add accessible building flashcards"
```

### Task 4: Integrate single-selection behavior into the directory

**Files:**
- Modify: `components/resource-directory.tsx`
- Create: `tests/resource-directory-interaction.test.tsx`
- Modify: `tests/home-shell.test.tsx`

**Interfaces:**
- Consumes: `BuildingResourceCard` from Task 3.
- Produces: the existing `ResourceDirectory({ resources })` with one `expandedResourceId: string | null` state.

- [ ] **Step 1: Write failing directory behavior tests**

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ResourceDirectory } from "@/components/resource-directory";
import { curatedResources } from "@/lib/resources/catalog";

vi.stubGlobal("fetch", vi.fn(() => Promise.reject(new Error("offline"))));

describe("ResourceDirectory building interactions", () => {
  it("keeps only the most recently selected website open", () => {
    render(<ResourceDirectory resources={curatedResources.slice(0, 2)} />);
    fireEvent.click(screen.getByRole("button", { name: "查看 BBC Learning English" }));
    fireEvent.click(screen.getByRole("button", { name: "查看 VOA Learning English" }));
    expect(screen.queryByRole("region", { name: "BBC Learning English 详情" })).not.toBeInTheDocument();
    expect(screen.getByRole("region", { name: "VOA Learning English 详情" })).toBeVisible();
  });

  it("closes open details when the search changes", () => {
    render(<ResourceDirectory resources={curatedResources.slice(0, 2)} />);
    fireEvent.click(screen.getByRole("button", { name: "查看 BBC Learning English" }));
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "VOA" } });
    expect(screen.queryByRole("region", { name: "BBC Learning English 详情" })).not.toBeInTheDocument();
  });

  it("closes the selected website when the grid background is clicked", () => {
    render(<ResourceDirectory resources={curatedResources.slice(0, 1)} />);
    fireEvent.click(screen.getByRole("button", { name: "查看 BBC Learning English" }));
    fireEvent.click(screen.getByTestId("building-grid"));
    expect(screen.queryByRole("region", { name: "BBC Learning English 详情" })).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npx vitest run tests/resource-directory-interaction.test.tsx tests/home-shell.test.tsx --reporter=verbose`

Expected: FAIL because the directory still renders direct resource links instead of building buttons.

- [ ] **Step 3: Implement the single-selection state**

Add `const [expandedResourceId, setExpandedResourceId] = useState<string | null>(null)`. Replace `ResourceCard` with `BuildingResourceCard`, setting `expanded={expandedResourceId === resource.id}` and toggling between the ID and `null`. Add an effect that sets the ID to `null` whenever `query`, `category`, `level`, or `price` changes. Give the grid `data-testid="building-grid"`; its background click closes selection, while each building wrapper stops propagation. Update `home-shell.test.tsx` to open BBC's building before asserting the safe external link.

- [ ] **Step 4: Run the focused tests and verify GREEN**

Run: `npx vitest run tests/resource-directory-interaction.test.tsx tests/home-shell.test.tsx --reporter=verbose`

Expected: all interaction and homepage tests PASS.

- [ ] **Step 5: Commit the directory integration**

```bash
git add components/resource-directory.tsx tests/resource-directory-interaction.test.tsx tests/home-shell.test.tsx
git commit -m "feat: integrate building selection into resource directory"
```

### Task 5: Add responsive visual styling and complete verification

**Files:**
- Modify: `app/globals.css`
- Modify: `components/building-resource-card.tsx`
- Modify: `components/resource-flashcard.tsx`
- Delete: `components/resource-card.tsx`

**Interfaces:**
- Consumes: the semantic class names emitted by Tasks 2–4.
- Produces: responsive desktop side-float, mobile inline expansion, focus styling, lit windows, and reduced-motion behavior.

- [ ] **Step 1: Add a layout-regression assertion before styling**

Extend `tests/building-resource-card.test.tsx`:

```tsx
it("uses the responsive building and flashcard layout hooks", () => {
  render(<BuildingResourceCard resource={resource} expanded onToggle={() => undefined} />);
  expect(screen.getByTestId("building-card")).toHaveClass("building-card");
  expect(screen.getByRole("region")).toHaveClass("resource-flashcard");
});
```

- [ ] **Step 2: Run the assertion and verify RED**

Run: `npx vitest run tests/building-resource-card.test.tsx --reporter=verbose`

Expected: FAIL because the stable layout hooks are not present.

- [ ] **Step 3: Add the layout hooks and focused CSS**

Add `.building-card`, `.building-button`, `.building-stage`, `.building-sign`, `.building-window`, `.resource-flashcard`, and `.building-grid` rules. Use a minimum building-button height, `overflow: visible` on desktop grid cells, and a `z-index` only for the selected item. Position the desktop flashcard with `position: absolute; inset-inline-start: calc(100% - 1rem); top: 1rem; width: min(21rem, 38vw)`. Use `.building-grid > .building-card:nth-child(3n) .resource-flashcard` to anchor every third desktop flashcard from the opposite side. Under `768px`, use `position: relative; inset: auto; width: 100%; margin-top: .75rem`. Add focus-visible outlines and ensure long signs use `overflow-wrap: anywhere`. Under `prefers-reduced-motion: reduce`, remove transforms and animation while preserving visible state changes.

- [ ] **Step 4: Run the complete verification suite**

Run: `npm test`

Expected: all test files PASS with zero failures.

Run: `npm run build`

Expected: exit code 0 and a completed Vinext production build.

Run: `git diff --check`

Expected: no whitespace errors.

- [ ] **Step 5: Inspect the focused diff and commit**

Run: `git diff -- app/globals.css components/building-resource-card.tsx components/resource-flashcard.tsx components/resource-directory.tsx`

Confirm the implementation contains no unrelated redesign or data-flow changes.

```bash
git add app/globals.css components/building-resource-card.tsx components/resource-flashcard.tsx components/resource-card.tsx
git commit -m "style: turn resource cards into an interactive village"
```

### Task 6: Publish the verified Site update

**Files:**
- Preserve: `.openai/hosting.json`
- Generated outside source: `.sites-runtime/interactive-buildings-deploy.tar.gz`

**Interfaces:**
- Consumes: the verified Git commit and existing Sites project ID from `.openai/hosting.json`.
- Produces: a new private production version at the existing Site URL.

- [ ] **Step 1: Re-run fresh pre-publication evidence**

Run: `npm test && npm run build && git status --short`

Expected: all tests pass, build succeeds, and only expected source state is present.

- [ ] **Step 2: Open the existing Site and preserve its current audience**

Use the Sites workflow with the exact existing `project_id`. Confirm the current audience before deployment and do not modify access settings.

- [ ] **Step 3: Package and push the exact verified source**

Run the bundled `site-workflow.mjs` with the checkout, source result, short-lived credential, and an absolute archive path. Record the returned full `commit_sha` and archive path.

- [ ] **Step 4: Save and deploy the matching archive**

Use the private combined save/deploy operation only after owner-private access is confirmed. Pass the exact `project_id`, pushed `commit_sha`, and unchanged archive.

- [ ] **Step 5: Verify the deployment result**

If the initial status is not terminal, poll the returned deployment ID. Completion requires `status: "succeeded"` and the production URL matching the existing English learning hub.
