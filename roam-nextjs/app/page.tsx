import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HomeCollection } from "@/components/storefront/collection";
import { QuickLook } from "@/components/storefront/quick-look";
export default function Home() {
  return (
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <Image
          className="hero-image"
          src="/assets/urban-v2.png"
          alt="Campaign concept: two people in off-white sneakers on a sunlit Lagos rooftop"
          fill
          sizes="100vw"
          priority
        />
        <div className="hero-shade" />
        <div className="hero-top">
          <span>
            <i /> A NEW PERSPECTIVE ON EVERYDAY
          </span>
          <span>06°27′ N / 03°23′ E</span>
        </div>
        <div className="hero-copy">
          <span className="eyebrow light-text">THE CITY EDIT / LAGOS, NIGERIA</span>
          <h1 id="hero-title">
            MOVE YOUR
            <br />
            OWN WAY<span className="lime">.</span>
          </h1>
          <p>
            For the streets you know.
            <br />
            And the places you haven’t found yet.
          </p>
          <Link className="button lime-button" href="/shop/">
            Discover the collection <ArrowUpRight size={20} />
          </Link>
        </div>
        <QuickLook productId="sneaker" className="hero-hotspot" label="Discover the Everyday Low">
          <span className="hotspot-ring">+</span>
          <span className="hotspot-label">
            THE EVERYDAY LOW <small>Meet your next go-to ↗</small>
          </span>
        </QuickLook>
        <div className="hero-bottom">
          <span>01 — THE CITY IS YOURS</span>
          <a href="#collection">
            SCROLL TO EXPLORE <span>↓</span>
          </a>
          <span>ROAM STUDIES / 2026</span>
        </div>
      </section>
      <div className="brand-line">
        <span>NOT JUST A PAIR.</span>
        <b>✳</b>
        <span>A POINT OF VIEW.</span>
        <b>✳</b>
        <span>GO YOUR OWN WAY.</span>
        <b>✳</b>
        <span>ROAM FREELY.</span>
      </div>
      <HomeCollection />
      <section className="city-edit" id="city-edit" aria-labelledby="edit-title">
        <div className="edit-photo">
          <Image
            src="/assets/campaign.png"
            alt="Editorial concept: relaxed tailoring and white sneakers in a sunlit courtyard"
            fill
            sizes="(max-width:720px) 100vw, 50vw"
          />
          <span className="photo-index">
            ROAM FIELD STUDIES
            <br />
            VOL. 02 / OFF THE CLOCK
          </span>
          <QuickLook productId="sneaker" className="photo-shop">
            <span>+</span>Shop the look ↗
          </QuickLook>
        </div>
        <div className="edit-copy">
          <span className="eyebrow">THE CITY EDIT / NO. 02</span>
          <h2 id="edit-title">
            OFF DUTY.
            <br />
            ON POINT.
          </h2>
          <p>
            No dress code. No set destination.
            <br />
            Just a good pair and a day that’s yours.
          </p>
          <Link className="button dark" href="/shop/">
            Find your everyday <ArrowUpRight />
          </Link>
          <div className="edit-feature">
            <Image
              src="/assets/loafer.png"
              alt="Espresso suede loafer concept"
              width={104}
              height={104}
            />
            <div>
              <span>THE OTHER SIDE OF EVERYDAY</span>
              <h3>The Sunday Loafer</h3>
              <Link className="text-link" href="/product/sunday-loafer/">
                A closer look ↗
              </Link>
            </div>
          </div>
          <div className="edit-foot">
            <span>LESS NOISE. MORE YOU.</span>
            <span>↗</span>
          </div>
        </div>
      </section>
      <section className="section style-section" aria-labelledby="style-title">
        <div className="section-top compact">
          <div>
            <span className="eyebrow">02 / FIND YOUR FOOTING</span>
            <h2 id="style-title">
              DIFFERENT DAYS.
              <br />
              DIFFERENT DIRECTIONS.
            </h2>
          </div>
          <p>Pick a mood. Make it yours.</p>
        </div>
        <div className="style-grid">
          {[
            ["Sneakers", "runner-v2.png", "01 / KEEP MOVING"],
            ["Loafers", "loafer.png", "02 / TAKE IT EASY"],
            ["Sandals", "sandal-v2.png", "03 / LIGHTEN UP"],
          ].map(([name, image, caption]) => (
            <Link key={name} href={`/shop/?category=${name}`} className="style-card">
              <Image
                src={`/assets/${image}`}
                alt={`${name} concept`}
                fill
                sizes="(max-width:720px) 90vw, 31vw"
              />
              <span className="style-card-top">{caption}</span>
              <span className="style-card-bottom">
                <strong>{name.toUpperCase()}</strong>
                <b>↗</b>
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="materials">
        <div className="materials-copy">
          <span className="eyebrow">THE SMALL THINGS / A TEXTURE STUDY</span>
          <h2>
            LOOK CLOSER.
            <br />
            <span>FEEL MORE.</span>
          </h2>
          <p>
            A soft grain. A considered line. A colour that goes with almost anything. The details
            don’t need to shout to make an impression.
          </p>
          <Link className="text-link" href="/product/sunday-loafer/">
            Explore the texture study <ArrowUpRight />
          </Link>
          <span className="material-index">STUDY 001 — ESPRESSO / SUEDE</span>
        </div>
        <div className="material-image">
          <Image
            src="/assets/loafer.png"
            alt="Close view of textured espresso suede on the loafer concept"
            fill
            sizes="(max-width:720px) 100vw, 50vw"
          />
          <span>01</span>
        </div>
      </section>
      <section className="section journal" id="journal" aria-labelledby="journal-title">
        <div className="section-top compact">
          <div>
            <span className="eyebrow">03 / THE ROAM JOURNAL</span>
            <h2 id="journal-title">OUTSIDE THE ROUTINE.</h2>
          </div>
          <Link href="/journal/" className="text-link">
            Read the field notes <ArrowUpRight />
          </Link>
        </div>
        <div className="journal-grid">
          <Link className="journal-feature" href="/journal/">
            <Image
              src="/assets/urban-v2.png"
              alt="Rooftop editorial concept overlooking a city"
              fill
              sizes="(max-width:720px) 90vw, 55vw"
            />
            <span className="journal-caption">
              <small>FIELD NOTE 01 / 3 MIN READ</small>
              <strong>
                A city. A feeling.
                <br />A different way through.
              </strong>
              <span>Read the story ↗</span>
            </span>
          </Link>
          <div className="journal-side">
            <span className="eyebrow">A NOTE FROM ROAM</span>
            <h3>
              Life isn’t a<br />
              straight line<span>↗</span>
            </h3>
            <p>
              Take the turn. Make the stop. Stay a little longer. The best part of the day rarely
              comes with directions.
            </p>
            <Link className="text-link" href="/journal/">
              A little room for the unexpected <ArrowUpRight />
            </Link>
            <div className="journal-stamp">
              <span>R</span>
              <small>
                EVERY DAY.
                <br />A NEW DIRECTION.
              </small>
            </div>
          </div>
        </div>
      </section>
      <section className="final-banner">
        <span className="eyebrow">GOOD SHOES. GREAT POSSIBILITIES.</span>
        <h2>
          WHERE TO
          <br />
          NEXT<span>?</span>
        </h2>
        <Link className="button dark" href="/shop/">
          Find your next pair <ArrowUpRight />
        </Link>
        <div className="banner-orbit" aria-hidden="true">
          ↗
        </div>
      </section>
    </main>
  );
}
