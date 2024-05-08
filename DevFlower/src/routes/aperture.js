import {Router} from "express";
import {asyncHandler} from "@/utils/handlers";
import {verifyToken, validate} from "../app/middleware/common";

import * as apertureRequest from "../app/requests/aperture.request";
import * as apertureMiddleware from "../app/middleware/aperture.middleware";
import * as apertureController from "../app/controllers/aperture.controller";

const router = Router();

router.use(asyncHandler(verifyToken));

router.get(
    "/",
    asyncHandler(validate(apertureRequest.readRoot)),
    asyncHandler(apertureController.readRoot)
);

router.get(
    "/:id",
    asyncHandler(apertureMiddleware.checkApertureId),
    asyncHandler(apertureController.readItem)
);

router.post(
    "/",
    asyncHandler(validate(apertureRequest.createItem)),
    asyncHandler(apertureController.createItem)
);

router.put(
    "/:id",
    asyncHandler(apertureMiddleware.checkApertureId),
    asyncHandler(validate(apertureRequest.updateItem)),
    asyncHandler(apertureController.updateItem),
);

router.delete(
    "/:id",
    asyncHandler(apertureMiddleware.checkApertureId),
    asyncHandler(apertureController.removeItem)
);


export default router;
