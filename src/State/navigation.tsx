import classNames from "classnames";
import React, { ReactNode } from "react";
import Bucket from "wordbucket";

export interface INavigationState {
  pathname: string;
  bucket: Bucket;
  navigate(pathname: string): void;
  inPath(bucketName: string): boolean;
}

interface INavigationProps {
  children: (navigation: INavigationState) => Element;
}

const NavigationContext = React.createContext({} as INavigationState);

export class NavigationProvider extends React.Component {
  public state: INavigationState;

  constructor(props: any) {
    super(props);

    this.state = {
      bucket: new Bucket(),
      inPath: this.inPath,
      navigate: this.navigate,
      pathname: window.location.pathname,
    };

    // tslint:disable-next-line max-line-length
    Bucket.load('{"children":[{"children":[{"children":[],"name":"root","words":[{"words":"${hex.terrain}. ${hex.additional}","weight":1},{"words":"${hex.structure}. ${hex.additional}","weight":1},{"words":"${hex.plants}. ${hex.additional}","weight":1},{"words":"${hex.location}. ${hex.additional}","weight":0.5}]},{"children":[],"name":"additional","words":[{"words":"","weight":5},{"words":"Nearby is ${hex.root}","weight":0.5}]},{"children":[{"children":[],"name":"occupied","words":[{"words":"","weight":5},{"words":". There are signs of recent occupation","weight":1},{"words":". There are friendly creatures here","weight":1},{"words":". There are neutral creatures here","weight":1},{"words":". There are unfriendly creatures here","weight":1}]},{"children":[],"name":"rarelyoccupied","words":[{"words":"","weight":5},{"words":"${hex.structure.occupied}","weight":1}]},{"children":[],"name":"status","words":[{"words":"","weight":2},{"words":"tumbledown","weight":1},{"words":"ruined","weight":1},{"words":"overgrown","weight":1},{"words":"poorly maintained","weight":1},{"words":"neatly maintained","weight":0.5},{"words":"freshly painted","weight":0.1}]}],"name":"structure","words":[{"words":"&[size.extreme, hex.structure.status] amphitheatre${hex.structure.rarelyoccupied}","weight":1},{"words":"&[size.extreme, hex.structure.status] cairn","weight":1},{"words":"&{size} number of ${hex.structure.status} statues","weight":1},{"words":"&[size.extreme, hex.structure.status] monastry${hex.structure.occupied}","weight":1},{"words":"&[size.extreme, hex.structure.status] tower${hex.structure.occupied}","weight":1},{"words":"&[size.extreme, hex.structure.status] temple${hex.structure.occupied}","weight":1},{"words":"&{size.extreme} obelisk","weight":1},{"words":"&{size.extreme} camp${hex.structure.occupied}","weight":1},{"words":"&[size, hex.structure.status] graveyard","weight":1},{"words":"&{size} lookout post${hex.structure.occupied}","weight":1},{"words":"&[size, hex.structure.status] freestanding arch","weight":1},{"words":"&{size} hanging gardens${hex.structure.rarelyoccupied}","weight":1},{"words":"some $[size, hex.structure.status] canals","weight":1},{"words":"&[size, hex.structure.status] hovel${hex.structure.occupied}","weight":1},{"words":"&[size, hex.structure.status] village${hex.structure.occupied}","weight":1},{"words":"&[size, hex.structure.status] mill${hex.structure.occupied}","weight":1},{"words":"&[size.extreme, hex.structure.status] bridge","weight":1}]},{"children":[],"name":"terrain","words":[{"words":"WIP","weight":1}]},{"children":[],"name":"plants","words":[{"words":"WIP","weight":1}]},{"children":[],"name":"location","words":[{"words":"WIP","weight":1}]}],"name":"hex","words":[{"words":"You come across ${hex.root}","weight":1}]},{"children":[{"children":[],"name":"extreme","words":[{"words":"${size}","weight":5},{"words":"tiny","weight":1},{"words":"enormous","weight":1},{"words":"huge","weight":1}]}],"name":"size","words":[{"words":"","weight":5},{"words":"small","weight":2},{"words":"large","weight":2},{"words":"modest","weight":1}]}],"name":"","words":[]}');

    window.onpopstate = () => {
      this.setState({ pathname: window.location.pathname });
    };
  }

  public render() {
    return (
      <NavigationContext.Provider value={this.state}>
        {this.props.children}
      </NavigationContext.Provider>
    );
  }

  public navigate = (pathname: string) => {
    this.setState({ pathname });

    window.history.pushState(null, "", "/" + pathname.replace(/\./g, "/"));
  }

  public inPath = (bucketName: string) => {

    return bucketName.replace(/\./g, "/") === this.state.pathname;
  }
}

export const NavLink = ({ ...props }) =>
  <NavigationContext.Consumer>
    {
      (navigation: INavigationState) =>
      <a
        {...props}
        className={classNames(
          props.className,
          {active: navigation.pathname === props.path},
        )}
        onClick={(e) => {
          e.preventDefault();
          navigation.navigate(props.path);
        }}
      />
    }
  </NavigationContext.Consumer>;

export const BucketState = ({ render }: {render: (state: INavigationState) => ReactNode}) =>
  <NavigationContext.Consumer>
    {
      (state) => render(state)
    }
  </NavigationContext.Consumer>;

export const Route = ({ children, href }: {href: string, children: Element[]}) =>
  <NavigationContext.Consumer>
    {(navigation: INavigationState) => navigation.pathname === href ? children : null}
  </NavigationContext.Consumer>;
