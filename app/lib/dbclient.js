const AWS  = require("aws-sdk");
const getAWSConfig = require("../config/aws_config");

AWS.config.update(getAWSConfig());
const client = new AWS.DynamoDB();

module.exports = client;