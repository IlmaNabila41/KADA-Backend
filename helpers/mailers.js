import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// }); 

// const sendEmail = async (to, subject, html) => {
//     await transporter.sendMail({
//         from: `Nebulibrary <${process.env.EMAIL_USER}>`,
//         to,
//         subject,
//         html,
//     });
// }

const sendEmail = (to, subject, html) => {
    console.log("Fitur email sedang non-aktif.");
    /* transporter.sendMail({ to, subject, html }, ...);
    */
};
export default sendEmail;