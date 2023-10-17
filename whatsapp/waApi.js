const axios = require("axios");
require("dotenv").config();
const token  = "EAAD6FwQ4acQBOyUblyFcX13368RZB9ehk4NZBDYN3hpwhKgc5OJmnZB9pvoeZAvR9qYUj9sKZCNRggaASGCGvmJ8r93f7huYwNV7RHZC3ZAPtdknCAKd49BETNX5UisIJZAPtrI6fJKybZCDh0XdENP6hpwyz3JaAPR82DWLSnY0xj6j88nGjeOjTKo5Gu3Rrp3E6U06DtmO0PhZBcZBq9u5ZAA6JCTUzQMdUvpmfGSpiYWZAah0ZD"
const waApi = axios.create({
    baseURL: "https://graph.facebook.com/v17.0",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
    },
});

module.exports = waApi;
