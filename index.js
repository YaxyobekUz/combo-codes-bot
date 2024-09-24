// ---- BOT CONFIGURATION ----

require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(process.env.TOKEN, { polling: true });

// ---- DATA ----
let currentState = null;
const botAdminId = 298444246;

let blumVideosCodes = [];
let empireVideosCodes = [];
let currentBlumVideoName = null;
let channelUrl = "https://t.me/";
let currentEmpireVideoName = null;
const mostClickedKeyboards = { "Major ⭐️": 0, "Blum 🍀": 0, "X empire 💰": 0, "Yaytsogram 🥚": 0 };
const rebus = { content: "AgACAgIAAxkBAAIDMWbyTRuEtvnD3lvKnE9jJYVjJ7HiAAIm5jEba_eQS_BENVkEiEwgAQADAgADdwADNgQ", caption: "Kodlar robot" };
const riddle = { content: "AgACAgIAAxkBAAIDMWbyTRuEtvnD3lvKnE9jJYVjJ7HiAAIm5jEba_eQS_BENVkEiEwgAQADAgADdwADNgQ", caption: "Kodlar robot" };
const invest = { content: "AgACAgIAAxkBAAIDMWbyTRuEtvnD3lvKnE9jJYVjJ7HiAAIm5jEba_eQS_BENVkEiEwgAQADAgADdwADNgQ", caption: "Kodlar robot" };
const puzzleDurov = { content: "AgACAgIAAxkBAAIDMWbyTRuEtvnD3lvKnE9jJYVjJ7HiAAIm5jEba_eQS_BENVkEiEwgAQADAgADdwADNgQ", caption: "Kodlar robot" };
const yaytsogramCombo = { content: "AgACAgIAAxkBAAIDMWbyTRuEtvnD3lvKnE9jJYVjJ7HiAAIm5jEba_eQS_BENVkEiEwgAQADAgADdwADNgQ", caption: "Kodlar robot" };


// ---- HELPER FUNCTIONS ----
const isAdmin = (userId) => botAdminId === userId;
const { formatMsg, parseMarkdown } = require("./src/helpers");
const handleUpdateKeyboardClick = (keyboardName) => {
  const checkKeyboard = (text) => keyboardName === text;

  if (checkKeyboard("major")) {
    mostClickedKeyboards["Major ⭐️"] = mostClickedKeyboards["Major ⭐️"] + 1;
  } else if (checkKeyboard("blum")) {
    mostClickedKeyboards["Blum 🍀"] = mostClickedKeyboards["Blum 🍀"] + 1;
  } else if (checkKeyboard("empire")) {
    mostClickedKeyboards["X empire 💰"] = mostClickedKeyboards["Blum 🍀"] + 1;
  } else if (checkKeyboard("yaytsogram")) {
    mostClickedKeyboards["Yaytsogram 🥚"] = mostClickedKeyboards["Blum 🍀"] + 1;
  }
}

// ---- KEYBOARDS ----
const { adminDefaultKeyboards, updateCombo, updateVideo, cancelKeyboard, channelKeyboard } = require("./src/keyboards/adminKeyboards");
const { channelLinkKeyboard, userDefaultKeyboards, majorKeyboards, blumKeyboards, yaytsogramKeyboards, empireKeyboards, majorUrl, blumUrl, yaytsogramUrl, empireUrl } = require("./src/keyboards/userKeyboards");

// ---- BOT LISTENERS ----

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // FOR ADMIN
  if (isAdmin(chatId)) {
    const title = "Assalomu alaykum 🤖\nXush kelibsiz hurmatli BOSS!";
    const description = "Bugun nima qilamiz? Bir og'iz gapingiz bilan ishingizni bajaraman. Nima qilamiz endi🗿";

    // Send greeting message
    bot.sendMessage(chatId, formatMsg(title, description), adminDefaultKeyboards);
  }

  // FOR USER
  else {
    const title = "Assalomu alaykum 🤖\nXush kelibsiz hurmatli foydalanuvchi!";
    const description =
      "Men sizga turli botlarning kombo kodlarini topishga yordam beraman. Quyidagi tugmalar yordamida o'zingizga kerakli botni tanlab kerakli kodni oson oling. ⚡️";

    // Send greeting message
    bot.sendMessage(
      chatId, formatMsg(title, description), {
      parse_mode: "Markdown",
      reply_markup: {
        resize_keyboard: true,
        keyboard: userDefaultKeyboards.reply_markup.keyboard,
      }
    }
    );
  }
});

// ---- MESSAGE ----
bot.on("message", (msg) => {

  // HELPERS
  const message = msg.text;
  const chatId = msg.chat.id;
  const checkMsg = (msg) => msg === message;
  const checkState = (state) => (state === currentState) && !checkMsg("⬅️ Bekor qilish");
  const successMsg = (msg = "Kombo muvaffaqiyatli yangilandi") => {
    currentState = null;
    bot.sendMessage(chatId, msg + " 🎉", adminDefaultKeyboards)
  };

  // FOR ADMIN
  if (isAdmin(chatId)) {
    // Statistics
    if (checkMsg("Statistika 📊")) {
      let stats = "";
      const title = "Statistika 📊";
      const bots = Object.keys(mostClickedKeyboards);
      bots.forEach((bot) => { stats += `*${bot}* ${mostClickedKeyboards[bot]} ta ezishlar\n` });
      const description = `Foydalanuvchilar ko'proq tashrif buyurayotgan botlar:\n\n${stats}`;

      bot.sendMessage(chatId, formatMsg(title, description), parseMarkdown);
    }

    // Channel
    else if (checkMsg("Rasmiy kanal 📣")) {
      const title = "Rasmiy kanal 📣";
      const description = `Hozirgi rasmiy kanal havolasi: *${channelUrl}*`;

      bot.sendMessage(chatId, formatMsg(title, description), channelKeyboard);
    }

    // Major
    else if (checkMsg("Major ⭐️")) {
      const title = "Major ⭐️";
      const description = "Bugungi *Puzzle Durov* kombosini yangilash uchun quyidagi tugmani bosing!";

      bot.sendMessage(chatId, formatMsg(title, description), updateCombo("major"));
    }

    // Blum
    else if (checkMsg("Blum 🍀")) {
      const title = "Blum 🍀";
      const description = "Blum videolar kodini yangilash uchun quyidagi tugmalarni bosing!";

      bot.sendMessage(chatId, formatMsg(title, description), updateVideo("blum"));
    }

    // X empire
    else if (checkMsg("X empire 💰")) {
      const title = "X empire 💰";
      const description = "X empire videolar kodini, kun topishmog'ini, kun rebusini yoki kun investitsiyasini yangilash uchun quyidagi tugmalardan keraklisini tanlab bosing!";

      bot.sendMessage(chatId,
        formatMsg(title, description), {
        parse_mode: "Markdown",
        reply_markup: {
          resize_keyboard: true,
          inline_keyboard: [
            ...updateVideo("empire").reply_markup.inline_keyboard,
            ...updateCombo("riddle", "Kun topishmog'ini").reply_markup.inline_keyboard,
            ...updateCombo("rebus", "Kun rebusini").reply_markup.inline_keyboard,
            ...updateCombo("invest", "Kun investitsiyasini").reply_markup.inline_keyboard,
          ]
        }
      }
      );
    }

    // Yaytsogram
    else if (checkMsg("Yaytsogram 🥚")) {
      const title = "Yaytsogram 🥚";
      const description = "Bugungi *Yaytsogram* kombosini yangilash uchun quyidagi tugmani bosing!";

      bot.sendMessage(chatId, formatMsg(title, description), updateCombo("yaytsogram"));
    }

    // Cancel
    else if (checkMsg("⬅️ Bekor qilish") && currentState) {
      currentState = null;
      bot.sendMessage(chatId, "Amal bekor qilindi!", adminDefaultKeyboards);
    }

    // STATES

    // Channel
    else if (checkState("awaiting_channel_username")) {
      channelUrl = "https://t.me/" + message;
      successMsg("Rasmiy kanal havolasi muvaffaqiyatli yangilandi");
    }

    // Major
    else if (checkState("awaiting_major_combo")) {
      if (msg.photo) {
        // time
        const date = new Date();
        const time = date.toLocaleString("en-US", { timeZone: "Asia/Tashkent" });

        // post caption
        const title = "Puzzle durov 🧩";
        const description = `🕔 *${time}*`;

        // update combo
        puzzleDurov.content = msg.photo.pop().file_id;
        puzzleDurov.caption = formatMsg(title, description);

        successMsg();
      } else {
        const title = "Xatolik ⚠️";
        const description = "Iltimos yaroqli bo'lgan rasm yuborib, qaytadan urinib ko'ring.";
        bot.sendMessage(chatId, formatMsg(title, description), parseMarkdown)
      }
    }

    // Blum
    else if (checkState("awaiting_add_blum_video_code_name")) {
      currentBlumVideoName = message;
      currentState = "awaiting_add_blum_video_code_code";
      bot.sendMessage(chatId, "Yaxshi, endi esa iltimos menga video kodini yuboring.")
    }

    else if (checkState("awaiting_add_blum_video_code_code")) {
      blumVideosCodes.push({ code: message, name: currentBlumVideoName });
      successMsg("Yangi Blum video kodi muvaffaqiyatli qo'shildi");
    }

    else if (checkState("awaiting_delete_blum_video_code_name")) {
      blumVideosCodes = blumVideosCodes.filter(video => video.name !== message.trim());
      successMsg("Blum video kodi muvaffaqiyatli o'chirildi");
    }

    // X Empire
    else if (checkState("awaiting_add_empire_video_code_name")) {
      currentEmpireVideoName = message;
      currentState = "awaiting_add_empire_video_code_code";
      bot.sendMessage(chatId, "Yaxshi, endi esa iltimos menga video kodini yuboring.")
    }

    else if (checkState("awaiting_add_empire_video_code_code")) {
      empireVideosCodes.push({ code: message, name: currentEmpireVideoName });
      successMsg("Yangi X empire video kodi muvaffaqiyatli qo'shildi");
    }

    else if (checkState("awaiting_delete_empire_video_code_name")) {
      empireVideosCodes = empireVideosCodes.filter(video => video.name !== message.trim());
      successMsg("X Empire video kodi muvaffaqiyatli o'chirildi");
    }

    else if (checkState("awaiting_riddle_combo")) {
      if (msg.photo) {
        // time
        const date = new Date();
        const time = date.toLocaleString("en-US", { timeZone: "Asia/Tashkent" });

        // post caption
        const title = "Kun topishmog'i ❓";
        const description = `*Topishmoq javobi:* \`${msg.caption}\`\n\n🕔 *${time}*`;

        // update combo
        riddle.content = msg.photo.pop().file_id;
        riddle.caption = formatMsg(title, description);

        successMsg("Kun topishmog'i muvaffaqiyatli yangilandi");
      } else {
        const title = "Xatolik ⚠️";
        const description = "Iltimos yaroqli bo'lgan rasm yuborib, qaytadan urinib ko'ring.";
        bot.sendMessage(chatId, formatMsg(title, description), parseMarkdown)
      }
    }

    else if (checkState("awaiting_rebus_combo")) {
      if (msg.photo) {
        // time
        const date = new Date();
        const time = date.toLocaleString("en-US", { timeZone: "Asia/Tashkent" });

        // post caption
        const title = "Kun rebusi 🔍";
        const description = `*Rebus javobi:* \`${msg.caption}\`\n\n🕔 *${time}*`;

        // update combo
        rebus.content = msg.photo.pop().file_id;
        rebus.caption = formatMsg(title, description);

        successMsg("Kun rebusi muvaffaqiyatli yangilandi");
      } else {
        const title = "Xatolik ⚠️";
        const description = "Iltimos yaroqli bo'lgan rasm yuborib, qaytadan urinib ko'ring.";
        bot.sendMessage(chatId, formatMsg(title, description), parseMarkdown)
      }
    }

    else if (checkState("awaiting_invest_combo")) {
      if (msg.photo) {
        // time
        const date = new Date();
        const time = date.toLocaleString("en-US", { timeZone: "Asia/Tashkent" });

        // post caption
        const title = "Kun investitsiyasi 💵";
        const description = `🕔 *${time}*`;

        // update combo
        invest.content = msg.photo.pop().file_id;
        invest.caption = formatMsg(title, description);

        successMsg("Kun investitsiyasi muvaffaqiyatli yangilandi");
      } else {
        const title = "Xatolik ⚠️";
        const description = "Iltimos yaroqli bo'lgan rasm yuborib, qaytadan urinib ko'ring.";
        bot.sendMessage(chatId, formatMsg(title, description), parseMarkdown)
      }
    }

    // Yaytsogram
    else if (checkState("awaiting_yaytsogram_combo")) {
      if (msg.photo) {
        // time
        const date = new Date();
        const time = date.toLocaleString("en-US", { timeZone: "Asia/Tashkent" });

        // post caption
        const title = "Shifer 🗝";
        const description = `🕔 *${time}*`;

        // update combo
        yaytsogramCombo.content = msg.photo.pop().file_id;
        yaytsogramCombo.caption = formatMsg(title, description);

        successMsg();
      } else {
        const title = "Xatolik ⚠️";
        const description = "Iltimos yaroqli bo'lgan rasm yuborib, qaytadan urinib ko'ring.";
        bot.sendMessage(chatId, formatMsg(title, description), parseMarkdown)
      }
    }
  }


  // FOR USER
  else {
    // Major
    if (checkMsg("Major ⭐️")) {
      handleUpdateKeyboardClick("major");

      const title = "Major ⭐️";
      const description = "Bugungi *Puzzle Durov* kombosini olish uchun quyidagi tugmani bosing.\n\n⚠️ Diqqat kombo sanasi bugungi sana bilan teng ekanligiga ishonch hosil qilib, so'ngra undan foydalaning!";

      bot.sendMessage(chatId, formatMsg(title, description), majorKeyboards);
    }

    // Blum
    else if (checkMsg("Blum 🍀")) {
      handleUpdateKeyboardClick("blum");


      const title = "Blum 🍀";
      const description = "Blumning YouTube video kodlarini olish uchun quyidagi tugmani bosing.";

      bot.sendMessage(chatId, formatMsg(title, description), blumKeyboards);
    }

    // X empire
    else if (checkMsg("X empire 💰")) {
      handleUpdateKeyboardClick("empire");

      const title = "X empire 💰";
      const description = "Quyidagi tugmalar orqali o'zingizga kerakli bo'lgan komboni tanlab uni oling!\n\n⚠️ Diqqat kombolarning sanasi bugungi sana bilan teng ekanligiga ishonch hosil qilib, so'ngra undan foydalaning!";

      bot.sendMessage(chatId, formatMsg(title, description), empireKeyboards);
    }

    // Yaytsogram
    else if (checkMsg("Yaytsogram 🥚")) {
      handleUpdateKeyboardClick("yaytsogram");

      const title = "Yaytsogram 🥚";
      const description = "Bugungi *Shifer* kombosini olish uchun quyidagi tugmani bosing.\n\n⚠️ Diqqat kombo sanasi bugungi sana bilan teng ekanligiga ishonch hosil qilib, so'ngra undan foydalaning!";

      bot.sendMessage(chatId, formatMsg(title, description), yaytsogramKeyboards);
    }
  }
});

// ---- CALLBACK ----
bot.on("callback_query", async (query) => {
  // HELPERS
  const chatId = query.message.chat.id;
  const checkQueryData = (data) => query.data === data;

  // FOR ADMIN
  if (isAdmin(chatId)) {

    // Channel
    if (checkQueryData("update_channel")) {
      const title = "Rasmiy kanalni yangilash 🔄";
      const description = "Yaxshi, endi esa iltimos menga kanal usernameni yuboring.";

      // update admin state
      currentState = "awaiting_channel_username";

      // send message
      bot.sendMessage(chatId, formatMsg(title, description), cancelKeyboard);
    }

    // Major
    else if (checkQueryData("update_major_combo")) {
      const title = "Komboni yangilash 🔄";
      const description = "Yaxshi, endi esa iltimos menga kombo rasmini yuboring";

      // update admin state
      currentState = "awaiting_major_combo";

      // send message
      bot.sendMessage(chatId, formatMsg(title, description), cancelKeyboard);
    }


    // Blum
    else if (checkQueryData("add_blum_video_code")) {
      const title = "Video kodini qo'shish ➕";
      const description = "Yaxshi, endi esa iltimos menga qo'shmoqchi bo'lgan video kodining nomini yuboring.";

      currentState = "awaiting_add_blum_video_code_name";

      bot.sendMessage(chatId, formatMsg(title, description), cancelKeyboard);
    }

    else if (checkQueryData("delete_blum_video_code")) {
      const title = "Video kodini o'chirish 🗑";
      const description = "Yaxshi, endi esa iltimos menga o'chirmoqchi bo'lgan video kodining nomini yuboring.";

      currentState = "awaiting_delete_blum_video_code_name";

      bot.sendMessage(chatId, formatMsg(title, description), cancelKeyboard);
    }


    // X Empire
    else if (checkQueryData("add_empire_video_code")) {
      const title = "Video kodini qo'shish ➕";
      const description = "Yaxshi, endi esa iltimos menga qo'shmoqchi bo'lgan video kodining nomini yuboring.";

      currentState = "awaiting_add_empire_video_code_name";

      bot.sendMessage(chatId, formatMsg(title, description), cancelKeyboard);
    }

    else if (checkQueryData("delete_empire_video_code")) {
      const title = "Video kodini o'chirish 🗑";
      const description = "Yaxshi, endi esa iltimos menga o'chirmoqchi bo'lgan video kodining nomini yuboring.";

      currentState = "awaiting_delete_empire_video_code_name";

      bot.sendMessage(chatId, formatMsg(title, description), cancelKeyboard);
    }

    else if (checkQueryData("update_riddle_combo")) {
      const title = "Kun topishmog'ini yangilash 🔄";
      const description = "Yaxshi, endi esa iltimos menga kombo rasmini yuboring";

      // update admin state
      currentState = "awaiting_riddle_combo";

      // send message
      bot.sendMessage(chatId, formatMsg(title, description), cancelKeyboard);
    }

    else if (checkQueryData("update_rebus_combo")) {
      const title = "Kun rebusini yangilash 🔄";
      const description = "Yaxshi, endi esa iltimos menga kombo rasmini yuboring";

      // update admin state
      currentState = "awaiting_rebus_combo";

      // send message
      bot.sendMessage(chatId, formatMsg(title, description), cancelKeyboard);
    }

    else if (checkQueryData("update_invest_combo")) {
      const title = "Kun investitsiyasini yangilash 🔄";
      const description = "Yaxshi, endi esa iltimos menga kombo rasmini yuboring";

      // update admin state
      currentState = "awaiting_invest_combo";

      // send message
      bot.sendMessage(chatId, formatMsg(title, description), cancelKeyboard);
    }


    // Yaytsogram
    else if (checkQueryData("update_yaytsogram_combo")) {
      const title = "Komboni yangilash 🔄";
      const description = "Yaxshi, endi esa iltimos menga kombo rasmini yuboring";

      // update admin state
      currentState = "awaiting_yaytsogram_combo";

      // send message
      bot.sendMessage(chatId, formatMsg(title, description), cancelKeyboard);
    }
  }

  // FOR USER
  else {
    // Major
    if (checkQueryData("puzzle_durov")) {
      bot.sendPhoto(chatId,
        puzzleDurov.content, {
        caption: puzzleDurov.caption,
        ...channelLinkKeyboard(channelUrl, majorUrl)
      },)
    }

    // Blum
    else if (checkQueryData("blum_videos_codes")) {
      let codes = "";
      const title = "YouTube video kodlar 🔑";
      blumVideosCodes.forEach((code) => { codes += `*${code.name}:* \`${code.code}\`\n`; })
      const description = `Koddan nusxa olish uchun kodning ustiga bosing. ⏬\n\n${codes}\nRasmiy kanalimizda ham kodlar tashlab boriladi. Obuna bo'lish uchun quyidagi tugmani bosing!`;

      bot.sendMessage(chatId, formatMsg(title, description), channelLinkKeyboard(channelUrl, blumUrl));
    }

    // Yaytsogram
    else if (checkQueryData("yaytsogram")) {
      bot.sendPhoto(chatId,
        yaytsogramCombo.content, {
        caption: yaytsogramCombo.caption,
        ...channelLinkKeyboard(channelUrl, yaytsogramUrl)
      },)
    }

    // X empire
    else if (checkQueryData("empire_videos_codes")) {
      let codes = "";
      const title = "YouTube video kodlar 🔑";
      empireVideosCodes.forEach((code) => { codes += `*${code.name}:* \`${code.code}\`\n`; })
      const description = `Koddan nusxa olish uchun kodning ustiga bosing. ⏬\n\n${codes}\nRasmiy kanalimizda ham kodlar tashlab boriladi. Obuna bo'lish uchun quyidagi tugmani bosing!`;

      bot.sendMessage(chatId, formatMsg(title, description), channelLinkKeyboard(channelUrl, empireUrl));
    }

    else if (checkQueryData("riddle")) {
      bot.sendPhoto(chatId,
        riddle.content, {
        caption: riddle.caption,
        ...channelLinkKeyboard(channelUrl, empireUrl)
      },)
    }

    else if (checkQueryData("rebus")) {
      bot.sendPhoto(chatId,
        rebus.content, {
        caption: rebus.caption,
        ...channelLinkKeyboard(channelUrl, empireUrl)
      },)
    }

    else if (checkQueryData("invest")) {
      bot.sendPhoto(chatId,
        invest.content, {
        caption: invest.caption,
        ...channelLinkKeyboard(channelUrl, empireUrl)
      },)
    }
  }
});
