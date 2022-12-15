import { makeNotification } from "@test/factories/notificationFactory";
import { inMemoryNotificationRepository } from "@test/repositories/inMemoryNotificationsRepository";
import { CancelNotificationService } from "./CancelNotification";
import { NotificationNotFound } from "./errors/notificationNotFoundError";

describe("Cancel notification service", () => {
    it("should be able to Cancel a notification", async () => {
        const notificationRepository = new inMemoryNotificationRepository();
        const cancelNotification = new CancelNotificationService(notificationRepository);

        const notification = makeNotification();

        await notificationRepository.create(notification);

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