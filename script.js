const modal = document.getElementById("orderModal");
const open1 = document.getElementById("openOrderModal");
const open2 = document.getElementById("openOrderModal2");
const close = document.getElementById("closeModal");

open1.onclick = e => { e.preventDefault(); modal.classList.add("show"); };
open2.onclick = e => { e.preventDefault(); modal.classList.add("show"); };
close.onclick = () => modal.classList.remove("show");

modal.onclick = e => {
  if (e.target === modal) modal.classList.remove("show");
};
