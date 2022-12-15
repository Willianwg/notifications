import { Injectable } from "@nestjs/common";
import { Notification } from "@application/entities/Notification";
import { NotificationRepository } from "@application/repositories/notificationRepository";
import { PrismaService } from "../prisma.service";
import { PrismaNotificationMapper } from "../mappers/prismaNotificationMapper";

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
    constructor(private prismaService: PrismaService) { }

    async findById(notificationId: string): Promise<Notification | null> {
        const notification = await this.prismaService.notification.findUnique({
            where: {
                id: notificationId,
            }
        });

        if (!notification) {
            return null;
        }

        return PrismaNotificationMapper.toDomain(notification);

    }
    async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
        const notifications = await this.prismaService.notification.findMany({
            where:{
                recipientId
            }
        })

        return notifications.map(PrismaNotificationMapper.toDomain);
    }

    async countManyByRecipientId(recipientId: string): Promise<number> {
        const count = await this.prismaService.notification.count({
            where: {
                recipientId
            }
        });

        return count;
    }

    async create(notification: Notification): Promise<void> {
        const mappedData = PrismaNotificationMapper.toPrisma(notification);

        await this.prismaService.notification.create({
            data: mappedData,
        })
    }

    async save(notification: Notification): Promise<void> {
        const raw = PrismaNotificationMapper.toPrisma(notification);

        await this.prismaService.notification.update({
            where: {
                id: raw.id
            },
            data: raw
        })
    }
}