import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateNotificationBody } from '../dtos/createNotificationBody';
import { SendNotificationService } from '../../../application/useCases/SendNotification';

@Controller("notifications")
export class NotificationsController {
  constructor(private readonly sendNotificaton: SendNotificationService) { }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, category, content } = body;

    const { notification } = await this.sendNotificaton.execute({
      recipientId, content, category
    })

    return {
      notification
    }
  }
}
