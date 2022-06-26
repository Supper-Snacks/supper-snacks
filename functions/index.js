const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.sendNotificationToTopic = functions.firestore.document("capt/{uid}")
    .onWrite(async (event) => {
    // let docID = event.after.id;
      const title = event.after.get("title");
      const content = event.after.get("content");
      const message = {
        notification: {
          title: title,
          body: content,
        },
        topic: "namelesscoder",
      };

      const response = await admin.messaging().send(message);
      console.log(response);
    });
