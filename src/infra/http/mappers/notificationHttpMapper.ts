import { Notification } from "@application/entities/Notification";

export class HttpNotificationMapper {
    static toHttp(notification: Notification){
        return {
            id: notification.id,
            content: notification.content.value,
            category: notification.category,
            recipientId: notification.recipientId,
        }
    }
}