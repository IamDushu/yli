import React from "react";
import initializeStore from "../store"; // Access redux store data
const isServer = typeof window === "undefined";
const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__";

function getOrCreateStore(initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore;
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore;
  }
  return window[__NEXT_REDUX_STORE__];
}

const WithReduxStore = (App) => {
  return class AppWithRedux extends React.Component {
    /******************** 
    @purpose : Set NextJs Intial Data
    @Parameter : { appContext }
    @Author : INIC
    ******************/
    static async getInitialProps(appContext) {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState

      const reduxStore = getOrCreateStore();

      // Provide the store to getInitialProps of pages
      appContext.ctx.reduxStore = reduxStore;

      let appProps = {};
      if (typeof App.getInitialProps === "function") {
        appProps = await App.getInitialProps(appContext);
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState(),
      };
    }
    /******************* 
    @purpose : Set React State Initial Value
    @Parameter : props
    @Author : INIC
    ******************/
    constructor(props) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }
    /******************* 
    @purpose : Rander HTML/ React Components
    @Author : INIC
    ******************/
    render() {
      return <App {...this.props} reduxStore={this.reduxStore} />;
    }
  };
};
export default WithReduxStore;
