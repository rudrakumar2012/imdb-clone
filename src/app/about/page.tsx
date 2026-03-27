import React from "react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-20">
        
        {/* Manifesto Section */}
        <section className="flex flex-col gap-8">
          <span className="text-[#F5C518] text-xs font-black uppercase tracking-[0.3em]">The Manifesto</span>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-[0.9]">
            Quality is a <br /> <span className="italic text-neutral-500 underline decoration-[#F5C518]/30 underline-offset-8">Moral Imperative.</span>
          </h1>
          <div className="flex flex-col gap-6 text-neutral-400 text-lg md:text-xl font-medium leading-relaxed">
            <p>
              CineSage was born from a frustration with the "endless scroll." In an era where algorithms prioritize engagement time over emotional depth, we chose to move in the opposite direction.
            </p>
            <p>
              We believe that a private screening should be a sanctuary—a place where the noise of the world is replaced by the singular vision of a master storyteller. Our mission is to restore the dignity of discovery.
            </p>
          </div>
        </section>

        <div className="h-px w-full bg-white/5" />

        {/* Protocols Section */}
        <section id="protocols" className="flex flex-col gap-8">
          <span className="text-[#F5C518] text-xs font-black uppercase tracking-[0.3em]">Security Protocols</span>
          <h2 className="text-3xl font-bold text-white tracking-tight">Your data is yours.</h2>
          <div className="flex flex-col gap-6 text-neutral-500 text-base md:text-lg font-medium leading-relaxed">
            <p>
              We don't sell your curiosity. CineSage uses isolated session tokens to store your watchlist locally. We do not track you across the web, and we do not build "marketing profiles." Your taste in cinema is a private conversation between you and the screen.
            </p>
          </div>
        </section>

        <div className="h-px w-full bg-white/5" />

        {/* FAQ Section */}
        <section id="inquiries" className="flex flex-col gap-12">
          <span className="text-[#F5C518] text-xs font-black uppercase tracking-[0.3em]">Direct Inquiries</span>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col gap-3">
              <h3 className="text-white font-bold text-lg">Where is the data from?</h3>
              <p className="text-neutral-500 text-sm">Our library is powered by the TMDB community, filtered through the CineSage editorial lens for quality and relevance.</p>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-white font-bold text-lg">Is CineSage free?</h3>
              <p className="text-neutral-500 text-sm">The platform is open to all who seek quality. We are an independent curiosity sustained by the passion for film.</p>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-white font-bold text-lg">Can I request a curation?</h3>
              <p className="text-neutral-500 text-sm">Our editorial team always listens. Reach out via our direct channel for thematic suggestions.</p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
