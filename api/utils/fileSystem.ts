import fs from 'fs';
import util from 'util';
import { of, Observable } from 'rxjs';

class FileSystemUtils {
    unlinkPromise = util.promisify(fs.unlink);
    readFilePromise = util.promisify(fs.readFile);

    pathExists(path: string): boolean {
        return fs.existsSync(path);
    }

    checkOrCreatePath(targetDir): Observable<any> {
        return of(fs.mkdirSync(targetDir, { recursive: true }));
    }

    removeFile(path: string) {
        return this.readFilePromise(path)
            .then(resp => {
                console.log('Remove file response: ', resp);

                return this.unlinkPromise(path);
            });
    }
}

export default new FileSystemUtils();
