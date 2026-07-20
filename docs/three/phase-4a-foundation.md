# Phase 4A — Plugin-Style Three.js Foundation

## Architecture

The homepage mounts only:

```tsx
<HeroExperience />
```

The experience internally owns:

- WebGL capability detection
- reduced-motion fallback
- lazy client-only loading
- error boundary
- GPU quality detection
- adaptive DPR
- runtime quality degradation
- Canvas configuration
- camera rig
- lighting rig
- environment rig
- scene registry
- procedural vehicle placeholder
- future GSAP timeline boundary

## Plugin-style scene registry

Available scene keys:

- hero
- gallery
- services
- about
- contact

Only the hero scene is registered in Phase 4A. Other pages can register independent lazy scenes later without changing the Canvas runtime.

## Performance decisions

- DPR is clamped by quality profile.
- Touch devices do not automatically receive high quality.
- Reduced-motion users receive the CSS fallback.
- WebGL failures activate the fallback.
- The 3D bundle is lazy-loaded and client-only.
- Drei PerformanceMonitor can lower quality.
- AdaptiveDpr reduces resolution during regressions.
- Fast render-loop updates use React Three Fiber's frame loop rather than React state.

## Deliberately excluded

- production GLB vehicle
- Draco and KTX2 assets
- post-processing
- scroll-linked camera animation
- paint transformation
- collision-to-restoration sequence
- hotspots
- gallery scenes
