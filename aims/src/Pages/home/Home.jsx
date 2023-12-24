import React from 'react'
import Header from './header/Header'
import IIITU from '../../assets/iiitu.jpg'
import ChipIcon from '../../assets/svg/Chip'
import ComputerIcon from '../../assets/svg/Computer'
import PhoneIcon from '../../assets/svg/Phone'
import MailIcon from '../../assets/svg/Mail'
import { useGetUser } from '../../query/user/user'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../../store/reducers/userSlice'
const programmes = [
  {
    name: "Electronics and Communication",
  },
  {
    name: "Computer Science",
  },
  {
    name: "Information Technology",
  },
];

const ProgrammesIcon = (index)=>{
  switch (index) {
    case 0:
      return <ChipIcon/>
    case 1:
      return <ComputerIcon/>
    case 2:
      return <ChipIcon/>
    default:
      break;
  }
}
const Home = () => {
      const dispatch = useDispatch();
      const isAuthenticated = useSelector((state) => state.user.isAuthenticate);
      const onGetUserSuccess = (data) => {
        if (data) {
          dispatch(setUserData(data));
        }
      };
      const { data: user } = useGetUser({
        onGetUserSuccess,
        isAuthenticated,
      });
  return (
    <div className="p-4">
      <Header />
      <div className="mx-32 pt-10">
        <div className="flex gap-4 border h-[300px] p-4 rounded-lg bg-gray-50 shadow-md">
          <div className="flex flex-col gap-2">
            <div>
              <h2 className="font-bold text-2xl">ABOUT IIIT UNA</h2>
            </div>
            <div>
              IIIT Una is one of the 20 IIITs being setup, funded and managed by
              the Ministry of Education, Govt. of India under the Public Private
              Partnership (PPP) model. The partners setting up IIIT Una are the
              Ministry of Education, Govt. of India, the Govt. of Himachal
              Pradesh, HP Power Corporation Limited and HP Transmission
              Corporation Limited. Admissions to the undergraduate programmes in
              the Institute are made through the Joint Entrance Examination
              (JEE). At present, IIIT Una operates from its permanent campus at
              Saloh, Una. The campus is fully furnished and working full fledged
              from its permanent campus.
            </div>
          </div>
          <div className="h-[1000px]">
            <img alt="iiitu" src={IIITU} className="rounded-md"></img>
          </div>
        </div>

        <div className="mt-20">
          <div>
            <h1 className="font-bold text-2xl">Programmes offered</h1>
          </div>
          <div className="flex justify-between mt-10">
            {programmes.map((programme, index) => (
              <div className="bg-gray-50 flex flex-col justify-center items-center py-10 px-10 rounded-lg shadow-md gap-4 hover:bg-white min-w-[302px]">
                {ProgrammesIcon(index)}
                <h1 className="font-bold">{programme.name}</h1>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-20">
          <div className='pb-10'>
            <h1 className="font-bold text-2xl">Contact</h1>
          </div>
          <div className='rounded-lg bg-gray-50 p-4 border shadow-md'>
            <div className="flex flex-col gap-4">
              <div>
                <p className='font-bold'>Indian Institute of Information Technology Una</p>
                <p>
                  Permanent Campus: Vill. Saloh, Teh. Haroli, Distt. Una
                  Himachal Pradesh-177209
                </p>
              </div>
              <div className="flex gap-1">
                <div>
                  <PhoneIcon />
                </div>
                <div>
                  <p>: 01975-257908</p>
                </div>
              </div>
              <div className="flex gap-1">
                <div>
                  <MailIcon />
                </div>
                <div>
                  <p>: director@iiitu.ac.in</p>
                </div>
              </div>
              <div></div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home