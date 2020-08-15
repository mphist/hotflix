import SparkPost from "sparkpost";
require("dotenv").config();

export const sendConfirmEmailLink = async (link: string, email: string) => {
  const client = new SparkPost(process.env.SPARKPOST_API_KEY);

  client.transmissions
    .send({
      options: {
        sandbox: true,
      },
      content: {
        from: "testing@sparkpostbox.com",
        subject: "Hotflix - Confirm your email address",
        html: `<html><body><p>Welcome to Hotflix! Click <a href=${link}>here</a> to confirm your email address</p></body></html>`,
      },
      recipients: [{ address: `<${email}>` }],
    })
    .then((data) => {
      console.log("Woohoo! You just sent your first mailing!");
      console.log(data);
    })
    .catch((err) => {
      console.log("Whoops! Something went wrong");
      console.log(err);
    });
};
