const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const { getActivationLink } = require("../helpers/getActivationLink");

module.exports = sendUserProfileActivationEmail;

// Send user an email with profile activation link
function sendUserProfileActivationEmail(email, fullName, activationCode) {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: process.env.HOST_EMAIL,
        port: 465,
        secure: true,
        auth: {
            user: process.env.HOST_EMAIL,
            pass: process.env.HOST_EMAIL_PASSWORD,
        },
    });

    // Get email template
    const templatePath = path.join(__dirname, "../templates/profileActivationEmail.ejs");

    // Get activation link
    const activationLink = getActivationLink(email, activationCode);

    // Render template file
    ejs.renderFile(
        templatePath,
        {
            fullName,
            activationLink: activationLink,
            customerServiceLink: process.env.CUSTOMER_SERVICE_LINK,
        },
        (err, html) => {
            if (err) {
                console.error("Error rendering EJS template:", err);
                return Promise.reject(err);
            }

            const mailOptions = {
                from: process.env.HOST_EMAIL,
                to: email,
                subject: process.env.REGISTER_EMAIL_SUBJECT,
                html: html,
            };

            return new Promise((resolve, reject) => {
                // Send email
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(info);
                    }
                });
            });
        }
    );
}
