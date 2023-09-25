import { trackEvent } from "@components/segment-analytics";
import {
  BLOG_DETAIL,
  BLOG_LISTING,
  BLOG_READERS_COUNT,
  DELETE_POST,
  DELETE_VOTE,
  FILE_UPLOAD,
  GET_POST_REACTION_DATA,
  GET_SINGLE_POST,
  HASHTAG_SEARCH,
  HIDE_POST,
  MUTE_POST,
  NEWS_FEED_GMACTION,
  POST_ADD,
  POST_COMMENT_LIST,
  POST_COMMENT_REPLY_LIST,
  POST_LIST,
  POST_REACTION,
  POST_VOTING,
  REPORT_POST,
  SAVE_POST,
  SPEAKER_SEARCH,
  TAG_FUNCTIONALITY,
  USER_COMMENT_LIKE,
  USER_COMMENT_UPDATE,
  USER_REPLY_LIKE,
  USER_REPLY_UPDATE,
  MY_CONNECTIONS_LIST,
} from "api/routes.js";
import { ADMIN_API_URL, POST_API_URL, USER_API_URL } from "config/index.js";
import router from "next/router";
import store from "store/index.js";
import { getCookie } from "utils/functions.js";
import { get, image, post, put, remove } from "../../api";
import { getMyConnectionsList } from "./connections.js";
import * as types from "./types.js";
/******************** 
@purpose :  Post Listing
@Parameter : {export const addPost = (body) => async (dispatch) => {
}
@Author : INIC
******************/

export const postListing = (body, sortBy) => async (dispatch) => {
  const { workwithus } = store.getState().aboutUsInfo;
  const postToken = getCookie("postToken");
  const payload = { ...body, postToken: +postToken };
  const res = await post(
    {
      serviceURL:
        body.groupId || body.instituteId
          ? USER_API_URL
          : workwithus?.post || sortBy === "Growth"
            ? POST_API_URL
            : USER_API_URL,
    },
    POST_LIST,
    false,
    body.instituteId || body.groupId ? body : payload,
    true
  );

  if (!res?.data && res?.statusCode === 200) {
    dispatch(setPostListing(null));
    return Promise.resolve(null);
  }
  if (res?.data) {
    dispatch(setPostListing(res.data));
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};

/******************** 
@purpose :  Change Post GM Status
@Parameter : {export const addPost = (body) => async (dispatch) => {
}
@Author : INIC
******************/
export const changePostGMStatus = (id, data) => async (dispatch) => {
  return dispatch({
    type: types.CHANGE_POST_GM_STATUS,
    payload: {
      id,
      data,
    },
  });
};

/******************** 
@purpose :  Post Add
@Parameter : {export const addPost = (body) => async (dispatch) => {
}
@Author : INIC
******************/
const hasExternalLink = (description) => {
  const urlRegex = /(https?:\/\/(?!.*\.yliway\.com)[^\s]+)/gi;
  const urls = description.match(urlRegex);

  // Check if any URLs were found
  if (urls && urls.length > 0) {
    // Perform additional checks if needed, such as comparing domains with a whitelist
    return true;
  }

  return false;
};
export const addPost = (body) => async (dispatch) => {
  const res = await post(
    { serviceURL: USER_API_URL },
    POST_ADD,
    true,
    body,
    true
  );

  if (res?.data) {
    // event for external source
    if (hasExternalLink(body.description)) trackEvent("content_shared");

    // event for created/shared post
    if (res?.data.postType === "postShare") {
      trackEvent("post_shared");
    } else {
      trackEvent("post_created");
    }
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};

/******************** 
@purpose : upload Post Image
@Parameter : {payload}
@Author : INIC
******************/
export const uploadPostImage = (payload) => async (dispatch) => {
  const res = await image(
    { serviceURL: ADMIN_API_URL },
    FILE_UPLOAD,
    false,
    payload,
    true
  );
  if (res.data) {
    dispatch(setPostImage(res.data));
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};

/******************** 
@purpose : upload Post video
@Parameter : {payload}
@Author : INIC
******************/

export const uploadPostVideo = (payload) => async (dispatch) => {
  const res = await image(
    { serviceURL: ADMIN_API_URL },
    FILE_UPLOAD,
    false,
    payload,
    true
  );
  if (res.data) {
    dispatch(setPostVideo(res.data));
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};

/******************** 
@purpose : upload Post video
@Parameter : {payload}
@Author : INIC
******************/

export const uploadPostDocument = (payload) => async (dispatch) => {
  const res = await image(
    { serviceURL: ADMIN_API_URL },
    FILE_UPLOAD,
    false,
    payload,
    true
  );
  if (res.data) {
    dispatch(setPostDocument(res.data));
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};
/******************** 
@purpose : deleete  dashboard post
@Parameter : {id}
@Author : INIC
******************/
export const deleteDashboardPost = (id) => async (dispatch) => {
  const response = await remove(
    { serviceURL: USER_API_URL },
    DELETE_POST + id,
    true,
    false
  );
  if (response) {
    return Promise.resolve(response);
  }
  return Promise.reject(response);
};

/******************** 
@purpose :  Like Post
@Parameter : {export const addPost = (body) => async (dispatch) => {
}
@Author : INIC
******************/
export const likePost = (body, cb) => async (dispatch) => {
  let payload = {
    id: body.id,
    reaction: body.reaction,
  };

  // Check if typeId is instituteId or companyId
  if (body?.typeId) {
    if (body?.query?.instituteId) {
      payload.instituteId = body?.typeId;
    } else if (body?.query?.companyId) {
      payload.companyId = body?.typeId;
    }
  }

  const res = await post(
    { serviceURL: USER_API_URL },
    POST_REACTION,
    false,
    payload,
    true
  );

  if (res.status === 1) trackEvent("post_liked"); // event for liked post

  if (res.status === 1 && body.pathname !== "/search-result") {
    if (body?.query?.tab === "articles") {
      dispatch({
        type: types.UPDATE_ARTICLE_LIKE_COUNT,
        body,
      });
    } else {
      dispatch({
        type: types.UPDATE_LIKE_COUNT,
        body,
      });
    }
    return Promise.resolve(res);
  } else if (res.status === 1 && body.pathname === "/search-result") {
    cb();
  }
  return Promise.reject(res);
};
/******************** 
@purpose :  hide Post
@Parameter : {body}
@Author : INIC
******************/
export const hidePostData = (body) => async (dispatch) => {
  const res = await post(
    { serviceURL: USER_API_URL },
    HIDE_POST,
    false,
    body,
    true
  );

  if (res?.status === 1) {
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};
/******************** 
@purpose :  Mute Post
@Parameter : {body}
@Author : INIC
******************/
export const mutePostData = (body) => async (dispatch) => {
  const res = await post(
    { serviceURL: USER_API_URL },
    MUTE_POST,
    false,
    body,
    true
  );

  if (res?.status === 1) {
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};
/******************** 
@purpose :  Report Post
@Parameter : {body}
@Author : INIC
******************/
export const reportPostData = (body) => async (dispatch) => {
  const res = await put(
    { serviceURL: USER_API_URL },
    REPORT_POST,
    true,
    body,
    true
  );

  if (res?.status === 1) {
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};
/******************** 
@purpose :  Save Post
@Parameter : {body}
@Author : INIC
******************/
export const savePostData = (body) => async (dispatch) => {
  const res = await post(
    { serviceURL: USER_API_URL },
    SAVE_POST,
    false,
    body,
    true
  );

  if (res?.status === 1) {
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};

/******************** 
@purpose :  Comment List
@Parameter : {body}
@Author : INIC
******************/
export const commentList = (body) => async (dispatch) => {
  const res = await post(
    { serviceURL: USER_API_URL },
    POST_COMMENT_LIST,
    false,
    body,
    true
  );

  if (res?.status === 1) {
    dispatch(setCommentList(res.data));

    return Promise.resolve(res);
  }
  return Promise.reject(res);
};

/******************** 
@purpose :  Comment Reply List
@Parameter : {body}
@Author : INIC
******************/
export const commentReplyList = (body) => async (dispatch) => {
  const res = await post(
    { serviceURL: USER_API_URL },
    POST_COMMENT_REPLY_LIST,
    false,
    body,
    true
  );

  if (res?.status === 1) {
    dispatch(setCommentReplyList(res.data));
    return Promise.resolve(res);
  }
  return Promise.reject(res);
};

/******************** 
@purpose :  Comment Post
@Parameter : {body}
@Author : INIC
******************/
export const commentPost = (body, pathname, cb) => async (dispatch) => {
  const res = await post(
    { serviceURL: USER_API_URL },
    USER_COMMENT_UPDATE,
    false,
    body,
    true
  );

  if (res?.status === 1) trackEvent("post_commented"); // post commented

  if (res?.status === 1 && pathname !== "/search-result") {
    dispatch({
      type: types.UPDATE_COMMENT_COUNT,
      data: {
        type: body.id ? "update" : "add",
        postId: body.postId,
        instituteId: body.instituteId,
      },
    });
    return Promise.resolve(res);
  } else if (res?.status === 1 && pathname === "/search-result") {
    cb();
  }
  return Promise.reject(res);
};

/******************** 
@purpose :  Comment Reply Post
@Parameter : {body}
@Author : INIC
******************/
export const commentReplyPost = (body, pathname, cb) => async (dispatch) => {
  let id = body.id;
  let payload = {
    id,
    commentId: body.commentId,
    title: body.title,
    taggedId: body.taggedId,
    imageURL: body.imageURL,
  };
  const res = await post(
    { serviceURL: USER_API_URL },
    USER_REPLY_UPDATE,
    false,
    payload,
    true
  );

  if (res?.status === 1 && pathname !== "/search-result") {
    dispatch({
      type: types.UPDATE_REPLY_COMMENT_COUNT,
      data: { type: body.id ? "update" : "add", postId: body.postId },
    });
    return Promise.resolve(res);
  } else if (res?.status === 1 && pathname === "/search-result") {
    cb();
  }
  return Promise.reject(res);
};

/******************** 
@purpose :  Like Comment Post
@Parameter : {body}
@Author : INIC
******************/
export const LikeCommentPost = (body) => async (dispatch) => {
  const res = await post(
    { serviceURL: USER_API_URL },
    USER_COMMENT_LIKE,
    false,
    body,
    true
  );

  if (res?.status === 1) {
    return Promise.resolve(res);
  }
  return Promise.reject(res);
};

/******************** 
@purpose :  Like Comment Reply Post
@Parameter : {body}
@Author : INIC
******************/
export const LikeReplyCommentPost = (body) => async (dispatch) => {
  const res = await post(
    { serviceURL: USER_API_URL },
    USER_REPLY_LIKE,
    false,
    body,
    true
  );

  if (res?.status === 1) {
    return Promise.resolve(res);
  }
  return Promise.reject(res);
};

/******************** 
@purpose :  Speaker Search
@Parameter : {body}
@Author : INIC
******************/
export const searchSpeaker = (body) => async (dispatch) => {
  const response = await post(
    { serviceURL: USER_API_URL },
    SPEAKER_SEARCH,
    false,
    body,
    true
  );
  if (response.data) {
    const newData = [response.data];
    response.data.map((data, index) => {
      newData.push({
        id: data.id,
        name: data.firstName + " " + data.lastName,
        firstName: data.firstName,
        lastName: data.lastName,
        userId: data.userId,
        designation: data.designation,
      });
    });

    dispatch(setSpeakerSearch(newData));
    return Promise.resolve(response.data);
  }
  return Promise.reject(response);
};

/******************** 
@purpose :  Blog Details
@Parameter : {export const addPost = (body) => async (dispatch) => {
}
@Author : INIC
******************/
export const getSingleBlogDetail = (id) => async (dispatch) => {
  const res = await get(
    { serviceURL: USER_API_URL },
    BLOG_DETAIL + id,
    false,
    "",
    true
  );

  if (res?.data) {
    dispatch(getBlogDetail(res.data));
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};
/******************** 
@purpose :  Blog Reader Count
@Parameter : {export const addPost = (body) => async (dispatch) => {
}
@Author : INIC
******************/

export const getBlogReaderCount = (body) => async (dispatch) => {
  const res = await post(
    { serviceURL: ADMIN_API_URL },
    BLOG_READERS_COUNT,
    false,
    body,
    true
  );

  if (res?.data) {
    dispatch(getBlogReaderData(res.data));
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};
/******************** 
@purpose :  Blog Listing
@Parameter : {export const addPost = (body) => async (dispatch) => {
}
@Author : INIC
******************/
export const blogListing = (body) => async (dispatch) => {
  const res = await post(
    { serviceURL: ADMIN_API_URL },
    BLOG_LISTING,
    false,
    body,
    true
  );

  if (res?.data) {
    dispatch(setBlogListing(res.data));
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};

/******************** 
@purpose : undo vote
@Parameter : { }
@Author : INIC
******************/
export const undoVote = (id) => async (dispatch) => {
  const response = await remove(
    { serviceURL: USER_API_URL },
    `${DELETE_VOTE}${id}`,
    false,
    false
  );
  if (response) {
    return Promise.resolve(response);
  }
  return Promise.reject(response);
};

/******************** 
@purpose :  poll Voting
@Parameter : {body}
@Author : INIC
******************/
export const pollVoting = (body) => async (dispatch) => {
  const res = await post(
    { serviceURL: USER_API_URL },
    POST_VOTING,
    false,
    body,
    true
  );

  if (res?.status === 1) {
    return Promise.resolve(res);
  }
  return Promise.reject(res);
};

/******************** 
@purpose :  tag search 
@Parameter : {body}
@Author : INIC
******************/
export const tagSearch = (body) => async (dispatch) => {
  const res = await post(
    { serviceURL: USER_API_URL },
    HASHTAG_SEARCH,
    false,
    body,
    true
  );

  if (res?.status === 1) {
    return Promise.resolve(res);
  }
  return Promise.reject(res);
};
/******************** 
@purpose : get single post 
@Parameter : {body}
@Author : INIC
******************/
export const getSinglePost = (postId) => async (dispatch) => {
  const res = await get(
    { serviceURL: USER_API_URL },
    GET_SINGLE_POST + postId,
    false,
    "",
    true
  );

  if (res?.status === 1) {
    getMyConnectionsList({ page: 1, pagesize: 10 });
    dispatch(setSinglePost(res.data));
    return Promise.resolve(res);
  } else if (res?.status === 0) {
    if (res?.data?.havePermission === false) {
      return Promise.resolve(res);
    } else {
      // commented this message because we are showing No post Found in post detail page
      // showMessageNotification(res.message);
      router.push("/dashboard");
    }
  }
  return Promise.reject(res);
};
/******************** 
@purpose : get reaction data on post 
@Parameter : {data}
@Author : INIC
******************/
export const postLikeReactionData = (data) => async (dispatch) => {
  const res = await post(
    { serviceURL: USER_API_URL },
    GET_POST_REACTION_DATA,
    false,
    data,
    true
  );

  if (res?.status === 1) {
    dispatch(postLikeData(res.data));
    return Promise.resolve(res);
  }
  return Promise.reject(res);
};

/******************** 
@purpose : set Post Image
@Parameter : { data }
@Author : INIC
******************/
export const setPostImage = (data) => ({
  type: types.SET_POST_IMAGE,
  data,
});

/******************** 
@purpose : set Post Alternative Text
@Parameter : { data }
@Author : INIC
******************/
export const setPostImageAlternativeText = (data) => ({
  type: types.SET_POST_IMAGE_ALTERNATIVE_TEXT,
  data,
});

/******************** 
@purpose : set Tagged user details
@Parameter : { data }
@Author : INIC
******************/
export const setImageTaggedUserData = (data) => ({
  type: types.SET_IMAGE_TAGGED_USER_DARA,
  data,
});

/******************** 
@purpose : set Post Video
@Parameter :{ data }
@Author : INIC
******************/
export const setPostVideo = (data) => ({
  type: types.SET_POST_VIDEO,
  data,
});

/******************** 
@purpose : set Post Document
@Parameter : { }
@Author : INIC
******************/
export const setPostDocument = (data) => ({
  type: types.SET_POST_DOCUMENT,
  data,
});
/******************** 
@purpose : set Post LIsting
@Parameter : { data }
@Author : INIC
******************/

export const setPostListing = (data) => ({
  type: types.SET_POST_LISTING,
  data,
});

/******************* 
@purpose :  Handle post typew
@Parameter : { data }
@Author : INIC
******************/
export const posttype = (data) => ({
  type: types.POST_TYPE,
  data,
});

/******************* 
@purpose :  Handle create poll
@Parameter : { data }
@Author : INIC
******************/
export const createPoll = (data) => ({
  type: types.CREATE_POLL,
  data,
});

/******************* 
@purpose :  Handle editcreate poll
@Parameter : { data }
@Author : INIC
******************/
export const editCreatePoll = (data) => ({
  type: types.EDIT_CREATE_POLL,
  data,
});

/******************* 
@purpose :  Handle editDashboardPost
@Parameter : { data }
@Author : INIC
******************/
export const editDashboardPost = (data) => ({
  type: types.EDIT_DASHBOARD_POST,
  data,
});

/******************* 
@purpose :  vote clicked data
@Parameter : { data }
@Author : INIC
******************/
export const voteClickData = (data) => ({
  type: types.VOTE_CLICK_DATA,
  data,
});

/******************** 
@purpose : set Speaker Search
@Parameter : { data }
@Author : INIC
******************/
export const setSpeakerSearch = (data) => ({
  type: types.SET_SPEAKER,
  data,
});

/******************** 
@purpose : set Blog LIsting
@Parameter : { data }
@Author : INIC
******************/

export const setBlogListing = (data) => ({
  type: types.SET_BLOG_LISTING,
  data,
});

/******************** 
@purpose : set Blog LIsting
@Parameter : { data }
@Author : INIC
******************/

export const getBlogDetail = (data) => ({
  type: types.GET_BLOG_DETAIL,
  data,
});

export const getBlogReaderData = (data) => ({
  type: types.GET_BLOG_READER,
  data,
});

/******************** 
@purpose : Used for clear post data
@Parameter : { data }
@Author : INIC
******************/
export const clearAddPostData = () => (dispatch) => {
  return dispatch({ type: types.CLEAR_ADD_POST_DATA });
};

/******************** 
@purpose : Used for set comment list
@Parameter : { data }
@Author : INIC
******************/
export const setCommentList = (data) => ({
  type: types.SET_COMMENT_LIST,
  data,
});

/******************** 
@purpose : Used for set comment Reply list
@Parameter : { data }
@Author : INIC
******************/
export const setCommentReplyList = (data) => ({
  type: types.SET_COMMENT_REPLY_LIST,
  data,
});

/******************** 
@purpose : set Post reaction data 
@Parameter : { data }
@Author : INIC
******************/

export const postLikeData = (data) => ({
  type: types.SET_POST_LIKE_DATA,
  data,
});
/******************** 
@purpose : set group Id for Post 
@Parameter : { data }
@Author : INIC
******************/

export const postGroupId = (data) => ({
  type: types.SET_GROUP_ID_POST,
  data,
});
/******************** 
@purpose : set single post data 
@Parameter : { data }
@Author : INIC
******************/

export const setSinglePost = (data) => ({
  type: types.SET_SINGLE_POST_DATA,
  data,
});

/******************** 
@purpose : set Report Post Id
@Parameter : { data }
@Author : INIC
******************/
export const setReportPostId = (data) => (dispatch) => {
  return dispatch({ type: types.REPORT_POST_ID, payload: data });
};
/******************** 
@purpose : set single post data 
@Parameter : { data }
@Author : INIC
******************/

export const newsFeedGMaction = (body) => async (dispatch) => {
  // const { workwithus } = store.getState().aboutUsInfo;
  const res = await post(
    { serviceURL: USER_API_URL },
    NEWS_FEED_GMACTION,
    false,
    body,
    true
  );

  if (res?.statusCode === 200) {
    // dispatch(setPostListing(res.data));
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};

/******************** 
@purpose : Used for get my connections list
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const searchConnections = async (data) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      MY_CONNECTIONS_LIST,
      false,
      data,
      true
    );
    if (response.status === 1) {
      return response.data;
    }
  } catch (error) {}
};

/******************** 
@purpose : Tag Functionality 
@Parameter : { data }
@Author : INIC
******************/

export const tagFunctionality = (body) => async (dispatch) => {
  const res = await post(
    { serviceURL: USER_API_URL },
    TAG_FUNCTIONALITY,
    false,
    body,
    true
  );

  if (res?.statusCode === 200) {
    return Promise.resolve(res);
  }
  // return Promise.reject(res);
};

/******************** 
@purpose : set single post data 
@Parameter : { data }
@Author : INIC
******************/

export const setCommentData = (data) => ({
  type: types.SET_COMMENT_DATA,
  data,
});
