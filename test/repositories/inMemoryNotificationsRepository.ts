import { Notification } from "../../src/application/entities/Notification";
import { NotificationRepository } from "../../src/application/repositories/notificationRepository";

export class inMemoryNotificationRepository implements NotificationRepository {
    public notifications: Notification[] = [];

    async create(notification: Notification) {
        this.notifications.push(notification);
    }
}