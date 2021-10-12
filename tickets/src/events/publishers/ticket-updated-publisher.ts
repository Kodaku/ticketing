import { Publisher, Subjects, TicketUpdatedEvent } from "@amtickets2/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}