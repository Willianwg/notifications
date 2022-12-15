import { Injectable } from "@nestjs/common";
import { Notification } from "@application/entities/Notification";
import { NotificationRepository } from "@application/repositories/notificationRepository";
import { PrismaService } from "../prisma.service";
import { PrismaNotificationMapper } from "../mappers/prismaNotificationMapper";

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
    constructor(private prismaService: PrismaService){}

    async create(notification: Notification): Promise<void> {
        const mappedData = PrismaNotificationMapper.toPrisma(notification);

        await this.prismaService.notification.create({
            data: mappedData,
        })
    }
}