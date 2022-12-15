import { makeNotification } from "@test/factories/notificationFactory";
import { inMemoryNotificationRepository } from "@test/repositories/inMemoryNotificationsRepository";
import { UnreadNotificationService } from "./UnreadNotification";
import { NotificationNotFound } from "./errors/notificationNotFoundError";

describe("Read notification service", () => {
    it("should be able to unread a notification", async () => {
        const notificationRepository = new inMemoryNotificationRepository();
        const unreadNotification = new UnreadNotificationService(notificationRepository);

        const notification = makeNotification({
            readAt: new Date(),
        });

        await notificationRepository.create(notification);

        await unreadNotification.execute({ notificationId: notification.id });

        expect(notificationRepository.notifications[0].readAt).toBeNull();
    })

    it("should not be able to unread a non existing notification", async ()=>{
        const notificationRepository = new inMemoryNotificationRepository();
        const unreadNotification = new UnreadNotificationService(notificationRepository);

        expect(()=>{
            return unreadNotification.execute({ notificationId:"notificationFakeId"})
        }).rejects.toThrow(NotificationNotFound);
    })
})