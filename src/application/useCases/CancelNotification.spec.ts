import { Content } from "@application/entities/content";
import { Notification } from "@application/entities/Notification";
import { inMemoryNotificationRepository } from "@test/repositories/inMemoryNotificationsRepository";
import { CancelNotificationService } from "./CancelNotification";
import { NotificationNotFound } from "./errors/notificationNotFoundError";

describe("Cancel notification service", () => {
    it("should be able to Cancel a notification", async () => {
        const notificationRepository = new inMemoryNotificationRepository();

        const notification = new Notification({
            category: "social",
            content: new Content("friend request"),
            recipientId: "example-recipient-id",
        })

        await notificationRepository.create(notification);

        const cancelNotification = new CancelNotificationService(notificationRepository);

        await cancelNotification.execute({ notificationId: notification.id });

        expect(notificationRepository.notifications[0].canceledAt).toEqual(
            expect.any(Date)
        );
    })

    it("should not be able to cancel a non existing notification", async ()=>{
        const notificationRepository = new inMemoryNotificationRepository();
        const cancelNotification = new CancelNotificationService(notificationRepository);

        expect(()=>{
            return cancelNotification.execute({ notificationId:"notificationFakeId"})
        }).rejects.toThrow(NotificationNotFound);
    })
})