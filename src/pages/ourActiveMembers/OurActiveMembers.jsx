import { useState } from "react";

const members = [
  { name: "Dan Cortese", img: "https://i.pravatar.cc/300?img=1", groups: 8 },
  { name: "Anna", img: "https://i.pravatar.cc/300?img=2", groups: 5 },
  { name: "Mike", img: "https://i.pravatar.cc/300?img=3", groups: 3 },
  { name: "Sara", img: "https://i.pravatar.cc/300?img=4", groups: 6 },
  { name: "Chris", img: "https://i.pravatar.cc/300?img=5", groups: 2 },
  { name: "Emily", img: "https://i.pravatar.cc/300?img=6", groups: 4 },
  { name: "David", img: "https://i.pravatar.cc/300?img=7", groups: 7 },
];

const OurActiveMembers = () => {
  const [active, setActive] = useState(members[0]);

  return (
    <section className="py-20 lg:py-28 text-center bg-[#715A5A] px-6">

      {/* TITLE */}
      <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 text-[#5fa8cc]">
        Our Active Members
      </h2>

      <p className="text-[#d4d2d2] max-w-xl mx-auto mb-12 lg:mb-16">
        Meet the most active people in our community who engage, share
        knowledge and build connections.
      </p>

      {/* MEMBERS AREA */}
      <div className="relative flex justify-center items-center
      h-[320px] md:h-[420px] lg:h-[500px]">

        {/* CENTER MEMBER */}
        <div className="relative w-36 h-36 md:w-44 md:h-44 lg:w-72 lg:h-72
        rounded-full overflow-hidden shadow-2xl z-10">
          <img src={active.img} className="w-full h-full object-cover" />

          <div className="absolute inset-0 bg-blue-600/70 flex flex-col items-center justify-center text-white">
            <h3 className="text-sm md:text-lg lg:text-xl font-semibold">
              {active.name}
            </h3>
            <p className="text-xs md:text-sm mt-1">
              {active.groups} - Groups
            </p>
          </div>
        </div>

        {/* LEFT TOP */}
        <img
          src={members[1].img}
          onClick={() => setActive(members[1])}
          className="absolute left-[20%] top-[5%]
          w-16 h-16 md:w-24 md:h-24 lg:w-56 lg:h-56
          rounded-full object-cover cursor-pointer hover:scale-110 transition"
        />

        {/* LEFT MIDDLE */}
        <img
          src={members[2].img}
          onClick={() => setActive(members[2])}
          className="absolute left-[10%] top-[45%]
          w-16 h-16 md:w-24 md:h-24 lg:w-48 lg:h-48
          rounded-full object-cover cursor-pointer hover:scale-110 transition"
        />

        {/* LEFT BOTTOM */}
        <img
          src={members[3].img}
          onClick={() => setActive(members[3])}
          className="absolute left-[25%] bottom-[0%]
          w-16 h-16 md:w-24 md:h-24 lg:w-48 lg:h-48
          rounded-full object-cover cursor-pointer hover:scale-110 transition"
        />

        {/* RIGHT TOP */}
        <img
          src={members[4].img}
          onClick={() => setActive(members[4])}
          className="absolute right-[25%] top-[10%]
          w-16 h-16 md:w-24 md:h-24 lg:w-48 lg:h-48
          rounded-full object-cover cursor-pointer hover:scale-110 transition"
        />

        {/* RIGHT MIDDLE */}
        <img
          src={members[5].img}
          onClick={() => setActive(members[5])}
          className="absolute right-[10%] top-[45%]
          w-16 h-16 md:w-24 md:h-24 lg:w-48 lg:h-48
          rounded-full object-cover cursor-pointer hover:scale-110 transition"
        />

        {/* RIGHT BOTTOM */}
        <img
          src={members[6].img}
          onClick={() => setActive(members[6])}
          className="absolute right-[25%] bottom-[0%]
          w-16 h-16 md:w-24 md:h-24 lg:w-56 lg:h-56
          rounded-full object-cover cursor-pointer hover:scale-110 transition"
        />

      </div>


      {/* BUTTON */}
      <div className="mt-14 lg:mt-20">
        <button className="bg-[#3281a8] text-white px-8 py-3 rounded-full hover:bg-[#0e4865] transition">
          Discover All Members
        </button>
      </div>

    </section>
  );
};

export default OurActiveMembers;