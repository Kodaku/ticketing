import { Publisher, Subjects, TicketCreatedEvent } from "@amtickets2/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}