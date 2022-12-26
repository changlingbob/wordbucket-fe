import classNames from "classnames";
import React, { ReactNode } from "react";
import { Bucket, WordManager } from "wordbucket";
import GoogleManager from "./googlemanager";

export interface IApplicationState {
  googleManager: GoogleManager;
  path: string;
  inPath(bucket: Bucket): boolean;
  load(bucketString: string): void;
  navigate(path: string): void;
}

const StateContext = React.createContext<IApplicationState | null>(null);

export class StateProvider extends React.Component {
  public state: IApplicationState;

  private loadCount = 0;

  constructor(props: any) {
    super(props);

    this.state = {
      googleManager: new GoogleManager(this.load),
      inPath: this.inPath,
      load: this.load,
      navigate: this.navigate,
      path: pathnameToBucket(window.location.hash),
    };

    window.onpopstate = () => {
      this.setState({ path: pathnameToBucket(window.location.hash) });
    };

    this.load.bind(this);
  }

  public render() {
    return (
      <StateContext.Provider value={this.state}>
        {this.props.children}
      </StateContext.Provider>
    );
  }
  public load = (bucketString: string) => {
    this.loadCount++;
    try {
      if (bucketString.length === 0) {
        // tslint:disable-next-line: no-console
        console.log("No buckets loaded, adding defaults");
        // tslint:disable-next-line max-line-length
        this.load(
          // eslint-disable-next-line no-template-curly-in-string -- default bucket
          '{"hex":{"words":[{"words":"You come across ${hex.root}","weight":1}],"children":{"root":{"words":[{"words":"${hex.structure}. ${hex.additional}","weight":1}],"children":{}},"additional":{"words":[{"words":"","weight":5},{"words":"Nearby is ${hex.root}","weight":0.5}],"children":{}},"structure":{"words":[{"words":"${$a, size} number of ${hex.structure.status} statues","weight":1},{"words":"${$a, size.extreme, hex.structure.status} monastry${hex.structure.occupied}","weight":1},{"words":"${$a, size.extreme, hex.structure.status} tower${hex.structure.occupied}","weight":1},{"words":"${$a, size.extreme} obelisk","weight":1},{"words":"${$a, size.extreme} camp${hex.structure.occupied}","weight":1},{"words":"${$a, size, hex.structure.status} graveyard","weight":1},{"words":"some ${size, hex.structure.status} canals","weight":1},{"words":"${$a, size, hex.structure.status} hovel${hex.structure.occupied}","weight":1}],"children":{"occupied":{"words":[{"words":"","weight":5},{"words":". There are signs of recent occupation","weight":1},{"words":". There are friendly creatures here","weight":1},{"words":". There are neutral creatures here","weight":1},{"words":". There are unfriendly creatures here","weight":1}],"children":{}},"rarelyoccupied":{"words":[{"words":"","weight":5},{"words":"${hex.structure.occupied}","weight":1}],"children":{}},"status":{"words":[{"words":"","weight":2},{"words":"tumbledown","weight":1},{"words":"ruined","weight":1},{"words":"overgrown","weight":1},{"words":"poorly maintained","weight":1},{"words":"neatly maintained","weight":0.5},{"words":"freshly painted","weight":0.1}],"children":{}}}}}},"size":{"words":[{"words":"","weight":5},{"words":"small","weight":2},{"words":"large","weight":2},{"words":"modest","weight":1}],"children":{"extreme":{"words":[{"words":"${size}","weight":5},{"words":"tiny","weight":1},{"words":"enormous","weight":1},{"words":"huge","weight":1}],"children":{}}}}}'
        );
      } else {
        WordManager.deserialise(bucketString);
      }
    } catch (e) {
      // tslint:disable-next-line: no-console
      console.error(`Error loading buckets: ${e}`);
    }
    this.setState({ path: pathnameToBucket(window.location.hash) });
  };

  public navigate = (bucket?: string) => {
    if (bucket) {
      this.setState({ path: bucket });
      window.history.pushState(null, "", bucketToPathname(bucket || ""));
    }
  };

  public inPath = (bucket: Bucket) => {
    const bucketArray = bucket.title.split(".");
    const pathArray = this.state.path.split(".");
    let diff = 0;

    for (let part = 0; part < bucketArray.length; part++) {
      if (pathArray.length < part) {
        break;
      } else if (bucketArray[part] !== pathArray[part]) {
        diff++;
      }
    }

    return diff <= 1;
  };
}

function pathnameToBucket(path: string): string {
  return path.replace(/\//g, ".").slice(2);
}

function bucketToPathname(bucket: string): string {
  return "#/" + bucket.replace(/\./g, "/");
}

export const NavLink = ({ ...props }) => (
  <StateContext.Consumer>
    {(State: IApplicationState | null) => {
      return (
        <a
          {...props}
          className={classNames(props.className, {
            active: State?.path === props.path,
          })}
          onClick={(e) => {
            props.onClick(e);
            State?.navigate(props.path);
            e.preventDefault();
          }}
        >
          {}
        </a>
      );
    }}
  </StateContext.Consumer>
);

export const BucketState = ({
  render,
}: {
  render: (state: IApplicationState | null) => ReactNode;
}) => <StateContext.Consumer>{(state) => render(state)}</StateContext.Consumer>;
