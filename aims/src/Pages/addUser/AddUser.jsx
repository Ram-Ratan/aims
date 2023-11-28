import React, { useEffect, useState } from "react";
import { useForm, Controller} from "react-hook-form";
import { Input } from "../../components/input/Input";
import Select from "../../components/select/Select";
import Button from "../../components/button/Button";
import { getBranch, getSem } from "../../apiClient/courseRegistration";
import { signUP } from "../../apiClient/auth";
import { ToastContainer } from "react-toastify";
import { showErrorToastMessage, showToastMessage } from "../utils/utils";


const roleOptions = [
  { value: "STUDENT", label: "STUDENT" },
  { value: "FACULTY", label: "FACULTY" },
  { value: "ADMIN", label: "ADMIN" },
];
const departmentOptions = [
  { value: "ELECTRONICS", label: "ELECTRONICS" },
  { value: "COMPUTING", label: "COMPUTING" }
];
const AddUser = () => {
  const {control, register, handleSubmit, errors, watch, reset } = useForm({
    shouldFocusError: false,
  });
  const [selectedRole, setSelectedRole] = useState(roleOptions[0]);
  const [branches, setBranches] = useState([]);
  const [sem, setSem] = useState([]);
  const watchedFields = watch();

  useEffect(() => {
    getBranch()
      .then((res) => {
        setBranches(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getSem()
      .then((res) => {
        setSem(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const branchOptions = branches.map((branch) => {
    return {
      label: branch?.name,
      value: branch?.id,
      ...branch,
    };
  });

  const semOptions = sem.map((sem) => {
    return {
      label: sem?.sem,
      value: sem?.id,
      ...sem,
    };
  });



  const onSubmit = async (data) => {
    try {
      let payload = {
        email: data?.email,
        password: data?.password,
        role: selectedRole.value,
      }
      if(selectedRole?.label === "STUDENT"){
        let student = {
          fullName: data?.fullName,
          rollNo: data?.rollNo,
          semesterId: data?.semester?.value,
          branchId: data?.branch?.value,
          mobileNo: data?.mobileNo
        }
        payload.student = student;
      }
      if(selectedRole?.label === "FACULTY"){
        let faculty = {
          fullName: data?.fullName,
          department: data?.department?.value
        }
        payload.faculty = faculty
      }
      if(selectedRole?.label === "ADMIN"){
        let admin = {
          fullName: data?.fullName
        }
        payload.admin = admin;
      }
      await signUP(payload).then((res)=> {
        showToastMessage("User Added Successfully!");
      }).catch((err)=>{
        showErrorToastMessage("Failed");
        console.log(err);
      })
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };


  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md my-20">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Select
            options={roleOptions}
            label="Select Role"
            value={selectedRole}
            onChange={(value) => {
              setSelectedRole(value);
              reset();
            }}
          />
        </div>
        <div className="mb-4">
          <Input label="Email" type="email" {...register("email")} />
          {errors?.email && (
            <span className="text-red-500">{errors?.email?.message}</span>
          )}
        </div>
        <div className="mb-4">
          <Input label="Password" type="password" {...register("password")} />
          {errors?.password && (
            <span className="text-red-500">{errors?.password?.message}</span>
          )}
        </div>
        <div className="mb-4">
          <Input label="Full Name" type="text" {...register("fullName")} />
          {errors?.fullName && (
            <span className="text-red-500">{errors?.fullName?.message}</span>
          )}
        </div>

        {selectedRole?.value === "STUDENT" && (
          <div>
            <div className="mb-4">
              <Input label="Roll No" type="text" {...register("rollNo")} />
              {errors?.rollNo && (
                <span className="text-red-500">{errors?.rollNo?.message}</span>
              )}
            </div>
            <div className="mb-4">
              <Input label="Mobile No" type="text" {...register("mobileNo")} />
              {errors?.mobileNo && (
                <span className="text-red-500">
                  {errors?.mobileNo?.message}
                </span>
              )}
            </div>
            <div className="mb-4">
              <Controller
                name="semester"
                control={control}
                render={({ field }) => (
                  <Select
                    options={semOptions}
                    label="Select Semester"
                    {...field}
                  />
                )}
              />
            </div>
            <div className="mb-4">
              <Controller
                name="branch"
                control={control}
                render={({ field }) => (
                  <Select
                    options={branchOptions}
                    label="Select Branch"
                    {...field}
                  />
                )}
              />
            </div>
          </div>
        )}
        {selectedRole?.value === "FACULTY" && (
          <div>
            <div className="mb-4">
              <Controller
                name="department"
                control={control}
                render={({ field }) => (
                  <Select
                    options={departmentOptions}
                    label="Select Department"
                    {...field}
                  />
                )}
              />
            </div>
          </div>
        )}
        <div className="mt-4">
          <Button variant="filled" className="w-full" type="submit">
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
