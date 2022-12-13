import { Content } from "../entities/content";
import { Notification } from "../entities/Notification";

type SendNotificationRequest = {
    recipientId: string;
    content: string;
    category: string;
}

type SendNotificationResponse = {
    notification: Notification
}

export class SendNotificationService {
    async execute(request: SendNotificationRequest): Promise<SendNotificationResponse>{
        const { recipientId, content, category} = request;

        const notification = new Notification({
            recipientId,
            content: new Content(content),
            category
        });

        return {
            notification
        }
    }
}