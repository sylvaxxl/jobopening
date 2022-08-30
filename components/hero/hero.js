import Left from "./left";
import Right from "./right";

const Hero = () => {
  return (
    <div className="bg-cover-pic h-[500px] bg-cover md:bg-center bg-right overflow-hidden flex justify-center">
      <div className="w-[1190px] flex px-2 text-white mt-3 justify-evenly">
        <div className="col-md-6 px-5 flex self-center z-30">
          <Left />
        </div>
        <div className="col-md-6 self-end hidden md:block">
          <Right />
        </div>
      </div>
    </div>
  );
};
export default Hero;
