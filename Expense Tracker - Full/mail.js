const Sib = require("sib-api-v3-sdk");

require("dotenv").config();

const client = Sib.ApiClient.instance;

const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

const tranEmailApi = new Sib.TransactionalEmailsApi();

const sender = {
  email: "parasharvk@akgec.ac.in",
};

const to = [
  {
    email: "1999sanjaypatel@gmail.com",
  },
];
(async () => {
  tranEmailApi.sendTransacEmail({
    sender,
    to,
    subject: "Suspension from college final year exams",
    textContent: `
    Dear Sanjay Patel,
        We regret to inform you that you will no longer be able to participate
        in the upcoming University exams.

    Regards,
        V. K. Parashar
    `,
  });
})();
