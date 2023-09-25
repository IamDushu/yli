import * as types from "@actions";

/******************* 
@purpose : Intital Chapter reducer data
@Author : INIC
******************/
const initialState = {
  courses: [],

  questionsList: [],
  practicalTestQueList: [],
  practicalTestAnsList: {},
  courseDetail: {},
  coursePlaylist: {},
  certificateDetail: {},
};

/******************* 
@purpose : Courses reducer
@Parameter : {state, action}
@Author : INIC
******************/
const courses = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.SET_COURSES:
      return Object.assign({}, state, {
        courses: action.payload,
      });

    case types.SET_QUIZ_QUESTIONS:
      return Object.assign({}, state, {
        quizQuestions: action.payload,
      });

    case types.SET_SINGLE_QUIZ_QUESTIONS:
      return Object.assign({}, state, {
        quizQuestionsSingle: action.payload,
      });
    case types.QUIZ_QUESTIONS_LIST:
      return Object.assign({}, state, {
        questionsList: action.payload,
      });
    case types.QUIZ_ANSWERS_LIST:
      return Object.assign({}, state, {
        answersList: action.payload,
      });
    case types.QUIZ_QUES_CLEAR:
      return Object.assign({}, state, {
        questionsList: [],
      });
    case types.PRACTICAL_TEST_QUESTIONS_LIST:
      return Object.assign({}, state, {
        practicalTestQueList: action.payload,
      });
    case types.PRACTICAL_TEST_ANSWERS_LIST:
      return Object.assign({}, state, {
        practicalTestAnsList: action.payload,
      });
    case types.MY_LEARNING_LIST:
      return Object.assign({}, state, {
        myLearningList: action.payload,
      });
    case types.MY_LEARNING_COURSE_LIST:
      return Object.assign({}, state, {
        myLearningCourseList: action.payload,
      });
    case types.MY_LEARNING_TRAININGROOM_LIST:
      return Object.assign({}, state, {
        myLearningtraining_roomList: action.payload,
      });
    case types.MY_LEARNING_EVENT_LIST:
      return Object.assign({}, state, {
        myLearningevent_List: action.payload,
      });
    case types.MY_LEARNING_WEBINAR_LIST:
      return Object.assign({}, state, {
        myLearningWebinarList: action.payload,
      });
    case types.MY_LEARNING_COACHINGROOM_LIST:
      return Object.assign({}, state, {
        myLearningCoaching_roomList: action.payload,
      });
    case types.MY_LEARNING_BNR_LIST:
      return Object.assign({}, state, {
        myLearningBnrList: action.payload,
      });
    case types.MY_LEARNING_MASTERCLASS_LIST:
      return Object.assign({}, state, {
        myLearningMaster_classList: action.payload,
      });
    case types.MY_LEARNING_WELCOME_ROOM:
      return Object.assign({}, state, {
        myLearningWelcome: action.payload,
      });
    case types.SET_COURSE_DETAIL:
      return Object.assign({}, state, {
        courseDetail: { ...action.payload },
      });
    case types.SET_COURSE_PLAYLIST:
      return Object.assign({}, state, {
        coursePlaylist: { ...action.payload },
      });
    case types.SET_CERTIFICATE_DETAIL:
      return Object.assign({}, state, {
        certificateDetail: { ...action.payload },
      });
    default:
      return state;
  }
};

export default courses;
