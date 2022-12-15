import { Notification } from "@application/entities/Notification";
import { NotificationRepository } from "@application/repositories/notificationRepository";

export class inMemoryNotificationRepository implements NotificationRepository {
    public notifications: Notification[] = [];

    async create(notification: Notification) {
        this.notifications.push(notification);
    }

    async findById(notificationId: string): Promise<Notification | null> {
        const notification = this.notifications.find( item => item.id === notificationId);

        return notification ? notification : null;
    }

    async save(notification: Notification): Promise<void> {
        const notificationIndex = this.notifications.findIndex( item => item.id === notification.id );

        if(notificationIndex >= 0 ){
            this.notifications[notificationIndex] = notification;
        }
    }

    async countManyByRecipientId(recipientId: string): Promise<number> {
        return this.notifications.filter( item => item.recipientId === recipientId).length;
    }

    async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
        const notifications = this.notifications.filter(item => item.recipientId === recipientId);

        return notifications;
    }
}