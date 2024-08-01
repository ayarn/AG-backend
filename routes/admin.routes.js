const { Router } = require("express");
const { upload } = require("../utils/s3Upload");
const auth = require("middleware/adminAuth.middleware");
const router = Router();

// <-------------------------- ADMIN --------------------------> //
const {
    login,
    forgotPassword,
    validateOTP,
    changePassword,
    logout,
    getCurrentUser,
} = require("controller/admin/admin.controller");

router.route("/login").post(login);
router.route("/forgot-password").post(forgotPassword);
router.route("/otp").post(validateOTP);
router.route("/reset-password").post(changePassword);
router.route("/logout").post(auth, logout);
router.route("/get-user").post(getCurrentUser);

// <-------------------------- BANNER IMAGE --------------------------> //
const {
    addBanner,
    getBanner,
    editBanner,
    deleteBanner,
    getAllBanners,
} = require("controller/admin/homePage/bannerImage.controller");

router.route("/add-banner").post(auth, upload.single("bannerImage"), addBanner);
router.route("/edit-banner").patch(auth, upload.single("bannerImage"), editBanner);
router.route("/banner/:id").get(getBanner);
router.route("/banner/:id").delete(auth, deleteBanner);
router.route("/banners").get(getAllBanners);

// <-------------------------- LOGO IMAGE --------------------------> //
const {
    addLogo,
    getLogo,
    editLogo,
    deleteLogo,
    getAllLogos,
} = require("controller/admin/homePage/logoImage.controller");

router.route("/add-logo").post(auth, upload.single("logoImage"), addLogo);
router.route("/edit-logo").patch(auth, upload.single("logoImage"), editLogo);
router.route("/logo/:id").get(getLogo);
router.route("/logo/:id").delete(auth, deleteLogo);
router.route("/logos").get(getAllLogos);

// <-------------------------- AGRIGURU UPDATES (FLYERS) --------------------------> //
const {
    addAgriguruUpdate,
    getAgriguruUpdate,
    editAgriguruUpdate,
    deleteAgriguruUpdate,
    getAllAgriguruUpdates,
} = require("controller/admin/homePage/agriguruUpdate.controller");

router.route("/add-agriguru-update").post(auth, upload.single("flyerImage"), addAgriguruUpdate);
router.route("/edit-agriguru-update").patch(auth, upload.single("flyerImage"), editAgriguruUpdate);
router.route("/agriguru-update/:id").get(getAgriguruUpdate);
router.route("/agriguru-update/:id").delete(auth, deleteAgriguruUpdate);
router.route("/agriguru-updates").get(getAllAgriguruUpdates);

// <-------------------------- NEWS UPDATES --------------------------> //
const {
    addNews,
    getNews,
    editNews,
    deleteNews,
    getAllNews,
} = require("controller/admin/homePage/newsUpdate.controller");

router.route("/add-news").post(auth, upload.single("newsImage"), addNews);
router.route("/edit-news").patch(auth, upload.single("newsImage"), editNews);
router.route("/news/:id").get(getNews);
router.route("/news/:id").delete(auth, deleteNews);
router.route("/news").get(getAllNews);

// <-------------------------- EVENT UPDATES --------------------------> //
const {
    addEvent,
    getEvent,
    editEvent,
    deleteEvent,
    getEvents,
} = require("controller/admin/homePage/eventUpdate.controller");

router.route("/add-event").post(auth, upload.single("eventImage"), addEvent);
router.route("/edit-event").patch(auth, upload.single("eventImage"), editEvent);
router.route("/event/:id").get(getEvent);
router.route("/event/:id").delete(auth, deleteEvent);
router.route("/events").get(getEvents);

// <-------------------------- MARKETED BRANDS --------------------------> //
const {
    addBrand,
    getBrand,
    editBrand,
    deleteBrand,
    getBrands,
} = require("controller/admin/homePage/brand.controller");

router.route("/add-brand").post(auth, upload.single("brandImage"), addBrand);
router.route("/edit-brand").patch(auth, upload.single("brandImage"), editBrand);
router.route("/brand/:id").get(getBrand);
router.route("/brand/:id").delete(auth, deleteBrand);
router.route("/brands").get(getBrands);

// <-------------------------- MEDIA CATEGORY --------------------------> //
const {
    addMediaCategory,
    getMediaCategory,
    editMediaCategory,
    deleteMediaCategory,
    getMediaCategories,
} = require("controller/admin/homePage/mediaCategory.controller");

router.route("/add-media-category").post(auth, addMediaCategory);
router.route("/edit-media-category").patch(auth, editMediaCategory);
router.route("/media-category/:id").get(getMediaCategory);
router.route("/media-category/:id").delete(auth, deleteMediaCategory);
router.route("/media-categories").get(getMediaCategories);

// <-------------------------- PHOTO GALLERY --------------------------> //
const {
    addPhoto,
    getPhoto,
    editPhoto,
    deletePhoto,
    getPhotos,
    getPhotoCategories,
} = require("controller/admin/homePage/photoGallery.controller");

router.route("/add-photo").post(auth, upload.single("photo"), addPhoto);
router.route("/edit-photo").patch(auth, upload.single("photo"), editPhoto);
router.route("/photo/:id").get(getPhoto);
router.route("/photo/:id").delete(auth, deletePhoto);
router.route("/photos").get(getPhotos);
router.route("/photo-categories").get(getPhotoCategories);

// <-------------------------- VIDEO GALLERY --------------------------> //
const {
    addVideo,
    getVideo,
    editVideo,
    deleteVideo,
    getVideos,
    getVideoCategories,
} = require("controller/admin/homePage/videoGallery.controller");

router.route("/add-video").post(auth, upload.single("video"), addVideo);
router.route("/edit-video").patch(auth, upload.single("video"), editVideo);
router.route("/video/:id").get(getVideo);
router.route("/video/:id").delete(auth, deleteVideo);
router.route("/videos").get(getVideos);
router.route("/video-categories").get(getVideoCategories);

// <-------------------------- KYC DOCS --------------------------> //
const {
    addDocument,
    getDocument,
    editDocument,
    deleteDocument,
    getDocuments,
} = require("controller/admin/document.controller");

router.route("/add-document").post(auth, addDocument);
router.route("/edit-document").patch(auth, editDocument);
router.route("/document/:id").get(getDocument);
router.route("/document/:id").delete(auth, deleteDocument);
router.route("/documents").get(getDocuments);

// <-------------------------- MEMBERSHIP PLAN --------------------------> //
const {
    addMembershipPlan,
    getMembershipPlan,
    editMembershipPlan,
    deleteMembershipPlan,
    getMembershipPlans,
} = require("controller/admin/membershipPlan.controller");

router.route("/add-membership-plan").post(auth, upload.single("membership"), addMembershipPlan);
router.route("/edit-membership-plan").patch(auth, upload.single("membership"), editMembershipPlan);
router.route("/membership-plan/:id").get(getMembershipPlan);
router.route("/membership-plan/:id").delete(auth, deleteMembershipPlan);
router.route("/membership-plans").get(getMembershipPlans);

// <-------------------------- CATEGORY --------------------------> //
const {
    addCategory,
    getCategory,
    editCategory,
    deleteCategory,
    getCategories,
} = require("controller/admin/manageProduct/category.controller");

router.route("/add-category").post(auth, upload.single("categoryImage"), addCategory);
router.route("/edit-category").patch(auth, upload.single("categoryImage"), editCategory);
router.route("/category/:id").get(getCategory);
router.route("/category/:id").delete(auth, deleteCategory);
router.route("/categories").get(getCategories);

// <-------------------------- PORT --------------------------> //
const {
    addPort,
    getPort,
    editPort,
    deletePort,
    getPorts,
    getCountriesList,
} = require("controller/admin/manageProduct/port.controller");

router.route("/add-port").post(auth, addPort);
router.route("/edit-port").patch(auth, editPort);
router.route("/port/:id").get(getPort);
router.route("/port/:id").delete(auth, deletePort);
router.route("/ports").get(getPorts);
router.route("/all-countries").get(getCountriesList);

// <-------------------------- PACKING TYPE --------------------------> //
const {
    addPackingType,
    getPackingType,
    editPackingType,
    deletePackingType,
    getAllPackingTypes,
} = require("controller/admin/manageProduct/packingType.controller");

router.route("/add-packing-type").post(auth, addPackingType);
router.route("/edit-packing-type").patch(auth, editPackingType);
router.route("/packing-type/:id").get(getPackingType);
router.route("/packing-type/:id").delete(auth, deletePackingType);
router.route("/packing-types").get(getAllPackingTypes);

// <-------------------------- CONTAINER SIZE (SHIP BY) --------------------------> //
const {
    addContainer,
    getContainer,
    editContainer,
    deleteContainer,
    getContainers,
} = require("controller/admin/manageProduct/container.controller");

router.route("/add-container").post(auth, addContainer);
router.route("/edit-container").patch(auth, editContainer);
router.route("/container/:id").get(getContainer);
router.route("/container/:id").delete(auth, deleteContainer);
router.route("/containers").get(getContainers);

// <-------------------------- PRODUCT BRAND --------------------------> //
const {
    addProductBrand,
    getProductBrand,
    editProductBrand,
    deleteProductBrand,
    getProductBrands,
} = require("controller/admin/manageProduct/productBrand.controller");

router.route("/add-product-brand").post(auth, addProductBrand);
router.route("/edit-product-brand").patch(auth, editProductBrand);
router.route("/product-brand/:id").get(getProductBrand);
router.route("/product-brand/:id").delete(auth, deleteProductBrand);
router.route("/product-brands").get(getProductBrands);

// <-------------------------- INSPECTION --------------------------> //
const {
    addInspection,
    getInspection,
    editInspection,
    deleteInspection,
    getInspections,
} = require("controller/admin/manageProduct/inspection.controller");

router.route("/add-inspection").post(auth, addInspection);
router.route("/edit-inspection").patch(auth, editInspection);
router.route("/inspection/:id").get(getInspection);
router.route("/inspection/:id").delete(auth, deleteInspection);
router.route("/inspections").get(getInspections);

// <-------------------------- PRODUCT DOCUMENT --------------------------> //
const {
    addProductDocument,
    getProductDocument,
    editProductDocument,
    deleteProductDocument,
    getProductDocuments,
} = require("controller/admin/manageProduct/productDocument.controller");

router.route("/add-product-document").post(auth, addProductDocument);
router.route("/edit-product-document").patch(auth, editProductDocument);
router.route("/product-document/:id").get(getProductDocument);
router.route("/product-document/:id").delete(auth, deleteProductDocument);
router.route("/product-documents").get(getProductDocuments);

// <-------------------------- PAYMENT TERMS --------------------------> //
const {
    addPaymentTerm,
    getPaymentTerm,
    editPaymentTerm,
    deletePaymentTerm,
    getPaymentTerms,
} = require("controller/admin/manageProduct/paymentTerm.controller");

router.route("/add-payment-term").post(auth, addPaymentTerm);
router.route("/edit-payment-term").patch(auth, editPaymentTerm);
router.route("/payment-term/:id").get(getPaymentTerm);
router.route("/payment-term/:id").delete(auth, deletePaymentTerm);
router.route("/payment-terms").get(getPaymentTerms);

// <-------------------------- PORT PRICE --------------------------> //
const {
    addPortPrice,
    getPortPrice,
    editPortPrice,
    deletePortPrice,
    getPortPrices,
    getDestinationPorts,
} = require("controller/admin/manageProduct/portprice.controller");

router.route("/add-port-price").post(auth, addPortPrice);
router.route("/edit-port-price").patch(auth, editPortPrice);
router.route("/port-price/:id").get(getPortPrice);
router.route("/port-price/:id").delete(auth, deletePortPrice);
router.route("/port-prices/:loadingPort").get(getPortPrices);
router.route("/destination-ports/:loadingPort").get(getDestinationPorts);

// <-------------------------- PRODUCT --------------------------> //
const {
    addProduct,
    getProduct,
    editProduct,
    deleteProduct,
    getProducts,
    getProductMetaData,
    getLoadingPorts,
    getDestinationPortsByLoadingPort,
} = require("controller/admin/manageProduct/product.controller");

router.route("/add-product").post(auth, upload.single("productImage"), addProduct);
router.route("/edit-product").patch(auth, upload.single("productImage"), editProduct);
router.route("/product/:id").get(getProduct);
router.route("/product/:id").delete(auth, deleteProduct);
router.route("/products").get(getProducts);
router.route("/product-metadata").get(getProductMetaData);
router.route("/loading-ports/:country").get(getLoadingPorts);
router.route("/all-destination-ports/:loadingPort").get(getDestinationPortsByLoadingPort);

// <-------------------------- HEADER TAGLINE --------------------------> //
const {
    addHeaderTagline,
    getHeaderTagline,
    editHeaderTagline,
    deleteHeaderTagline,
    getHeaderTaglines,
} = require("controller/admin/homePage/headerTagline.controller");

router.route("/add-header-tagline").post(auth, addHeaderTagline);
router.route("/edit-header-tagline").patch(auth, editHeaderTagline);
router.route("/header-tagline/:id").get(getHeaderTagline);
router.route("/header-tagline/:id").delete(auth, deleteHeaderTagline);
router.route("/header-taglines").get(getHeaderTaglines);

// <-------------------------- SITE SETTINGS --------------------------> //
const {
    addSiteSetting,
    editSiteSetting,
    getSiteSetting,
} = require("controller/admin/siteSettings/siteSetting.controller");

router
    .route("/add-site-setting")
    .post(auth, upload.fields([{ name: "siteLogo" }, { name: "siteFavicon" }]), addSiteSetting);
router
    .route("/edit-site-setting")
    .patch(auth, upload.fields([{ name: "siteLogo" }, { name: "siteFavicon" }]), editSiteSetting);
router.route("/site-setting").get(getSiteSetting);

module.exports = router;
