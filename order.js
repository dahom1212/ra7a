function xor(input, key) {
  let output = "";
  for (let i = 0; i < input.length; i++) {
    output += String.fromCharCode(input.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return output;
}

function base64Decode(str) {
  return atob(str);
}

const key = "RA7A_SECRET_KEY";
const encryptedBase64 = "OjVDMSxpamwiMTZxLywqMS5FJXEwKi59JCQ2ZDI8MClYLjQganJmc2drenNqZHRwMzI3a2pndnI1ajhmdm1tYzBvNmJ0N2VnczBndmV5MTR0cGk4cWk3dHlyajJ1bGoxdnA0c3A0aWZyY3Q0M3Y3YzQwZDJ4M3NqZmQ3dWZ3b2E1Z2F2MTV0";
const WEBHOOK_URL = xor(base64Decode(encryptedBase64), key);

// ================== Modal Form ==================
const modalForm = document.getElementById("orderFormModal");
const serviceTypeModal = document.getElementById("serviceTypeModal");
const descriptionFieldModal = document.getElementById("descriptionFieldModal");
const successMessageModal = document.getElementById("successMessageModal");
const nameModal = document.getElementById("nameModal");
const discordModal = document.getElementById("discordModal");
const phoneModal = document.getElementById("phoneModal");
const descriptionModal = document.getElementById("descriptionModal");

serviceTypeModal.addEventListener("change", () => {
  if (serviceTypeModal.value === "بوتات مخصصة" || serviceTypeModal.value === "برمجة مواقع ويب") {
    descriptionFieldModal.classList.remove("hidden");
  } else {
    descriptionFieldModal.classList.add("hidden");
  }
});

modalForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await sendWebhook(
    serviceTypeModal.value,
    nameModal.value,
    discordModal.value,
    phoneModal.value,
    descriptionModal.value
  );

  modalForm.reset();
  descriptionFieldModal.classList.add("hidden");
  successMessageModal.classList.remove("hidden");
});

// ================== Order Page Form ==================
const form = document.getElementById("orderForm");
const serviceType = document.getElementById("serviceType");
const descriptionField = document.getElementById("descriptionField");
const successMessage = document.getElementById("successMessage");
const nameInput = document.getElementById("name");
const discordInput = document.getElementById("discord");
const phoneInput = document.getElementById("phone");
const descriptionInput = document.getElementById("description");

if (serviceType) {
  serviceType.addEventListener("change", () => {
    if (serviceType.value === "بوتات مخصصة" || serviceType.value === "برمجة مواقع ويب") {
      descriptionField.classList.remove("hidden");
    } else {
      descriptionField.classList.add("hidden");
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await sendWebhook(
      serviceType.value,
      nameInput.value,
      discordInput.value,
      phoneInput.value,
      descriptionInput.value
    );

    form.reset();
    descriptionField.classList.add("hidden");
    successMessage.classList.remove("hidden");
  });
}

// ================== Send Webhook ==================
async function sendWebhook(type, name, discord, phone, description) {
  try {
    const payload = {
      username: "RA7A Store",
      embeds: [
        {
          title: "📩 طلب خدمة جديد",
          color: 0x4a2f5a,
          fields: [
            { name: "🔧 نوع الطلب", value: type, inline: false },
            { name: "👤 الاسم", value: name, inline: true },
            { name: "💬 ديسكورد", value: discord, inline: true },
            { name: "📱 الجوال", value: phone, inline: false },
            { name: "📝 الوصف", value: description || "لا يوجد", inline: false }
          ],
          footer: { text: "RA7A Store" },
          timestamp: new Date()
        }
      ]
    };

    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    console.error("Webhook Error:", error);
  }
}
