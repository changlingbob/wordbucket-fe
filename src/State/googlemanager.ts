class GoogleManager {
  public GoogleAuth?: gapi.auth2.GoogleAuth;
  // private readonly platformUrl: string = "https://apis.google.com/js/platform.js";
  private readonly gapiUrl: string = "https://apis.google.com/js/platform.js";

  constructor() {
    const self = this;

    const metaTag = document.createElement("meta");
    metaTag.name = "google-signin-client_id";
    metaTag.content = "404024621165-t0sbcvfkac2m8u4b8l3p04hm9r2jtqcg.apps.googleusercontent.com";
    document.head.appendChild(metaTag);

    const apiElement = document.createElement("script");
    apiElement.src = this.gapiUrl;
    apiElement.type = "text/javascript";
    apiElement.charset = "utf-8";
    document.body.appendChild(apiElement);
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
  }

  public load(data: string) {
  }
}

export default GoogleManager;
