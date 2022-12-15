import { makeNotification } from "@test/factories/notificationFactory";
import { inMemoryNotificationRepository } from "@test/repositories/inMemoryNotificationsRepository";
import { CountRecipientNotificationsService } from "./CountRecipientNotifications";

describe("Cancel notification service", () => {
    it("should be able to count recipient notifications", async () => {
        const notificationRepository = new inMemoryNotificationRepository();
        const countRecipientNotifications = new CountRecipientNotificationsService(notificationRepository);

        await notificationRepository.create(makeNotification({ recipientId: "recipient-1" }));

        await notificationRepository.create(makeNotification({ recipientId: "recipient-1" }));

        await notificationRepository.create(makeNotification({ recipientId: "recipient-2" }));

        const { count } = await countRecipientNotifications.execute({ recipientId: "recipient-1" });

        expect(count).toEqual(2);
    })
})