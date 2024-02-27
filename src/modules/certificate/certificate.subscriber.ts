import {
  EventSubscriber,
  EntitySubscriberInterface,
  UpdateEvent,
} from "typeorm";
import Certificate from "./certificate.entity";
import { NotificationService } from "../fetch/notification.service";

@EventSubscriber()
export class CertificateSubscriber
  implements EntitySubscriberInterface<Certificate>
{
  /**
   * Indicates that this subscriber only listen to Certificate events.
   */
  listenTo() {
    return Certificate;
  }

  /**
   * Called after entity update.
   */
  afterUpdate(event: UpdateEvent<any>) {
    if (event.entity.active) {
      console.log(`Certificate activated `, event.entity);
      new NotificationService().sendNotification(event.entity);
    }
  }
}
