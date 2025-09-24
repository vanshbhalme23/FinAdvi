import { useEffect, useMemo, useState } from "react";
import Layout from "@/layout/Layout";
import { advisors, resources } from "@/data/mock";
import { AdvisorCard } from "@/components/advisors/AdvisorCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function Index() {
  const [query, setQuery] = useState("");
  const featured = useMemo(() => advisors.slice(0, 3), []);
  const { user, getFreeCallState } = useAuth();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (!user) {
      setShowWelcome(false);
      return;
    }
    const state = getFreeCallState();
    // If user is a client and has not used any free calls yet, show welcome
    if (user.role === "client" && state && state.calls.length === 0) {
      setShowWelcome(true);
    } else {
      setShowWelcome(false);
    }
  }, [user, getFreeCallState]);

  return (
    <Layout>
      <section className="bg-gradient-to-br from-background to-secondary/40">
        <div className="container py-20 grid gap-12 md:grid-cols-2 items-center">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight">FinAdvi — Expert financial advice you can trust</h1>
            {showWelcome && user && (
              <div className="mt-4 rounded-md bg-green-50 border p-3 text-green-800">
                Welcome, {user.name}! You have 2 free video calls (up to 10 minutes each). Enjoy your first sessions on us.
              </div>
            )}
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              Connect with certified financial advisors, book secure video consultations, and access trusted resources to meet your financial goals.
            </p>
            <div className="mt-6 flex gap-3">
              <Input placeholder="Search advisors by name, city, expertise..." value={query} onChange={(e) => setQuery(e.target.value)} />
              <Button asChild>
                <Link to={`/advisors?q=${encodeURIComponent(query)}`}>Search</Link>
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-lg border p-4">
                <h4 className="font-semibold">How it works</h4>
                <ol className="mt-3 list-decimal list-inside text-sm text-muted-foreground">
                  <li>Create a profile and tell us your goals</li>
                  <li>Find an advisor and book a session</li>
                  <li>Pay securely and meet via video chat</li>
                </ol>
              </div>
              <div className="rounded-lg border p-4">
                <h4 className="font-semibold">Trusted & Verified</h4>
                <p className="mt-2 text-sm text-muted-foreground">All advisors are verified by our team. Upload certifications and get approved to start consulting.</p>
                <div className="mt-3 flex gap-2">
                  <Badge variant="secondary">CFP</Badge>
                  <Badge variant="secondary">CA</Badge>
                  <Badge variant="secondary">CFA</Badge>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-xl bg-gradient-to-br from-primary to-accent p-8 text-primary-foreground">
              <h3 className="text-2xl font-bold">Book a session in 3 steps</h3>
              <ol className="mt-4 list-decimal list-inside">
                <li>Choose advisor</li>
                <li>Select date & time</li>
                <li>Pay & confirm</li>
              </ol>
              <div className="mt-6 grid gap-3">
                {featured.map((a) => (
                  <div key={a.id} className="rounded-md bg-primary/20 p-3 text-primary-foreground">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{a.name}</div>
                        <div className="text-sm">{a.expertise.join(", ")}</div>
                      </div>
                      <div className="text-sm">₹{a.sessionFee}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Button asChild>
                  <Link to="/advisors">Find advisor</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Featured Advisors</h2>
          <Link to="/advisors" className="text-sm text-primary underline">View all</Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {featured.map((a) => (
            <AdvisorCard key={a.id} advisor={a} />
          ))}
        </div>
      </section>

      <section className="bg-secondary/10 py-16">
        <div className="container">
          <h2 className="text-2xl font-bold">Financial Literacy Hub</h2>
          <p className="mt-2 text-muted-foreground">Articles, videos, and tools curated to help you make confident decisions.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {resources.slice(0, 3).map((r) => (
              <div key={r.id} className="rounded-lg border bg-card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{r.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{r.summary}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">{r.readMinutes ? `${r.readMinutes} min` : "FAQ"}</div>
                </div>
                <div className="mt-4">
                  <Button variant="ghost" asChild>
                    <Link to="/resources">Read</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <span>
        <div>
          <span>
            <section data-source-pos="50:6-70:16" data-source-name="section" className="py-16 bg-gray-100 px-6"><h2 data-source-pos="51:8-51:78" data-source-name="h2" className="text-3xl font-bold text-center mb-12">How It Works</h2><div data-source-pos="52:8-69:14" data-source-name="div" className="max-w-4xl mx-auto space-y-6"><div data-source-pos="53:10-56:16" data-source-name="div" className="flex items-start gap-4"><span data-source-pos="54:12-54:74" data-source-name="span" className="text-indigo-600 font-bold text-2xl">1.</span><p data-source-pos="55:12-55:89" data-source-name="p">Salary credited into app wallet → AI divides into funds automatically.</p></div><div data-source-pos="57:10-60:16" data-source-name="div" className="flex items-start gap-4"><span data-source-pos="58:12-58:74" data-source-name="span" className="text-indigo-600 font-bold text-2xl">2.</span><p data-source-pos="59:12-59:97" data-source-name="p">Extra income goes to savings account (earning interest) or can be moved to FD.</p></div><div data-source-pos="61:10-64:16" data-source-name="div" className="flex items-start gap-4"><span data-source-pos="62:12-62:74" data-source-name="span" className="text-indigo-600 font-bold text-2xl">3.</span><p data-source-pos="63:12-63:87" data-source-name="p">Make payments via NFC, UPI, QR code, or cards directly from the app.</p></div><div data-source-pos="65:10-68:16" data-source-name="div" className="flex items-start gap-4"><span data-source-pos="66:12-66:74" data-source-name="span" className="text-indigo-600 font-bold text-2xl">4.</span><p data-source-pos="67:12-67:83" data-source-name="p">App tracks all expenses and generates monthly financial reports.</p></div></div></section>
          </span>
<span>
        <section data-source-pos="20:6-31:16" data-source-name="section" className="py-16 px-6 bg-gray-100"><h2 data-source-pos="21:8-21:79" data-source-name="h2" class="text-3xl font-bold text-center mb-12">Watch &amp; Learn</h2><div data-source-pos="22:8-30:14" data-source-name="div" class="max-w-4xl mx-auto text-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-play w-16 h-16 mx-auto text-indigo-600 mb-4" aria-hidden="true" data-source-pos="23:10-23:75" data-source-name="PlayCircle"><path d="M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z"></path><circle cx="12" cy="12" r="10"></circle></svg><p data-source-pos="24:10-24:141" data-source-name="p" class="mb-6">Understand the app through demo videos available in multiple languages (English, Hindi, Marathi, and more).</p><div data-source-pos="25:10-29:16" data-source-name="div" class="flex justify-center gap-4"><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2" data-source-pos="26:12-26:36" data-source-name="Button">English</button><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2" data-source-pos="27:12-27:34" data-source-name="Button">हिंदी</button><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2" data-source-pos="28:12-28:34" data-source-name="Button">More
        </button></div></div></section>
      </span>
          <section data-source-pos="20:6-55:16" data-source-name="section" class="py-16 px-6 max-w-6xl mx-auto"><h2 data-source-pos="21:8-21:78" data-source-name="h2" class="text-3xl font-bold text-center mb-12">Key Features</h2><div data-source-pos="22:8-54:14" data-source-name="div" class="grid md:grid-cols-3 gap-8"><div class="rounded-lg border bg-card text-card-foreground shadow-lg" data-source-pos="23:10-29:17" data-source-name="Card"><div class="p-6 text-center" data-source-pos="24:12-28:26" data-source-name="CardContent"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell-ring w-12 h-12 mx-auto mb-4 text-indigo-600" aria-hidden="true" data-source-pos="25:14-25:77" data-source-name="BellRing"><path d="M10.268 21a2 2 0 0 0 3.464 0"></path><path d="M22 8c0-2.3-.8-4.3-2-6"></path><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path><path d="M4 2C2.8 3.7 2 5.7 2 8"></path></svg><h3 data-source-pos="26:14-26:77" data-source-name="h3" class="text-xl font-semibold mb-2">AI Voice Alerts</h3><p data-source-pos="27:14-27:125" data-source-name="p">Automatic voice alerts for transactions, market updates, and busy-mode silent + vibration notifications.</p></div></div><div class="rounded-lg border bg-card text-card-foreground shadow-lg" data-source-pos="31:10-37:17" data-source-name="Card"><div class="p-6 text-center" data-source-pos="32:12-36:26" data-source-name="CardContent"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-languages w-12 h-12 mx-auto mb-4 text-indigo-600" aria-hidden="true" data-source-pos="33:14-33:78" data-source-name="Languages"><path d="m5 8 6 6"></path><path d="m4 14 6-6 2-3"></path><path d="M2 5h12"></path><path d="M7 2h1"></path><path d="m22 22-5-10-5 10"></path><path d="M14 18h6"></path></svg><h3 data-source-pos="34:14-34:84" data-source-name="h3" class="text-xl font-semibold mb-2">Multi-Language Support</h3><p data-source-pos="35:14-35:91" data-source-name="p">Accessible in all major languages with secure encrypted communication.</p></div></div><div class="rounded-lg border bg-card text-card-foreground shadow-lg" data-source-pos="39:10-45:17" data-source-name="Card"><div class="p-6 text-center" data-source-pos="40:12-44:26" data-source-name="CardContent"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-video w-12 h-12 mx-auto mb-4 text-indigo-600" aria-hidden="true" data-source-pos="41:14-41:74" data-source-name="Video"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path><rect x="2" y="6" width="14" height="12" rx="2"></rect></svg><h3 data-source-pos="42:14-42:81" data-source-name="h3" class="text-xl font-semibold mb-2">Offline Suggestions</h3><p data-source-pos="43:14-43:109" data-source-name="p">Suggests ebooks and videos if client/advisor is offline, keeping you productive anytime.</p></div></div><div class="rounded-lg border bg-card text-card-foreground shadow-lg" data-source-pos="47:10-53:17" data-source-name="Card"><div class="p-6 text-center" data-source-pos="48:12-52:26" data-source-name="CardContent"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-brain w-12 h-12 mx-auto mb-4 text-indigo-600" aria-hidden="true" data-source-pos="49:14-49:74" data-source-name="Brain"><path d="M12 18V5"></path><path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4"></path><path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5"></path><path d="M17.997 5.125a4 4 0 0 1 2.526 5.77"></path><path d="M18 18a4 4 0 0 0 2-7.464"></path><path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517"></path><path d="M6 18a4 4 0 0 1-2-7.464"></path><path d="M6.003 5.125a4 4 0 0 0-2.526 5.77"></path></svg><h3 data-source-pos="50:14-50:82" data-source-name="h3" class="text-xl font-semibold mb-2">AI Financial Advisor</h3><p data-source-pos="51:14-51:87" data-source-name="p">Data-driven insights and advice without requiring a human advisor.</p></div></div></div></section>
        </div>
      </span>
      <span>
        <section data-source-pos="58:6-83:16" data-source-name="section" class="py-16 bg-gray-100 px-6"><h2 data-source-pos="59:8-59:78" data-source-name="h2" class="text-3xl font-bold text-center mb-12">Gamification</h2><div data-source-pos="60:8-82:14" data-source-name="div" class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"><div class="rounded-lg border bg-card text-card-foreground shadow-md" data-source-pos="61:10-67:17" data-source-name="Card"><div class="p-6 text-center" data-source-pos="62:12-66:26" data-source-name="CardContent"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-12 h-12 mx-auto mb-4 text-indigo-600" aria-hidden="true" data-source-pos="63:14-63:73" data-source-name="Star"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg><h3 data-source-pos="64:14-64:75" data-source-name="h3" class="text-xl font-semibold mb-2">Finance Score</h3><p data-source-pos="65:14-65:82" data-source-name="p">Track habits and goals with a dynamic personal finance score.</p></div></div><div class="rounded-lg border bg-card text-card-foreground shadow-md" data-source-pos="68:10-74:17" data-source-name="Card"><div class="p-6 text-center" data-source-pos="69:12-73:26" data-source-name="CardContent"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-award w-12 h-12 mx-auto mb-4 text-indigo-600" aria-hidden="true" data-source-pos="70:14-70:74" data-source-name="Award"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path><circle cx="12" cy="8" r="6"></circle></svg><h3 data-source-pos="71:14-71:78" data-source-name="h3" class="text-xl font-semibold mb-2">Badges &amp; Rewards</h3><p data-source-pos="72:14-72:78" data-source-name="p">Unlock milestones like "First SIP" and "Zero Debt Badge".</p></div></div><div class="rounded-lg border bg-card text-card-foreground shadow-md" data-source-pos="75:10-81:17" data-source-name="Card"><div class="p-6 text-center" data-source-pos="76:12-80:26" data-source-name="CardContent"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trophy w-12 h-12 mx-auto mb-4 text-indigo-600" aria-hidden="true" data-source-pos="77:14-77:75" data-source-name="Trophy"><path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"></path><path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"></path><path d="M18 9h1.5a1 1 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"></path><path d="M6 9H4.5a1 1 0 0 1 0-5H6"></path></svg><h3 data-source-pos="78:14-78:74" data-source-name="h3" class="text-xl font-semibold mb-2">Leaderboards</h3><p data-source-pos="79:14-79:84" data-source-name="p">Compete and collaborate with trusted advisors through rankings.</p></div></div></div>
        </section>
      </span>
      <span>
        <section data-source-pos="86:6-111:16" data-source-name="section" class="py-16 px-6 max-w-6xl mx-auto"><h2 data-source-pos="87:8-87:80" data-source-name="h2" class="text-3xl font-bold text-center mb-12">Smart Payments</h2><div data-source-pos="88:8-110:14" data-source-name="div" class="grid md:grid-cols-3 gap-8"><div class="rounded-lg border bg-card text-card-foreground shadow-md" data-source-pos="89:10-95:17" data-source-name="Card"><div class="p-6 text-center" data-source-pos="90:12-94:26" data-source-name="CardContent"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wallet w-12 h-12 mx-auto mb-4 text-indigo-600" aria-hidden="true" data-source-pos="91:14-91:75" data-source-name="Wallet"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path></svg><h3 data-source-pos="92:14-92:84" data-source-name="h3" class="text-xl font-semibold mb-2">Pay-Per-Minute Billing</h3><p data-source-pos="93:14-93:93" data-source-name="p">Only pay for the time you use – fair, transparent, and flexible billing.</p></div></div><div class="rounded-lg border bg-card text-card-foreground shadow-md" data-source-pos="96:10-102:17" data-source-name="Card"><div class="p-6 text-center" data-source-pos="97:12-101:26" data-source-name="CardContent"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield w-12 h-12 mx-auto mb-4 text-indigo-600" aria-hidden="true" data-source-pos="98:14-98:75" data-source-name="Shield"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg><h3 data-source-pos="99:14-99:75" data-source-name="h3" class="text-xl font-semibold mb-2">Escrow System</h3><p data-source-pos="100:14-100:91" data-source-name="p">Payments are securely held and released only after service completion.</p></div></div><div class="rounded-lg border bg-card text-card-foreground shadow-md" data-source-pos="103:10-109:17" data-source-name="Card"><div class="p-6 text-center" data-source-pos="104:12-108:26" data-source-name="CardContent"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-qr-code w-12 h-12 mx-auto mb-4 text-indigo-600" aria-hidden="true" data-source-pos="105:14-105:75" data-source-name="QrCode"><rect width="5" height="5" x="3" y="3" rx="1"></rect><rect width="5" height="5" x="16" y="3" rx="1"></rect><rect width="5" height="5" x="3" y="16" rx="1"></rect><path d="M21 16h-3a2 2 0 0 0-2 2v3"></path><path d="M21 21v.01"></path><path d="M12 7v3a2 2 0 0 1-2 2H7"></path><path d="M3 12h.01"></path><path d="M12 3h.01"></path><path d="M12 16v.01"></path><path d="M16 12h1"></path><path d="M21 12v.01"></path><path d="M12 21v-1"></path></svg><h3 data-source-pos="106:14-106:77" data-source-name="h3" class="text-xl font-semibold mb-2">Crypto Payments</h3><p data-source-pos="107:14-107:93" data-source-name="p">Optional demo mode with crypto payments – loved by hackathon innovators.</p></div></div></div></section>
      </span>
<span>
  <section data-source-pos="114:6-160:16" data-source-name="section" class="py-16 bg-gray-50 px-6"><h2 data-source-pos="115:8-115:84" data-source-name="h2" class="text-3xl font-bold text-center mb-12">Innovative Add-ons</h2><div data-source-pos="116:8-159:14" data-source-name="div" class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"><div class="rounded-lg border bg-card text-card-foreground shadow-md" data-source-pos="117:10-123:17" data-source-name="Card"><div class="p-6 text-center" data-source-pos="118:12-122:26" data-source-name="CardContent"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-smile w-12 h-12 mx-auto mb-4 text-indigo-600" aria-hidden="true" data-source-pos="119:14-119:74" data-source-name="Smile"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" x2="9.01" y1="9" y2="9"></line><line x1="15" x2="15.01" y1="9" y2="9"></line></svg><h3 data-source-pos="120:14-120:80" data-source-name="h3" class="text-xl font-semibold mb-2">Mood-Based Advisor</h3><p data-source-pos="121:14-121:93" data-source-name="p">AI detects stress or mood and adjusts financial suggestions accordingly.</p></div></div><div class="rounded-lg border bg-card text-card-foreground shadow-md" data-source-pos="124:10-130:17" data-source-name="Card"><div class="p-6 text-center" data-source-pos="125:12-129:26" data-source-name="CardContent"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap w-12 h-12 mx-auto mb-4 text-indigo-600" aria-hidden="true" data-source-pos="126:14-126:72" data-source-name="Zap"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg><h3 data-source-pos="127:14-127:79" data-source-name="h3" class="text-xl font-semibold mb-2">Smart Goal Nudges</h3><p data-source-pos="128:14-128:83" data-source-name="p">Micro nudges to achieve savings and investment targets faster.</p></div></div><div class="rounded-lg border bg-card text-card-foreground shadow-md" data-source-pos="131:10-137:17" data-source-name="Card"><div class="p-6 text-center" data-source-pos="132:12-136:26" data-source-name="CardContent"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users w-12 h-12 mx-auto mb-4 text-indigo-600" aria-hidden="true" data-source-pos="133:14-133:74" data-source-name="Users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle></svg><h3 data-source-pos="134:14-134:82" data-source-name="h3" class="text-xl font-semibold mb-2">Community Challenges</h3><p data-source-pos="135:14-135:79" data-source-name="p">Join 30-day savings or investment challenges with friends.</p></div></div><div class="rounded-lg border bg-card text-card-foreground shadow-md" data-source-pos="138:10-144:17" data-source-name="Card"><div class="p-6 text-center" data-source-pos="139:12-143:26" data-source-name="CardContent"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-alert w-12 h-12 mx-auto mb-4 text-indigo-600" aria-hidden="true" data-source-pos="140:14-140:82" data-source-name="AlertTriangle"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg><h3 data-source-pos="141:14-141:76" data-source-name="h3" class="text-xl font-semibold mb-2">Emergency Mode</h3><p data-source-pos="142:14-142:87" data-source-name="p">AI suggests instant credit line or fund withdrawals during crisis.</p></div></div><div class="rounded-lg border bg-card text-card-foreground shadow-md" data-source-pos="145:10-151:17" data-source-name="Card"><div class="p-6 text-center" data-source-pos="146:12-150:26" data-source-name="CardContent"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mic w-12 h-12 mx-auto mb-4 text-indigo-600" aria-hidden="true" data-source-pos="147:14-147:72" data-source-name="Mic"><path d="M12 19v3"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><rect x="9" y="2" width="6" height="13" rx="3"></rect></svg><h3 data-source-pos="148:14-148:78" data-source-name="h3" class="text-xl font-semibold mb-2">Voice-to-Payment</h3><p data-source-pos="149:14-149:76" data-source-name="p">Send money instantly with simple voice commands via AI.</p></div></div><div class="rounded-lg border bg-card text-card-foreground shadow-md" data-source-pos="152:10-158:17" data-source-name="Card"><div class="p-6 text-center" data-source-pos="153:12-157:26" data-source-name="CardContent"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-leaf w-12 h-12 mx-auto mb-4 text-indigo-600" aria-hidden="true" data-source-pos="154:14-154:73" data-source-name="Leaf"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg><h3 data-source-pos="155:14-155:86" data-source-name="h3" class="text-xl font-semibold mb-2">Carbon Footprint Tracker</h3><p data-source-pos="156:14-156:98" data-source-name="p">Track environmental impact of your spending habits for eco-conscious finance.</p></div></div></div></section>
</span>
      <section className="container py-16">

        <div className="grid gap-6 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-2xl font-bold">For Advisors</h2>
            <p className="mt-2 text-muted-foreground">Join FinAdvi to grow your practice, manage bookings, and get paid securely.</p>
            <div className="mt-4 flex gap-2">
              <Button asChild>
                <Link to="/for-advisors">Become an Advisor</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/advisor">Advisor Login</Link>
              </Button>
            </div>
          </div>

          <div>
            <div className="rounded-lg border p-6">
              <h4 className="font-semibold">Dashboard preview</h4>
              <p className="mt-2 text-sm text-muted-foreground">Manage appointments, chat with clients, and upload documents.</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="rounded-md bg-muted p-3 text-sm">Bookings</div>
                <div className="rounded-md bg-muted p-3 text-sm">Documents</div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
}
