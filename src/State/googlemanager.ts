class GoogleManager {
  private GoogleAuth?: gapi.auth2.GoogleAuth;

  constructor() {
    const self = this;

    const clientIdTag = document.createElement("meta");
    clientIdTag.name = "google-signin-client_id";
    clientIdTag.content = "404024621165-t0sbcvfkac2m8u4b8l3p04hm9r2jtqcg.apps.googleusercontent.com";
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
      gapi.load("auth2", initGapi);
    };

    function initGapi() {
      gapi.auth2.getAuthInstance().then((auth) => {
        self.GoogleAuth = auth;
      }, (err) => {
        alert(JSON.stringify(err));
        throw err;
      });
    }
  }

  public save(data: string) {
    if (this.GoogleAuth) {
    }
  }

  public load() {
  }
}

export default GoogleManager;
