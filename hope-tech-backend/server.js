const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔴 AAPKI EMAIL CONFIGURATION
const YOUR_EMAIL = 'hopetechsolution786@gmail.com';
const YOUR_PASSWORD = 'oome urzp jiqh atwb';  // <-- YAHAN APP PASSWORD DAALEN

// Email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: YOUR_EMAIL,
        pass: YOUR_PASSWORD
    }
});

// Contact form API
app.post('/send-email', async (req, res) => {
    try {
        const { name, phone, email, service, message } = req.body;

        const mailOptions = {
            from: YOUR_EMAIL,
            to: YOUR_EMAIL,
            subject: `📧 New Contact Form Message from ${name}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: linear-gradient(135deg, #6366f1, #ec4899); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
                        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                        .field { margin-bottom: 20px; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #6366f1; }
                        .label { font-weight: bold; color: #6366f1; display: block; margin-bottom: 5px; }
                        .value { color: #374151; }
                        .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🚀 New Contact Form Submission</h1>
                            <p>Hope Tech Solution Website</p>
                        </div>
                        <div class="content">
                            <div class="field">
                                <span class="label">👤 Full Name:</span>
                                <div class="value">${name}</div>
                            </div>
                            
                            <div class="field">
                                <span class="label">📞 Phone Number:</span>
                                <div class="value">${phone}</div>
                            </div>
                            
                            <div class="field">
                                <span class="label">📧 Email Address:</span>
                                <div class="value">${email}</div>
                            </div>
                            
                            <div class="field">
                                <span class="label">🎯 Service Interested:</span>
                                <div class="value">${service || 'Not Selected'}</div>
                            </div>
                            
                            <div class="field">
                                <span class="label">💬 Message:</span>
                                <div class="value">${message.replace(/\n/g, '<br>')}</div>
                            </div>
                        </div>
                        <div class="footer">
                            <p>📅 Received on: ${new Date().toLocaleString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}</p>
                            <p>This email was automatically sent from your website contact form.</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };

        await transporter.sendMail(mailOptions);
        
        res.status(200).json({ 
            success: true, 
            message: 'Email sent successfully!' 
        });

    } catch (error) {
        console.error('Email Error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send email' 
        });
    }
});

// Health check
app.get('/', (req, res) => {
    res.send('✅ Hope Tech Solution Backend is Running!');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`
    ╔═══════════════════════════════════════╗
    ║   🚀 Hope Tech Solution Server        ║
    ╠═══════════════════════════════════════╣
    ║   Running on: http://localhost:${PORT}    ║
    ║   Email: ${YOUR_EMAIL}    ║
    ╚═══════════════════════════════════════╝
    `);
});