import Image from "next/image";

const CustomerOverview = () => {
  const svgClass = "w-6 h-6 mr-6";
  const header2 = "text-2xl font-semibold pb-3";
  const ballonClass = "px-3 py-2 rounded-3xl border-[1px] border-gray-400";
  const dividerLine = "w-full h-px bg-slate-200 flex self-center my-5";
  return (
    <div className="flex flex-col rounded-xl bg-slate-50">
      <div className="bg-[#0F74BB] text-slate-50 rounded-t-xl flex flex-col md:flex-row md:space-x-10 px-6 py-4 w-full">
        <div className="flex justify-center">
          <Image
            className="rounded-full"
            src="/images/avatar2.jpg"
            height={100}
            width={100}
            alt="Passport"
          />
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold">John Harrison</h1>
          <p>Graphic Designer & Web Developer</p>
        </div>
      </div>
      <div className="lg:flex lg:space-x-20 px-4 py-4">
        <div className="lg:w-3/5">
          <h2 className={header2}>About Me</h2>
          <p>
            Hello! I’m John Harrison. I am passionate about UI/UX design and Web
            Design. I am a skilled Front-end Developer and master of Graphic
            Design tools such as Photoshop and Sketch.
          </p>
        </div>
        <div className="flex flex-col space-y-3 mt-4">
          <p className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={svgClass}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
              />
            </svg>
            18th Feb 1990
          </p>
          <p className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={svgClass}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            john@gmail.com
          </p>
          <p className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={svgClass}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
            08030000000
          </p>
          <p className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={svgClass}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            3 adusi drive, okota, Lagos
          </p>
        </div>
      </div>
      <div className={dividerLine}></div>
      <div className="px-4 mt-2">
        <h2 className={header2}>Professional Skills</h2>
        <div className="flex gap-3 flex-wrap">
          <p className={ballonClass}> HTML</p>
          <p className={ballonClass}> CSS</p>
          <p className={ballonClass}> JavaScript</p>
          <p className={ballonClass}> Photoshop</p>
          <p className={ballonClass}> Figma</p>
          <p className={ballonClass}> Sketch</p>
        </div>
      </div>
      <div className={dividerLine}></div>
      <div className="px-4">
        <h2 className={header2}>Work Experience</h2>
        <div className="px-2">
          <ol className="border-l-2 border-[#0F74BB]">
            <li>
              <div className="md:flex flex-start">
                <div className="bg-[#0F74BB] w-7 h-7 flex items-center justify-center rounded-full -ml-4 p-2">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    dataprefix="fas"
                    className="text-white w-4 h-4"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="currentColor"
                      d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-64zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"
                    ></path>
                  </svg>
                </div>
                <div className="block p-6 rounded-lg shadow-sm bg-white max-w-4xl ml-6 mb-10">
                  <div className="flex justify-between mb-4">
                    <div>
                      <p className="font-semibold text-[#0F74BB] text-xl">
                        Frontend Developer
                      </p>
                      <p className="font-semibold text-sm text-gray-400">
                        at Creative Agency
                      </p>
                    </div>
                    <p className="font-medium text-sm">May, 2015 - Present</p>
                  </div>
                  <p className="text-gray-700 mb-6">
                    Leverage agile frameworks to provide a robust synopsis for
                    high level overviews. Iterative approaches to corporate
                    strategy foster collaborative thinking to further the
                    overall value proposition.
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="md:flex flex-start">
                <div className="bg-[#0F74BB] w-7 h-7 flex items-center justify-center rounded-full -ml-4 p-2">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    dataprefix="fas"
                    className="text-white w-4 h-4"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="currentColor"
                      d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-64zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"
                    ></path>
                  </svg>
                </div>
                <div className="block p-6 rounded-lg shadow-sm bg-white max-w-4xl ml-6 mb-10">
                  <div className="flex justify-between mb-4">
                    <div>
                      <p className="font-semibold text-[#0F74BB] text-xl">
                        Graphic Designer
                      </p>
                      <p className="font-semibold text-sm text-gray-400">
                        at Design Studio
                      </p>
                    </div>
                    <p className="font-medium text-sm">
                      June, 2013 - May, 2015
                    </p>
                  </div>
                  <p className="text-gray-700 mb-6">
                    Override the digital divide with additional clickthroughs
                    from DevOps. Nanotechnology immersion along the information
                    highway will close the loop on focusing solely on the bottom
                    line.
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="md:flex flex-start">
                <div className="bg-[#0F74BB] w-7 h-7 flex items-center justify-center rounded-full -ml-4 p-2">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    dataprefix="fas"
                    className="text-white w-4 h-4"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="currentColor"
                      d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-64zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"
                    ></path>
                  </svg>
                </div>
                <div className="block p-6 rounded-lg shadow-sm bg-white max-w-4xl ml-6 mb-10">
                  <div className="flex justify-between mb-4">
                    <div>
                      <p className="font-semibold text-[#0F74BB] text-xl">
                        Junior Web Developer
                      </p>
                      <p className="font-semibold text-sm text-gray-400">
                        at Indie Studio
                      </p>
                    </div>
                    <p className="font-medium text-sm">Jan, 2011 - May, 2013</p>
                  </div>
                  <p className="text-gray-700 mb-6">
                    User generated content in real-time will have multiple
                    touchpoints for offshoring. Organically grow the holistic
                    world view of disruptive innovation via workplace diversity
                    and empowerment.
                  </p>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </div>
      <div className={dividerLine}></div>
      {/* Education */}
      <div className="px-4">
        <h2 className={header2}>Education</h2>
        <div className="px-2">
          <ol className="border-l-2 border-[#0F74BB]">
            <li>
              <div className="md:flex flex-start">
                <div className="bg-[#0F74BB] w-7 h-7 flex items-center justify-center rounded-full -ml-4 p-2">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    dataprefix="fas"
                    className="text-white w-4 h-4"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="currentColor"
                      d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-64zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"
                    ></path>
                  </svg>
                </div>
                <div className="block p-6 rounded-lg shadow-sm bg-white max-w-4xl ml-6 mb-10">
                  <div className="flex justify-between mb-4">
                    <div>
                      <p className="font-semibold text-[#0F74BB] text-xl">
                        Masters in Information Technology
                      </p>
                      <p className="font-semibold text-sm text-gray-400">
                        from International University
                      </p>
                    </div>
                    <p className="font-medium text-sm">2011 - 2013</p>
                  </div>
                  <p className="text-gray-700 mb-6">
                    Leverage agile frameworks to provide a robust synopsis for
                    high level overviews. Iterative approaches to corporate
                    strategy foster collaborative thinking to further the
                    overall value proposition.
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="md:flex flex-start">
                <div className="bg-[#0F74BB] w-7 h-7 flex items-center justify-center rounded-full -ml-4 p-2">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    dataprefix="fas"
                    className="text-white w-4 h-4"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="currentColor"
                      d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-64zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"
                    ></path>
                  </svg>
                </div>
                <div className="block p-6 rounded-lg shadow-sm bg-white max-w-4xl ml-6 mb-10">
                  <div className="flex justify-between mb-4">
                    <div>
                      <p className="font-semibold text-[#0F74BB] text-xl">
                      Bachelor of Computer Science
                      </p>
                      <p className="font-semibold text-sm text-gray-400">
                      from Regional College
                      </p>
                    </div>
                    <p className="font-medium text-sm">
                    2007 - 2011
                    </p>
                  </div>
                  <p className="text-gray-700 mb-6">
                    Override the digital divide with additional clickthroughs
                    from DevOps. Nanotechnology immersion along the information
                    highway will close the loop on focusing solely on the bottom
                    line.
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="md:flex flex-start">
                <div className="bg-[#0F74BB] w-7 h-7 flex items-center justify-center rounded-full -ml-4 p-2">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    dataprefix="fas"
                    className="text-white w-4 h-4"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="currentColor"
                      d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-64zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"
                    ></path>
                  </svg>
                </div>
                <div className="block p-6 rounded-lg shadow-sm bg-white max-w-4xl ml-6 mb-10">
                  <div className="flex justify-between mb-4">
                    <div>
                      <p className="font-semibold text-[#0F74BB] text-xl">
                      Science and Mathematics
                      </p>
                      <p className="font-semibold text-sm text-gray-400">
                      from Mt. High Scool
                      </p>
                    </div>
                    <p className="font-medium text-sm">1995 - 2007</p>
                  </div>
                  <p className="text-gray-700 mb-6">
                    User generated content in real-time will have multiple
                    touchpoints for offshoring. Organically grow the holistic
                    world view of disruptive innovation via workplace diversity
                    and empowerment.
                  </p>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};
export default CustomerOverview;
