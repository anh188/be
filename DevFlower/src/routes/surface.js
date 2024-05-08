import {Router} from "express";
import {asyncHandler} from "@/utils/handlers";
import {verifyToken, validate} from "../app/middleware/common";

import * as surfaceRequest from "../app/requests/surface.request";
import * as surfaceMiddleware from "../app/middleware/surface.middleware";
import * as surfaceController from "../app/controllers/surface.controller";

const router = Router();

router.use(asyncHandler(verifyToken));

router.get(
    "/",
    asyncHandler(validate(surfaceRequest.readRoot)),
    asyncHandler(surfaceController.readRoot)
);

router.get(
    "/:id",
    asyncHandler(surfaceMiddleware.checkSurfaceId),
    asyncHandler(surfaceController.readItem)
);

router.post(
    "/",
    asyncHandler(validate(surfaceRequest.createItem)),
    asyncHandler(surfaceController.createItem)
);

router.put(
    "/:id",
    asyncHandler(surfaceMiddleware.checkSurfaceId),
    asyncHandler(validate(surfaceRequest.updateItem)),
    asyncHandler(surfaceController.updateItem),
);

router.delete(
    "/:id",
    asyncHandler(surfaceMiddleware.checkSurfaceId),
    asyncHandler(surfaceController.removeItem)
);


export default router;
