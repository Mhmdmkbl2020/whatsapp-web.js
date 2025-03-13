const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// إنشاء عميل واتساب مع مصادقة محلية
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

// توليد QR Code للدخول
client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

// تأكيد الاتصال
client.on('ready', () => {
  console.log('✅ Bot is ready!');
});

// استقبال الرسائل
client.on('message', async message => {
  const chat = await message.getChat();
  
  // مثال: رد تلقائي عند استلام "مرحبا"
  if (message.body.toLowerCase() === 'مرحبا') {
    chat.sendMessage('مرحبا بك! كيف يمكنني مساعدتك؟');
  }
});

// تشغيل البوت
client.initialize();
