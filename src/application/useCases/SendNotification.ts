import { Content } from "../entities/content";
import { Notification } from "../entities/Notification";
import { NotificationRepository } from "../repositories/notificationRepository";

type SendNotificationRequest = {
    recipientId: string;
    content: string;
    category: string;
}

type SendNotificationResponse = {
    notification: Notification
}

export class SendNotificationService {
    constructor(private notificationRepository: NotificationRepository){}
    async execute(request: SendNotificationRequest): Promise<SendNotificationResponse>{
        const { recipientId, content, category} = request;

        const notification = new Notification({
            recipientId,
            content: new Content(content),
            category
        });

        await this.notificationRepository.create(notification);

        return {
            notification
        }
    }
}