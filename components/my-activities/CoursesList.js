import { Link } from '@routes';
import React, { Fragment } from 'react';
import { Card, Col, ProgressBar, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import StarRatings from 'react-star-ratings';
import { onImageError } from 'utils';

export const MyActivitiesCoursesList = ({
    total,
    setPagesize,
    pagesize,
    myLearningCourseList,
    showModalWithValue,
}) => {
    const [lang] = useTranslation('language');

    return (
        <Card.Body className='m-0 p-0 mb-4'>
            <h5 className='h6 border-geyser border-bottom px-3 pt-3 pb-3 mb-0'>
                Courses
            </h5>
            <Row className='px-2 px-sm-3 py-3  row-col-10 three-grid-spacing'>
                {myLearningCourseList &&
                    myLearningCourseList?.rows?.length > 0 ? (
                    myLearningCourseList?.rows?.map((CourseListData) => {
                        return (
                            <Fragment>
                                <Col
                                    lg={4}
                                    sm={6}
                                    key={CourseListData?.id}
                                    className='d-flex w-100 px-2'
                                >
                                    <Card className='secondary-card abstract-card-v2 h-100'>
                                        <Card.Body>
                                            <Link route={'/my-learning/courses/' + CourseListData.courseId}>
                                                <a>
                                                    <div className='position-relative pointer'>
                                                        <picture
                                                            onContextMenu={(e) => e.preventDefault()}
                                                        >
                                                            <source
                                                                srcSet={CourseListData?.courseDetails?.imageURL}
                                                                type='image/png'
                                                            />
                                                            <img
                                                                src={CourseListData?.courseDetails?.imageURL}
                                                                alt={CourseListData?.courseDetails?.title}
                                                                height='155'
                                                                className='w-100'
                                                                onError={(e) => onImageError(e)}
                                                            />
                                                        </picture>
                                                    </div>
                                                </a>
                                            </Link>

                                            <div className='courses-info px-3 py-3 d-flex flex-column'>
                                                <Link
                                                    route={'/my-learning/courses/' + CourseListData.courseId}
                                                >
                                                    <a>
                                                        <div className='title-container'>
                                                            <h6 className='font-weight-bold text-body-16 mb-0 pointer ellipsis'>
                                                                {CourseListData?.courseDetails?.title}
                                                            </h6>
                                                        </div>
                                                    </a>
                                                </Link>

                                                <div className='text-ellipsis d-flex align-items-center justify-content-between'>
                                                    <small className='font-weight-semi-bold text-card-name text-body-12'>
                                                        {CourseListData?.courseDetails?.instituteDetails
                                                            ? CourseListData?.courseDetails?.instituteDetails?.name
                                                            : `${CourseListData?.courseDetails?.UserDetails?.firstName} ${CourseListData?.courseDetails?.UserDetails?.lastName}`}
                                                    </small>
                                                </div>

                                                <div className='package-info my-2'>
                                                    <div className='d-flex align-items-center position-relative'>
                                                        <ProgressBar
                                                            className='progress w-100 mb-0 custom-progress '
                                                            variant='#A400FF'
                                                            now={CourseListData?.courseDetails?.completionPercent}
                                                        />
                                                        <div
                                                            className='position-absolute ml--16 d-inline-flex'
                                                            style={{
                                                                left: `${Math.round(
                                                                    CourseListData?.courseDetails?.completionPercent
                                                                ) || 0
                                                                    }%`,
                                                            }}
                                                        >
                                                            <small
                                                                className='font-8 text-white p-1 rounded-10 text-center w-33px'
                                                                style={{
                                                                    backgroundColor: '#A400FF',
                                                                }}
                                                            >
                                                                {`${Math.round(
                                                                    CourseListData?.courseDetails?.completionPercent
                                                                ) || 0
                                                                    }%`}
                                                            </small>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='d-flex align-items-center justify-content-between mt-1'>
                                                    {!CourseListData?.courseDetails?.feedBackDetails?.length && (
                                                        <span
                                                            className='font-weight-semi-bold text-body-12 cursor-pointer'
                                                            onClick={() =>
                                                                showModalWithValue('mylearning', {
                                                                    sourceId: CourseListData?.courseId,
                                                                    sourceType:
                                                                        CourseListData?.courseDetails?.courseType,
                                                                })
                                                            }
                                                        >
                                                            Leave Rating
                                                        </span>
                                                    )}
                                                    <StarRatings
                                                        rating={CourseListData?.courseDetails?.rating ?? 0}
                                                        starDimension='15px'
                                                        starSpacing='1px'
                                                        starRatedColor='#FFC635'
                                                        className='ml-auto'
                                                        style={{
                                                            marginLeft: 'auto !important',
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Fragment>
                        );
                    })
                ) : (
                    <div className='px-3'>{lang('COMMON.NO_DATA_FOUND')}</div>
                )}
            </Row>
            {total?.totalCourse > pagesize?.pagesizeCourse && (
                <div className='text-right d-flex border-top border-geyser people-tab-view-all-button mb-4'>
                    <small
                        className='font-weight-bold text-primary text-body-14 m-auto pointer people-tab-view-all-button-text load-more-color py-2'
                        onClick={() => {
                            setPagesize({
                                ...pagesize,
                                pagesizeCourse: pagesize?.pagesizeCourse + 3,
                            });
                        }}
                    >
                        {lang('COMMON.VIEW_MORE')}
                    </small>
                </div>
            )}
        </Card.Body>
    );
};
