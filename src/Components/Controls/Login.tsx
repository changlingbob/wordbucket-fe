import React from "react";
import { BucketState, IApplicationState } from "../../State/state";

const Login: React.StatelessComponent = () => {
  return (
    <BucketState render={(state: IApplicationState) => {
      return (
        <div
          className="g-signin2"
          data-onsuccess="alert"
        >
          Login
        </div>
      );
    }}/>
  );
};

export default Login;
