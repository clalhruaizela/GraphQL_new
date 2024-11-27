import lightVectors from "./bookshelf_Image/Light-Vectors.jpg";
import Wireframe from "./bookshelf_Image/Wireframe-grid.jpeg";
import downloadImg from "./bookshelf_Image/download.jpeg";
import Zusammenfassun from "./bookshelf_Image/Zusammenfassun.jpeg";
import arsiLogo from "./bookshelf_Image/arsi_logo.svg";
import { Button } from "./importDependencies";
import FeatureGrid from "./bookshelf_component/FeatureGrid";
import { GrLocationPin } from "react-icons/gr";

const features = [
  {
    imageSrc: downloadImg,
    altText: "Download",
    title: "Easy to use",
    description: "Simple and intuitive design as easy as ABC",
  },
  {
    imageSrc: Wireframe,
    altText: "Wireframe",
    title: "Anywhere access",
    description: "Fully online system accessible from anywhere.",
  },
  {
    imageSrc: Zusammenfassun,
    altText: "Zusammenfassun",
    title: "RFID compatible",
    description: "Built with RFID-enabled operations in mind.",
  },
  {
    imageSrc: Wireframe,
    altText: "Wireframe",
    title: "Comprehensive data",
    description: "Everything you need at the right place.",
  },
];
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
      </div>
      <div className="mx-4 sm:mx-10  2xl:mx-0">
        <div className="lg:py-10 flex flex-col items-center  ">
          <h2 className="text-xl  font-base pt-4 md:text-3xl lg:text-4xl 2xl:text-5xl  xl:py-10">
            Transforming Library Management
          </h2>
          <div className="2xl:mx-40 ">
            <FeatureGrid features={features} />
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
                Add, edit, and search books easily.
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
                Generate detailed reports for inventory, circulation, and
                visitor statistics.
              </li>
              <li className=" text-sm md:text-lg xl:text-xl 2xl:text-2xl">
                <span className="font-bold ">Automated Notification: </span>
                Overdue notification via WhatsApp
              </li>
              <li className=" text-sm md:text-lg xl:text-xl 2xl:text-2xl">
                <span className="font-bold">Flexible Setting: </span>
                Customize member categories, borrowing durations, and overdue
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
            <table className="border-black border-2 w-full">
              <thead>
                <tr className="font-bold grid grid-cols-3 text-center ">
                  <th className="col-span-1  border-r-2 border-b-2 border-black text-base  flex items-center md:text-xl lg:text-2xl py-2 px-2 md:px-4 text-gray-700 ">
                    Features
                  </th>
                  <th className="col-span-1  border-r-2 border-b-2 border-black  text-base flex items-center md:text-xl lg:text-2xl py-2 px-2 md:px-4 text-gray-700 ">
                    Other Softwares
                  </th>
                  <th className="col-span-1  border-b-2 border-black text-base  flex items-center md:text-xl lg:text-2xl py-2 px-2 md:px-4 text-gray-700 ">
                    Bookshelf
                  </th>
                </tr>
              </thead>
              <tbody className="grid grid-cols-3 text-xs md:text-sm  ">
                <tr className="col-span-3 grid font-semibold grid-cols-3">
                  <td className="col-span-1 flex px-2 pt-1 pb-3 md:px-4 md:py-4  border-r-2 border-black border-b-2 ">
                    Search
                  </td>
                  <td className="col-span-1 flex  px-2 pt-1 pb-3 md:px-4 md:py-4 border-r-2 border-black border-b-2">
                    Slow and error-prone
                  </td>
                  <td className="col-span-1 flex  px-2 pt-1 pb-3 md:px-4 md:py-4 border-b-2 border-black">
                    Fast and forgiving of typos
                  </td>
                </tr>
                <tr className="col-span-3 font-semibold grid grid-cols-3 ">
                  <td className="col-span-1 flex px-2 pt-1 pb-3 md:px-4 md:py-4 border-b-2 border-black border-r-2">
                    User Interface
                  </td>
                  <td className="col-span-1 flex px-2 pt-1 pb-3 md:px-4 md:py-4 border-b-2 border-r-2 border-black">
                    Complex and difficult to use
                  </td>
                  <td className="col-span-1 flex px-2 pt-1 pb-3 md:px-4 md:py-4 border-b-2 border-black">
                    User friendly and comfortable to use
                  </td>
                </tr>
                <tr className="col-span-3 font-semibold grid grid-cols-3">
                  <td className="col-span-1 flex px-2 pt-1 pb-3 md:px-4 md:py-4 border-r-2 border-b-2 border-black">
                    Accessibility
                  </td>
                  <td className=" col-span-1 flex px-2 pt-1 pb-3 md:px-4 md:py-4 border-r-2 border-b-2 border-black">
                    Desktop only. Offline
                  </td>
                  <td className="col-span-1 flex px-2 pt-1 pb-3 md:px-4 md:py-4 border-b-2 border-black">
                    Supports all devices i.e Mobile, Desktop, Tablet. Online
                  </td>
                </tr>
                <tr className="col-span-3 font-semibold grid grid-cols-3">
                  <td className="col-span-1 flex px-2 pt-1 pb-3 md:px-4 md:py-4 border-r-2 border-b-2 border-black">
                    Customer Support
                  </td>
                  <td className="col-span-1 flex px-2 pt-1 pb-3 md:px-4 md:py-4 border-r-2 border-b-2 border-black">
                    Delayed and inconvenient
                  </td>
                  <td className=" col-span-1 flex px-2 pt-1 pb-3 md:px-4 md:py-4 border-b-2 border-black">
                    Local, fast and reliable
                  </td>
                </tr>
                <tr className="col-span-3 font-semibold grid grid-cols-3">
                  <td className="col-span-1 px-2 pt-1 pb-3 md:px-4 md:py-4 border-r-2 border-black">
                    Data migration
                  </td>
                  <td className="col-span-1 px-2 pt-1 pb-3 md:px-4 md:py-4 border-r-2 border-black">
                    Not supported
                  </td>
                  <td className="col-span-1 px-2 pt-1 pb-3 md:px-4 md:py-4 border-black">
                    Seamlessly migrate existing data
                  </td>
                </tr>
              </tbody>
            </table>
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
      <footer className="pt-10 md:pt-20 lg:pt-0 xl:pt-64">
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
              <p className="flex">
                <span className="pt-1">
                  <GrLocationPin />{" "}
                </span>
                T-14,Bungkawn Dam Veng,
              </p>
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
