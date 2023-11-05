import { Toaster } from "react-hot-toast";

const Toast = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{
        height: "132px",
        top: 70,
        left: 20,
        bottom: 20,
        right: 32,
      }}
      toastOptions={{
        className: "",
        duration: 2000,
        style: {
          background: "#380912",
          color: "#fff",
          height: "132px",
          width: "408px",
        },
        success: {
          duration: 2000,
          theme: {
            primary: "green",
            secondary: "black",
          },
        },
      }}
    />
  );
};

export default Toast;
