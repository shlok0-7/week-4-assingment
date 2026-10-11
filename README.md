# Image Slider Library

A responsive image slider built with semantic HTML, CSS transitions, and vanilla JavaScript.

## Files

- `index.html` — slider structure and sample images
- `style.css` — responsive layout, controls, and horizontal transition styles
- `slider.js` — reusable `ImageSlider` class, generated dots, keyboard controls, and loop logic

## Run it

Open `index.html` in a modern browser. The photos are stored locally in the `assets/` folder, so no internet connection is needed.

## Features

- Previous and next buttons
- Dynamically generated, clickable indicator dots
- Horizontal `translateX()` animation
- Seamless looping using cloned boundary slides
- Responsive image sizing and layout
- Keyboard arrow navigation and visible focus states
- Reduced-motion preference support

## Customize

Replace the sample `<figure class="slide">` elements in `index.html` with your own slides. The JavaScript detects the number of slides and builds the dots automatically. Keep at least one slide inside `.slider__track`.
