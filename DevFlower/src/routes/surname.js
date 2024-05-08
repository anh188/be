import {Router} from "express";
import {asyncHandler} from "@/utils/handlers";
import {verifyToken, validate} from "../app/middleware/common";

import * as surnameRequest from "../app/requests/surname.request";
import * as surnameMiddleware from "../app/middleware/surname.middleware";
import * as surnameController from "../app/controllers/surname.controller";

const router = Router();

router.use(asyncHandler(verifyToken));

router.get(
    "/",
    asyncHandler(validate(surnameRequest.readRoot)),
    asyncHandler(surnameController.readRoot)
);

router.get(
    "/:id",
    asyncHandler(surnameMiddleware.checkSurnameId),
    asyncHandler(surnameController.readItem)
);

router.post(
    "/",
    asyncHandler(validate(surnameRequest.createItem)),
    asyncHandler(surnameController.createItem)
);

router.put(
    "/:id",
    asyncHandler(surnameMiddleware.checkSurnameId),
    asyncHandler(validate(surnameRequest.updateItem)),
    asyncHandler(surnameController.updateItem),
);

router.delete(
    "/:id",
    asyncHandler(surnameMiddleware.checkSurnameId),
    asyncHandler(surnameController.removeItem)
);


export default router;
