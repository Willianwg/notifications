import { Notification } from "@application/entities/Notification";
import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "../repositories/notificationRepository";

type GetRecipientNotificationsRequest = {
    recipientId: string;
}

type GetRecipientNotificationsResponse = {
    notifications: Notification[];
};

@Injectable()
export class GetRecipientNotificationsService {
    constructor(private notificationRepository: NotificationRepository) { }
    async execute(request: GetRecipientNotificationsRequest): Promise<GetRecipientNotificationsResponse> {
        const { recipientId } = request;

        const notifications = await this.notificationRepository.findManyByRecipientId(recipientId);
        
        return {
            notifications,
        }
    }
}