//boilerplate sib setup
const SibApiV3Sdk = require("sib-api-v3-sdk");
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.SIB_API_KEY;

//send email function
const send = (subject, htmlContent, to) => {
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = htmlContent;
  sendSmtpEmail.sender = {
    name: process.env.SIB_NAME,
    email: process.env.SIB_SENDER_EMAIL,
  };
  sendSmtpEmail.replyTo = {
    name: process.env.SIB_NAME,
    email: process.env.SIB_SENDER_EMAIL,
  };
  sendSmtpEmail.to = to;

  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    (data) => {
      console.log("API said:", data);
    },
    (error) => {
      console.log(error);
    }
  );
};

module.exports = send;
