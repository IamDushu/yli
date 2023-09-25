import * as types from "@actions";

/******************* 
@purpose : Intital post data
@Author : INIC
******************/

const initialState = {
  postImageAlternativeText: null,
  imageTaggedUserData: [],
  postImage: null,
  postVideo: "",
  postDocument: "",
  postListData: null,
  postTypes: "",
  createPolls: "",
  editCreatePol: false,
  editDshbrdPost: {},
  voteData: {},
  editCmntPost: {},
  speaker: [],
  blogList: [],
  blogDetail: {},
  blogReader: {},
  commentLists: "",
  commentReplyLists: "",
  postLikesData: "",
  postGroupId: null,
  singlePost: "",
  reportPostId: "",
  commentData: [],
};

/******************* 
@purpose : post  reducer
@Parameter : {post_ini_data, action}
@Author : INIC
******************/
const post = (post_ini_data = initialState, action = {}) => {
  switch (action.type) {
    //set post list
    case types.SET_POST_LISTING:
      return Object.assign({}, post_ini_data, {
        postListData: action.data,
      });
    case types.CHANGE_POST_GM_STATUS:
      return Object.assign({}, post_ini_data, {
        postListData: {
          ...post_ini_data.postListData,
          rows: post_ini_data.postListData.rows.map((v) => {
            return v.id === action.payload.id
              ? { ...v, ...action.payload.data }
              : v;
          }),
        },
      });
    // Set post image
    case types.SET_POST_IMAGE:
      return Object.assign({}, post_ini_data, {
        postImage: action.data,
      });
    // Set post image alternative text
    case types.SET_POST_IMAGE_ALTERNATIVE_TEXT:
      return Object.assign({}, post_ini_data, {
        postImageAlternativeText: action.data,
      });
    // Set post image alternative text
    case types.SET_IMAGE_TAGGED_USER_DARA:
      return Object.assign({}, post_ini_data, {
        imageTaggedUserData: action.data,
      });
    // Set post video
    case types.SET_POST_VIDEO:
      return Object.assign({}, post_ini_data, {
        postVideo: action.data,
      });

    //set post document
    case types.SET_POST_DOCUMENT:
      return Object.assign({}, post_ini_data, {
        postDocument: action.data,
      });
    //set post type
    case types.POST_TYPE:
      return Object.assign({}, post_ini_data, {
        postTypes: action.data,
      });
    //create poll
    case types.CREATE_POLL:
      return Object.assign({}, post_ini_data, {
        createPolls: action.data,
      });
    // edit create poll
    case types.EDIT_CREATE_POLL:
      return Object.assign({}, post_ini_data, {
        editCreatePol: action.data,
      });

    // edit all post on dashboard
    case types.EDIT_DASHBOARD_POST:
      return Object.assign({}, post_ini_data, {
        editDshbrdPost: action.data,
      });

    // get vote click data
    case types.VOTE_CLICK_DATA:
      return Object.assign({}, post_ini_data, {
        voteData: action.data,
      });
    // set speaker data
    case types.SET_SPEAKER:
      return Object.assign({}, post_ini_data, {
        speaker: action.data,
      });
    // get blog list and detail
    case types.SET_BLOG_LISTING:
      return Object.assign({}, post_ini_data, {
        blogList: action.data,
      });
    // get blog detail
    case types.GET_BLOG_DETAIL:
      return Object.assign({}, post_ini_data, {
        blogDetail: action.data,
      });
    // get blog reader
    case types.GET_BLOG_READER:
      return Object.assign({}, post_ini_data, {
        blogReader: action.data,
      });
    // set comment list
    case types.SET_COMMENT_LIST:
      return Object.assign({}, post_ini_data, {
        commentLists: action.data,
      });
    // set comment reply list
    case types.SET_COMMENT_REPLY_LIST:
      return Object.assign({}, post_ini_data, {
        commentReplyLists: action.data,
      });
    case types.SET_COMMENT_DATA:
      return Object.assign({}, post_ini_data, {
        commentData: action.data,
      });

    //set post Like Data
    case types.SET_POST_LIKE_DATA:
      return Object.assign({}, post_ini_data, {
        postLikesData: action.data,
      });
    //set update like count
    case types.UPDATE_LIKE_COUNT:
      let id = action.body.id;
      let updatedCountData = post_ini_data.postListData
        ? post_ini_data.postListData
        : post_ini_data.singlePost;
      let likeCountData;
      if (id) {
        let postIndex =
          !post_ini_data.singlePost &&
          post_ini_data.postListData.rows.findIndex((obj) => obj.id === id);
        likeCountData = post_ini_data.singlePost
          ? updatedCountData
          : updatedCountData.rows[postIndex];
        // if (updatedCountData.rows[postIndex].reaction !== null) {
        //   return (updatedCountData = post_ini_data.postListData);
        // } else {
        if (likeCountData.reaction === null || action.body.reaction === null) {
          likeCountData.reactionCount =
            action.body.reaction !== null
              ? likeCountData.reactionCount + 1
              : likeCountData.reactionCount - 1;
          likeCountData.reaction = action.body.reaction;
        }

        // updatedCountData.rows[postIndex].reaction = action.body.reaction;
        // }
      }

      return Object.assign({}, post_ini_data, {
        postListData: updatedCountData,
      });
    //set update comment count
    case types.UPDATE_COMMENT_COUNT:
      // console.log("update comment count in reducer");
      let postID = action.data.postId;
      let updatedCommentCountData = post_ini_data.postListData
        ? post_ini_data.postListData
        : post_ini_data.singlePost;
      let commentCountData;
      if (postID) {
        let postIndex =
          !post_ini_data.singlePost &&
          post_ini_data.postListData.rows.findIndex(
            (obj) => obj.postId === postID
          );
        commentCountData = post_ini_data.singlePost
          ? updatedCommentCountData
          : updatedCommentCountData.rows[postIndex];

        // console.log(commentCountData, "Data before action");
        commentCountData.commentCount =
          action.data.type === "add"
            ? commentCountData.commentCount + 1
            : action.data.type === "update"
            ? commentCountData.commentCount
            : action.data.type === "delete"
            ? commentCountData.commentCount - 1 
            : null;
      }
      return Object.assign({}, post_ini_data, {
        postListData: updatedCommentCountData,
      });
    //set update comment reply  count
    case types.UPDATE_REPLY_COMMENT_COUNT:
      // console.log("update reply comment in reducer");
      let postid = action.data.postId;
      let updatedReplyCommentCountData = post_ini_data.postListData
        ? post_ini_data.postListData
        : post_ini_data.singlePost;
      let commentReplyCountData;
      if (postid) {
        let postIndex =
          !post_ini_data.singlePost &&
          post_ini_data.postListData.rows.findIndex(
            (obj) => obj.postId === postid
          );
        commentReplyCountData = post_ini_data.singlePost
          ? updatedReplyCommentCountData
          : updatedReplyCommentCountData.rows[postIndex];

        commentReplyCountData.commentCount =
          action.data.type === "add"
            ? commentReplyCountData.commentCount + 1
            : action.data.type === "update"
            ? commentReplyCountData.commentCount
            : action.data.type === "delete"
            ? commentReplyCountData.commentCount - 1
            : null;
      }
      return Object.assign({}, post_ini_data, {
        postListData: updatedReplyCommentCountData,
      });
    //set group id post
    case types.SET_GROUP_ID_POST:
      return Object.assign({}, post_ini_data, {
        postGroupId: action.data,
      });
    //set single post data
    case types.SET_SINGLE_POST_DATA:
      return Object.assign({}, post_ini_data, {
        singlePost: action.data,
      });
    case types.REPORT_POST_ID: {
      return Object.assign({}, post_ini_data, {
        reportPostId: action.payload,
      });
    }

    // clear add post data
    case types.CLEAR_ADD_POST_DATA: {
      return {
        ...post_ini_data,
        postImage: null,
        postVideo: "",
        postDocument: "",
        postTypes: "",
        createPolls: "",
        editCreatePol: false,
        createAnEvnt: "",
        editCreateAnEvnt: false,
        editDshbrdPost: {},
      };
    }
    default:
      return post_ini_data;
  }
};

export default post;
