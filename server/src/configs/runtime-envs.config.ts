//CONSTANTS
const TEN_MINUTES = 1000 * 60 * 15;
const ONE_DAY = 1000 * 60 * 60 * 24;

// URIs
const CLIENT_URI =
	process.env.NODE_ENV === "production"
		? process.env.DEV_CLIENT_URL
		: process.env.DEV_CLIENT_URL;
const SERVER_URI =
	process.env.NODE_ENV === "production"
		? process.env.PROD_SERVER_URL
		: process.env.DEV_SERVER_URL;

//DB related
const CONNECTION_STRING =
	process.env.PROD_CONNECTION_STRING || process.env.DEV_CONNECTION_STRING;
const DB_NAME = process.env.NODE_ENV === "production" ? "production" : "dev";

// Expiration times
const PRE_SIGNUP_TOKEN_AGE =
	process.env.NODE_ENV === "production" ? "10m" : "1d";
const TOKEN_AGE = process.env.NODE_ENV === "production" ? "10m" : "5s";
const COOKIE_AGE =
	process.env.NODE_ENV === "production" ? TEN_MINUTES : ONE_DAY;

//Cookie settings
const COOKIE_SECURE = process.env.NODE_ENV === "production" ? true : false;
const COOKIE_SAME_SITE = process.env.NODE_ENV === "production" ? "none" : "lax";
const COOKIE_HTTP_ONLY = true;

export {
	CLIENT_URI,
	SERVER_URI,
	CONNECTION_STRING,
	DB_NAME,
	PRE_SIGNUP_TOKEN_AGE,
	TOKEN_AGE,
	COOKIE_AGE,
	COOKIE_SECURE,
	COOKIE_SAME_SITE,
	COOKIE_HTTP_ONLY,
};
