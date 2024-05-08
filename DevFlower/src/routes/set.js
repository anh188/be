import {Router} from "express";
import {asyncHandler} from "@/utils/handlers";
import {verifyToken, validate} from "../app/middleware/common";

import * as setRequest from "../app/requests/set.request";
import * as setMiddleware from "../app/middleware/set.middleware";
import * as setController from "../app/controllers/set.controller";

const router = Router();

router.use(asyncHandler(verifyToken));

router.get(
    "/",
    asyncHandler(validate(setRequest.readRoot)),
    asyncHandler(setController.readRoot)
);

router.get(
    "/:id",
    asyncHandler(setMiddleware.checkSetId),
    asyncHandler(setController.readItem)
);

router.post(
    "/",
    asyncHandler(validate(setRequest.createItem)),
    asyncHandler(setController.createItem)
);

router.put(
    "/:id",
    asyncHandler(setMiddleware.checkSetId),
    asyncHandler(validate(setRequest.updateItem)),
    asyncHandler(setController.updateItem),
);

router.delete(
    "/:id",
    asyncHandler(setMiddleware.checkSetId),
    asyncHandler(setController.removeItem)
);


export default router;
