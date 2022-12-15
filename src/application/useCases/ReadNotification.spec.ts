import { makeNotification } from "@test/factories/notificationFactory";
import { inMemoryNotificationRepository } from "@test/repositories/inMemoryNotificationsRepository";
import { ReadNotificationService } from "./ReadNotification";
import { NotificationNotFound } from "./errors/notificationNotFoundError";

describe("Read notification service", () => {
    it("should be able to read a notification", async () => {
        const notificationRepository = new inMemoryNotificationRepository();
        const readNotification = new ReadNotificationService(notificationRepository);

        const notification = makeNotification();

        await notificationRepository.create(notification);

        await readNotification.execute({ notificationId: notification.id });

        expect(notificationRepository.notifications[0].readAt).toEqual(
            expect.any(Date)
        );
    })

    it("should not be able to read a non existing notification", async ()=>{
        const notificationRepository = new inMemoryNotificationRepository();
        const readNotification = new ReadNotificationService(notificationRepository);

        expect(()=>{
            return readNotification.execute({ notificationId:"notificationFakeId"})
        }).rejects.toThrow(NotificationNotFound);
    })
})