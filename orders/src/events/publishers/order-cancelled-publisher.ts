import { Publisher, OrderCancelledEvent, Subjects } from "@amtickets2/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}