import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import HeroCarousel from './HeroCarousel';

function Hero() {
  return (
    <section  data-testid='IntroContent' className='grid grid-cols-1 lg:grid-cols-2 gap-24 items-centre'>
      <div>
        <h1 className='max-w-2xl font-bold text-4xl tracking-tight sm: text-6xl'>
          Bringing film emulsive love!
        </h1>
        <p className='mt-8 max-w-xl text-lg leading-8'>
          We’re passionate about supporting photographers - big and small - and know what it means to have a shop you can trust and rely on.
        </p>
        <Button asChild size='lg' className='mt-10'>
          <Link to='/products'>Our Products</Link>
        </Button>
      </div>
      <HeroCarousel/>
    </section>
  )
}
export default Hero