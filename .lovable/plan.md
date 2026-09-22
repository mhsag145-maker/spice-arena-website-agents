# Cinematic selected-photo hover

## What will change
- Apply the effect only to the selected third story photo.
- On hover, gently zoom in, ease back out, then begin a smooth 360-style directional orbit.
- Keep the image sharp with restrained movement and subtle color enhancement.
- Return smoothly to the normal view when hover ends.
- Respect reduced-motion and touch-only devices.

## Technical details
- Mark the selected mapped photo from its existing slide data rather than affecting every story card.
- Add a dedicated CSS keyframe sequence using transform-only animation for smooth rendering.
- Preserve the current image source and page layout; true 4K detail remains limited by the source file resolution.
