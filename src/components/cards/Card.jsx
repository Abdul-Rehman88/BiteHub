import { Button } from '../component_index'
import placeholder from '../../assets/images/img_placeholder.webp'

function Card({
  image,
  title,
  description,
  buttonText,
  price,
  onClick,

  //  dynamic styling props
  imgClass = "",
  titleClass = "",
  descriptionClass = "",
  buttonClass = "",
  containerClass = "",
  priceClass = "",
  
}) {
  return (
    <div className={`w-full h-[230px] md:h-[250px] lg:h-[350px] relative overflow-hidden group cursor-pointer rounded-md shadow-sm ${containerClass}`}>

      {/* image */}
      <img
        src={image || placeholder}
        alt={title || "image"}
        className={`w-full h-full object-cover group-hover:scale-[1.1] transition-all duration-700 ${imgClass}`}
        />

      {/* price tag */}
        <span className={`absolute top-3 right-3 z-30 bg-[#E09A05] text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md ${priceClass}`}>
          Rs. {price || '$0.00'}
        </span>

      {/* text */}
      <div className="absolute top-[50%] transform group-hover:translate-y-[-50%] transition-all duration-500 w-full h-full left-0 z-20 flex items-center justify-center flex-col p-5 md:p-10">
        
        {/* title */}
        <h3
          className={`text-[24px] md:text-[32px] lg:text-4xl font-bold text-(--heading-color) text-center capitalize ${titleClass}`}
        >
          {title || 'Card Title'}
        </h3>

        {/* description */}
        <p
          className={`text-center opacity-0 group-hover:opacity-100 transition-all duration-700 text-(--text-color) text-[16px] ${descriptionClass}`}
        >
          {description || 'lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
        </p>

        {/* button */}
        <Button
          className={`opacity-0 group-hover:opacity-100 px-3 py-2 mt-3 transition-all duration-1000 rounded-md text-[0.9rem] ${buttonClass}`}
          onClick={onClick}
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
