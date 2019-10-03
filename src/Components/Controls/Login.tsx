import React from "react";
import { BucketState, IApplicationState } from "../../State/state";

const Login: React.StatelessComponent = () => {
  return (
    <BucketState render={(state: IApplicationState) => {
      return (
        <div
          onClick={state.googleManager.signIn}
        >
          Login
        </div>
      );
    }}/>
  );
};

export default Login;
