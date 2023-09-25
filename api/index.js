import fetch from "isomorphic-unfetch";
import store from "store"; // Access redux store data
import { setUiKey } from "@actions";
import { errorHandler, DEFAULT_TIMEOUT } from "@utils";
import { refreshToken, sessionDestroy } from "store/actions";
import { getCookie, getLocalStorage, showMessageNotification } from "utils";

/******************* 
@purpose : Convert Response to JSON
@Parameter : {response, status}
@Author : INIC
******************/
const makeJson = async (response, status) => {
  const json = await response.json();
  return Promise.resolve({ ...json, statusCode: status });
};

/******************* 
@purpose : API Response Handler
@Parameter : {alert, response}
@Author : INIC
******************/
export const responseHandler =
  (alert, data = [], method = "") =>
  (response) => {
    try {
      const contentType =
        response && response.headers && response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const promise = makeJson(response, response.status);
        promise.then((res) => {
          if (res?.statusCode === 401) {
            if (data.firstTry) {
              return store
                .dispatch(refreshToken())
                .then(() => {
                  window.location.reload();
                  if (method == "get") {
                    return get(
                      data.serviceDetails,
                      data.url,
                      data.alert,
                      data.isLoading,
                      data.timeout,
                      false
                    );
                  } else if (method == "post") {
                    return post(
                      data.serviceDetails,
                      data.url,
                      data.alert,
                      data.body,
                      data.isLoading,
                      data.timeout,
                      false
                    );
                  } else if (method == "put") {
                    return put(
                      data.serviceDetails,
                      data.url,
                      data.alert,
                      data.body,
                      data.isLoading,
                      data.timeout,
                      false
                    );
                  } else if (method == "delete") {
                    return remove(
                      data.serviceDetails,
                      data.url,
                      data.alert,
                      data.isLoading,
                      data.timeout,
                      false
                    );
                  } else if (method == "patch") {
                    return patch(
                      data.serviceDetails,
                      data.url,
                      data.alert,
                      data.body,
                      data.isLoading,
                      data.timeout,
                      false
                    );
                  }
                })
                .catch((err) => {
                  store.dispatch(sessionDestroy());
                });
            } else {
              store.dispatch(sessionDestroy());
              if (data.url === "visibility/contactInfo") {
                return;
              }
              showMessageNotification("Error Occured");
            }
          } else if (res?.statusCode !== 200 && res?.statusCode !== 201) {
            if (alert) {
              if (data.url === "visibility/contactInfo") {
                return;
              }
              showMessageNotification(res.message);
            }
          } else {
            if (alert) {
              if (data.url === "visibility/contactInfo") {
                return;
              }
              if (res?.message?.indexOf("OTP") !== -1) {
                showMessageNotification(res?.message);
              } else {
                showMessageNotification(res?.message);
              }
            }
          }
        });

        store.dispatch(setUiKey("isLoading", false));
        return promise;
      }
      store.dispatch(setUiKey("isLoading", false));
      return errorHandler(response);
    } catch (error) {
      store.dispatch(setUiKey("isLoading", false));
      return errorHandler(error);
    }
  };
/******************* 
@purpose : API Request Header Types
@Parameter : {}
@Author : INIC
******************/
const getHeader = () => ({
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: getCookie("token"),
});

export const getMMHeaders = () => {
  let mmLogin = getLocalStorage("mmLogin");
  if (mmLogin && typeof mmLogin === "string") {
    mmLogin = JSON.parse(mmLogin);
  }
  return {
    "Content-Type": "application/json",
    Authorization: getCookie("token"),
    mmToken: mmLogin?.token,
  };
};

/******************* 
@purpose : Fetch Get API
@Parameter : {data}
@Author : INIC
******************/
export const get = (...data) => {
  const [
    serviceDetails,
    url,
    alert = false,
    isLoading = false,
    timeout = DEFAULT_TIMEOUT,
    firstTry = true,
  ] = data;
  let x = { serviceDetails, url, alert, isLoading, timeout, firstTry };
  if (isLoading) {
    store.dispatch(setUiKey("isLoading", true));
  }
  const { serviceURL } = serviceDetails;
  const endPoint = `${serviceURL}/${url}`;
  return fetch(endPoint, {
    method: "get",
    // credentials: "include",
    headers:
      data && data[data?.length - 1].key === "chat"
        ? getMMHeaders()
        : getHeader(),
    timeout: timeout,
  })
    .then(responseHandler(alert, x, "get"))
    .catch(responseHandler(alert, x, "get"));
};
/******************* 
@purpose : Fetch Post API
@Parameter : {data}
@Author : INIC
******************/
export const post = (...data) => {
  const [
    serviceDetails,
    url,
    alert = true,
    body,
    isLoading = false,
    timeout = DEFAULT_TIMEOUT,
    firstTry = true,
  ] = data;
  let x = { serviceDetails, url, alert, body, isLoading, timeout, firstTry };

  if (isLoading) {
    store.dispatch(setUiKey("isLoading", true));
  }
  const { serviceURL } = serviceDetails;
  const endPoint = `${serviceURL}/${url}`;

  return fetch(endPoint, {
    method: "post",
    headers:
      data && data[data?.length - 1].key === "chat"
        ? getMMHeaders()
        : getHeader(),
    body: JSON.stringify(body),
    timeout: timeout,
  })
    .then(responseHandler(alert, x, "post"))
    .catch(responseHandler(alert, x, "post"));
};

/******************* 
@purpose : Fetch Put API
@Parameter : {data}
@Author : INIC
******************/
export const put = (...data) => {
  const [
    serviceDetails,
    url,
    alert = false,
    body,
    isLoading = false,
    timeout = DEFAULT_TIMEOUT,
    firstTry = true,
  ] = data;
  let x = { serviceDetails, url, alert, body, isLoading, timeout, firstTry };

  if (isLoading) {
    store.dispatch(setUiKey("isLoading", true));
  }
  const { serviceURL } = serviceDetails;
  const endPoint = `${serviceURL}/${url}`;
  return fetch(endPoint, {
    method: "put",
    headers:
      data && data[data?.length - 1].key === "chat"
        ? getMMHeaders()
        : getHeader(),
    body: JSON.stringify(body),
    timeout: timeout,
  })
    .then(responseHandler(alert, x, "put"))
    .catch(responseHandler(alert, x, "put"));
};

/******************* 
@purpose : Fetch Delete API
@Parameter : {data}
@Author : INIC
******************/
export const remove = (...data) => {
  const [
    serviceDetails,
    url,
    alert = false,
    isLoading = false,
    timeout = DEFAULT_TIMEOUT,
    firstTry = true,
  ] = data;
  let x = { serviceDetails, url, alert, isLoading, timeout, firstTry };

  if (isLoading) {
    store.dispatch(setUiKey("isLoading", true));
  }

  const { serviceURL } = serviceDetails;
  const endPoint = `${serviceURL}/${url}`;
  return fetch(endPoint, {
    method: "delete",
    headers:
      data && data[data?.length - 1].key === "chat"
        ? getMMHeaders()
        : getHeader(),
    timeout: timeout,
  })
    .then(responseHandler(alert, x, "delete"))
    .catch(responseHandler(alert, x, "delete"));
};

/******************* 
@purpose : Fetch Patch API
@Parameter : {data}
@Author : INIC
******************/
export const patch = (...data) => {
  const [
    serviceDetails,
    url,
    alert = false,
    body,
    isLoading = false,
    timeout = DEFAULT_TIMEOUT,
    firstTry = true,
  ] = data;
  let x = { serviceDetails, url, alert, body, isLoading, timeout, firstTry };

  if (isLoading) {
    store.dispatch(setUiKey("isLoading", true));
  }

  const { serviceURL } = serviceDetails;
  const endPoint = `${serviceURL}/${url}`;
  return fetch(endPoint, {
    method: "PATCH",
    headers: getHeader(),
    body: JSON.stringify(body),
    timeout: timeout,
  })
    .then(responseHandler(alert, x, "patch"))
    .catch(responseHandler(alert, x, "patch"));
};
/******************* 
@purpose : Fetch Post API
@Parameter : {data}
@Author : INIC
******************/
export const image = (...data) => {
  const [
    serviceDetails,
    url,
    alert = false,
    body,
    isLoading = false,
    timeout = DEFAULT_TIMEOUT,
  ] = data;
  if (isLoading) {
    store.dispatch(setUiKey("isLoading", true));
  }

  let mmLogin = getLocalStorage("mmLogin");
  if (mmLogin && typeof mmLogin === "string") {
    mmLogin = JSON.parse(mmLogin);
  }
  const { serviceURL } = serviceDetails;
  const endPoint = `${serviceURL}/${url}`;
  return fetch(endPoint, {
    method: "post",
    headers:
      data && data[data?.length - 1].key === "chat"
        ? { Authorization: getCookie("token"), mmToken: mmLogin?.token }
        : {
            Authorization: getCookie("token"),
          },
    body: body,
    timeout: timeout,
  })
    .then(responseHandler(alert))
    .catch(responseHandler(alert));
};

/******************* 
@purpose : Fetch Get API
@Parameter : {data}
@Author : INIC
******************/
export const courseGet = (...data) => {
  const [
    serviceDetails,
    url,
    alert = false,
    isLoading = false,
    timeout = DEFAULT_TIMEOUT,
    firstTry = true,
  ] = data;
  let x = { serviceDetails, url, alert, isLoading, timeout, firstTry };
  if (isLoading) {
    store.dispatch(setUiKey("isLoading", true));
  }
  const { serviceURL } = serviceDetails;
  const endPoint = `${serviceURL}/${url}`;
  return fetch(endPoint, {
    method: "get",
    headers: { credentials: "include", ...getHeader() },
    timeout: timeout,
  })
    .then(responseHandler(alert, x, "get"))
    .catch(responseHandler(alert, x, "get"));
};

/******************* 
@purpose : Fetch Get API
@Parameter : {data}
@Author : INIC
******************/
export const linkedinGet = (...data) => {
  const [
    serviceDetails,
    url,
    alert = false,
    isLoading = false,
    timeout = DEFAULT_TIMEOUT,
    firstTry = true,
  ] = data;
  let x = { serviceDetails, url, alert, isLoading, timeout, firstTry };
  if (isLoading) {
    store.dispatch(setUiKey("isLoading", true));
  }
  const { serviceURL } = serviceDetails;
  const endPoint = `${serviceURL}/${url}`;
  return fetch(endPoint, {
    method: "get",
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
      "cache-control": "no-cache",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    timeout: timeout,
  })
    .then(responseHandler(alert, x, "get"))
    .catch(responseHandler(alert, x, "get"));
};
