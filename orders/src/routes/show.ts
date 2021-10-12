import express, { Router, Request, Response } from "express";
import { NotAuthorizedError, NotFoundError, requireAuth } from "@amtickets2/common";
import { Order } from "../models/order";

const router = express.Router();

router.get('/api/orders/:orderId', requireAuth, async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate('ticket'); //give the order and the associated ticket

    if(!order) {
        throw new NotFoundError();
    }

    if(order.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }

    res.send(order);
});

export { router as showOrderRouter };