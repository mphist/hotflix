import fetch from "node-fetch";

export const nudgeDyno = () => {
  const host = process.env.BACKEND_HOST_PROD;
  console.log("nudging");
  setTimeout(async () => {
    try {
      await fetch(host);
    } catch (err) {
      console.log(
        "There was an error trying to nudge the dyno. Retrying in 20 minutes",
        err
      );
    } finally {
      nudgeDyno();
    }
  }, 1000 * 60 * 20);
};
