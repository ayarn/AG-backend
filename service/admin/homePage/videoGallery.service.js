const VideoGallery = require("models/admin/homePage/videoGallery.model");
const MediaCategory = require("models/admin/homePage/mediaCategory.model");
const { deleteFile } = require("utils/s3Upload");
const getCloudFrontUrl = require("helpers/getCloudFrontUrl");

module.exports = {
    addVideo,
    getVideo,
    editVideo,
    deleteVideo,
    getVideos,
    getVideoCategories,
};

// Add new video
async function addVideo(params, video) {
    try {
        const { videoTitle, category, videoType, videoLink, status } = params;

        if (!videoTitle) {
            const error = new Error("Video Title is required");
            error.status = 400;
            throw error;
        }

        if (!category) {
            const error = new Error("Media category is required");
            error.status = 400;
            throw error;
        }

        if (!videoType) {
            const error = new Error("Video Type is required");
            error.status = 400;
            throw error;
        }

        if (videoType === "Youtube" && !videoLink) {
            const error = new Error("Video Link is required");
            error.status = 400;
            throw error;
        }

        if (videoType === "Normal" && !video) {
            const error = new Error("Video is required");
            error.status = 400;
            throw error;
        }

        if (!status) {
            const error = new Error("Status is required");
            error.status = 400;
            throw error;
        }

        const videoData = {
            videoTitle,
            category,
            videoType,
            videoLink: videoType === "Normal" ? video.key : videoLink,
            status,
        };

        const vdo = await VideoGallery.create(videoData);

        if (!vdo) {
            const error = new Error("Internal server error");
            error.status = 500;
            throw error;
        }

        return { status: 200, data: {}, message: "Video successfully added" };
    } catch (err) {
        throw err;
    }
}

// Edit video
async function editVideo(params, video) {
    try {
        const { id, videoTitle, category, videoType, videoLink, status } = params;

        if (!id) {
            const error = new Error("Video Id is required");
            error.status = 400;
            throw error;
        }

        const vdo = await VideoGallery.findById(id);

        if (!vdo) {
            const error = new Error("Video not found");
            error.status = 400;
            throw error;
        }

        if (videoTitle) {
            vdo.videoTitle = videoTitle;
        }

        if (category) {
            vdo.category = category;
        }

        if (videoType) {
            vdo.videoType = videoType;
        }

        if (video) {
            // Delete old video first
            deleteFile(vdo.videoLink);

            // Replace new video
            vdo.videoLink = video.key;
        } else {
            vdo.videoLink = videoLink;
        }

        if (status) {
            vdo.status = status;
        }

        await vdo.save();

        return { status: 200, data: vdo, message: "Video successfully updated" };
    } catch (err) {
        throw err;
    }
}

// Get video
async function getVideo(params) {
    try {
        const { id } = params;

        if (!id) {
            const error = new Error("Video Id is required");
            error.status = 400;
            throw error;
        }

        const vdo = await VideoGallery.findById(id);

        if (!vdo) {
            const error = new Error("Video not found");
            error.status = 400;
            throw error;
        }

        const videoData = {
            id: id,
            videoTitle: vdo.videoTitle,
            category: vdo.category,
            videoType: vdo.videoType,
            videoLink: vdo.videoType === "Normal" ? getCloudFrontUrl(vdo.videoLink) : vdo.videoLink,
            status: vdo.status,
        };

        return { status: 200, data: videoData, message: "Video received" };
    } catch (err) {
        throw err;
    }
}

// Delete video
async function deleteVideo(params) {
    try {
        const { id } = params;

        const deletedVideo = await VideoGallery.findOneAndDelete({ _id: id });

        if (!deletedVideo) {
            const error = new Error("Video not found");
            error.status = 400;
            throw error;
        }

        // Delete video from S3 bucket
        if (deletedVideo.videoType === "Normal") {
            deleteFile(deletedVideo.videoLink);
        }

        return { status: 200, data: deletedVideo, message: "Video successfully deleted" };
    } catch (err) {
        throw err;
    }
}

// Get all videos
async function getVideos(req) {
    try {
        const { page = 1, items_per_page = 10, search } = req.query;
        const pageNumber = parseInt(page);
        const itemsPerPage = parseInt(items_per_page);

        let searchQuery = {};

        if (search) {
            searchQuery = { videoTitle: { $regex: search, $options: "i" } };
        }

        const videos = await VideoGallery.find(searchQuery)
            .populate("category")
            .skip((pageNumber - 1) * itemsPerPage)
            .limit(itemsPerPage);

        if (!videos || videos.length === 0) {
            return { status: 200, data: [], message: "Currently videos are not available" };
        }

        const allVideos = videos.map((video) => ({
            id: video._id,
            videoTitle: video.videoTitle,
            category: {
                id: video.category._id,
                name: video.category.categoryName,
            },
            videoType: video.videoType,
            videoLink:
                video.videoType === "Normal" ? getCloudFrontUrl(video.videoLink) : video.videoLink,
            status: video.status,
        }));

        return {
            status: 200,
            data: allVideos,
            message: "Videos successfully received",
            page,
            items_per_page,
            total: allVideos.length,
        };
    } catch (err) {
        throw err;
    }
}

// Get Video Categories
async function getVideoCategories() {
    try {
        const mediaCategories = await MediaCategory.find({
            categoryType: "Youtube Video",
            status: "Active",
        });

        if (!mediaCategories || !mediaCategories.length === 0) {
            return {
                status: 200,
                data: [],
                message: "Currently video categories are not available",
            };
        }

        return {
            status: 200,
            data: mediaCategories,
            message: "Video categories successfully received",
        };
    } catch (err) {
        throw err;
    }
}
