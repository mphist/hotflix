import fetch from "node-fetch";

export const nudgeDyno = () => {
  const host = process.env.FRONTEND_HOST_PROD;
  setTimeout(async () => {
    try {
      await fetch(host);
    } catch (err) {
      console.log(
        "There was an error trying to nudge the dyno. Retrying in 30 minutes",
        err
      );
    } finally {
      nudgeDyno();
    }
  }, 1000 * 60 * 30);
};
