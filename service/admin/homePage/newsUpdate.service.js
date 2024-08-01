const News = require("models/admin/homePage/news.model");
const { deleteFile } = require("utils/s3Upload");
const getCloudFrontUrl = require("helpers/getCloudFrontUrl");

module.exports = {
    addNews,
    getNews,
    editNews,
    deleteNews,
    getAllNews,
};

// Add new news
async function addNews(params, image) {
    try {
        const { newsTitle, newsDescription, newsSource, status } = params;

        if (!newsTitle) {
            const error = new Error("News Title is required");
            error.status = 400;
            throw error;
        }

        if (!newsDescription) {
            const error = new Error("News Description is required");
            error.status = 400;
            throw error;
        }

        if (!image) {
            const error = new Error("News image is required");
            error.status = 400;
            throw error;
        }

        if (!newsSource) {
            const error = new Error("News source is required");
            error.status = 400;
            throw error;
        }

        if (!status) {
            const error = new Error("Status is required");
            error.status = 400;
            throw error;
        }

        const newsData = {
            newsTitle,
            newsDescription,
            newsImage: image.key,
            newsSource,
            status,
        };

        const news = await News.create(newsData);

        if (!news) {
            const error = new Error("Internal server error");
            error.status = 500;
            throw error;
        }

        return { status: 200, data: {}, message: "News successfully added" };
    } catch (err) {
        throw err;
    }
}

// Edit news
async function editNews(params, image) {
    try {
        const { id, newsTitle, newsDescription, newsSource, status } = params;

        if (!id) {
            const error = new Error("News Id is required");
            error.status = 400;
            throw error;
        }

        const news = await News.findById(id);

        if (!news) {
            const error = new Error("News not found");
            error.status = 400;
            throw error;
        }

        if (newsTitle) {
            news.newsTitle = newsTitle;
        }

        if (newsDescription) {
            news.newsDescription = newsDescription;
        }

        if (image) {
            // Delete old image first
            deleteFile(news.newsImage);

            // Replace new image
            news.newsImage = image.key;
        }

        if (newsSource) {
            news.newsSource = newsSource;
        }

        if (status) {
            news.status = status;
        }

        await news.save();

        return { status: 200, data: news, message: "News successfully updated" };
    } catch (err) {
        throw err;
    }
}

// Get news
async function getNews(params) {
    try {
        const { id } = params;

        if (!id) {
            const error = new Error("News Id is required");
            error.status = 400;
            throw error;
        }

        const news = await News.findById(id);

        if (!news) {
            const error = new Error("News not found");
            error.status = 400;
            throw error;
        }

        const newsData = {
            id: id,
            newsTitle: news.newsTitle,
            newsDescription: news.newsDescription,
            newsImage: getCloudFrontUrl(news.newsImage),
            newsSource: news.newsSource,
            status: news.status,
        };

        return { status: 200, data: newsData, message: "News received" };
    } catch (err) {
        throw err;
    }
}

// Delete news
async function deleteNews(params) {
    try {
        const { id } = params;

        if (!id) {
            const error = new Error("News Id is required");
            error.status = 400;
            throw error;
        }

        const deletedNews = await News.findOneAndDelete({ _id: id });

        if (!deletedNews) {
            const error = new Error("News not found");
            error.status = 400;
            throw error;
        }

        // Delete image from S3 bucket
        deleteFile(deletedNews.newsImage);

        return { status: 200, data: deletedNews, message: "News successfully deleted" };
    } catch (err) {
        throw err;
    }
}

// Get all news
async function getAllNews(req) {
    try {
        const { page = 1, items_per_page = 10, search } = req.query;
        const pageNumber = parseInt(page);
        const itemsPerPage = parseInt(items_per_page);

        let searchQuery = {};

        if (search) {
            searchQuery = { newsTitle: { $regex: search, $options: "i" } };
        }

        const news = await News.find(searchQuery)
            .skip((pageNumber - 1) * itemsPerPage)
            .limit(itemsPerPage);

        if (!news || news.length === 0) {
            return { status: 200, data: [], message: "Currently news are not available" };
        }

        const allNews = news.map((nws) => ({
            id: nws._id,
            newsTitle: nws.newsTitle,
            newsDescription: nws.newsDescription,
            newsImage: getCloudFrontUrl(nws.newsImage),
            newsSource: nws.newsSource,
            status: nws.status,
        }));

        return {
            status: 200,
            data: allNews,
            message: "News successfully received",
            page,
            items_per_page,
            total: allNews.length,
        };
    } catch (err) {
        throw err;
    }
}
