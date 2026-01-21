export default {
  async fetch(request) {
    // دعم CORS
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    // 🔒 ويبهوك ديسكورد (مخفي عن الفرونت)
    const WEBHOOK_URL =
      "https://ptb.discord.com/api/webhooks/1463416367729479744/flgJPnFcPC7nMRjn81YgXbljVXbv9dr8jOGMUaUdZA44eoUCGrhycty2s9dDzdHpyFXP";

    try {
      const body = await request.json();

      // تحقق بسيط
      if (!body.service || !body.name || !body.discord || !body.phone) {
        return new Response(
          JSON.stringify({ success: false, message: "بيانات ناقصة" }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
          }
        );
      }

      const payload = {
        username: "RA7A Store",
        embeds: [
          {
            title: "📩 طلب خدمة جديد",
            color: 0x4a2f5a,
            fields: [
              {
                name: "🔧 نوع الطلب",
                value: body.service,
                inline: false
              },
              {
                name: "👤 الاسم",
                value: body.name,
                inline: true
              },
              {
                name: "💬 ديسكورد",
                value: body.discord,
                inline: true
              },
              {
                name: "📱 الجوال",
                value: body.phone,
                inline: false
              },
              {
                name: "📝 الوصف",
                value: body.description && body.description.trim() !== ""
                  ? body.description
                  : "لا يوجد",
                inline: false
              }
            ],
            footer: {
              text: "RA7A Store"
            },
            timestamp: new Date().toISOString()
          }
        ]
      };

      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      return new Response(
        JSON.stringify({ success: true }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );

    } catch (error) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "خطأ في السيرفر",
          error: error.toString()
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }
  }
};
