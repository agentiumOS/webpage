import heroImage from '@/assets/hero.png'

export default function HeroGraphic() {
  return (
    <div className="relative w-[80%] max-w-[1500px] rounded-none mx-auto -top-[180px]">
      <img src={heroImage} alt="Hero Image" className="w-full h-full object-cover" />
    </div>
  )
}