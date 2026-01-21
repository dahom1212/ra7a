const WEBHOOK_URL = "https://ptb.discord.com/api/webhooks/1463416367729479744/flgJPnFcPC7nMRjn81YgXbljVXbv9dr8jOGMUaUdZA44eoUCGrhycty2s9dDzdHpyFXP";

const serviceType = document.getElementById("serviceType");
const descriptionField = document.getElementById("descriptionField");
const form = document.getElementById("orderForm");
const successMessage = document.getElementById("successMessage");

serviceType.addEventListener("change", () => {
  const value = serviceType.value;
  if (value === "بوتات مخصصة" || value === "برمجة مواقع ويب") {
    descriptionField.classList.remove("hidden");
  } else {
    descriptionField.classList.add("hidden");
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    username: "RA7A Store",
    embeds: [
      {
        title: "📩 طلب خدمة جديد",
        color: 0x4a2f5a,
        fields: [
          { name: "🔧 نوع الطلب", value: serviceType.value, inline: false },
          { name: "👤 الاسم", value: name.value, inline: true },
          { name: "💬 ديسكورد", value: discord.value, inline: true },
          { name: "📱 الجوال", value: phone.value, inline: false },
          { name: "📝 الوصف", value: description.value || "لا يوجد", inline: false }
        ],
        footer: { text: "RA7A Store" },
        timestamp: new Date()
      }
    ]
  };

  await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  form.reset();
  successMessage.classList.remove("hidden");
});
