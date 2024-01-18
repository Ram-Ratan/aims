import api from "./api";

export const getStudentByCourse = async (payload) => {
  const { courseId } = payload;
  let url = `/course-registration/get-student-by-course?courseId=${courseId}`;
  const response = await api.get(url);
  return response?.data;
};

export const markAttendance = async (payload) => {
  let url = `/attendance/mark-attendance`;
  const response = await api.post(url,payload);
  return response?.data;
};

export const updateAttendance = async (payload) => {
  let url = `/attendance/update-attendance`;
  const response = await api.post(url, payload);
  return response?.data;
};


export const attendanceByCourseAndDate = async (payload) => {
  let url = `/attendance/attendance-by-course-date-id`;
  const response = await api.post(url,payload);
  return response?.data;
};


export const viewAttendanceByCourseAndDate = async (payload) => {
  let url = `/attendance/attendance-by-course-and-date`;
  const response = await api.post(url, payload);
  return response?.data;
};

export const getCourseAssignedById = async (payload) => {
  let url = `/course-assigned/course-assigned-by-id`;
  const response = await api.get(url);
  return response?.data;
};
