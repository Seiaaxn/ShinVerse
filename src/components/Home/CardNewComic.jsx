import { useNavigate } from "react-router-dom";

export default function CardNewComic({ comics = [] }) {

  const navigate = useNavigate();

  return (

    <div className="grid grid-cols-2 gap-4 px-4">

      {comics.map((comic, index) => (

        <div
          key={index}
          onClick={() => navigate(`/detail/${comic.slug}`)}
          className="group bg-[#111] rounded-2xl overflow-hidden shadow-lg active:scale-[0.98] transition-all duration-200"
        >

          {/* COVER IMAGE FIX (ANTI BURAM & ANTI GEPENG) */}
          <div className="relative w-full overflow-hidden">

            {/* ASPECT RATIO PORTRAIT (3:2 / MANHWA STYLE) */}
            <div className="w-full pt-[150%]"></div>

            <img
              src={
                comic.image
                  ?.replace("w200", "w500") // auto ambil versi HD kalau ada
                  ?.replace("small", "large") || comic.image
              }
              alt={comic.title}
              loading="lazy"
              decoding="async"
              className="absolute top-0 left-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/600x900?text=Comic+Cover";
              }}
            />

            {/* BADGE UP */}
            <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] px-2 py-1 rounded-md font-bold">
              UP
            </span>

          </div>

          {/* CONTENT */}
          <div className="p-3">

            <h3 className="text-white text-sm font-semibold mb-3 line-clamp-2">
              {comic.title}
            </h3>

            <div className="space-y-2">

              <div className="flex justify-between bg-[#1c1c1c] px-3 py-2 rounded-xl">
                <span className="text-xs text-gray-200">
                  Chapter {comic.chapter}
                </span>

                <span className="text-xs text-gray-400">
                  {comic.time}
                </span>
              </div>

              {comic.prevChapter && (
                <div className="flex justify-between bg-[#1c1c1c] px-3 py-2 rounded-xl">
                  <span className="text-xs text-gray-200">
                    Chapter {comic.prevChapter}
                  </span>

                  <span className="text-xs text-gray-500">
                    7 hari
                  </span>
                </div>
              )}

            </div>

          </div>

        </div>

      ))}

    </div>

  );
          }
