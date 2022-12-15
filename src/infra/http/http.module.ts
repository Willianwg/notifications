import { Module } from "@nestjs/common";
import { SendNotificationService } from "@application/useCases/SendNotification";
import { DatabaseModule } from "../database/database.module";
import { NotificationsController } from "./controllers/notification.controller";
import { GetRecipientNotificationsService } from "@application/useCases/GetRecipientNotifications";
import { ReadNotificationService } from "@application/useCases/ReadNotification";
import { UnreadNotificationService } from "@application/useCases/UnreadNotification";
import { CancelNotificationService } from "@application/useCases/CancelNotification";
import { CountRecipientNotificationsService } from "@application/useCases/CountRecipientNotifications";

@Module({
    imports:[DatabaseModule],
    controllers:[NotificationsController],
    providers:[
        SendNotificationService,
        GetRecipientNotificationsService,
        ReadNotificationService,
        UnreadNotificationService,
        CancelNotificationService,
        CountRecipientNotificationsService,
    ],
})

export class HttpModule {}