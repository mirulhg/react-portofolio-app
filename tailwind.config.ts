import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-base": "var(--bg-base)",
        "bg-alt": "var(--bg-alt)",
        "bg-raised": "var(--bg-raised)",
        "bg-inset": "var(--bg-inset)",
        ink: "var(--ink)",
        "ink-muted": "var(--ink-muted)",
        "ink-faint": "var(--ink-faint)",
        "accent-a": "var(--accent-a)",
        "accent-b": "var(--accent-b)",
        "accent-c": "var(--accent-c)",
        focus: "var(--focus)",
        ok: "var(--ok)",
        "ok-ink": "var(--ok-ink)",
        danger: "var(--danger)",
        "danger-ink": "var(--danger-ink)",
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
      },
      backgroundImage: {
        "grad-accent": "var(--grad-accent)",
      },
      fontFamily: {
        heading: "var(--font-heading)",
        body: "var(--font-body)",
        mono: "var(--font-mono)",
      },
      fontSize: {
        hero: "var(--fs-hero)",
        h2: "var(--fs-h2)",
        h3: "var(--fs-h3)",
        body: "var(--fs-body)",
        "body-sm": "var(--fs-body-sm)",
        label: "var(--fs-label)",
      },
      spacing: {
        1: "var(--space-1)",
        2: "var(--space-2)",
        3: "var(--space-3)",
        4: "var(--space-4)",
        5: "var(--space-5)",
        6: "var(--space-6)",
        7: "var(--space-7)",
        8: "var(--space-8)",
        9: "var(--space-9)",
        "section-py": "var(--section-py)",
        "section-px": "var(--section-px)",
      },
      maxWidth: {
        content: "var(--content-max)",
      },
      borderRadius: {
        sm: "var(--r-sm)",
        md: "var(--r-md)",
        lg: "var(--r-lg)",
        pill: "var(--r-pill)",
      },
      transitionTimingFunction: {
        standard: "var(--ease-standard)",
      },
    },
  },
  plugins: [],
} satisfies Config;
