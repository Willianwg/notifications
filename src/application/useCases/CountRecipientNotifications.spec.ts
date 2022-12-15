import { Content } from "@application/entities/content";
import { Notification } from "@application/entities/Notification";
import { inMemoryNotificationRepository } from "@test/repositories/inMemoryNotificationsRepository";
import { CountRecipientNotificationsService } from "./CountRecipientNotifications";

describe("Cancel notification service", () => {
    it("should be able to count recipient notifications", async () => {
        const notificationRepository = new inMemoryNotificationRepository();


        await notificationRepository.create(
            new Notification({
                category: "social",
                content: new Content("friend request"),
                recipientId: "recipient-1",
            })
        );

        await notificationRepository.create(
            new Notification({
                category: "social",
                content: new Content("friend request"),
                recipientId: "recipient-1",
            })
        );

        await notificationRepository.create(
            new Notification({
                category: "social",
                content: new Content("friend request"),
                recipientId: "recipient-2",
            })
        );

        const countRecipientNotifications = new CountRecipientNotificationsService(notificationRepository);

        const { count } = await countRecipientNotifications.execute({ recipientId: "recipient-1" });

        expect(count).toEqual(2);
    })
})