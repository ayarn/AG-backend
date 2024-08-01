const SiteSetting = require("models/admin/siteSettings/siteSetting.model");
const { deleteFile } = require("utils/s3Upload");
const getCloudFrontUrl = require("helpers/getCloudFrontUrl");

module.exports = {
    addSiteSetting,
    editSiteSetting,
    getSiteSetting,
};

// Add new site settings
async function addSiteSetting(params, files) {
    try {
        const siteSettingExist = await SiteSetting.find({});

        if (siteSettingExist.length > 0) {
            const error = new Error("Site setting already exists");
            error.status = 400;
            throw error;
        }

        const { siteLogo, siteFavicon } = files;
        const {
            contactNumber1,
            contactNumber2,
            email,
            faceBook,
            twitterX,
            instaGram,
            linkedIn,
            youTube,
            playStore,
            appStore,
            copyRightText,
        } = params;

        if (!siteLogo) {
            const error = new Error("Site logo is required");
            error.status = 400;
            throw error;
        }

        if (!siteFavicon) {
            const error = new Error("Site favicon is required");
            error.status = 400;
            throw error;
        }

        if (!contactNumber1) {
            const error = new Error("Contact number 1 is required");
            error.status = 400;
            throw error;
        }
        if (!contactNumber2) {
            const error = new Error("Contact number 2 is required");
            error.status = 400;
            throw error;
        }
        if (!email) {
            const error = new Error("Email is required");
            error.status = 400;
            throw error;
        }
        if (!faceBook) {
            const error = new Error("Facebook link is required");
            error.status = 400;
            throw error;
        }
        if (!twitterX) {
            const error = new Error("Twitter link is required");
            error.status = 400;
            throw error;
        }
        if (!instaGram) {
            const error = new Error("Instagram link is required");
            error.status = 400;
            throw error;
        }
        if (!linkedIn) {
            const error = new Error("LinkedIn link is required");
            error.status = 400;
            throw error;
        }
        if (!youTube) {
            const error = new Error("Youtube link is required");
            error.status = 400;
            throw error;
        }
        if (!playStore) {
            const error = new Error("Playstore link is required");
            error.status = 400;
            throw error;
        }
        if (!appStore) {
            const error = new Error("Appstore link is required");
            error.status = 400;
            throw error;
        }
        if (!copyRightText) {
            const error = new Error("Copyright text is required");
            error.status = 400;
            throw error;
        }

        const siteSettingData = {
            siteLogo: siteLogo[0].key,
            siteFavicon: siteFavicon[0].key,
            contactNumber1,
            contactNumber2,
            email,
            faceBook,
            twitterX,
            instaGram,
            linkedIn,
            youTube,
            playStore,
            appStore,
            copyRightText,
        };

        const siteSetting = await SiteSetting.create(siteSettingData);

        if (!siteSetting) {
            const error = new Error("Internal server error");
            error.status = 500;
            throw error;
        }

        return { status: 200, data: {}, message: "Site settings successfully added" };
    } catch (err) {
        throw err;
    }
}

// Edit site settings
async function editSiteSetting(params, files) {
    try {
        const { siteLogo, siteFavicon } = files;
        const {
            contactNumber1,
            contactNumber2,
            email,
            faceBook,
            twitterX,
            instaGram,
            linkedIn,
            youTube,
            playStore,
            appStore,
            copyRightText,
        } = params;

        const siteSetting = await SiteSetting.find({});
        const settings = siteSetting[0];

        if (!settings) {
            const error = new Error("Site settings not found");
            error.status = 400;
            throw error;
        }

        if (siteLogo && siteLogo[0].key) {
            deleteFile(settings.siteLogo);

            settings.siteLogo = siteLogo[0].key;
        }

        if (siteFavicon && siteFavicon[0].key) {
            deleteFile(settings.siteFavicon);

            settings.siteFavicon = siteFavicon[0].key;
        }

        if (contactNumber1) {
            settings.contactNumber1 = contactNumber1;
        }

        if (contactNumber2) {
            settings.contactNumber2 = contactNumber2;
        }

        if (email) {
            settings.email = email;
        }

        if (faceBook) {
            settings.faceBook = faceBook;
        }

        if (twitterX) {
            settings.twitterX = twitterX;
        }

        if (instaGram) {
            settings.instaGram = instaGram;
        }

        if (linkedIn) {
            settings.linkedIn = linkedIn;
        }

        if (youTube) {
            settings.youTube = youTube;
        }

        if (playStore) {
            settings.playStore = playStore;
        }

        if (appStore) {
            settings.appStore = appStore;
        }

        if (copyRightText) {
            settings.copyRightText = copyRightText;
        }

        await settings.save();

        if (!settings) {
            const error = new Error("Internal server error");
            error.status = 500;
            throw error;
        }

        return { status: 200, data: settings, message: "Site settings successfully updated" };
    } catch (err) {
        throw err;
    }
}

// Get site settings
async function getSiteSetting() {
    try {
        const siteSetting = await SiteSetting.find({});

        if (!siteSetting[0]) {
            return { status: 200, data: [], message: "Currently site setting are not available" };
        }

        const settings = siteSetting[0];

        const siteSettingData = {
            id: settings._id,
            siteLogo: getCloudFrontUrl(settings.siteLogo),
            siteFavicon: getCloudFrontUrl(settings.siteFavicon),
            contactNumber1: settings.contactNumber1,
            contactNumber2: settings.contactNumber2,
            email: settings.email,
            faceBook: settings.faceBook,
            twitterX: settings.twitterX,
            instaGram: settings.instaGram,
            linkedIn: settings.linkedIn,
            youTube: settings.youTube,
            playStore: settings.playStore,
            appStore: settings.appStore,
            copyRightText: settings.copyRightText,
        };

        return { status: 200, data: siteSettingData, message: "Site settings recieved" };
    } catch (err) {
        throw err;
    }
}
