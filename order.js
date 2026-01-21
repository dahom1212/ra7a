const WORKER_URL = "https://ra7a-order.yourname.workers.dev";

const form = document.getElementById("orderForm");
const serviceType = document.getElementById("serviceType");
const descriptionField = document.getElementById("descriptionField");
const successMessage = document.getElementById("successMessage");

const nameInput = document.getElementById("name");
const discordInput = document.getElementById("discord");
const phoneInput = document.getElementById("phone");
const descriptionInput = document.getElementById("description");

serviceType.addEventListener("change", () => {
  if (
    serviceType.value === "بوتات مخصصة" ||
    serviceType.value === "برمجة مواقع ويب"
  ) {
    descriptionField.classList.remove("hidden");
  } else {
    descriptionField.classList.add("hidden");
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    service: serviceType.value,
    name: nameInput.value,
    discord: discordInput.value,
    phone: phoneInput.value,
    description: descriptionInput.value
  };

  await fetch(WORKER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  form.reset();
  descriptionField.classList.add("hidden");
  successMessage.classList.remove("hidden");
});
