import React, { useEffect } from 'react';
import { Link } from '@routes';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import {
  ABOUT_US,
  BRAND_POLICY,
  COOKIES_POLICY,
  INVESTOR_RELATIONS,
  PRIVACY_POLICY,
  TERM_AND_CONDITIONS,
} from 'routes/urls';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie, getDefaultLanguage } from 'utils';
import { cmsListStatus } from 'store/actions/aboutUs';

const Footer = () => {
  const [lang] = useTranslation('language');
  const dispatch = useDispatch();
  const year = moment().format('YYYY');

  const { cmsStatus } = useSelector((state) => state.aboutUsInfo);

  useEffect(() => {
    let currentLanguage = getCookie('language');
    if (!currentLanguage) currentLanguage = getDefaultLanguage();
    dispatch(cmsListStatus({ cmsType: 'user', language: currentLanguage }));
  }, []);

  return (
    <footer className='site-footer mt-auto'>
      <div className='footer-bottom'>
        <div className='section-footer d-flex justify-content-center'>
          <Container>
            <div className='footer-text'>
              <ul className='d-flex align-items-center justify-content-center mb-0'>
                <li className='d-flex align-items-center mb-1'>
                  <p className='copyright-text mb-0'>
                    {lang('FOOTER.YLIWAY')} {year}
                  </p>
                  <span className='mx-2'>|</span>
                </li>
                <li className='mb-1'>
                  <Link route={ABOUT_US} title={lang('FOOTER.ABOUT')}>
                    {lang('FOOTER.ABOUT')}
                  </Link>
                  <span className='mx-2'>|</span>
                </li>
                {cmsStatus && cmsStatus?.['General Conditions'] && (
                  <li className='mb-1'>
                    <Link
                      route={TERM_AND_CONDITIONS}
                      title={lang('FOOTER.LICENSE_AGREEMENT')}
                    >
                      {lang('FOOTER.LICENSE_AGREEMENT')}
                    </Link>
                    <span className='mx-2'>|</span>
                  </li>
                )}
                {cmsStatus && cmsStatus?.['Privacy Policy'] && (
                  <li className='mb-1'>
                    <Link
                      route={PRIVACY_POLICY}
                      title={lang('FOOTER.PRIVACY_POLICY')}
                    >
                      {lang('FOOTER.PRIVACY_POLICY')}
                    </Link>
                    <span className='mx-2'>|</span>
                  </li>
                )}
                {cmsStatus && cmsStatus?.['Cookies Policy'] && (
                  <li className='mb-1'>
                    <Link
                      route={COOKIES_POLICY}
                      title={lang('FOOTER.COOKIES_POLICY')}
                    >
                      {lang('FOOTER.COOKIES_POLICY')}
                    </Link>
                    <span className='mx-2'>|</span>
                  </li>
                )}
                {cmsStatus && cmsStatus?.['Investor Relations'] && (
                  <li className='mb-1'>
                    <Link
                      route={INVESTOR_RELATIONS}
                      title={lang('FOOTER.INVESTOR_RELATIONS')}
                    >
                      {lang('FOOTER.INVESTOR_RELATIONS')}
                    </Link>
                    <span className='mx-2'>|</span>
                  </li>
                )}
                {cmsStatus && cmsStatus?.['Brand Policy'] && (
                  <li className='mb-1'>
                    <Link
                      route={BRAND_POLICY}
                      title={lang('FOOTER.BRAND_POLICY')}
                    >
                      {lang('FOOTER.BRAND_POLICY')}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </Container>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
