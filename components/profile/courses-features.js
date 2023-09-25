import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import { Accordion, Button, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { generateCertificate } from 'store/actions';
import { virtualEventGenerateCertificate } from 'store/actions/room';
import { secondsToMinute, showMessageNotification } from 'utils';

const CoursesFeatures = ({
  RoomGoal,
  Requirement,
  FullDescription,
  tags,
  certificateTitle,
  virtualEventId,
  type,
  nameOfEvent,
  chapterDetails,
  courseQuiz,
  courseDetail,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [lang] = useTranslation('language');
  const { courseId } = router.query;
  const [isReadDesc, setIsReadDesc] = useState(true);

  const handleGenerateCertificate = () => {
    if (courseId) {
      dispatch(generateCertificate(courseId)).then((res) => {
        if (res.statusCode === 200) {
          window.open(
            `/certificate/${res?.data?.certificateNumber}?type=${type}`,
            '_blank'
          );
        } else {
          showMessageNotification(res?.message);
        }
      });
    }
    if (virtualEventId) {
      dispatch(virtualEventGenerateCertificate({ virtualEventId })).then(
        (res) => {
          if (res.statusCode === 200) {
            window.open(
              `/certificate/${res?.data?.certificateNumber}?type=${type}`,
              '_blank'
            );
          } else {
            showMessageNotification(
              `Please complete ${eventHandler(nameOfEvent)} to get certificate`
            );
          }
        }
      );
    }
  };

  const eventHandler = (typeName) => {
    if (typeName === 'training-room') {
      return 'training room';
    } else if (typeName === 'master-class') {
      return 'master class';
    } else if (typeName === 'event') {
      return 'event';
    } else if (typeName === 'webinar') {
      return 'webinar';
    } else if (typeName === 'coaching-room') {
      return 'coaching room';
    } else {
      return 'business network room';
    }
  };

  return (
    <Fragment>
      <Card className='my-3 my-md-4'>
        <Card.Body className='p-md-4 p-3'>
          <div className='desc mb-md-4 mb-3'>
            <h3 className='h6'>{lang('ROOMS.GOAL')}</h3>
            <p className='text-body-14 font-weight-normal m-0 course-goal'>
              <p
                dangerouslySetInnerHTML={{
                  __html: RoomGoal,
                }}
              />
            </p>
          </div>

          {chapterDetails && chapterDetails.length > 0 && (
            <div className='courses-structure-list mb-3'>
              <div className='courses-list-head mb-2'>
                <h6>Course Structure</h6>
              </div>
              <Accordion defaultActiveKey='0'>
                {Array.isArray(chapterDetails) &&
                  chapterDetails?.map((chapter) => (
                    <div
                      key={chapter?.id}
                      className='border-bottom border-geyser'
                    >
                      <Accordion.Toggle
                        as={Card.Header}
                        eventKey={chapter?.id}
                        className='text-body-14 px-0 pt-0 pointer border-0'
                      >
                        <div className='d-flex justify-content-between'>
                          <div className='ml-4 mt-3'>{chapter?.title}</div>
                          <span className='icon-down-arrow-grey ml-auto mr-2 mt-3 pr-1 text-primary'></span>
                        </div>
                        <div className='d-flex ml-4 mt-2'>
                          <small className='text-body-12 text-secondary border-top-0 border-bottom-0 pr-2'>
                            {chapter?.chapterLessonDetails?.length > 1
                              ? `${chapter?.chapterLessonDetails?.length} Contents`
                              : `${chapter?.chapterLessonDetails?.length} Content`}
                          </small>
                        </div>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey={chapter?.id}>
                        <div className='p-20'>
                          <ul className='list-unstyled'>
                            {Array.isArray(chapter?.chapterLessonDetails) &&
                              chapter?.chapterLessonDetails?.length > 0 &&
                              chapter?.chapterLessonDetails
                                .sort((a, b) => a.lessonsOrder - b.lessonsOrder)
                                .map((lesson) => {
                                  if (lesson?.videoURL !== null) {
                                    return (
                                      <li
                                        className='text-body-14 font-weight-normal d-flex justify-content-between mb-3 pointer'
                                        key={lesson?.id}
                                      >
                                        <span className='pl-0 d-flex justify-content-between'>
                                          <span>
                                            <em
                                              className='font-20 pr-2 align-middle bx bx-play-circle'
                                              style={{ color: '#0f6bbf' }}
                                            ></em>
                                          </span>
                                          <span>{lesson?.title}</span>
                                        </span>
                                        <span className='pl-0'>
                                          {secondsToMinute(lesson?.duration)}
                                        </span>
                                      </li>
                                    );
                                  }

                                  if (lesson?.pdf !== null) {
                                    return (
                                      <li
                                        className='text-body-14 font-weight-normal d-flex justify-content-between mb-3 pointer'
                                        key={lesson?.id}
                                      >
                                        <span className='pl-0 d-flex justify-content-between'>
                                          <span>
                                            <i
                                              className='bx bxs-file-pdf pr-2 font-20'
                                              style={{ color: '#0f6bbf' }}
                                            ></i>
                                            {lesson?.title}
                                          </span>
                                        </span>
                                      </li>
                                    );
                                  }

                                  if (
                                    lesson?.quiz === true &&
                                    chapter?.quizDetails?.length > 0
                                  ) {
                                    return (
                                      <li
                                        className='text-body-14 font-weight-normal d-flex justify-content-between mb-3 pointer'
                                        key={lesson?.id}
                                      >
                                        <span className='pl-0 d-flex justify-content-between'>
                                          <span>
                                            <i
                                              className='bx bxs-help-circle pr-2 font-20'
                                              style={{ color: '#0f6bbf' }}
                                            ></i>{' '}
                                          </span>
                                          <span>
                                            {lang('COURSE.QUIZ')}{' '}
                                            {chapter.title}
                                          </span>
                                        </span>
                                      </li>
                                    );
                                  }

                                  if (lesson?.text !== null) {
                                    return (
                                      <li
                                        className='text-body-14 font-weight-normal d-flex justify-content-between mb-3 pointer'
                                        key={lesson?.id}
                                      >
                                        <span className='pl-0 d-flex justify-content-between'>
                                          <span>
                                            <i
                                              className='bx bx-text pr-2 font-20'
                                              style={{ color: '#0f6bbf' }}
                                            ></i>
                                            {lang('COURSE.CHAPTER_TEXT')}
                                          </span>
                                        </span>
                                      </li>
                                    );
                                  }

                                  if (lesson?.room !== null) {
                                    return (
                                      <li
                                        className='text-body-14 font-weight-normal d-flex justify-content-between mb-3 pointer'
                                        key={lesson?.id}
                                      >
                                        <span className='pl-0 d-flex justify-content-between'>
                                          <i
                                            className='bx bxl-zoom pr-2 font-20'
                                            style={{ color: '#0f6bbf' }}
                                          ></i>
                                          {lang('COURSE.TRAINING_ROOM')}
                                        </span>
                                      </li>
                                    );
                                  }
                                })}
                          </ul>
                        </div>
                      </Accordion.Collapse>
                    </div>
                  ))}
              </Accordion>
              {courseQuiz && courseQuiz?.length > 0 && (
                <div className='d-flex justify-content-between pointer course-test'>
                  <h6>{lang('COURSE.TEST')}</h6>
                </div>
              )}
            </div>
          )}

          <div className='desc mb-md-4 mb-3'>
            <h3 className='h6'>{lang('ROOMS.REQUIREMENTS')}</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: Requirement,
              }}
            />
          </div>
          <div className='desc pr-xl-5 mr-xl-2'>
            <h3 className='h6'>{lang('ROOMS.DESCRIPTION')}</h3>
            <p className='text-body-14 font-weight-normal m-0'>
              <p
                dangerouslySetInnerHTML={{
                  __html: isReadDesc
                    ? FullDescription?.slice(0, 500)
                    : FullDescription,
                }}
              />

              {FullDescription?.length > 200 && (
                <a
                  type='button'
                  onClick={() => setIsReadDesc(!isReadDesc)}
                  className='text-blue-dress'
                >
                  {isReadDesc
                    ? lang('COMMON.READ_MORE')
                    : lang('COMMON.READ_LESS')}
                </a>
              )}
            </p>
          </div>

          <div className='desc pr-xl-5 mr-xl-2 mt-3'>
            <h3 className='h6'>{lang('ROOMS.TAGS')}</h3>
            <div className='mb-3'>
              {tags?.length > 0 &&
                tags.map((v, i) => (
                  <span
                    className='d-inline-flex mr-2 mb-2 skill-type-style px-2 py-1 skill-type-text'
                    key={i}
                  >
                    {v}{' '}
                  </span>
                ))}
            </div>
          </div>
          <div className='desc pr-xl-5 mr-xl-2'>
            <h3 className='h6'>{lang('ROOMS.CERTIFICATES')}</h3>
            <p>
              {certificateTitle
                ? certificateTitle
                : type === 'course'
                  ? lang('ROOMS.CERTI_TEXT')
                  : `Get Yliway certificate by completing entire ${eventHandler(
                    nameOfEvent
                  )}`}
            </p>
            {courseDetail?.completionPercent === 100 && (
              <Button onClick={handleGenerateCertificate}>
                {lang('ROOMS.YLI_CERTI')}
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </Fragment>
  );
};
export default CoursesFeatures;
