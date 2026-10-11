const slider = document.querySelector(".slider");
const track = slider.querySelector(".slider__track");
const slides = [...slider.querySelectorAll(".slide")];
const dots = slider.querySelector(".slider__dots");
const current = slider.querySelector(".current-slide");
const total = slider.querySelector(".total-slides");
const count = slides.length;
const DURATION = 500; 

const makeClone = (slide) => {
  const clone = slide.cloneNode(true);
  clone.setAttribute("aria-hidden", "true");
  return clone;
};
track.prepend(makeClone(slides[count - 1]));
track.append(makeClone(slides[0]));

let position = 1; // track position: 0 = last clone, 1..count = real slides, count + 1 = first clone
let busy = false;
let fallbackTimer;

function render(animate) {
  track.classList.toggle("is-instant", !animate);
  track.style.transform = `translateX(${-position * 100}%)`;
  if (!animate) {
    void track.offsetWidth; // apply the instant jump before transitions return
    track.classList.remove("is-instant");
  }
}

function updateIndicators() {
  const index = (((position - 1) % count) + count) % count;
  [...dots.children].forEach((dot, i) => dot.setAttribute("aria-current", String(i === index)));
  current.textContent = String(index + 1).padStart(2, "0");
}

// After landing on a clone, jump (without animation) to the matching real slide.
function settle() {
  clearTimeout(fallbackTimer);
  if (position === 0) position = count;
  else if (position === count + 1) position = 1;
  render(false);
  busy = false;
}

function goTo(target) {
  if (busy || target === position) return;
  busy = true;
  position = target;
  render(true);
  updateIndicators();
  fallbackTimer = setTimeout(settle, DURATION + 100); // safety net if transitionend never fires
}

track.addEventListener("transitionend", (e) => {
  if (e.target === track && busy) settle();
});

slides.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.className = "slider__dot";
  dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
  dot.onclick = () => goTo(i + 1);
  dots.append(dot);
});

total.textContent = String(count).padStart(2, "0");
slider.querySelector(".slider__arrow--prev").onclick = () => goTo(position - 1);
slider.querySelector(".slider__arrow--next").onclick = () => goTo(position + 1);
slider.onkeydown = ({ key }) => key === "ArrowRight" ? goTo(position + 1) : key === "ArrowLeft" ? goTo(position - 1) : null;
render(false);
updateIndicators();