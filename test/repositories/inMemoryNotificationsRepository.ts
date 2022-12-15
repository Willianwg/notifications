import { Notification } from "@application/entities/Notification";
import { NotificationRepository } from "@application/repositories/notificationRepository";

export class inMemoryNotificationRepository implements NotificationRepository {
    public notifications: Notification[] = [];

    async create(notification: Notification) {
        this.notifications.push(notification);
    }

    async findById(notificationId: string): Promise<Notification | null> {
        return null;
    }

    async save(notification: Notification): Promise<void> {
        
    }
}