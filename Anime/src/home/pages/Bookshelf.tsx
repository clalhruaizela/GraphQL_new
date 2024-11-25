import lightVectors from "./bookshelf_Image/Light-Vectors.jpg";
import Wireframe from "./bookshelf_Image/Wireframe-grid.jpeg";
import downloadImg from "./bookshelf_Image/download.jpeg";
import Zusammenfassun from "./bookshelf_Image/Zusammenfassun.jpeg";
import arsiLogo from "./bookshelf_Image/arsi_logo.svg";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./importDependencies";
const Bookshelf = () => {
  return (
    <div className=" min-w-screen max-h-auto">
      <div className=" ">
        <div className="">
          <img
            src={lightVectors}
            alt=""
            className="w-full h-[700px] sm:h-[400px] lg:h-[850px]"
          />
        </div>
        <div className="absolute text-white top-14 left-10">
          <p className="font-bold text-4xl">Bookshelf</p>
          <p className="text-sm">Library management simplified</p>
        </div>
        {/* <div className="animate-bounce w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center mx-auto border">
          ▼
        </div> */}
      </div>
      <div className="mx-2 lg:mx-0">
        <div className="py-10 flex flex-col items-center  ">
          <h2 className="text-xl  font-bold  lg:text-5xl  py-10">
            Transforming Library Management
          </h2>
          <div className="grid grid-cols-6 lg:grid-cols-12 gap-2 lg:gap-8 pt-12 pb-24 border-b-2 border-gray-300 lg:border-black ">
            <div className=" col-span-3 lg:col-span-3 pb-10">
              {/* <div className="w-96"> */}
              <img
                src={downloadImg}
                alt="abc"
                className="h-52 w-48 lg:h-80 lg:w-80 border-black border-2 rounded-xl"
              />
              {/* </div> */}
              <div className=" pt-1 lg:pt-6">
                <h2 className="font-bold text-lg lg:text-3xl text-gray-800">
                  Easy to use
                </h2>
                <p className="text-sm lg:text-base">
                  Simple and intuitive design as easy as ABC
                </p>
              </div>
            </div>
            <div className="col-span-3 lg:col-span-3 ">
              <img
                src={Wireframe}
                alt=""
                className="h-52 w-48 lg:h-80 lg:w-80 border-2 border-black rounded-xl"
              />
              <div className="pt-1 lg:pt-6">
                <h2 className="font-bold text-lg text-gray-800 lg:text-3xl">
                  Anywhere access
                </h2>
                <p className="text-sm lg:text-base">
                  Simple and intuitive design as easy as ABC
                </p>
              </div>
            </div>
            <div className="col-span-3 lg:col-span-3 ">
              <img
                src={Zusammenfassun}
                alt=""
                className="h-52 w-48 lg:h-80 lg:w-80 border-2 border-black rounded-xl "
              />
              <div className="pt-1 lg:pt-6">
                <h2 className="font-bold text-lg lg:text-3xl text-gray-800">
                  RFID compatible
                </h2>
                <p className="text-sm lg:text-base">
                  Simple and intuitive design as easy as ABC
                </p>
              </div>
            </div>
            <div className="col-span-3 lg:col-span-3">
              <img
                src={Wireframe}
                alt=""
                className="h-52 w-48 lg:h-80 lg:w-80 border-2 border-black rounded-xl"
              />
              <div className="pt-1 lg:pt-6">
                <h2 className="font-bold text-lg lg:text-3xl text-gray-800">
                  Comprehensive data
                </h2>
                <p className="text-sm lg:text-base">
                  Simple and intuitive design as easy as ABC
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col  lg:mx-96 ">
          <div className="pb-10">
            <h2 className="text-3xl pb-10 lg:py-10 text-gray-700 font-medium">
              Key features
            </h2>
            <ul className="flex gap-4 text-gray-800 flex-col">
              <li className="text-lg lg:text-2xl">
                <span className="font-bold ">Catalog Management:</span>
                Add,edit,and search books easily.
              </li>
              <li className="text-lg lg:text-2xl">
                <span className="font-bold ">Circulation System: </span>
                Quick book issuing,returning,and renewal with barcode or RFID
                scanning.
              </li>
              <li className="text-lg lg:text-2xl">
                <span className="font-bold ">Member Management: </span>
                Add and manage members with customizable borrowing limits.
              </li>
              <li className="text-lg lg:text-2xl">
                <span className="font-bold ">Web OPAC: </span>Publicity
                accessible catalog with book details and availability.
              </li>
              <li className="text-lg lg:text-2xl">
                <span className="font-bold ">Visitors log: </span>Log and
                monitor visitor activity.
              </li>
              <li className="text-lg lg:text-2xl">
                <span className="font-bold ">Reports and analytics: </span>
                Generate detailed reports for inventory,circulation,and visitor
                statistics.
              </li>
              <li className="text-lg lg:text-2xl">
                <span className="font-bold ">Automated Notification: </span>
                Overdue notification via WhatsApp
              </li>
              <li className="text-lg lg:text-2xl">
                <span className="font-bold">Flexible Setting: </span>
                Customize member categories,borrowing durations,and overdue
                fines.
              </li>
            </ul>
          </div>
          <div className="pb-10">
            <h2 className="text-xl lg:text-3xl py-4 lg:py-10 lg:text-gray-700 font-medium">
              Built for All Libraries
            </h2>
            <p className="text-lg lg:text-2xl text-/gray-800">
              Whether your're a school, college, university, or community
              library, BOOKSHELF is designed to meet your unique needs.
            </p>
          </div>
          <div className="py-10">
            <h2 className=" text-xl lg:text-3xl py-10 text-gray-700 font-medium">
              What Sets BOOKSHELF Apart?
            </h2>
            <>
              <Table className="w-9/12 border-black border-2">
                <TableHeader className="border-black border-2">
                  <TableRow className="font-bold   ">
                    <TableHead className="text-base lg:text-2xl pt-2  lg:pl-4 text-black border-r-2 border-black">
                      Features
                    </TableHead>
                    <TableHead className="text-base lg:text-2xl pt-2  lg:pl-4 text-black border-r-2 border-black">
                      Other Softwares
                    </TableHead>
                    <TableHead className="text-base lg:text-2xl pt-2  lg:pl-4 text-black border-r-2 border-black">
                      Bookshelf
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="border-r-2 border-black border-2">
                      Search
                    </TableCell>
                    <TableCell className="border-r-2 border-black border-2">
                      Slow and error-prone
                    </TableCell>
                    <TableCell className="border-black border-2">
                      Fast and forgiving of typos
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="border-r-2 border-black border-2">
                      User Interface
                    </TableCell>
                    <TableCell className="border-r-2 border-black border-2">
                      Complex and difficult to use
                    </TableCell>
                    <TableCell className="border-black border-2">
                      User friendly and comfortable to use
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="border-r-2 border-black border-2">
                      Accessibility
                    </TableCell>
                    <TableCell className="border-r-2 border-black border-2">
                      Desktop only. Offline
                    </TableCell>
                    <TableCell className="border-black border-2">
                      Supports all devices i.e Mobile, Desktop, Tablet. Online
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="border-r-2 border-black border-2">
                      Customer Support
                    </TableCell>
                    <TableCell className="border-r-2 border-black border-2">
                      Delayed and inconvenient
                    </TableCell>
                    <TableCell className="border-black border-2">
                      Local, fast and reliable
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="border-r-2 border-black border-2">
                      Data migration
                    </TableCell>
                    <TableCell className="border-r-2 border-black border-2">
                      Not supported
                    </TableCell>
                    <TableCell className="border-black border-2">
                      Seamlessly migrate existing data
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </>
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
      <footer className="pt-10 lg:pt-60">
        <div className="flex flex-col items-center justify-center  pb-10">
          <h2 className="text-3xl py-10 text-gray-800 font-semibold ">
            About us
          </h2>
          <div className="text-base lg:text-2xl flex flex-col justify-center items-center lg:pt-24">
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
        <div className="flex justify-center items-center pb-28">
          <img src={arsiLogo} alt="arsi" className="h-24 w-40" />
        </div>
      </footer>
    </div>
  );
};

export default Bookshelf;
