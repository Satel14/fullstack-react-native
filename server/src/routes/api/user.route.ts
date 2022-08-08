import { Router } from "express";
import { bodyValidation } from "../../middleware/validate";
import {
    passportSignupAuthenticate,
    passportLoginAuthenticate,
} from "../../middleware/auth.middleware";
import { userSchema } from "../../types/user.type";
const router: Router = Router();

// @route   POST api/user
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
router.post(
    "/signup",
    bodyValidation(userSchema),
    passportSignupAuthenticate
);
router.post(
    "/signin",
    bodyValidation(userSchema),
    passportLoginAuthenticate
);
export default router;
