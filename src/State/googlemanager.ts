import Bucket from "wordbucket/out/Bucket";

// Figuring out how do to this was a pain. It critically doesn't use an NPM module
// because there isn't one that does the right stuff properly that I could find.
// We're loading the Google OAuth via just chucking it in a script tag and a magic
// css class, but then using a gloablly registered name to load. The documentation
// is mostly reading npm:gdrive-appdata and hoping it's accurate.

interface IFilenameMap {
  [key: string]: string;
}

class GoogleManager {
  private GoogleAuth?: gapi.auth2.GoogleAuth;
  private fileIds: IFilenameMap = {};
  private clientId: string = "404024621165-t0sbcvfkac2m8u4b8l3p04hm9r2jtqcg.apps.googleusercontent.com";
  private loadBucket: (bucketString: string) => void;

  constructor(load: (bucketString: string) => void) {
    const self = this;
    this.loadBucket = load;

    const clientIdTag = document.createElement("meta");
    clientIdTag.name = "google-signin-client_id";
    clientIdTag.content = this.clientId;
    document.head.appendChild(clientIdTag);

    const scopeTag = document.createElement("meta");
    scopeTag.name = "google-signin-scope";
    scopeTag.content = "https://www.googleapis.com/auth/drive.appdata";
    document.head.appendChild(scopeTag);

    const apiElement = document.createElement("script");
    apiElement.src = "https://apis.google.com/js/platform.js";
    apiElement.type = "text/javascript";
    apiElement.charset = "utf-8";
    document.head.appendChild(apiElement);
    apiElement.onload = () => {
      gapi.load("auth2", () => {
        gapi.load("client", () => {
          gapi.client.load("drive", "v3", initGapi);
        });
      });
    };

    const initGapi = () => {
      gapi.auth2.getAuthInstance().then((auth) => {
        self.GoogleAuth = auth;
        self.load();
      }, (err) => {
        alert(JSON.stringify(err));
        throw err;
      });
    };
  }

  public save = async (data: Bucket) => {
    if (this.GoogleAuth) {
      // gapi.client.drive.files.;
    }
  }

  public load = async () => {
    this.loadFiles().then((files: string[]) => {
      files.forEach(this.loadBucket);
    });
  }

  private loadFile = async (fileName: string) => {
    return gapi.client.drive.files.get({
      alt: "media",
      fileId: this.fileIds[fileName],
    }).then((res) => {
      console.log(`got file:`);
      console.log(res);
      return res;
    });
  }

  private loadFiles = async (): Promise<string[]> => {
    console.log("load function");
    if (Object.keys(this.fileIds).length > 0) {
      return Promise.all(
        Object.keys(this.fileIds).map(this.loadFile),
      ).then((files) => {
        console.log("promise has returned");
        console.log(files);
        return files.map((file) => file.body);
      });
    } else {
      return this.getFileIds().then((ids) => {
          if (Object.keys(ids).length > 0) {
            return this.loadFiles();
          } else {
            return [];
          }
        });
    }
  }

  private saveFile = async (data: string, id: string) => {
    return gapi.client.request({
      body: data,
      method: "PATCH",
      params: { uploadType: "media" },
      path: `/upload/drive/v3/files/${id}`,
    });
  }

  private create = async (fileName: string): Promise<IFilenameMap> => {
    console.log("create function");
    return gapi.client.drive.files.create({
      fields: "id",
      resource: { name: fileName, parents: ["appDataFolder"] },
    }).then((response) => {
      if (response
        && response.result
        && response.result.id
      ) {
        this.fileIds[fileName] = response.result.id;
      }
      return this.fileIds;
    });
  }

  private getFileIds = async (): Promise<IFilenameMap> => {
    console.log("getFileIds function");
    return gapi.client.drive.files.list({
      fields: "files(name, id)",
      spaces: "appDataFolder",
    }).then((response) => {
      if (response
        && response.result
        && response.result.files
        && response.result.files.length > 0
      ) {
        const newMap: IFilenameMap = {};
        console.log(response);
        response.result.files.forEach(
          (file) => {
            if (file.name && file.id) {
              newMap[file.name] = file.id;
            }
          },
        );

        this.fileIds = newMap;
      }
      return this.fileIds;
    });
  }
}

export default GoogleManager;
