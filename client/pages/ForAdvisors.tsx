import React from "react";
import Layout from "@/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function ForAdvisors() {
  return (
    <Layout>
      <div className="container py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold">Join FinAdvi as an Advisor</h1>
          <p className="mt-4 text-muted-foreground">
            Create a profile, manage bookings, and grow your practice with our secure platform. Get verified and start accepting clients.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Button asChild>
              <Link to="/auth">Create Profile</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/advisor">Advisor Login</Link>
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg border p-6">
              <h4 className="font-semibold">Verified Profiles</h4>
              <p className="mt-2 text-sm text-muted-foreground">Upload certifications and get verified to build trust with clients.</p>
            </div>
            <div className="rounded-lg border p-6">
              <h4 className="font-semibold">Booking Management</h4>
              <p className="mt-2 text-sm text-muted-foreground">Sync your calendar, manage appointments, and accept payments.</p>
            </div>
            <div className="rounded-lg border p-6">
              <h4 className="font-semibold">Secure Payments</h4>
              <p className="mt-2 text-sm text-muted-foreground">Receive payments securely via integrated payment providers.</p>
            </div>
          </div>
        </div>
      </div>
      <div><section data-source-pos="98:6-123:16" data-source-name="section" class="py-16 px-6 bg-gray-100"><h2 data-source-pos="99:8-99:89" data-source-name="h2" class="text-3xl font-bold text-center mb-12">User Reviews &amp; Feedback</h2><div data-source-pos="100:8-122:14" data-source-name="div" class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"><div class="rounded-lg border bg-card text-card-foreground shadow-md" data-source-pos="101:10-107:17" data-source-name="Card"><div class="p-6 text-center" data-source-pos="102:12-106:26" data-source-name="CardContent"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square w-10 h-10 mx-auto mb-4 text-indigo-600" aria-hidden="true" data-source-pos="103:14-103:82" data-source-name="MessageSquare"><path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"></path></svg><p data-source-pos="104:14-104:89" data-source-name="p">“This app changed the way I manage my salary. Super easy and smart!”</p><h4 data-source-pos="105:14-105:61" data-source-name="h4" class="mt-4 font-semibold">- Rahul</h4></div></div><div class="rounded-lg border bg-card text-card-foreground shadow-md" data-source-pos="108:10-114:17" data-source-name="Card"><div class="p-6 text-center" data-source-pos="109:12-113:26" data-source-name="CardContent"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square w-10 h-10 mx-auto mb-4 text-indigo-600" aria-hidden="true" data-source-pos="110:14-110:82" data-source-name="MessageSquare"><path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"></path></svg><p data-source-pos="111:14-111:92" data-source-name="p">“NFC payments and savings insights are very helpful. Highly recommend.”</p><h4 data-source-pos="112:14-112:61" data-source-name="h4" class="mt-4 font-semibold">- Riya</h4></div></div><div class="rounded-lg border bg-card text-card-foreground shadow-md" data-source-pos="115:10-121:17" data-source-name="Card"><div class="p-6 text-center" data-source-pos="116:12-120:26" data-source-name="CardContent"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square w-10 h-10 mx-auto mb-4 text-indigo-600" aria-hidden="true" data-source-pos="117:14-117:82" data-source-name="MessageSquare"><path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"></path></svg><p data-source-pos="118:14-118:81" data-source-name="p">“Simple to use, and I saved more on taxes with their guide.”</p><h4 data-source-pos="119:14-119:60" data-source-name="h4" class="mt-4 font-semibold">- Aman</h4></div></div></div></section></div>
    </Layout>
  );
}
