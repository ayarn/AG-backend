const { Router } = require("express");
const { upload } = require("utils/s3Upload");
const auth = require("middleware/userAuth.middleware");
const router = Router();

// <-------------------------- USER AUTH & ONBOARDING --------------------------> //
const {
    register,
    login,
    forgotPassword,
    validateOTP,
    changePassword,
    checkUserProfileVerification,
    logout,
} = require("controller/web/auth.controller");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgot-password").post(forgotPassword);
router.route("/otp").post(validateOTP);
router.route("/reset-password").post(changePassword);
router.route("/verify-user").post(checkUserProfileVerification);
router.route("/logout").post(auth, logout);

// <-------------------------- COUNTRY --------------------------> //
const { countryList } = require("controller/web/country.controller");

router.route("/countries").get(countryList);

// <-------------------------- USER PROFILE --------------------------> //
const {
    updateUserProfilePicture,
    getUserProfilePicture,
    updateBasicDetails,
    getBasicDetails,
    updateBusinessDetails,
    getBusinessDetails,
    getRequiredDocsList,
    uploadDocument,
    getMembershipPlanDetails,
} = require("controller/web/userProfile.controller");

router.route("/update-profile-pic").post(auth, upload.single("profile"), updateUserProfilePicture);
router.route("/get-profile-pic").get(auth, getUserProfilePicture);
router.route("/update-basic-details").post(auth, updateBasicDetails);
router.route("/get-basic-details").get(auth, getBasicDetails);
router.route("/update-business-details").post(auth, updateBusinessDetails);
router.route("/get-business-details").get(auth, getBusinessDetails);
router.route("/required-docs-list").get(auth, getRequiredDocsList);
router.route("/upload-document").post(auth, upload.single("doc"), uploadDocument);
router.route("/membership-plan-details").get(auth, getMembershipPlanDetails);

// <-------------------------- HOME PAGE --------------------------> //
const {
    getAllActiveBanners,
    getAllActiveLogos,
    getAllActiveAgriguruUpdates,
    getAllActiveNewsAndEvents,
    getAllActiveBrands,
    getAllActivePhotos,
    getAllActiveImagesByCategory,
    getAllActiveVideos,
    getAllActiveCategories,
    getAllActiveHeaderTaglines
} = require("controller/web/home.controller");

router.route("/banners").get(getAllActiveBanners);
router.route("/logos").get(getAllActiveLogos);
router.route("/agriguru-updates").get(getAllActiveAgriguruUpdates);
router.route("/news-and-events").get(getAllActiveNewsAndEvents);
router.route("/brands").get(getAllActiveBrands);
router.route("/photos").get(getAllActivePhotos);
router.route("/images-by-category").get(getAllActiveImagesByCategory);
router.route("/videos").get(getAllActiveVideos);
router.route("/categories").get(getAllActiveCategories);
router.route("/header-taglines").get(getAllActiveHeaderTaglines);

module.exports = router;
