import React from 'react'
import { Button } from '../component_index'
import placeholder from '../../assets/images/img_placeholder.webp'

function Card({
  image,
  title,
  description,
  buttonText,

  // ⭐ dynamic styling props
  imgClass = "",
  titleClass = "",
  descClass = "",
  buttonClass = "",
  containerClass = "",
}) {
  return (
    <div className={`w-full h-[230px] md:h-[250px] lg:h-[350px] relative overflow-hidden group cursor-pointer rounded-md shadow-sm ${containerClass}`}>

      {/* image */}
      <img
        src={image || placeholder}
        alt={title || "image"}
        className={
          imgClass ||
          "w-full h-full object-cover group-hover:scale-[1.1] transition-all duration-700"
        }
      />

      {/* text */}
      <div className="absolute top-[50%] transform group-hover:translate-y-[-50%] transition-all duration-500 w-full h-full left-0 z-20 flex items-center justify-center flex-col p-5 md:p-10">

        <h3
          className={`text-[24px] md:text-[32px] lg:text-4xl font-bold text-(--heading-color) text-center capitalize ${titleClass}`}
        >
          {title || 'Card Title'}
        </h3>

        <p
          className={`text-center opacity-0 group-hover:opacity-100 transition-all duration-700 text-(--text-color) text-[16px] ${descClass}`}
        >
          {description || 'lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
        </p>

        <Button
          className={`opacity-0 group-hover:opacity-100 px-3 py-2 mt-3 transition-all duration-1000 rounded-md text-[0.9rem] ${buttonClass}`}
        >
          {buttonText || 'Button'}
        </Button>
      </div>

      {/* bottom shadow */}
      <div className="w-full opacity-0 group-hover:opacity-100 transition-all duration-500 bg-linear-to-b from-[rgb(0,0,0,0.001)] to-[rgb(0,0,0,0.5)] h-full absolute bottom-0 left-0 right-0" />
    </div>
  )
}

export default Card
