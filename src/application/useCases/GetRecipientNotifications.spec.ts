import { makeNotification } from "@test/factories/notificationFactory";
import { inMemoryNotificationRepository } from "@test/repositories/inMemoryNotificationsRepository";
import { GetRecipientNotificationsService } from "./GetRecipientNotifications";

describe("Cancel notification service", () => {
    it("should be able to get recipient notifications", async () => {
        const notificationRepository = new inMemoryNotificationRepository();
        const getRecipientNotifications = new GetRecipientNotificationsService(notificationRepository);

        await notificationRepository.create(makeNotification({ recipientId: "recipient-1" }));

        await notificationRepository.create(makeNotification({ recipientId: "recipient-1" }));

        await notificationRepository.create(makeNotification({ recipientId: "recipient-2" }));

        const { notifications } = await getRecipientNotifications.execute({ recipientId: "recipient-1" });

        expect(notifications).toHaveLength(2);
        expect(notifications).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ recipientId: "recipient-1" }),
                expect.objectContaining({ recipientId: "recipient-1" })
            ])
        );
    })
})