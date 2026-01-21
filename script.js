const orderBtn = document.getElementById("openOrderModal");
const orderBtn2 = document.getElementById("openOrderModal2");
const modal = document.getElementById("orderModal");
const closeModal = document.getElementById("closeModal");

orderBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.add("show");
});
orderBtn2.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.add("show");
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("show");
});
