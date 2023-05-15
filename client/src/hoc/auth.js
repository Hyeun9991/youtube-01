import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';
import { useNavigate } from 'react-router-dom';

/**
 * ### SpecificComponent
 * LandingPage component 등...
 *
 * ### option
 * null: 아무나 출입이 가능한 페이지
 * true: 로그인한 유저만 출입이 가능한 페이지
 * false: 로그인한 유저는 출입이 불가능한 페이지
 */
export default function Auth(SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 페이지에 접근할때마다 실행되서 권한을 확인할 수 있도록 함
    useEffect(() => {
      // auth 액션함수가 반환하는 값 (=reducer에게 전달될 값)
      dispatch(auth()).then((response) => {
        // 백엔드에서 처리해서 가져온 정보 (isAuth check)
        // console.log('auth?', response);

        // 로그인 하지 않은 상태
        if (!response.payload.isAuth) {
          if (option) {
            navigate('/login');
          }
        } else {
          // 로그인 한 상태 이면서 관리자 권한이 없는데 관리자 페이지에 접근하는 경우
          if (adminRoute && !response.payload.isAdmin) {
            navigate('/');
          } else {
            // 로그인 한 상태에서 로그인, 회원가입 페이지에 접근하는 경우
            if (option === false) {
              navigate('/');
            }
          }
        }
      });
    }, []);

    return <SpecificComponent {...props} />;
  }

  return AuthenticationCheck;
}
