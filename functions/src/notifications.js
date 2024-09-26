const { admin } = require("./firebase");

exports.sendNotification = async (token, title, body) => {
  const message = {
    notification: { title, body },
    token,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Successfully sent message:", response);
    return response;
  } catch (error) {
    console.log("Error sending message:", error);
    throw error;
  }
};
