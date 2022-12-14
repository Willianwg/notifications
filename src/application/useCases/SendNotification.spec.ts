import { SendNotificationService } from "./SendNotification"

describe("Send notification service", ()=>{
    it("should be able to send a notification", async ()=>{
        const sendNotification = new SendNotificationService();
        const {notification} = await sendNotification.execute({
            category:"social",
            content:"this is a notification",
            recipientId:"example-recipient-id"
        })

        expect(notification).toBeTruthy();
    })
})