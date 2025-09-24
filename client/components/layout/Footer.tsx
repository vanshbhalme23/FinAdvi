import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container py-10 grid gap-8 md:grid-cols-5">
        <div>
          <div className="flex items-center gap-2 font-extrabold text-xl text-white">
            <span className="inline-flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">₹</span>
            FinAdvi
          </div>
          <p className="mt-3 text-sm text-gray-300 max-w-xs">
            Connecting clients with certified financial advisors for secure, smart money decisions.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-white">Platform</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-300">
            <li><Link to="/advisors" className="hover:text-white">Find Advisors</Link></li>
            <li><Link to="/resources" className="hover:text-white">Resources</Link></li>
            <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white">For Advisors</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-300">
            <li><Link to="/for-advisors" className="hover:text-white">Join as Advisor</Link></li>
            <li><Link to="/advisor" className="hover:text-white">Advisor Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white">Project Developer</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-300">
            <li>Frontend/UI: <span className="text-white">Daminee & Shraddha</span></li>
            <li>Back-end Development: <span className="text-white">Vansh</span></li>
            <li>Database Management: <span className="text-white">Parathmesh</span></li>
            <li>API Developmer : <span className="text-white">Sanket</span></li>
            <li>Security Testing: <span className="text-white">Tejas</span></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white">Legal</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-350">
            <li><Link to="/terms" className="hover:text-white">Terms</Link></li>
            <li><Link to="/privacy" className="hover:text-white">Privacy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="container py-4">
          <div className="text-center text-sm text-gray-300">Team Name: SSPACE Developer</div>
          <div className="text-center text-sm text-gray-300">Designed by: Vansh Bhalme</div>
        </div>
        <div className="container flex items-center justify-between py-6 text-sm text-gray-300">
          <p>© {new Date().getFullYear()} FinAdvi. All rights reserved.</p>
          <p>SSPACE Internal Hackthon 2025</p>
          <p><div data-source-pos="138:8-141:14" data-source-name="div" class="flex justify-center gap-4"><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2" data-source-pos="139:10-139:56" data-source-name="Button">App Store</button><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2" data-source-pos="140:10-140:58" data-source-name="Button">Google Play</button></div></p>
          <div className="flex items-center gap-4">
            <Link to="/security" className="hover:text-white">Security</Link>
            <span className="mx-2 text-xs text-gray-300">|</span>
            <Link to="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
