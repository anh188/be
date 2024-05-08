import {Router} from "express";
import {asyncHandler} from "@/utils/handlers";
import {verifyToken, validate} from "../app/middleware/common";

import * as partRequest from "../app/requests/part.request";
import * as partMiddleware from "../app/middleware/part.middleware";
import * as partController from "../app/controllers/part.controller";

const router = Router();

router.use(asyncHandler(verifyToken));

router.get(
    "/",
    asyncHandler(validate(partRequest.readRoot)),
    asyncHandler(partController.readRoot)
);

router.get(
    "/:id",
    asyncHandler(partMiddleware.checkPartId),
    asyncHandler(partController.readItem)
);

router.post(
    "/",
    asyncHandler(validate(partRequest.createItem)),
    asyncHandler(partController.createItem)
);

router.put(
    "/:id",
    asyncHandler(partMiddleware.checkPartId),
    asyncHandler(validate(partRequest.updateItem)),
    asyncHandler(partController.updateItem),
);

router.delete(
    "/:id",
    asyncHandler(partMiddleware.checkPartId),
    asyncHandler(partController.removeItem)
);


export default router;
