import nodemailer from 'nodemailer';

const from = '"YouTune" <info@youtune.com>'

function setup() {
    return nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
                }
            });
}

export function sendConfirmationEmail(user) {
    const transport = setup();
    const email = {
        from,
        to: user.get('email'),
        subject: "Witamy w YouTune",
        text: `
        Witamy w YouTune. Aby kontynuować pracę na naszym serwisie proszę potwierdzić adres email.

        ${process.env.HOST}/confirmation/${user.get('confirmationToken')}
        `
    }

    transport.sendMail(email);
}