const axios = require("axios");
const token  = "EAAD6FwQ4acQBO8UdeFhSn262TwFPZApQZBc5MAcShP4Etcp450JpvLX6F2mZBmZC8B9vzLoaN5T0b64XD9ieaX7s7B8vw9r9LEOdfZCxeZA6COtWLlgjZCMN3aIo8H1Y3FzmNaXYXYxnzqMDcKmvfWboVJDbZBoX6RWhBsxxpd13ANGQLEkcfi3HMTs0P80rwvCYJCDmUvMK5t6Pp9jPkJ5A71qVzvWjGkHxkZC0jMpfOVkkZD"
const waApi = axios.create({
    baseURL: "https://graph.facebook.com/v17.0",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
});

module.exports = waApi;
