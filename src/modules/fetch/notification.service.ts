import axios from "axios";

export class NotificationService {
  /**
   * Send notification to webhook.
   * @param message
   */
  sendNotification(message: any) {
    axios
      .post("http://httpbin.org/post")
      .then((response) => {
        console.log("Notification sent successfully");
        return response;
      })
      .catch((error) => {
        throw new Error("Error sending notification");
      });
  }
}
