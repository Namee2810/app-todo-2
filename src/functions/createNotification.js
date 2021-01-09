import { store as notification } from 'react-notifications-component';

const createNotification = (type, title, message, duration) => {
  notification.addNotification({
    title,
    message,
    type,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration,
      onScreen: true,
      pauseOnHover: true,
    },
  });
};

export default createNotification;