const BannerImage = require("models/admin/homePage/bannerImage.model");
const Logo = require("models/admin/homePage/logo.model");
const AgriguruUpdate = require("models/admin/homePage/agriguruUpdate.model");
const News = require("models/admin/homePage/news.model");
const Event = require("models/admin/homePage/event.model");
const Brand = require("models/admin/homePage/brand.model");
const PhotoGallery = require("models/admin/homePage/photoGallery.model");
const MediaCategory = require("models/admin/homePage/mediaCategory.model");
const VideoGallery = require("models/admin/homePage/videoGallery.model");
const Category = require("models/admin/manageProduct/category.model");
const HeaderTagline = require("models/admin/homePage/headerTagline.model");
const getCloudFrontUrl = require("../../helpers/getCloudFrontUrl");

module.exports = {
    getAllActiveBanners,
    getAllActiveLogos,
    getAllActiveAgriguruUpdates,
    getAllActiveNewsAndEvents,
    getAllActiveBrands,
    getAllActivePhotos,
    getAllActiveImagesByCategory,
    getAllActiveVideos,
    getAllActiveCategories,
    getAllActiveHeaderTaglines,
};

// Get All Active Banners
async function getAllActiveBanners() {
    try {
        const banners = await BannerImage.find({ status: "Active" });

        if (!banners || banners.length === 0) {
            return { status: 200, data: [], message: "Currently banner images are not available" };
        }

        const allBanners = [];

        for (let banner of banners) {
            const bannerData = {
                id: banner._id,
                bannerTitle: banner.bannerTitle,
                bannerDescription: banner.bannerDescription,
                bannerImage: getCloudFrontUrl(banner.bannerImage),
                category: banner.category,
                bannerLink: banner.bannerLink,
            };

            allBanners.push(bannerData);
        }

        return {
            status: 200,
            data: allBanners,
            message: "Successfully received all active banner images",
        };
    } catch (err) {
        throw err;
    }
}

// Get All Active Logos
async function getAllActiveLogos() {
    try {
        const logos = await Logo.find({ status: "Active" });

        if (!logos || logos.length === 0) {
            return { status: 200, data: [], message: "Currently logo images are not available" };
        }

        const allLogos = [];

        for (let logo of logos) {
            const logoData = {
                id: logo._id,
                logoTitle: logo.logoTitle,
                logoDescription: logo.logoDescription,
                logoImage: getCloudFrontUrl(logo.logoImage),
            };

            allLogos.push(logoData);
        }

        return {
            status: 200,
            data: allLogos,
            message: "Successfully received all active logo images",
        };
    } catch (err) {
        throw err;
    }
}

// Get All Active Agriguru Updates
async function getAllActiveAgriguruUpdates() {
    try {
        const flyers = await AgriguruUpdate.find({ status: "Active" });

        if (!flyers || flyers.length === 0) {
            return {
                status: 200,
                data: [],
                message: "Currently agriguru updates are not available",
            };
        }

        const allFlyers = [];

        for (let flyer of flyers) {
            const flyerData = {
                id: flyer._id,
                flyerTitle: flyer.flyerTitle,
                flyerDescription: flyer.flyerDescription,
                flyerImage: getCloudFrontUrl(flyer.flyerImage),
                type: flyer.type,
                pageDescription: flyer.pageDescription,
                link: flyer.link,
            };

            allFlyers.push(flyerData);
        }

        return {
            status: 200,
            data: allFlyers,
            message: "Successfully received all active Agriguru updates",
        };
    } catch (err) {
        throw err;
    }
}

// Get All Active News And Events
async function getAllActiveNewsAndEvents(req) {
    try {
        const { search } = req.query;

        let newsSearchQuery = { status: "Active" };
        let eventSearchQuery = { status: "Active" };

        if (search) {
            newsSearchQuery.newsTitle = { $regex: search, $options: "i" };
            eventSearchQuery.eventTitle = { $regex: search, $options: "i" };
        }

        const [news, events] = await Promise.all([
            News.find(newsSearchQuery),
            Event.find(eventSearchQuery),
        ]);

        if (news.length === 0 && events.length === 0) {
            return {
                status: 200,
                data: [],
                message: "Currently news and events are not available",
            };
        }

        const allNewsAndEvents = [];

        for (let nws of news) {
            const newsData = {
                id: nws._id,
                title: nws.newsTitle,
                description: nws.newsDescription,
                image: getCloudFrontUrl(nws.newsImage),
                type: "news",
            };

            allNewsAndEvents.push(newsData);
        }

        for (let event of events) {
            const eventData = {
                id: event._id,
                title: event.eventTitle,
                description: event.eventDescription,
                image: getCloudFrontUrl(event.eventImage),
                startDate: event.eventStartDate,
                endDate: event.eventEndDate,
                location: event.eventLocation,
                type: "event",
            };

            allNewsAndEvents.push(eventData);
        }

        return {
            status: 200,
            data: allNewsAndEvents,
            message: "Successfully received all active news and events",
        };
    } catch (err) {
        throw err;
    }
}

// Get All Active Brands
async function getAllActiveBrands() {
    try {
        const brands = await Brand.find({ status: "Active" });

        if (!brands || brands.length === 0) {
            return {
                status: 200,
                data: [],
                message: "Currently brands are not available",
            };
        }

        const allBrands = [];

        for (let brand of brands) {
            const brandData = {
                id: brand._id,
                brandTitle: brand.brandTitle,
                brandImage: getCloudFrontUrl(brand.brandImage),
            };

            allBrands.push(brandData);
        }

        return { status: 200, data: allBrands, message: "Successfully received all active brands" };
    } catch (err) {
        throw err;
    }
}

// Get All Active Photos
async function getAllActivePhotos() {
    try {
        const photos = await PhotoGallery.find({ status: "Active" });

        if (!photos || photos.length === 0) {
            return { status: 200, data: [], message: "Currently images are not available" };
        }

        const allPhotos = [];

        for (let photo of photos) {
            const photoData = {
                id: photo._id,
                imageTitle: photo.imageTitle,
                category: photo.category,
                photo: getCloudFrontUrl(photo.photo),
            };

            allPhotos.push(photoData);
        }

        return { status: 200, data: allPhotos, message: "Successfully received all active photos" };
    } catch (err) {
        throw err;
    }
}

// Get All Active Videos
async function getAllActiveVideos() {
    try {
        const videos = await VideoGallery.find({ status: "Active" });

        if (!videos || videos.length === 0) {
            return { status: 200, data: [], message: "Currently videos are not available" };
        }

        const allVideos = [];

        for (let video of videos) {
            const videoData = {
                id: video._id,
                videoTitle: video.videoTitle,
                category: video.category,
                videoType: video.videoType,
                videoLink:
                    video.videoType === "Normal"
                        ? getCloudFrontUrl(video.videoLink)
                        : video.videoLink,
            };

            allVideos.push(videoData);
        }

        return { status: 200, data: allVideos, message: "Successfully received all active videos" };
    } catch (err) {
        throw err;
    }
}

// Get images (Album) by category
async function getAllActiveImagesByCategory() {
    try {
        const [allImageCategories, allImages] = await Promise.all([
            MediaCategory.find({ categoryType: "Gallery Image", status: "Active" }).select("_id"),
            PhotoGallery.find({ status: "Active" }).select("category photo"),
        ]);

        const imagesByCategory = {};

        allImages.forEach((image) => {
            if (!imagesByCategory[image.category]) {
                imagesByCategory[image.category] = [];
            }
            imagesByCategory[image.category].push({
                _id: image._id,
                photo: getCloudFrontUrl(image.photo),
            });
        });

        return {
            status: 200,
            data: imagesByCategory,
            message: "Photo albums successfully received",
        };
    } catch (err) {
        throw err;
    }
}

// Get All Active Categories
async function getAllActiveCategories() {
    try {
        const categories = await Category.find({ status: "Active" });

        if (!categories || categories.length === 0) {
            return { status: 200, data: [], message: "Currently categories are not available" };
        }

        const allCategories = [];

        for (let category of categories) {
            let newData = {
                id: category._id,
                category: category.categoryName,
            };

            allCategories.push(newData);
        }

        return {
            status: 200,
            data: allCategories,
            message: "Successfully received all active categories",
        };
    } catch (err) {
        throw err;
    }
}

// Get All Active HeaderTaglines
async function getAllActiveHeaderTaglines() {
    try {
        const headerTaglines = await HeaderTagline.find({ status: "Active" });

        if (!headerTaglines || headerTaglines.length === 0) {
            return {
                status: 200,
                data: [],
                message: "Currently HeaderTaglines are not available",
            };
        }

        const allheaderTaglines = [];

        for (let headerTagline of headerTaglines) {
            let newData = {
                id: headerTagline._id,
                title: headerTagline.title,
            };

            allheaderTaglines.push(newData);
        }

        return {
            status: 200,
            data: allheaderTaglines,
            message: "Successfully received all active HeaderTaglines",
        };
    } catch (err) {
        throw err;
    }
}
