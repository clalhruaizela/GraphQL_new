import lightVectors from "./bookshelf_Image/Light-Vectors.jpg";
import Wireframe from "./bookshelf_Image/Wireframe-grid.jpeg";
import downloadImg from "./bookshelf_Image/download.jpeg";
import Zusammenfassun from "./bookshelf_Image/Zusammenfassun.jpeg";
import arsiLogo from "./bookshelf_Image/arsi_logo.svg";
import { Button } from "./importDependencies";
const Bookshelf = () => {
  return (
    <div className=" min-w-screen max-h-auto">
      <div className=" ">
        <div className="">
          <img
            src={lightVectors}
            alt=""
            className="w-full object-fill aspect-[4/3] lg:aspect-[2.2] xl:aspect-[2.1] 2xl:aspect-[2.5] "
          />
        </div>
        <div className="absolute text-white top-4 left-4 md:top-12 md:left-12  xl:top-14 xl:left-16">
          <p className="font-bold text-xl md:text-4xl xl:text-5xl">Bookshelf</p>
          <p className=" text-sm md:text-lg ">Library management simplified</p>
        </div>
        {/* <div className="animate-bounce w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center mx-auto border">
          ▼
        </div> */}
      </div>
      <div className="mx-4 sm:mx-10  2xl:mx-0">
        <div className="lg:py-10 flex flex-col items-center  ">
          <h2 className="text-xl  font-base pt-4 md:text-3xl lg:text-4xl 2xl:text-5xl  xl:py-10">
            Transforming Library Management
          </h2>
          <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2 lg:gap-10 pt-12 pb-24 border-b-2 border-gray-300 lg:border-black ">
            <div className=" col-span-3 md:col-span-2 lg:col-span-3 pb-10">
              {/* <div className="w-96"> */}
              <img
                src={downloadImg}
                alt="abc"
                className="h-52 w-48 lg:h-72 lg:w-72 2xl:h-80 2xl:w-80 border-black border-2 rounded-xl"
              />
              {/* </div> */}
              <div className=" pt-1 lg:pt-6">
                <h2 className="font-bold text-sm lg:text-xl 2xl:text-3xl text-gray-800">
                  Easy to use
                </h2>
                <p className="text-xs lg:text-sm xl:text-base">
                  Simple and intuitive design as easy as ABC
                </p>
              </div>
            </div>
            <div className="col-span-3 md:col-span-2 lg:col-span-3 ">
              <img
                src={Wireframe}
                alt=""
                className="h-52 w-48 lg:h-72 lg:w-72 2xl:h-80 2xl:w-80 border-2 border-black rounded-xl"
              />
              <div className="pt-1 lg:pt-6">
                <h2 className="font-bold text-sm text-gray-800 lg:text-xl 2xl:text-3xl">
                  Anywhere access
                </h2>
                <p className="text-xs lg:text-sm xl:text-base">
                  Simple and intuitive design as easy as ABC
                </p>
              </div>
            </div>
            <div className="col-span-3 md:col-span-2 lg:col-span-3 ">
              <img
                src={Zusammenfassun}
                alt=""
                className="h-52 w-48 lg:h-72 lg:w-72 2xl:h-80 2xl:w-80 border-2 border-black rounded-xl "
              />
              <div className="pt-1 lg:pt-6">
                <h2 className="font-bold text-sm  lg:text-xl 2xl:text-3xl text-gray-800">
                  RFID compatible
                </h2>
                <p className="text-xs lg:text-sm xl:text-base">
                  Simple and intuitive design as easy as ABC
                </p>
              </div>
            </div>
            <div className="col-span-3 md:col-span-2 lg:col-span-3">
              <img
                src={Wireframe}
                alt=""
                className="h-52 w-48  lg:h-72 lg:w-72 2xl:h-80 2xl:w-80 border-2 border-black rounded-xl"
              />
              <div className="pt-1 lg:pt-6">
                <h2 className="font-bold text-sm  lg:text-xl 2xl:text-3xl text-gray-800">
                  Comprehensive data
                </h2>
                <p className="text-xs lg:text-sm xl:text-base">
                  Simple and intuitive design as easy as ABC
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:mx-2 lg:mx-0 2xl:mx-40 ">
          <div className="pb-10">
            <h2 className=" text-xl md:text-3xl pt-10 pb-4 md:pb-10 lg:py-10 text-gray-700 font-medium">
              Key features
            </h2>
            <ul className="flex gap-2 md:gap-4 text-gray-800 flex-col">
              <li className="text-sm md:text-lg xl:text-xl 2xl:text-2xl">
                <span className="font-bold ">Catalog Management: </span>
                Add,edit,and search books easily.
              </li>
              <li className="text-sm md:text-lg xl:text-xl 2xl:text-2xl">
                <span className="font-bold ">Circulation System: </span>
                Quick book issuing,returning,and renewal with barcode or RFID
                scanning.
              </li>
              <li className="text-sm md:text-lg xl:text-xl 2xl:text-2xl">
                <span className="font-bold ">Member Management: </span>
                Add and manage members with customizable borrowing limits.
              </li>
              <li className=" text-sm md:text-lg xl:text-xl 2xl:text-2xl">
                <span className="font-bold ">Web OPAC: </span>Publicity
                accessible catalog with book details and availability.
              </li>
              <li className=" text-sm md:text-lg xl:text-xl 2xl:text-2xl">
                <span className="font-bold ">Visitors log: </span>Log and
                monitor visitor activity.
              </li>
              <li className=" text-sm md:text-lg xl:text-xl 2xl:text-2xl">
                <span className="font-bold ">Reports and analytics: </span>
                Generate detailed reports for inventory,circulation,and visitor
                statistics.
              </li>
              <li className=" text-sm md:text-lg xl:text-xl 2xl:text-2xl">
                <span className="font-bold ">Automated Notification: </span>
                Overdue notification via WhatsApp
              </li>
              <li className=" text-sm md:text-lg xl:text-xl 2xl:text-2xl">
                <span className="font-bold">Flexible Setting: </span>
                Customize member categories,borrowing durations,and overdue
                fines.
              </li>
            </ul>
          </div>
          <div className="pb-10">
            <h2 className="text-lg md:text-3xl  py-4 lg:py-10 lg:text-gray-700 font-medium">
              Built for All Libraries
            </h2>
            <p className="text-sm md:text-lg 2xl:text-2xl text-/gray-800">
              Whether your're a school, college, university, or community
              library, BOOKSHELF is designed to meet your unique needs.
            </p>
          </div>
          <div className="lg:py-10">
            <h2 className="text-lg md:text-2xl xl:text-3xl pb-8 md:py-10 text-gray-700 font-medium">
              What Sets BOOKSHELF Apart?
            </h2>
            <div className="border-black border-2 w-full">
              <div className="font-bold grid grid-cols-3  ">
                <div className="col-span-1  py-6 border-r-2 border-b-2 border-black text-base text-sm flex items-center md:text-xl lg:text-2xl py-2 px-4 text-gray-700 ">
                  Features
                </div>
                <div className="col-span-1 py-6 border-r-2 border-b-2 border-black  text-sm flex items-center md:text-xl lg:text-2xl py-2 px-2 text-gray-700 ">
                  Other Softwares
                </div>
                <div className="col-span-1 py-6 border-b-2 border-black text-base text-sm flex items-center md:text-xl lg:text-2xl py-2  px-4 text-gray-700 ">
                  Bookshelf
                </div>
              </div>
              <div className="grid grid-cols-3 text-xs md:text-sm ">
                <div className="col-span-3 grid font-semibold grid-cols-3">
                  <div className="col-span-1 flex items-center px-4 py-4  border-r-2 border-black border-b-2 ">
                    Search
                  </div>
                  <div className="col-span-1 flex items-center px-4 py-4 border-r-2 border-black border-b-2">
                    Slow and error-prone
                  </div>
                  <div className="col-span-1 flex items-center px-4 py-4 border-b-2 border-black">
                    Fast and forgiving of typos
                  </div>
                </div>
                <div className="col-span-3 font-semibold grid grid-cols-3 ">
                  <div className="col-span-1 flex items-center px-4 py-4 border-b-2 border-black border-r-2">
                    User Interface
                  </div>
                  <div className="col-span-1 flex items-center px-4 py-4 border-b-2 border-r-2 border-black">
                    Complex and difficult to use
                  </div>
                  <div className="col-span-1 flex items-center px-4 py-4 border-b-2 border-black">
                    User friendly and comfortable to use
                  </div>
                </div>
                <div className="col-span-3 font-semibold grid grid-cols-3">
                  <div className="col-span-1 flex items-center px-4 py-4 border-r-2 border-b-2 border-black">
                    Accessibility
                  </div>
                  <div className=" col-span-1 flex items-center px-4 py-4  border-r-2 border-b-2 border-black">
                    Desktop only. Offline
                  </div>
                  <div className="col-span-1 flex items-center px-4 py-4 border-b-2 border-black">
                    Supports all devices i.e Mobile, Desktop, Tablet. Online
                  </div>
                </div>
                <div className="col-span-3 font-semibold grid grid-cols-3">
                  <div className="col-span-1 flex items-center px-2 md:px-4 py-4  border-r-2 border-b-2 border-black">
                    Customer Support
                  </div>
                  <div className="col-span-1 flex items-center px-4 py-4  border-r-2 border-b-2 border-black">
                    Delayed and inconvenient
                  </div>
                  <div className=" col-span-1 flex items-center px-4 py-4 border-b-2 border-black">
                    Local, fast and reliable
                  </div>
                </div>
                <div className="col-span-3 font-semibold grid grid-cols-3">
                  <div className="col-span-1 py-4 px-4  border-r-2 border-black">
                    Data migration
                  </div>
                  <div className="col-span-1 px-4 py-4 border-r-2 border-black">
                    Not supported
                  </div>
                  <div className="col-span-1 px-4 py-4 border-black">
                    Seamlessly migrate existing data
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="py-20">
            <div className="flex justify-center items-center">
              <Button className="bg-indigo-950 w-48 lg:w-80 border rounded-full py-8 text-base lg:text-3xl">
                Request Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
      <footer className="pt-10 md:pt-20 lg:pt-0 xl:pt-60">
        <div className="flex flex-col items-center justify-center  pb-10">
          <h2 className="text-3xl py-10 text-gray-800 font-semibold ">
            About us
          </h2>
          <div className="text-base md:text-xl md:font-semibold lg:text-2xl flex flex-col justify-center items-center lg:pt-16 xl:pt-24">
            <p className="lg:flex flex-col items-center hidden ">
              BOOKSHELF is developed by Arsi Consultancy, your trusted partner
              in cutting-edge
            </p>
            <div className="flex flex-col items-center lg:hidden">
              BOOKSHELF is developed by Arsi Consultancy,
              <p>your trusted partner in cutting-edge</p>
            </div>
            <p>software solutions.</p>
            <div className="flex flex-col items-center py-10">
              <p>T-14,Bungkawn Dam Veng,</p>
              <p>Aizawl,Mizoram.</p>
            </div>
            <p>Arsi Consultancy Ⓒ 2024. All Rights Reserved.</p>
          </div>
        </div>
        <div className="flex justify-center items-center pb-10 xl:pb-28">
          <img src={arsiLogo} alt="arsi" className="h-24 w-40" />
        </div>
      </footer>
    </div>
  );
};

export default Bookshelf;
