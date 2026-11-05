
import multer from "multer";
import { randomBytes } from "node:crypto";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp");
    },

    filename: function (req, file, cb) {
        randomBytes(16, function (err, raw) {
            if (err) return cb(err);

            const uniqueName = `${raw.toString("hex")}-${file.originalname}`;

            cb(null, uniqueName);
        });
    }
});

export const upload = multer({
    storage: storage
});
