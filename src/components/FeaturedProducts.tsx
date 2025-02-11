import {SectionTitle, ProductsGrid} from "."

function FeaturedProducts() {
  return (
    <section data-testid='FeaturedProducts' className='pt-24'>
      <SectionTitle text='featured products'/>
      <ProductsGrid />
    </section>
  )
}
export default FeaturedProducts