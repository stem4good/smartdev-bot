import { sendArchivedPage } from './sendArchivedPage'
const isUrl = require('is-url')
const fs = require('fs')


module.exports = (message, senderID, sendMessageData) => {
    if (isUrl(message)) {
        sendArchivedPage(message, function (zipFile) {
            sendMessageData(senderID, {
                    attachment: {
                        type: "file",
                        payload: {
                            url: `${process.env.currentUrl}/${zipFile}`
                        }
                    }
                }, function () {
                    fs.unlinkSync(`./data/archives/${zipFile}`);
                }

            )
        })
    }else{
        console.log("this is not a url.")
    }
}