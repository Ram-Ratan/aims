import { toast } from "react-toastify";

export const showToastMessage = (message) => {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};
export const showErrorToastMessage = (message) => {
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};
