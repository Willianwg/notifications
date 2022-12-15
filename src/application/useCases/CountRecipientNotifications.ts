import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "../repositories/notificationRepository";

type CountRecipientNotificationsRequest = {
    recipientId: string;
}

type CountRecipientNotificationsResponse = {
    count: number;
};

@Injectable()
export class CountRecipientNotificationsService {
    constructor(private notificationRepository: NotificationRepository) { }
    async execute(request: CountRecipientNotificationsRequest): Promise<CountRecipientNotificationsResponse> {
        const { recipientId } = request;

        const count = await this.notificationRepository.countManyByRecipientId(recipientId);
        
        return {
            count,
        }
    }
}