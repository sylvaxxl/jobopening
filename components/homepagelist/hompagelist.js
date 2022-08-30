import Joblist from "./joblist";

const Homepagelist = (datas) => {
  return (
    <div className="bg-gray-100 pb-5">
      <h1 className="text-3xl text-center font-semibold py-5">
        Discover jobs for you
      </h1>
      <Joblist {...datas} />
    </div>
  );
};
export default Homepagelist;
