import fs from 'fs';
import { of, Observable } from 'rxjs';

class FileSystemUtils {

    pathExists(path: string): boolean {
        return fs.existsSync(path);
    }

    checkOrCreatePath(targetDir): Observable<any> {
        return of(fs.mkdirSync(targetDir, { recursive: true }));
    }

    fileExists(path: string) {
        return true;
    }

    removeFile(path: string) {
        if (this.fileExists(path)) {
            fs.unlink(path, (err) => {
                if (err) {
                    throw err;
                }

                console.log('file deleted');
            });
        }
    }

}

export default new FileSystemUtils();
