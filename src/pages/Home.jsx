import React from 'react'
import Hero from '../components/UI/Hero'
import About from '../components/UI/About'
import SkillsGraph from '../components/UI/SkillsGraph'
import Services from '../components/UI/Services'
import TechMarquee from '../components/UI/TechMarquee'
import FloatingShapes from '../components/UI/FloatingShapes'
import Footer from '../components/UI/Footer'

const Home = () => {
    return (
        <div style={{ paddingBottom: '0', position: 'relative' }}>
            <FloatingShapes />
            <Hero />
            <TechMarquee />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                <About />
                <Services />
                <SkillsGraph />
            </div>
            <Footer />
        </div>
    )
}

export default Home
