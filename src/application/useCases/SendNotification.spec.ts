import { inMemoryNotificationRepository } from "../../../test/repositories/inMemoryNotificationsRepository";
import { SendNotificationService } from "./SendNotification"

describe("Send notification service", () => {
    it("should be able to send a notification", async () => {
        const notificationRepository = new inMemoryNotificationRepository();
        const sendNotification = new SendNotificationService(notificationRepository);
        const { notification } = await sendNotification.execute({
            category: "social",
            content: "this is a notification",
            recipientId: "example-recipient-id"
        })

        expect(notificationRepository.notifications).toHaveLength(1);
        expect(notificationRepository.notifications[0]).toEqual(notification);
    })
})