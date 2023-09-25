import { useRouter } from "next/router";
import React from "react";
import { Button } from "react-bootstrap";
import { useSelector,useDispatch,shallowEqual } from "react-redux";
import { toggleModal } from "../../store/actions";


/*******************   
@purpose : User Set Thankyou
@Author : INIC
******************/
export const RequestToAdmin = ({ apply = false, role }) => {

  const dispatch=useDispatch()
  const user = useSelector(({ user }) => user);
  let userData = user?.userInfo || {};
  if (user?.userInfo && typeof user.userInfo === "string")
    userData = JSON.parse(user.userInfo);

  const router = useRouter();


  const msg =
    apply === true
      ? `Your Request has been submitted to the admin.`
      : userData?.role !== null && userData?.role.includes(role)
      ? `You are already a ${userData.role.join(", ")}.`
      : `Your Request has already been submitted to the admin.`;
  return (
    <>
      <div className="text-center px-5">
        <em className="icon-approve font-65 mb-2 text-info bg-icon-modal"></em>
        <div>
          <h2 className="h5 mt-md-4 mt-2 mb-2">
            {msg}
          </h2>

          <Button
            variant="info"
            type="submit"
            className="font-weight-semibold text-uppercase mt-4 w-100"
            onClick={() => {
              dispatch(toggleModal(false,'requesttoadmin'))
              router.push({
                pathname: "/dashboard",
              });
            }}
          >
            Ok
          </Button>
        </div>
      </div>
    </>
  );
};
