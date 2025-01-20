import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';


import hero1 from '../assets/hero1.webp';
import hero2 from '../assets/hero2.webp';
import hero3 from '../assets/hero3.webp';
import hero4 from '../assets/hero4.webp';
import hero5 from '../assets/hero5.webp';
import { CardContent } from './ui/card';

const carouselImages = [hero1, hero2, hero3, hero4, hero5];

function HeroCarousel() {
  return (
    <div className='hidden lg:block'>
      <Carousel>
        <CarouselContent>
          {carouselImages.map((image, index) => {
            return <CarouselItem key={index}>
              <CardContent className='p-2'>
                <img src={image} alt='hero' className='w-full h-[24rem] rounded-md object-cover' />
              </CardContent>
            </CarouselItem>
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
export default HeroCarousel