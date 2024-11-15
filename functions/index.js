/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const yahooFinance = require("yahoo-finance2").default;

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest(async (request, response) => {
  try {
    // 查询AAPL的相关信息
    const results = await yahooFinance.search("AAPL");

    // 记录日志
    logger.info("Yahoo Finance Results", {structuredData: true});

    // 返回 JSON 格式的响应
    response.status(200).json(results);
  } catch (error) {
    // 如果发生错误，返回错误信息
    logger.error("Error fetching Yahoo Finance data", {structuredData: true});
    response
        .status(500)
        .json({error: "Failed to fetch data from Yahoo Finance"});
  }
});
