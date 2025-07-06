import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER as string,
    pass: process.env.GMAIL_PASS as string,
  },
});

const sendEmail = async (to: string, subject: string, html: string) => {
  `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            padding: 20px;
            line-height: 1.6;
          }
          .container {
            background: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #4CAF50;
          }
          h2 {
            color: #333;
          }
          p {
            margin: 10px 0;
          }
          .footer {
            margin-top: 20px;
            font-size: 0.9em;
            color: #777;
          }
        </style>
    </head>
    <body>
    <div class="container">
        <h1>Dear Valued User,</h1>
        <p>We hope this message finds you thriving in your digital endeavors.</p>
        <p>We would like to highlight the significance of efficiently managing your online marketplace. With our robust Node.js eCommerce REST API, <strong>NodeMultiVendorMarketPlace</strong>, you can create an exceptional shopping experience for your customers while maximizing your revenue potential.</p>
        
        <h2>Key Advantages of NodeMultiVendorMarketPlace:</h2>
        <ul>
            <li><strong>Multi-Vendor Support:</strong> Effortlessly manage various vendors and their products on a unified platform.</li>
            <li><strong>Customizable Features:</strong> Adapt the marketplace to fulfill your unique business requirements and enhance user engagement.</li>
            <li><strong>Secure Transactions:</strong> Provide secure payment processing and safeguard user data effectively.</li>
            <li><strong>Analytics and Insights:</strong> Access critical insights into sales trends and customer behavior to inform your strategic decisions.</li>
        </ul>
        
        <p>Our API is built with user-friendliness in mind, simplifying the process of building and scaling your online marketplace.</p>
        <p>If you have any inquiries or require assistance in getting started, please feel free to contact us. We are dedicated to supporting your success in the eCommerce space!</p>
        
        <div class="footer">
            <p>Warm regards,</p>
            <p>[Asoh Yannick]<br>[Full Stack Developer]<br>[codingLamb]<br>[codinglamb@gmail.com]</p>
        </div>
    </div>
    </body> 
  `;

  const mailOptions = {
    from: process.env.GMAIL_USER as string,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
export default sendEmail;