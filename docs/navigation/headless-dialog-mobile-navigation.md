# Headless UI Mobile Navigation

The custom mobile overlay has been replaced with Headless UI `Dialog`.

The dialog now manages:

- focus trapping
- focus restoration
- Escape-key closing
- outside-click closing
- body scroll locking
- portal-based layering
- dialog semantics
- accessible labelling

The branded visual design remains controlled by Tailwind CSS.

The menu uses `100dvh` instead of `100svh` or `100vh` so its layout
tracks the currently visible mobile browser viewport more reliably.
