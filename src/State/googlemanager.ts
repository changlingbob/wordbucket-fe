class GoogleManager {
  public GoogleAuth?: gapi.auth2.GoogleAuth;
  private readonly gapiUrl: string = "https://apis.google.com/js/platform.js";
  private authPromise: Promise<any>;
  private authResolve: () => void;

  constructor() {
    // tslint:disable-next-line:no-empty
    this.authResolve = () => {};
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
      gapi.load("client", initGapi);
    };

    function initGapi() {
      // gapi.client.init({
      //   clientId: "404024621165-t0sbcvfkac2m8u4b8l3p04hm9r2jtqcg.apps.googleusercontent.com",
      //   discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
      //   scope: "https://www.googleapis.com/auth/drive.appdata",
      // }).then(() => {
      //   self.GoogleAuth = gapi.auth2.getAuthInstance();
      //   self.GoogleAuth.isSignedIn.listen(self.updateSigninStatus);
      // }, () => {
      //   alert("you need to done do cookies");
      // });
    }

    this.authPromise = new Promise((resolve, reject) => {
      self.authResolve = resolve;
    });
  }

  public signIn = () => {
    if (this.GoogleAuth) {
      this.GoogleAuth.signIn();
    }
  }

  public signOut = () => {
    if (this.GoogleAuth) {
      this.GoogleAuth.signOut();
    }
  }

  public save(data: string) {
    this.authPromise.then();
  }

  private updateSigninStatus(isSignedIn: boolean) {
    if (isSignedIn) {
      // tslint:disable-next-line:no-console
      console.log("success");
      this.authResolve();
    }
  }
}

export default GoogleManager;
