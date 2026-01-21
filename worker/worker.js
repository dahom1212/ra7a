export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return new Response("Not Allowed", { status: 405 });
    }

    const WEBHOOK_URL = "https://ptb.discord.com/api/webhooks/1463416367729479744/flgJPnFcPC7nMRjn81YgXbljVXbv9dr8jOGMUaUdZA44eoUCGrhycty2s9dDzdHpyFXP";

    const body = await request.json();

    const payload = {
      username: "RA7A Store",
      embeds: [
        {
          title: "📩 طلب خدمة جديد",
          color: 0x4a2f5a,
          fields: [
            { name: "🔧 نوع الطلب", value: body.service },
            { name: "👤 الاسم", value: body.name, inline: true },
            { name: "💬 ديسكورد", value: body.discord, inline: true },
            { name: "📱 الجوال", value: body.phone },
            { name: "📝 الوصف", value: body.description || "لا يوجد" }
          ],
          footer: { text: "RA7A Store" },
          timestamp: new Date().toISOString()
        }
      ]
    };

    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
  }
};
