import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNotificationBody } from '../dtos/createNotificationBody';
import { SendNotificationService } from '@application/useCases/SendNotification';
import { HttpNotificationMapper } from '../mappers/notificationHttpMapper';
import { CancelNotificationService } from '@application/useCases/CancelNotification';
import { ReadNotificationService } from '@application/useCases/ReadNotification';
import { UnreadNotificationService } from '@application/useCases/UnreadNotification';
import { CountRecipientNotificationsService } from '@application/useCases/CountRecipientNotifications';
import { GetRecipientNotificationsService } from '@application/useCases/GetRecipientNotifications';

@Controller("notifications")
export class NotificationsController {
  constructor(
    private sendNotificaton: SendNotificationService,
    private cancelNotification: CancelNotificationService,
    private readNotification: ReadNotificationService,
    private unreadNotification: UnreadNotificationService,
    private countRecipientNotifications: CountRecipientNotificationsService,
    private getRecipientNotifications: GetRecipientNotificationsService
  ) { }

  @Patch(":id/cancel")
  async cancel(@Param("id") id: string) {
    await this.cancelNotification.execute({ notificationId: id });
  }

  @Get("count/from/:recipientId")
  async countFromRecipient(@Param("recipientId") recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({ recipientId });

    return {
      count
    };
  }

  @Get("from/:recipientId")
  async getFromRecipient(@Param("recipientId") recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({ recipientId });

    return {
      notifications: notifications.map(HttpNotificationMapper.toHttp),
    };
  }

  @Patch(":id/read")
  async read(@Param("id") id: string) {
    await this.readNotification.execute({ notificationId: id });
  }

  @Patch(":id/unread")
  async unread(@Param("id") id: string) {
    await this.unreadNotification.execute({ notificationId: id });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, category, content } = body;

    const { notification } = await this.sendNotificaton.execute({
      recipientId, content, category
    });

    return {
      notification: HttpNotificationMapper.toHttp(notification),
    }
  }
}
