class GoogleManager {
  private GoogleAuth?: gapi.auth2.GoogleAuth;
  private fileIds: string[] = [];
  private fileName: string = "wordbucket.json";
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

  public save = async (data: string) => {
    if (this.GoogleAuth) {

    }
  }

  public load = async () => {
    if (this.fileIds) {
      gapi.client.drive.files.get({
        alt: "media",
        fileId: this.fileIds[0],
      }).then((res) => {
        console.log(`got file:`);
        console.log(res);
      });
    } else {
      this.getFileIds().then(this.load);
    }
  }

  private create = async (): Promise<string[]> => {
    return gapi.client.drive.files.create({
      fields: "id",
      resource: { name: this.fileName, parents: ["appDataFolder"] },
    }).then((response) => {
      if (response
        && response.result
        && response.result.id
      ) {
        this.fileIds.push(response.result.id);
      }
      return this.fileIds;
    });
  }

  private getFileIds = async (): Promise<string[]> => {
    return gapi.client.drive.files.list({
      fields: "files(id)",
      q: `name="${this.fileName}"`,
      spaces: "appDataFolder",
    }).then((response) => {
      if (response
        && response.result
        && response.result.files
        && response.result.files[0]
        && response.result.files[0].id
      ) {
        this.fileIds = response.result.files.map((file) => file.id || "");
        return this.fileIds;
      } else {
        return this.create();
      }
    });
  }
}

export default GoogleManager;
