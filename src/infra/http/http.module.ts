import { Module } from "@nestjs/common";
import { SendNotificationService } from "../../application/useCases/SendNotification";
import { DatabaseModule } from "../database/database.module";
import { NotificationsController } from "./controllers/notification.controller";

@Module({
    imports:[DatabaseModule],
    controllers:[NotificationsController],
    providers:[SendNotificationService],
})

export class HttpModule {}