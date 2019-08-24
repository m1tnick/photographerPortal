import mime from 'mime';
import multer from 'multer';
import path from 'path';
import shortid from 'shortid';

import FileSystemUtils from './fileSystem';

class StorageUtils {
    imageFilter(req: Express.Request, file: Express.Multer.File, cb) {
        const allowedFileTypes = /jpeg|jpg|png|gif/;
        const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = allowedFileTypes.test(file.mimetype);
        if (extension && mimeType) {
            return cb(null, true);
        } else {
            cb('Invalid file type. Only JPEG, PNG and GIF file are allowed.', false);
        }
    }

    uploadFile(location: string, eventType?: string) {
        eventType = eventType || 'ND';

        return multer.diskStorage({
            destination: (req, file, cb) => {
                console.log(location);
                FileSystemUtils.checkOrCreatePath(location).subscribe(
                    data => cb(null, location),
                    error => console.error('Failed to create folder: ' + location, error)
                );
            },
            filename: (req: Express.Request, file: Express.Multer.File, cb) => {
                const extension = mime.getExtension(file.mimetype);

                cb(null,  `${new Date().toISOString().replace(/[-T:\.Z]/g, '')}-${eventType}-${shortid.generate()}.${extension}`);
            }
        });
    }
}

export default new StorageUtils();
