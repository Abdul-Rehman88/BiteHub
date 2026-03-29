import { Button } from '../component_index'
import placeholder from '../../assets/images/img_placeholder.webp'

function Card({
  image,
  title,
  description,
  buttonText,
  price,
  onClick,
  onButtonClick,

  //  dynamic styling props
  imgClass = "",
  titleClass = "",
  descriptionClass = "",
  buttonClass = "",
  containerClass = "",
  priceClass = "",
  
}) {
  return (
    <div 
      className={`w-full h-[215px] md:h-60 lg:h-[290px] relative overflow-hidden group cursor-pointer rounded-md shadow-sm ${containerClass}`}
      onClick={onClick}
    >
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

      {/* text area*/}
      <div className="absolute bg-gray-900/20 backdrop-blur-xs lg:backdrop-blur-sm border border-white/10 shadow-lg top-[50%] md:top-[42%] lg:top-[75%] transform lg:group-hover:translate-y-[-25%] transition-all duration-500 w-full h-full left-0 z-20 flex flex-col px-2 py-2 md:py-2 lg:py-3 " >        
      
        {/* title */}
        <h3
          className={`text-[16.5px] md:text-[20px] lg:text-[24px] font-bold text-[#222222] text-center capitalize ${titleClass}`}
        >
          {title || 'Card Title'}
        </h3>

        {/* description */}
        <p
          className={`text-center lg:opacity-0 group-hover:opacity-100 transition-all duration-700 text-(--text-color) text-sm md:text-[15px] lg:text-[16px] line-clamp-1 md:line-clamp-2 h-6 md:h-[46px] lg:h-[30px] ${descriptionClass}`}
        >
          {description || 'lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
        </p>

        {/* button */}
        <Button
          className={`lg:opacity-0 group-hover:opacity-100 px-3 py-2 mt-0 lg:mt-3 transition-all duration-1000 rounded-md text-[0.9rem] w-full ${buttonClass}`}
          onClick={(e) => {
            e.stopPropagation(); //  prevents card click from firing
            onButtonClick?.();
          }}
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
