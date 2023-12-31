import ForgotPasswordForm from "../components/ForgorPasswordForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setForgotPassword } from "../features/userSlice";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

function ForgotPassword() {
  const data = useSelector((state) => state.user.data);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();
  const [inputData, setInputData] = useState({
    email: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(setForgotPassword(inputData));
  };

  useEffect(() => {
    if (data) {
      Swal.fire({
        title: "Success !",
        text: data.message,
        icon: "success",
      });
      navigate("/login");
    }

    if (error) {
      Swal.fire({
        title: "Error !",
        text: error,
        icon: "error",
      });
    }
  }, [data, error, navigate]);

  return (
    <ForgotPasswordForm
      handleSubmit={handleSubmit}
      inputData={inputData}
      setInputData={setInputData}
      forgotPasswordLoading={loading}
    />
  );
}

export default ForgotPassword;
