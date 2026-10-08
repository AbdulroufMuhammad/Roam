import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
export const metadata: Metadata = {
  title: "A city. A feeling. A different way through.",
  description: "A ROAM field note about taking a slower route through the everyday.",
};
export default function JournalPage() {
  return (
    <main id="main" className="journal-route">
      <div className="section">
        <span className="eyebrow">FIELD NOTE 01 / THE CITY EDIT</span>
        <h1>
          A CITY. A FEELING.
          <br />A DIFFERENT WAY THROUGH.
        </h1>
        <p className="journal-deck">Leave a little room for the unexpected.</p>
      </div>
      <div className="journal-cover">
        <Image
          src="/assets/urban-v2.png"
          alt="Editorial concept: a rooftop perspective over Lagos"
          fill
          sizes="100vw"
          priority
        />
      </div>
      <article className="journal-article">
        <span className="eyebrow">STYLE / A SLOWER SUNDAY</span>
        <p>
          We’ve become very good at filling our days. Meetings, messages, errands, another thing to
          cross off. But there’s a particular kind of pleasure in leaving a few hours unclaimed.
        </p>
        <p>
          Put on something easy. Take the street you usually pass. Find a table in the shade. Let
          your coffee go cold because the conversation is good.
        </p>
        <h2>
          LESS ROUTINE.
          <br />
          MORE POSSIBILITY.
        </h2>
        <p>
          Your shoes should be the last thing on your mind. Your next destination doesn’t have to be
          on a map. Some days, the only plan worth keeping is to move at your own pace.
        </p>
        <p>
          The city is full of small invitations. An open door. A familiar voice. The long way home.
          You don’t need to accept all of them. Just one is enough to change the shape of the day.
        </p>
        <span className="small-note">
          Original editorial copy and AI-generated imagery for this design concept.
        </span>
        <Link className="button dark" href="/shop/">
          Find your everyday ↗
        </Link>
      </article>
    </main>
  );
}
