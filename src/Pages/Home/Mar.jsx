import Marquee from "react-fast-marquee";


const Mar = () => {
    return (
     
    <div>
      <div className="shadow-2xl p-20">
      <div className="ml-96 mb-10 shadow-red-700 w-2/5 justify-center items-center">
      <img src="https://i.ibb.co.com/Xf5DpSGd/Our.png" alt="" />
    </div>
        <div>
            <Marquee>
 <div>
    <img className="mr-24 rounded-3xl" src="https://i.ibb.co/85mZKxC/c1.png" alt="" />
   
 </div>
 <div>
    <img className="mr-24 rounded-s-3xl" src="https://i.ibb.co/gj4fSJz/c2.png" alt="" />
   
 </div>
 <div>
    <img className="mr-24 rounded-3xl" src="https://i.ibb.co/wLM1vQ8/c3.png" alt="" />
   
 </div>
 <div>
    <img className="mr-24 rounded-full"  src="https://i.ibb.co/bbn50DD/c4.png" alt="" />
    
 </div>

</Marquee>
        </div>
      </div>
    </div>

    

      
    );
};

export default Mar;