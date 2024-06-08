import nodemailer from 'nodemailer';
import asyncHandler from "express-async-handler";

const sendMail = asyncHandler(async ({email, html}) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: "tienyeuai2200@gmail.com", 
          pass: "wnaxqjumsnrwkhfj",
        },
      });
      
      // async..await is not allowed in global scope, must use a wrapper
      async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: '"BLACK SHOP👻" <no-reply@tienyeuai2200@gmail.com>', // sender address
          to: email, // list of receivers
          subject: "FORGOT PASSWORD ✔", // Subject line
          text: "CẢM ƠN BẠN ĐÃ TIN TƯỞNG VÀ MUA HÀNG TẠI BLACKSHOP CHÚNG TÔI LUÔN SẴN LÒNG PHỤC VỤ BẠN", // plain text body
          html: html
        });
        console.log(`Message sent: ${info.messageId}`);
        return info;
      }

    try {
      const mailInfo = await main();
      console.log(`Email sent successfully to: ${email}`);
      return mailInfo;
    } catch (error) {
      console.error(`Error sending email to ${email}: ${error}`);
      throw new Error(`Error sending email to ${email}: ${error}`);
    }
}) 

export default sendMail