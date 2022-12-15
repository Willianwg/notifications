import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "../repositories/notificationRepository";
import { NotificationNotFound } from "./errors/notificationNotFoundError";

type UnreadNotificationRequest = {
    notificationId: string;
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotificationService {
    constructor(private notificationRepository: NotificationRepository) { }
    async execute(request: UnreadNotificationRequest): Promise<UnreadNotificationResponse> {
        const { notificationId } = request;

        const notification = await this.notificationRepository.findById(notificationId);

        if (!notification) {
            throw new NotificationNotFound();
        }

        notification.unread();

        await this.notificationRepository.save(notification);

    }
}