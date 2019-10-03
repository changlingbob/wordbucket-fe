class GoogleManager {
  // public GoogleAuth?: gapi.auth2.GoogleAuth;
  // private readonly gapiUrl: string = "https://apis.google.com/js/api.js";
  // private initPromise: Promise<any>;
  // private authPromise: Promise<any>;
  private authResolve: () => void;

  constructor(clientId: string) {
    // tslint:disable-next-line:no-empty
    this.authResolve = () => {};

    // this.initPromise = new Promise((resolve, reject) => {
    //   const apiElement = document.createElement("script");
    //   apiElement.src = this.gapiUrl;
    //   apiElement.type = "text/javascript";
    //   apiElement.charset = "utf-8";
    //   document.head.appendChild(apiElement);
    //   apiElement.onload = resolve;
    // }).then(() => {
    //   gapi.client.init({
    //     apiKey: "AIzaSyDLdwdSl5-Bz8pVOTel1ZyxmKBsTzaWXes",
    //     clientId,
    //     discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
    //     scope: "https://www.googleapis.com/auth/drive.appdata",
    //   }).then(() => {
    //     this.GoogleAuth = gapi.auth2.getAuthInstance();
    //     this.GoogleAuth.isSignedIn.listen(this.updateSigninStatus);
    //   });
    // });

    // this.authPromise = new Promise((resolve, reject) => {
    //   this.authResolve = resolve;
    // });
  }

  // public onReady(callback: () => void) {
  //   this.initPromise.then(callback);
  // }

  // public signIn() {
  //   if (this.GoogleAuth) {
  //     this.GoogleAuth.signIn();
  //   }
  // }

  // public signOut() {
  //   if (this.GoogleAuth) {
  //     this.GoogleAuth.signOut();
  //   }
  // }

  // public save(data: string) {
  //   this.authPromise.then();
  // }

  // private updateSigninStatus(isSignedIn: boolean) {
  //   if (isSignedIn) {
  //     // tslint:disable-next-line:no-console
  //     console.log("success");
  //     this.authResolve();
  //   }
  // }
}

export default GoogleManager;
