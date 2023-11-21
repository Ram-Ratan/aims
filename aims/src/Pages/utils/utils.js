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

export const formatDate = (date) => {
  let newDate = new Date(date);

  const month = newDate.toLocaleString("en-GB", { month: "short" });
  const day = newDate.toLocaleString("en-GB", { day: "numeric" });
  const year = newDate.toLocaleString("en-GB", { year: "numeric" });

  return `${month} ${day}, ${year}`;
};
