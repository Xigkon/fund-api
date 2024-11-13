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
    // Perform the search for AAPL stock
    const results = await yahooFinance.search("AAPL");

    // Log the results for debugging purposes
    logger.info("Search results: ", {structuredData: true, results});

    // Send the results back as the response
    response.json(results);
  } catch (error) {
    // If there's an error, log it and send an error message
    logger.error("Error occurred while fetching Yahoo Finance data", error);
    response.status(500).send("Error fetching data from Yahoo Finance");
  }
});
