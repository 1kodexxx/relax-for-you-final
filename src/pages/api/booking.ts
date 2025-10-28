// src/pages/api/booking.ts
export const prerender = false;

import type { APIRoute } from "astro";

type BookingPayload = {
  name?: string;
  phone?: string;
  selected_program?: string;
  date?: string;
  time?: string;
  selected_master?: string;
  message?: string;
};

// === Утилиты ======================================================

const fmt = (v?: string) => (v && v.trim().length > 0 ? v.trim() : "—");

// Экранирование HTML для parse_mode: "HTML"
const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// === Телефон ======================================================

function normalizeRuPhone(raw?: string): string | null {
  if (!raw) return null;
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 11 && (digits.startsWith("7") || digits.startsWith("8"))) {
    return "7" + digits.slice(1);
  }
  if (digits.length === 10) {
    return "7" + digits;
  }
  return null;
}

function prettyPhone(std: string): string {
  const p = std.replace(/\D/g, "");
  const a = p.slice(1, 4);
  const b = p.slice(4, 7);
  const c = p.slice(7, 9);
  const d = p.slice(9, 11);
  return `+7 (${a}) ${b}-${c}-${d}`;
}

// === Дата =========================================================

function formatRuDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function isPastDate(isoDate: string): boolean {
  const inputDate = new Date(isoDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  inputDate.setHours(0, 0, 0, 0);
  return inputDate < today;
}

// === Основная логика ==============================================

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = (await request.json().catch(() => null)) as BookingPayload | null;

    if (!data) {
      return new Response(JSON.stringify({ ok: false, message: "Некорректные данные формы." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Извлекаем поля в правильном порядке
    const name = fmt(data.name);
    const phoneRaw = data.phone;
    const program = fmt(data.selected_program);
    const date = fmt(data.date);
    const time = fmt(data.time);
    const master = fmt(data.selected_master);
    const message = fmt(data.message);

    // Проверка обязательных
    const normalized = normalizeRuPhone(phoneRaw);
    if (name === "—" || !normalized || program === "—" || date === "—" || time === "—") {
      return new Response(
        JSON.stringify({
          ok: false,
          message: "Заполните имя, телефон, программу массажа, дату и время.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Запрещаем запись в прошлое
    if (isPastDate(date)) {
      return new Response(JSON.stringify({ ok: false, message: "Выберите дату в будущем." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Красивые форматы
    const phonePretty = prettyPhone(normalized);
    const formattedDate = formatRuDate(date);

    // Переменные окружения Telegram
    const token = import.meta.env.TG_BOT_TOKEN || process.env.TG_BOT_TOKEN;
    const chatId = import.meta.env.TG_CHAT_ID || process.env.TG_CHAT_ID;

    if (!token || !chatId) {
      console.error("[booking] ❌ TG_BOT_TOKEN или TG_CHAT_ID не заданы");
      return new Response(
        JSON.stringify({ ok: false, message: "Настройки Telegram не заданы. Проверьте .env." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // === Сообщение в Telegram (новый порядок) =====================

    const text = [
      "<b>💗 Новая заявка — Relax For You</b>",
      "",
      "━━━━━━━━━━━━━━━",
      `<b>👤 Имя:</b> ${escapeHtml(name)}`,
      `<b>📞 Номер телефона:</b> ${escapeHtml(phonePretty)}`,
      `<b>💆‍♀️ Программа массажа:</b> ${escapeHtml(program)}`,
      `<b>📅 Дата:</b> ${escapeHtml(formattedDate)}`,
      `<b>🕓 Время:</b> ${escapeHtml(time)}`,
      `<b>💆‍♂️ Мастер:</b> ${escapeHtml(master)}`,
      message !== "—" ? `<b>📝 Комментарий:</b> ${escapeHtml(message)}` : "",
      "━━━━━━━━━━━━━━━",
      "<i>Отправлено с сайта relaxmassage51.ru</i>",
    ]
      .filter(Boolean)
      .join("\n");

    // === Отправка ================================================

    const tgResp = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    const tgData = await tgResp.json().catch(() => null);

    if (!tgResp.ok || !tgData?.ok) {
      console.error("[booking] Telegram API error:", tgData);
      throw new Error("telegram_error");
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[booking] Ошибка:", err);
    return new Response(
      JSON.stringify({ ok: false, message: "Ошибка сервера. Попробуйте позже." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
