function About() {
  return (<section>
    <h1 data-testid='about-title' className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold 
    leading-none tracking-wide sm:text-6xl">
      We love {' '}
      <span className="bg-primary py-2 px-6 rounded-lg tracking-widest text-white">
        Film
      </span>
    </h1>
    <div data-testid='about-description'>
      <p className='mt-6 text-lg tracking-wide leading-8 max-w-2xl mx-auto'>
          Our mission is to make film photography fun and accessible to all.
      </p>
      <p className='mt-6 text-lg tracking-wide leading-8 max-w-2xl mx-auto'>
          Discover an extensive selection of film products and lab services to meet every need.
      </p>
    </div>
  </section>
  )
}
export default About;