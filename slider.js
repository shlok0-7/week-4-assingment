const slider = document.querySelector(".slider");
const slides = [...slider.querySelectorAll(".slide")];
const dots = slider.querySelector(".slider__dots");
const current = slider.querySelector(".current-slide");
const total = slider.querySelector(".total-slides");
let index = 0;

function showSlide(next) {
  index = (next + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.hidden = i !== index);
  [...dots.children].forEach((dot, i) => dot.setAttribute("aria-current", String(i === index)));
  current.textContent = String(index + 1).padStart(2, "0");
}

slides.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.className = "slider__dot";
  dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
  dot.onclick = () => showSlide(i);
  dots.append(dot);
});
total.textContent = String(slides.length).padStart(2, "0");
slider.querySelector(".slider__arrow--prev").onclick = () => showSlide(index - 1);
slider.querySelector(".slider__arrow--next").onclick = () => showSlide(index + 1);
slider.onkeydown = ({ key }) => key === "ArrowRight" ? showSlide(index + 1) : key === "ArrowLeft" ? showSlide(index - 1) : null;
showSlide(0);
