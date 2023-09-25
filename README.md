# RTF Front Webapp (React.js + Next.js)

This project set up is a must-have for server side rendering web applications, this setup provide default SSR intigration with bootstrap and Scss configuration, user can use this projects increse the performance of application and SEO perpose

## Getting Started

A react front setup devloped in below environment

|  Name   |                                                             Description                                                             |  virsion   | Required/Optional |
| :-----: | :---------------------------------------------------------------------------------------------------------------------------------: | :--------: | :---------------: |
| `Node`  |                           The node.js is used to run our React.js application on the server environment.                            | `v14.15.4` |     Required      |
| `Npm `  |                                    npm is the package manager for the Node JavaScript platform.                                     | `6.14.10`  |     Required      |
| `Next`  |                                       This package used for server side randering in react.js                                       |  `10.0.7`  |     Required      |
| `React` | React. js is an open-source JavaScript library that is used for building user interfaces specifically for single-page applications. |  `17.0.2`  |     Required      |
| `Redux` |                                      Redux is a state management tool for javascript library.                                       |  `3.6.0`   |     Required      |

### Installing

Please before start the project on follow the below command to install all node.js dependencies
Using NPM - Node Package Manager

```
npm install
```

Using Yarn - Yarn Package Manager

```
yarn install
```

End with an example of getting some data out of the system or using it for a little demo

## Deployment

Please follow the below command to run the project in different environments

### Development environment

Below command use for run the project in local development environments.

```
npm run dev || yarn dev
```

and for the server in development environments use below

```
npm run build || yarn build
```

```
npm run start || yarn start
```

### Staging environment

Below command use for run the project in staging environments.

```
npm run build:stag || yarn build:stag
```

```
npm run start:stag || yarn start:stag
```

### Production environment

Below command use for run the project in production environments.

```
npm run build:prod || yarn build:prod
```

```
npm run start:prod || yarn start:prod
```

## Folder structure

We used below directory structure in our react front project.

```
/Users/indianic/Desktop/front-end-development-react
├── Dockerfile
├── README.md
├── api
|  ├── index.js
|  └── routes.js
├── components
|  ├── CropImages
|  |  ├── CropImages.jsx
|  |  └── CropImagesProfile.jsx
|  ├── Faqs
|  |  └── Faq.js
|  ├── OTPInput
|  |  ├── SingleInput.js
|  |  └── index.js
|  ├── Slider
|  |  └── Slider.js
|  ├── business
|  |  └── add-information.js
|  ├── common
|  |  └── filter-course-room
|  ├── courses
|  |  ├── CourseText.js
|  |  ├── common
|  |  ├── courses-list.js
|  |  ├── index.js
|  |  └── upload-course
|  ├── dashboard
|  |  ├── Comments
|  |  ├── Posts
|  |  ├── index.js
|  |  └── my-dashboard.js
|  ├── error-boundary
|  |  └── index.js
|  ├── form-fields
|  |  ├── checkbox.js
|  |  ├── date-picker-field.js
|  |  ├── file-select-field-signup.js
|  |  ├── image-select-field-signup.js
|  |  ├── image-select-field.js
|  |  ├── index.js
|  |  ├── radio.js
|  |  ├── react-phone-input.js
|  |  ├── react-select-field.js
|  |  ├── select-field-signup-csc.js
|  |  ├── select-field.js
|  |  ├── text-area-field.js
|  |  ├── text-field-password.js
|  |  └── text-field.js
|  ├── groups
|  |  ├── all-groups.js
|  |  ├── group-create.js
|  |  ├── groups-join.js
|  |  ├── invitations-groups.js
|  |  ├── my-groups.js
|  |  └── requested.js
|  ├── growth-model
|  |  ├── Compilation
|  |  ├── Step
|  |  ├── explore-more-modal.js
|  |  ├── growth-welcome-section.js
|  |  └── index.js
|  ├── job-offers-list
|  |  ├── index.js
|  |  ├── job-description.js
|  |  ├── job-detail.js
|  |  ├── job-list.js
|  |  ├── job-requirements.js
|  |  └── required-skills.js
|  ├── layout
|  |  ├── PrivateLayout.js
|  |  ├── footer.js
|  |  ├── header.js
|  |  ├── index.js
|  |  ├── layout.js
|  |  ├── meta-tags.js
|  |  └── socialLoginBtns.js
|  ├── learning-institute
|  |  └── about-us
|  ├── messages
|  |  ├── ChatBox.js
|  |  ├── CurrentChannel.js
|  |  ├── FloatMessage.js
|  |  ├── MessageInputrenderar.js
|  |  ├── NewMessage.js
|  |  ├── SideBar.js
|  |  └── index.js
|  ├── modal
|  |  ├── ViewGroupMembers.js
|  |  ├── account-access-email.js
|  |  ├── account-access-phone.js
|  |  ├── account-change-password.js
|  |  ├── account-suspention-confirms.js
|  |  ├── add-card.js
|  |  ├── add-certificate.js
|  |  ├── add-credit.js
|  |  ├── add-education.js
|  |  ├── add-experience.js
|  |  ├── add-feedback.js
|  |  ├── add-first-post.js
|  |  ├── add-tag.js
|  |  ├── add-to-gm.js
|  |  ├── add-your-post
|  |  ├── addToGM.js
|  |  ├── addmore-activity.js
|  |  ├── apply-for-job.js
|  |  ├── approved.js
|  |  ├── ask-for-follow.js
|  |  ├── blocking-other-profiles.js
|  |  ├── close-account.js
|  |  ├── congratulations.js
|  |  ├── connection-status.js
|  |  ├── connectionList.js
|  |  ├── contact-info.js
|  |  ├── course-type.js
|  |  ├── create-groups.js
|  |  ├── delete-chat.js
|  |  ├── edit-your-public-profile.js
|  |  ├── endorsement.js
|  |  ├── enter-otp.js
|  |  ├── follower-list.js
|  |  ├── following-list.js
|  |  ├── forgot-password.js
|  |  ├── gmAutomatic.js
|  |  ├── group-delete-confirms.js
|  |  ├── group-member-delete.js
|  |  ├── index.js
|  |  ├── join-now.js
|  |  ├── join-request-group.js
|  |  ├── likeListCounter.js
|  |  ├── links.js
|  |  ├── login-new.js
|  |  ├── login.js
|  |  ├── main-modal.js
|  |  ├── mentions-or-tags.js
|  |  ├── no-sufficient-credit.js
|  |  ├── otp-verification.js
|  |  ├── profile-photo-view.js
|  |  ├── publish-article.js
|  |  ├── redeem.js
|  |  ├── registration.js
|  |  ├── remove-chat.js
|  |  ├── request-to-admin.js
|  |  ├── set-password.js
|  |  ├── story-display-option.js
|  |  ├── success-model.js
|  |  ├── teacher-option.js
|  |  ├── thankyou.js
|  |  ├── view-certificate.js
|  |  ├── view-skill-detail.js
|  |  ├── visibility-option.js
|  |  ├── votes-poll.js
|  |  ├── who-see-your-lastname.js
|  |  └── write-an-article.js
|  ├── my-accounts
|  |  ├── ManageActivity
|  |  ├── account-access
|  |  ├── activities-visibility
|  |  ├── billinginformation
|  |  ├── communication
|  |  ├── edit-intro
|  |  ├── plan-payment
|  |  ├── preference
|  |  ├── profile-visibility
|  |  ├── security
|  |  └── suspense-terminate
|  ├── my-connections
|  |  ├── index.js
|  |  ├── my-connections.js
|  |  ├── my-growth-connections.js
|  |  ├── old-my-growth-connections.js
|  |  ├── pending-connection-request.js
|  |  ├── people-you-may-know-filter.js
|  |  ├── people-you-may-know.js
|  |  └── sent-connection-request.js
|  ├── notification
|  |  └── notificationList.jsx
|  ├── otherCoursesRooms
|  |  ├── otherCourses.js
|  |  ├── otherMatchToGM.js
|  |  └── otherRooms.js
|  ├── profile
|  |  ├── about-teacher.js
|  |  ├── activity
|  |  ├── certifications
|  |  ├── courses-detail-banner.js
|  |  ├── courses-features.js
|  |  ├── description
|  |  ├── education
|  |  ├── experience
|  |  ├── followed-groups
|  |  ├── index.js
|  |  ├── languages
|  |  ├── profile-summary
|  |  ├── shortDescription
|  |  ├── skills
|  |  ├── student-feedback.js
|  |  ├── total-summary.js
|  |  └── upcoming-events.js
|  ├── profile-tabs
|  |  ├── about-tab.js
|  |  ├── articale-tab.js
|  |  ├── course-list.js
|  |  ├── events.js
|  |  ├── faculties-tabs.js
|  |  ├── home-tab.js
|  |  ├── index.js
|  |  ├── job-detail.js
|  |  ├── job-tabs.js
|  |  ├── people-tab.js
|  |  ├── post-tab.js
|  |  ├── services-tab.js
|  |  └── tabs-component
|  ├── rooms
|  |  ├── ManageShare.js
|  |  ├── TableRow.js
|  |  ├── index.js
|  |  ├── room-banner.js
|  |  └── rooms-list.js
|  ├── search-result
|  |  ├── coach.js
|  |  ├── courses.js
|  |  ├── group.js
|  |  ├── learning-institute.js
|  |  ├── people.js
|  |  ├── teacher.js
|  |  ├── trainer.js
|  |  └── yli-guide.js
|  ├── sidebar
|  |  ├── add.js
|  |  ├── blogs.js
|  |  ├── cms
|  |  ├── followed-group.js
|  |  ├── growth-modal.js
|  |  ├── growth-partners.js
|  |  ├── index.js
|  |  ├── most-followed-contents.js
|  |  ├── my-accounts
|  |  ├── my-profile.js
|  |  ├── other-views.js
|  |  ├── recent-added-gm.js
|  |  ├── top-activities.js
|  |  └── upgrade-your-profile.js
|  ├── sign-up-tabs
|  |  ├── certifications.js
|  |  ├── education-details.js
|  |  ├── experience.js
|  |  ├── index.js
|  |  ├── sign-up-step1.js
|  |  ├── sign-up-step2.js
|  |  └── sign-up-step3.js
|  ├── skills
|  |  └── skills-component.js
|  ├── suggested-activity
|  |  ├── Courses.js
|  |  ├── Events.js
|  |  ├── Index.js
|  |  ├── MasterClasses.js
|  |  ├── Rooms.js
|  |  └── Webinars.js
|  ├── ui
|  |  ├── alert.js
|  |  ├── index.js
|  |  ├── link-preview.js
|  |  ├── loader.js
|  |  └── skeleton.js
|  ├── with-auth
|  |  └── with-auth.js
|  ├── with-formik-field
|  |  └── with-formik-field.js
|  ├── with-popup
|  |  └── with-popup.js
|  └── zoom
|     ├── JoinBtn.js
|     ├── chat
|     ├── loading-layer.js
|     └── video
├── config
|  └── index.js
├── context
|  └── AppWrapper.js
├── hooks
|  ├── index.js
|  ├── usePersistFn.js
|  ├── usePopup.js
|  ├── usePrevious.js
|  ├── useSizeCallback.js
|  └── useUnmount.js
├── jsconfig.json
├── kubernetes
|  └── react-deployment.yaml
├── next.config.js
├── package-lock.json
├── package.json
├── pages
|  ├── 404.js
|  ├── _app.js
|  ├── _document.js
|  ├── _error.js
|  ├── account
|  |  └── sign-up.js
|  ├── article
|  |  └── index.js
|  ├── blogs
|  |  ├── [blogsDetails].js
|  |  └── index.js
|  ├── business
|  |  ├── become-bn-host.js
|  |  ├── coach-introduction.js
|  |  ├── create-business-page.js
|  |  ├── create-profile-coach.js
|  |  ├── create-profile-host.js
|  |  ├── create-profile-teacher.js
|  |  ├── create-profile-trainer.js
|  |  ├── select-company-type.js
|  |  ├── teacher-introduction.js
|  |  └── trainer-introduction.js
|  ├── certificate
|  |  └── [id].js
|  ├── cms
|  |  ├── about-us.js
|  |  ├── add-questions.js
|  |  ├── cookies-policy.js
|  |  ├── email.js
|  |  ├── faq.js
|  |  ├── privacy-and-policy.js
|  |  ├── term-and-conditions.js
|  |  └── uikit.js
|  ├── complete-profile.js
|  ├── course-detail
|  |  └── [courseId].js
|  ├── courses
|  |  └── index.js
|  ├── dashboard
|  |  └── index.js
|  ├── groups
|  |  ├── [...params]
|  |  ├── create-groups.js
|  |  ├── edit-groups.js
|  |  ├── group-members
|  |  └── groups.js
|  ├── growth-model
|  |  └── index.js
|  ├── index.js
|  ├── institute
|  |  ├── create-profile-institute-step1.js
|  |  ├── create-profile-institute-step2.js
|  |  ├── create-profile-institute.js
|  |  └── institute-introduction.js
|  ├── job-offers
|  |  └── index.js
|  ├── linkedin
|  |  └── index.js
|  ├── messages
|  |  └── index.js
|  ├── my-accounts
|  |  └── accounts.js
|  ├── my-connections
|  |  ├── connection-list.js
|  |  └── index.js
|  ├── my-growth-connections
|  |  ├── index-old.js
|  |  └── index.js
|  ├── my-learning
|  |  └── index.js
|  ├── notifications
|  |  └── notifications.js
|  ├── post
|  |  └── [postId].js
|  ├── practical-test
|  |  └── index.js
|  ├── profile
|  |  ├── [profileId].js
|  |  ├── institute-profile.js
|  |  └── my-profile.js
|  ├── purchased-courses
|  |  └── index.js
|  ├── quiz
|  |  └── index.js
|  ├── search-result
|  |  └── index.js
|  ├── start-quiz
|  |  ├── index.js
|  |  └── quiz.js
|  ├── suggested-activities
|  |  └── [jobId].js
|  └── virtual-events
|     ├── [...roomId].js
|     └── index.js
├── public
|  ├── assets
|  |  ├── fonts
|  |  ├── images
|  |  ├── images.js
|  |  └── scss
|  ├── lib
|  |  ├── audio.encode.wasm
|  |  ├── audio.simd.wasm
|  |  ├── audio_simd.min.js
|  |  ├── js_audio_process.min.js
|  |  ├── js_audio_worklet.min.js
|  |  ├── js_media.min.js
|  |  ├── sharing_m.min.js
|  |  ├── sharing_mtsimd.min.js
|  |  ├── sharing_s.min.js
|  |  ├── sharing_simd.min.js
|  |  ├── vb-resources
|  |  ├── video.decode.wasm
|  |  ├── video.mt.wasm
|  |  ├── video.mtsimd.wasm
|  |  ├── video.simd.wasm
|  |  ├── video_m.min.js
|  |  ├── video_mtsimd.min.js
|  |  ├── video_s.min.js
|  |  ├── video_simd.min.js
|  |  └── webim.min.js
|  ├── robots.txt
|  └── sitemap.xml
├── routes
|  ├── index.js
|  └── urls.js
├── server.js
├── sonar-project.properties
├── store
|  ├── actions
|  |  ├── aboutUs.js
|  |  ├── activity.js
|  |  ├── article.js
|  |  ├── auth.js
|  |  ├── business-page.js
|  |  ├── certification.js
|  |  ├── communication.js
|  |  ├── connections.js
|  |  ├── cookies-policy.js
|  |  ├── courses.js
|  |  ├── description.js
|  |  ├── education.js
|  |  ├── experience.js
|  |  ├── faq.js
|  |  ├── groups.js
|  |  ├── growth.js
|  |  ├── index.js
|  |  ├── language.js
|  |  ├── learningInstitute.js
|  |  ├── manageActivities.js
|  |  ├── message.js
|  |  ├── my-account.js
|  |  ├── notifications.js
|  |  ├── plan.js
|  |  ├── post.js
|  |  ├── privacy-policy.js
|  |  ├── room
|  |  ├── search-result.js
|  |  ├── skills.js
|  |  ├── terms-and-condiction.js
|  |  ├── testimonial.js
|  |  ├── types.js
|  |  ├── ui.js
|  |  ├── user.js
|  |  ├── visibility.js
|  |  └── zoom.js
|  ├── index.js
|  ├── reducers
|  |  ├── aboutUs.js
|  |  ├── account-setting.js
|  |  ├── activity.js
|  |  ├── article.js
|  |  ├── business-page.js
|  |  ├── certification.js
|  |  ├── communication.js
|  |  ├── connections.js
|  |  ├── cookies-policy.js
|  |  ├── courses.js
|  |  ├── education.js
|  |  ├── experience.js
|  |  ├── faq.js
|  |  ├── groups.js
|  |  ├── growth.js
|  |  ├── index.js
|  |  ├── language.js
|  |  ├── learningInstitute.js
|  |  ├── manageActivity.js
|  |  ├── message.js
|  |  ├── notifications.js
|  |  ├── plan.js
|  |  ├── post.js
|  |  ├── privacy-policy.js
|  |  ├── room
|  |  ├── search-result.js
|  |  ├── skills.js
|  |  ├── terms-and-condiction.js
|  |  ├── testimonial.js
|  |  ├── ui.js
|  |  ├── user.js
|  |  ├── visibility.js
|  |  └── zoom.js
|  ├── selectors
|  |  ├── account-setting.js
|  |  ├── activity.js
|  |  ├── article.js
|  |  ├── certification.js
|  |  ├── education.js
|  |  ├── experience.js
|  |  ├── group.js
|  |  ├── language.js
|  |  ├── learning-institute.js
|  |  ├── plan.js
|  |  ├── searchResult.js
|  |  └── user.js
|  ├── utils
|  |  ├── experience.js
|  |  └── user.js
|  └── with-redux-store.js
├── utils
|  ├── constant.js
|  ├── functions.js
|  ├── index.js
|  ├── platform.js
|  ├── schema.js
|  ├── translations
|  |  ├── en.js
|  |  └── index.js
|  └── validation-functions.js
└── yarn.lock

directory: 2073 file: 4703

ignored: directory (101)
```

#### Here's a quick overview for folder.

`/api :- ` Api call related functions.

`/components :- ` Independent and reusable bits of code.

`/config :- ` Projects config files.

`/public :-` It's the root folder that gets dealt by the web server in the end.

`/pages :- ` Its contains all next.js routes pages files.

`/pages/index.js :- `index.js is the traditional and actual entry point for all react apps.

`/pages/App.js :- ` It's used for default intial server side rander our projects code.

`/pages/_document.js.js :- `index.js is the traditional and actual entry point for all react apps.

`/pages/_error.js :- ` It's used for apply design on error page.

`/pages/404.js :- ` It's used for apply design on 404 page.

`/public :- ` Its contains all static files like images, fonts, css, scss, robot.txt, sitemap.xml and etc.

`/public/policy.html :- ` Used fo apply privacy and policy of your projects.

`/public/sitemap.xml :- ` Its contains google crowling releted xmp file data.

`/public/robots.txt :- ` Its contains code releted to allow and disallow your pages for google crowler.

`/routes :- ` This directory contains and allow our pages to view in browser in specific urls.

`/store :- ` Its contains redux methods like action, reducer and store.

`/utils :- ` Javascript related functions, validations and etc.

`.env.dev :-` Its devlopment environment configuration files for our project.

`.env.stag :-` Its staging environment configuration files for our project.

`.env.prod :-` Its production environment configuration files for our project.

`.gitignore :-` Git file ignore config files.

`package.json :-` this file holds various metadata relevant to the project.

`next.config.js :-` this file holds next.js configuration relted files.

`README.md :-` It's a set of useful information about a project and a kind of manual.

`server.js :-` Its allow to change react default configuration like change build directory and server port etc.

`sonar-project.properties :-` Its sonarqube (testing tool) configuration files.

## Project configuration

We used below directory structure in our react front projects.

### Scripts

we need to follow below scripts to ganarate build and run project in different envirements, some script are also used for test our projects.

```json
{
  "dev": "env-cmd -f .env.dev node server.js",
  "build": "env-cmd -f .env.dev next build",
  "build:stag": "env-cmd -f .env.stag next build",
  "build:prod": "env-cmd -f .env.prod next build",
  "start": "env-cmd -f .env.dev node server.js",
  "start:stag": "env-cmd -f .env.stag node server.js",
  "start:prod": "env-cmd -f .env.prod node server.js",
  "sonar": "sonar-scanner"
}
```

### Dependencies

We used varios node.js dependencies library in our projects, all library are also listed in below view wiht its virsion.

```json
{
  "@loadable/component": "^5.13.1",
  "aos": "^2.3.4",
  "bootstrap": "^4.6.0",
  "compression": "^1.7.3",
  "cookie-parser": "^1.4.5",
  "cookies": "^0.8.0",
  "env-cmd": "^10.1.0",
  "express": "5.0.0-alpha.8",
  "i": "^0.3.6",
  "isomorphic-unfetch": "^2.1.1",
  "jquery": "^3.5.1",
  "js-cookie": "^2.2.1",
  "net": "^1.0.2",
  "next": "^10.0.7",
  "next-images": "^1.7.0",
  "next-routes": "^1.4.2",
  "nextjs-progressbar": "^0.0.7",
  "npm": "^7.5.3",
  "react": "^17.0.2",
  "react-bootstrap": "^1.4.3",
  "react-dom": "^17.0.2",
  "react-redux": "^5.0.1",
  "react-router-dom": "^5.2.0",
  "redux": "^3.6.0",
  "redux-thunk": "^2.1.0",
  "sass": "^1.32.8",
  "slick-carousel": "^1.8.1",
  "use-react-hooks": "^1.0.7",
  "webpack": "^5.24.2",
  "compression-webpack-plugin": "^2.0.0",
  "cross-env": "^7.0.2",
  "mini-css-extract-plugin": "^0.5.0",
  "optimize-css-assets-webpack-plugin": "^5.0.1",
  "uglifyjs-webpack-plugin": "^2.0.1"
}
```

## Authors

- **INIC** - _Initial work_ - [IndiaNIC Infotech Limited](https://www.indianic.com/)

See also the list of [contributors](http://git.indianic.com/IIL0/I2020-5861/reactjs-front/project_members) who participated in this project.

### Vendor Dependencies

[React Selectize] : http://furqanzafar.github.io/react-selectize (This can be useful when you are using the select control inside a parent element with its overflow auto or scroll. Required react-dom-factories and react-transition-group)

[React Slick Slider] : https://www.npmjs.com/package/react-slick (Also install slick-carousel for css and font)

[React OTP Input] : https://www.npmjs.com/package/react-otp-input

[react multiline clamp]: https://www.npmjs.com/package/react-multiline-clamp

[React Animated CSS] : https://www.npmjs.com/package/react-animated-css (Required animate.min.css)

[React Star Ratings] : https://www.npmjs.com/package/react-rating-stars-component

[React Rangeslider] : https://www.npmjs.com/package/react-rangeslider

[React DatePicker] : https://www.npmjs.com/package/react-datepicker

[React Number Format] : https://www.npmjs.com/package/react-number-format
