import nodemailer from 'nodemailer';

const from = '"MyLib" <info@mylib.com>'

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
        subject: "Witamy w MyLib",
        text: `
        Witamy w MyLib. Aby kontynuować pracę na naszym serwisie proszę potwierdzić adres email.

        ${process.env.HOST}/confirmation/${user.get('confirmationToken')}
        `
    }

    transport.sendMail(email);
}

export function sendResetPasswordEmail(user) {
    const transport = setup();
    const email = {
        from,
        to: user.get('email'),
        subject: "Resetowanie hasła",
        text: `
        Aby zresetować hasło kliknij w poniższy link

        ${process.env.HOST}/resetPassword/${user.get('resetPasswordToken')}
        `
    }

    transport.sendMail(email);
}