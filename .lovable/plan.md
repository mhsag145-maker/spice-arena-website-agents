# Interactive gallery views

## What will change
- Apply the effect only to the three selected gallery photos.
- As the pointer moves left, right, up, or down, each photo will tilt and pan in that direction with a slight zoom.
- Return the photo smoothly to its original position when the pointer leaves.
- Preserve touch-device behavior and reduced-motion accessibility.

## Technical details
- Add a small reusable interactive-photo component in the gallery page.
- Keep the existing image grid and image sources unchanged.
- Use pointer position to drive bounded 3D transforms without adding a new library.
