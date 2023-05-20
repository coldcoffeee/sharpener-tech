const Sib = require("sib-api-v3-sdk");
require("dotenv").config();

const client = Sib.ApiClient.instance;

const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

const tranEmailApi = new Sib.TransactionalEmailsApi();

const sender = {
  name: "Mohit @ Sharpener Tech",
  email: "support@sharpenertech.in",
};

module.exports = async (receiver, token, url) => {
  tranEmailApi.sendTransacEmail({
    sender,
    to: [{ email: receiver }],
    subject: "Expense Tracker password reset",
    htmlContent: `
      <h2>Password Reset</h2>
      <p>
        Here's the link to reset your password: <a href = ${url}/${token}>Reset password</a>.
        <br>
        Do not share this link outside. 
      </p>
    `,
  });
};
