import { Link } from '@routes';
import moment from 'moment';
import momentTz from "moment-timezone";
import React, { Fragment } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import StarRatings from 'react-star-ratings';
import { onImageError } from 'utils';

export const BusinessNetworkRoom = ({
    total,
    setPagesize,
    pagesize,
    myLearningBnrList,
    showModalWithValue,
    userInfo
}) => {
    const [lang] = useTranslation('language');

    return (
        <Card.Body className='m-0 p-0 mb-4'>
            <h5 className='h6 border-geyser border-bottom px-3 pt-3 pb-3 mb-0'>
                Business Network Room
            </h5>
            <Row className='  px-2 px-sm-3 py-3  row-col-10 three-grid-spacing'>
                {myLearningBnrList && myLearningBnrList?.rows?.length > 0 ? (
                    myLearningBnrList?.rows?.map((bnrListData, index) => {
                        return (
                            <Fragment key={index}>
                                <Col
                                    lg={4}
                                    sm={6}
                                    key={bnrListData?.id}
                                    className='d-flex w-100 px-2'
                                >
                                    <Card className='secondary-card abstract-card-v2 h-100'>
                                        <Card.Body className='d-flex flex-column h-100'>
                                            <Link
                                                route={
                                                    '/my-learning/room/' +
                                                    bnrListData?.virtualEventDetails[0]?.id
                                                }
                                            >
                                                <a>
                                                    <div className='position-relative pointer'>
                                                        <picture
                                                            onContextMenu={(e) => e.preventDefault()}
                                                        >
                                                            <source
                                                                srcSet={
                                                                    bnrListData?.virtualEventDetails[0]?.imageURL
                                                                }
                                                                type='image/png'
                                                            />
                                                            <img
                                                                src={bnrListData?.virtualEventDetails[0]?.imageURL}
                                                                alt='Training Room'
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
                                                    route={
                                                        '/my-learning/room/' +
                                                        bnrListData?.virtualEventDetails[0]?.id
                                                    }
                                                >
                                                    <a>
                                                        <div className='title-container'>
                                                            <h6 className='font-weight-bold text-body-16 mb-0 pointer ellipsis'>
                                                                {bnrListData?.virtualEventDetails[0]?.title}
                                                            </h6>
                                                        </div>
                                                    </a>
                                                </Link>

                                                <div className='text-ellipsis d-flex align-items-center justify-content-between'>
                                                    <small className='font-weight-semi-bold text-card-name text-body-12'>
                                                        {
                                                            bnrListData?.virtualEventDetails[0]?.UserDetails
                                                                ?.firstName
                                                        }{' '}
                                                        {
                                                            bnrListData?.virtualEventDetails[0]?.UserDetails
                                                                ?.lastName
                                                        }
                                                    </small>
                                                </div>

                                                <div className='package-info pt-1'>
                                                    <div className='d-flex justify-content-between'>
                                                        {bnrListData?.virtualEventDetails[0]?.startDate !==
                                                            null ? (
                                                            <div className=''>
                                                                <small className='font-12 font-weight-semibold'>
                                                                    {`${moment(
                                                                        bnrListData?.virtualEventDetails[0]?.startDate
                                                                    ).format('DD/MM/YY')}`}{' '}
                                                                    &bull;{' '}
                                                                    {moment(
                                                                        bnrListData?.virtualEventDetails[0]?.startDate
                                                                    ).format('hh:mm a')}
                                                                </small>
                                                            </div>
                                                        ) : (
                                                            <small className='font-14 text-secondary-75'>
                                                                {`${bnrListData?.virtualEventDetails[0]
                                                                    ?.joinedEvent === null
                                                                    ? 0
                                                                    : 100
                                                                    }% Completed`}
                                                            </small>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className='d-flex align-items-center justify-content-between mt-1'>
                                                    {!bnrListData?.virtualEventDetails[0]?.feedBackDetails
                                                        ?.length && (
                                                            <span
                                                                className='font-weight-semi-bold text-body-12 cursor-pointer'
                                                                onClick={() =>
                                                                    showModalWithValue('mylearning', {
                                                                        sourceId:
                                                                            bnrListData?.virtualEventDetails &&
                                                                            bnrListData?.virtualEventDetails[0]?.id,
                                                                        sourceType: 'business-network-room',
                                                                    })
                                                                }
                                                            >
                                                                Leave Rating
                                                            </span>
                                                        )}
                                                    <StarRatings
                                                        rating={
                                                            bnrListData?.virtualEventDetails[0]?.rating ?? 0
                                                        }
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
            {total?.totalBnr > pagesize?.pagesizeBnr && (
                <div className='text-right d-flex border-top border-geyser people-tab-view-all-button mb-4'>
                    <small
                        className='font-weight-bold text-primary text-body-14 m-auto pointer people-tab-view-all-button-text load-more-color py-2'
                        onClick={() => {
                            setPagesize({
                                ...pagesize,
                                pagesizeBnr: pagesize?.pagesizeBnr + 3,
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
