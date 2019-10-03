class GoogleManager {
  public GoogleAuth?: gapi.auth2.GoogleAuth;
  private readonly gapiUrl: string = "https://apis.google.com/js/api.js";
  private authPromise: Promise<any>;
  private authResolve: () => void;

  constructor() {
    // tslint:disable-next-line:no-empty
    this.authResolve = () => {};

    const apiElement = document.createElement("script");
    apiElement.src = this.gapiUrl;
    apiElement.type = "text/javascript";
    apiElement.charset = "utf-8";
    document.body.appendChild(apiElement);
    apiElement.onload = () => {
      gapi.load("client", this.initGapi);
    };

    this.authPromise = new Promise((resolve, reject) => {
      this.authResolve = resolve;
    });
  }
  public signIn() {
    if (this.GoogleAuth) {
      this.GoogleAuth.signIn();
    }
  }

  public signOut() {
    if (this.GoogleAuth) {
      this.GoogleAuth.signOut();
    }
  }

  public save(data: string) {
    this.authPromise.then();
  }

  private initGapi() {
    console.log("resolved");
    gapi.client.init({
      clientId: "404024621165-o3bapilsuiakriakp2g9mv9u20qdbiil.apps.googleusercontent.com",
      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
      scope: "https://www.googleapis.com/auth/drive.appdata",
    }).then(() => {
      this.GoogleAuth = gapi.auth2.getAuthInstance();
      this.GoogleAuth.isSignedIn.listen(this.updateSigninStatus);
    });
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
