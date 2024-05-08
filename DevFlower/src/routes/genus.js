import {Router} from "express";
import {asyncHandler} from "@/utils/handlers";
import {verifyToken, validate} from "../app/middleware/common";

import * as genusRequest from "../app/requests/genus.request";
import * as genusMiddleware from "../app/middleware/genus.middleware";
import * as genusController from "../app/controllers/genus.controller";

const router = Router();

router.use(asyncHandler(verifyToken));

router.get(
    "/",
    asyncHandler(validate(genusRequest.readRoot)),
    asyncHandler(genusController.readRoot)
);

router.get(
    "/:id",
    asyncHandler(genusMiddleware.checkGenusId),
    asyncHandler(genusController.readItem)
);

router.post(
    "/",
    asyncHandler(validate(genusRequest.createItem)),
    asyncHandler(genusController.createItem)
);

router.put(
    "/:id",
    asyncHandler(genusMiddleware.checkGenusId),
    asyncHandler(validate(genusRequest.updateItem)),
    asyncHandler(genusController.updateItem),
);

router.delete(
    "/:id",
    asyncHandler(genusMiddleware.checkGenusId),
    asyncHandler(genusController.removeItem)
);


export default router;
