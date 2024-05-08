import {Router} from "express";
import {asyncHandler} from "@/utils/handlers";
import {verifyToken, validate} from "../app/middleware/common";

import * as shapeRequest from "../app/requests/shape.request";
import * as shapeMiddleware from "../app/middleware/shape.middleware";
import * as shapeController from "../app/controllers/shape.controller";

const router = Router();

router.use(asyncHandler(verifyToken));

router.get(
    "/",
    asyncHandler(validate(shapeRequest.readRoot)),
    asyncHandler(shapeController.readRoot)
);

router.get(
    "/:id",
    asyncHandler(shapeMiddleware.checkShapeId),
    asyncHandler(shapeController.readItem)
);

router.post(
    "/",
    asyncHandler(validate(shapeRequest.createItem)),
    asyncHandler(shapeController.createItem)
);

router.put(
    "/:id",
    asyncHandler(shapeMiddleware.checkShapeId),
    asyncHandler(validate(shapeRequest.updateItem)),
    asyncHandler(shapeController.updateItem),
);

router.delete(
    "/:id",
    asyncHandler(shapeMiddleware.checkShapeId),
    asyncHandler(shapeController.removeItem)
);


export default router;
