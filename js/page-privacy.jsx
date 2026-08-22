/* Privacy Policy — plain page, reuses the blog's reader typography (gtg-reader-*)
   so it matches the site's existing article styling with no new CSS needed. */
function PrivacyPage() {
  const [modal, setModal] = React.useState(false);
  const [contactOpen, setContactOpen] = React.useState(false);
  useReveal();

  return (
    <>
      <GlobalNav onStart={() => setModal(true)} onContact={() => setContactOpen(true)} />

      <section className="gtg-blog-intro">
        <div className="center-narrow reveal">
          <span className="gtg-eyebrow">Legal</span>
          <h1 className="gtg-blog-hero-title">Privacy Policy</h1>
        </div>
      </section>

      <div className="gtg-reader-body" style={{ maxWidth: 720, paddingTop: 0 }}>
        <p className="gtg-reader-p" style={{ marginTop: 0, fontSize: 14, color: 'var(--ink-muted-48)' }}>Last updated: August 22, 2026</p>

        <p className="gtg-reader-p" style={{ marginTop: 0 }}>
          GroundingtoGo (&ldquo;I&rdquo;, &ldquo;me&rdquo;) is the solo travel planning service run by Laura Litauszki at groundingtogo.com.
          This page explains what personal information this website collects when you use it, why, and who it passes through along the
          way. It covers the website itself &mdash; the quiz, the contact forms, and this domain generally. It doesn&rsquo;t cover anything
          that happens once we&rsquo;re already working together directly by email, call, or WhatsApp.
        </p>

        <h2 className="gtg-reader-h">The information I collect</h2>
        <p className="gtg-reader-p">Depending on how you use the site, that can include:</p>
        <ul className="gtg-reader-ul">
          <li><strong>Your quiz answers.</strong> The choices you make while taking the wellbeing quiz, so I can put together your personalised trip match.</li>
          <li><strong>Your email address</strong>, if you choose to enter it at the end of the quiz to receive your results. This step is optional &mdash; you can skip it and still see your results, in which case your quiz answers are kept without anything that identifies you.</li>
          <li><strong>Your name, email, and (optional) WhatsApp number and message</strong>, if you request a consultation from the quiz results page.</li>
          <li><strong>Your name, email, planned destination, travel dates, and message</strong>, if you get in touch through a contact form or the &ldquo;Get in touch&rdquo; pop-up.</li>
        </ul>
        <p className="gtg-reader-p">I don&rsquo;t collect payment details, government ID, or any sensitive personal information through this site.</p>

        <h2 className="gtg-reader-h">How I use it</h2>
        <p className="gtg-reader-p">I use what you share to:</p>
        <ul className="gtg-reader-ul">
          <li>Show you your personalised quiz results and, if you leave your email, send them to you.</li>
          <li>Reply to your message, consultation request, or enquiry.</li>
          <li>Plan and shape your trip, if we go on to work together.</li>
          <li>Understand, in a general sense, what people taking the quiz are looking for, so I can improve the trips and destinations I suggest.</li>
        </ul>
        <p className="gtg-reader-p">I don&rsquo;t sell your information, and I don&rsquo;t use it for advertising or share it with anyone for marketing purposes.</p>

        <h2 className="gtg-reader-h">Who it passes through</h2>
        <p className="gtg-reader-p">
          I&rsquo;m a one-person business, so I rely on a small number of outside services to run this site and get messages to me.
          They only see what a given form actually sends &mdash; nothing more &mdash; and each has its own privacy policy:
        </p>
        <ul className="gtg-reader-ul">
          <li><strong>Airtable</strong> stores quiz results and consultation requests, so I can look through them and follow up.</li>
          <li><strong>FormSubmit</strong> delivers contact form and enquiry submissions straight to my inbox at hello@groundingtogo.com.</li>
          <li><strong>GitHub Pages</strong> hosts this website. Like most web hosts, it may automatically log standard technical details of each visit (such as IP address and browser type) as part of running the server &mdash; I don&rsquo;t access this separately or use it myself.</li>
        </ul>

        <h2 className="gtg-reader-h">Cookies and local storage</h2>
        <p className="gtg-reader-p">
          This site doesn&rsquo;t use tracking or advertising cookies, and there&rsquo;s no analytics software watching how you browse it.
          It does use your browser&rsquo;s local storage &mdash; a small amount of data saved on your own device, not shared with me or
          anyone else &mdash; for two things: remembering the travel style you picked so it can pre-fill the contact form for you, and
          holding onto a form submission for a moment if it fails to send, so nothing you wrote gets lost. You can clear this at any
          time by clearing your browser&rsquo;s site data for groundingtogo.com.
        </p>

        <h2 className="gtg-reader-h">How long I keep it</h2>
        <p className="gtg-reader-p">
          I keep quiz results, consultation requests, and messages for as long as is useful for planning your trip and following up
          with you &mdash; and I delete or anonymise older records I no longer need. If you&rsquo;d like your information removed sooner,
          just ask (see &ldquo;Contact me&rdquo; below) and I&rsquo;ll take care of it.
        </p>

        <h2 className="gtg-reader-h">Your choices</h2>
        <p className="gtg-reader-p">You can, at any point:</p>
        <ul className="gtg-reader-ul">
          <li>Skip entering your email at the end of the quiz, and still see your results.</li>
          <li>Ask what information I hold about you, ask me to correct it, or ask me to delete it.</li>
          <li>Unsubscribe from any future email simply by replying and letting me know.</li>
        </ul>

        <h2 className="gtg-reader-h">Children&rsquo;s privacy</h2>
        <p className="gtg-reader-p">
          This site and the trips I plan are intended for adults. It isn&rsquo;t directed at children, and I don&rsquo;t knowingly collect
          information from anyone under 18.
        </p>

        <h2 className="gtg-reader-h">Changes to this policy</h2>
        <p className="gtg-reader-p">
          If I change how this site collects or uses information, I&rsquo;ll update this page and change the date at the top.
        </p>

        <h2 className="gtg-reader-h">Contact me</h2>
        <p className="gtg-reader-p">
          If you have any questions about this policy, or want to access, correct, or delete your information, email me at{' '}
          <a href="mailto:hello@groundingtogo.com">hello@groundingtogo.com</a>.
        </p>
      </div>

      <Footer onStart={() => setModal(true)} />
      <ResetModal open={modal} onClose={() => setModal(false)} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<PrivacyPage />);
