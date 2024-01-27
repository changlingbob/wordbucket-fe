import { Bucket, WordManager } from 'wordbucket';

import {
  createFile,
  deleteFile,
  getFileIds,
  loadFile,
  saveFile,
} from './fileHelper';
import { Undoable } from './undomanager';

// Figuring out how do to this was a pain. It critically doesn't use an NPM module
// because there isn't one that does the right stuff properly that I could find.
// We're loading the Google OAuth via just chucking it in a script tag and a magic
// css class, but then using a globally registered name to load. The documentation
// is mostly reading npm:gdrive-appdata and hoping it's accurate.

interface IFileMap {
  [key: string]: string;
}

export interface IFileData {
  fileId: string;
  fileName: string;
  data?: string;
}

export class GoogleManager {
  private GoogleAuth?: gapi.auth2.GoogleAuthBase;
  private files: IFileData[] = [];
  private clientId: string =
    '404024621165-t0sbcvfkac2m8u4b8l3p04hm9r2jtqcg.apps.googleusercontent.com';

  private loadBucket: (bucketString: string) => void;

  constructor(load: (bucketString: string) => void) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias -- magic
    const self = this;
    this.loadBucket = load;

    const clientIdTag = document.createElement('meta');
    clientIdTag.name = 'google-signin-client_id';
    clientIdTag.content = this.clientId;
    document.head.appendChild(clientIdTag);

    const scopeTag = document.createElement('meta');
    scopeTag.name = 'google-signin-scope';
    scopeTag.content = 'https://www.googleapis.com/auth/drive.appdata';
    document.head.appendChild(scopeTag);

    const apiElement = document.createElement('script');
    apiElement.src = 'https://apis.google.com/js/platform.js';
    apiElement.type = 'text/javascript';
    apiElement.charset = 'utf-8';
    document.head.appendChild(apiElement);

    const initGapi = () => {
      gapi.auth2.getAuthInstance().then(
        (auth) => {
          self.GoogleAuth = auth;
          self.load();
          Undoable.setSave(this.save);
        },
        (err) => {
          // tslint:disable-next-line: no-console
          console.error(JSON.stringify(err));
          throw err;
        }
      );
    };

    apiElement.onload = () => {
      gapi.load('auth2', () => {
        gapi.load('client', () => {
          gapi.client.load('drive', 'v3', initGapi);
        });
      });
    };
  }

  public save = async () => {
    if (this.GoogleAuth) {
      const bucketNames: string[] = WordManager.getBuckets().map(
        (bucket: Bucket) => bucket.title
      );
      const data: IFileMap = {};
      const remove: IFileData[] = [];
      const add: IFileData[] = [];

      for (const bucketName of bucketNames.filter(
        (name) => name.indexOf('.') === -1
      )) {
        const fileName = `${bucketName}.json`;
        data[fileName] = WordManager.serialise(
          ...bucketNames.filter((bucket) => bucket.indexOf(bucketName) === 0)
        );
        if (
          this.files.filter((file) => file.fileName === fileName).length === 0
        ) {
          // eslint-disable-next-line no-await-in-loop -- saving multiple files here
          add.push(await createFile(fileName));
        }
      }

      this.files.forEach((file) => {
        if (!data[file.fileName]) {
          remove.push(file);
        }
      });

      this.files = this.files.filter(
        (file) =>
          remove.filter((removal) => removal.fileId === file.fileId).length ===
          0
      );
      this.files.forEach((file) => {
        // eslint-disable-next-line no-param-reassign -- constructing data objects
        file.data = data[file.fileName];
      });
      this.files = this.files.concat(add);

      await Promise.all(remove.map(deleteFile));
      await Promise.all(this.files.map(saveFile));
    }
  };

  public load = async () => {
    try {
      const fileIds = await getFileIds();
      const data = await Promise.all(fileIds.map(loadFile));
      data.forEach((file) => file.data && this.loadBucket(file.data));
      this.files = data;
    } catch (e) {
      this.loadBucket('');
    }
  };
}
