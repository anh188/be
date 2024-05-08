import {Router} from "express";
import {asyncHandler} from "@/utils/handlers";
import {verifyToken, validate, upload} from "../app/middleware/common";

import * as flowerRequest from "../app/requests/flower.request";
import * as flowerMiddleware from "../app/middleware/flower.middleware";
import * as flowerController from "../app/controllers/flower.controller";

const router = Router();

router.use(asyncHandler(verifyToken));

router.get(
    "/",
    asyncHandler(validate(flowerRequest.readRoot)),
    asyncHandler(flowerController.readRoot)
);

router.get(
    "/:id",
    asyncHandler(flowerMiddleware.checkFlowerId),
    asyncHandler(flowerController.readItem)
);

router.post(
    "/",
    asyncHandler(upload),
    asyncHandler(validate(flowerRequest.createItem)),
    asyncHandler(flowerController.createItem)
);

router.put(
    "/:id",
    asyncHandler(upload),
    asyncHandler(flowerMiddleware.checkFlowerId),
    asyncHandler(validate(flowerRequest.updateItem)),
    asyncHandler(flowerController.updateItem),
);

router.delete(
    "/:id",
    asyncHandler(flowerMiddleware.checkFlowerId),
    asyncHandler(flowerController.removeItem)
);


export default router;
