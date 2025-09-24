import React, { useEffect, useRef, useState } from "react";
import Layout from "@/layout/Layout";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const FREE_CALL_MS = 10 * 60 * 1000; // 10 minutes

export default function VideoCall() {
  const { advisorId } = useParams();
  const navigate = useNavigate();
  const { user, getFreeCallState, consumeFreeCall } = useAuth();
  const localRef = useRef<HTMLVideoElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [freeActive, setFreeActive] = useState(false);
  const [remainingFreeCalls, setRemainingFreeCalls] = useState<number | null>(null);

  useEffect(() => {
    const state = getFreeCallState();
    setRemainingFreeCalls(state?.remaining ?? null);
  }, [getFreeCallState]);

  useEffect(() => {
    let mounted = true;
    let autoEndTimer: number | undefined;
    let consumedThisSession = false;

    async function start() {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (!mounted) return;
        setStream(s);
        if (localRef.current) localRef.current.srcObject = s;

        // If user has free calls remaining, consume one and start timer
        const state = getFreeCallState();
        if (state && state.remaining > 0 && !consumedThisSession) {
          const after = consumeFreeCall();
          consumedThisSession = true;
          setRemainingFreeCalls(after?.remaining ?? 0);
          setFreeActive(true);
          autoEndTimer = window.setTimeout(() => {
            // end call after free limit
            s.getTracks().forEach((t) => t.stop());
            setError("Free call limit reached (10 minutes). Please upgrade to continue.");
            setFreeActive(false);
            // navigate back to advisor profile after short delay
            setTimeout(() => navigate(`/advisors/${advisorId}`), 2000);
          }, FREE_CALL_MS);
        }
      } catch (err: any) {
        setError(err?.message || "Unable to access camera/microphone");
      }
    }

    start();

    return () => {
      mounted = false;
      if (autoEndTimer) window.clearTimeout(autoEndTimer);
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [advisorId, consumeFreeCall, getFreeCallState, navigate]);

  useEffect(() => {
    if (!stream) return;
    stream.getAudioTracks().forEach((t) => (t.enabled = micOn));
    stream.getVideoTracks().forEach((t) => (t.enabled = camOn));
  }, [micOn, camOn, stream]);

  return (
    <Layout>
      <div className="container py-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Video Call</h1>
            <div className="flex gap-2">
              <Button asChild>
                <Link to={`/advisors/${advisorId}`}>Advisor Profile</Link>
              </Button>
              <Button variant="destructive" onClick={() => { if (stream) stream.getTracks().forEach(t=>t.stop()); navigate('/'); }}>
                End Call
              </Button>
            </div>
          </div>

          {user && freeActive && (
            <div className="mt-4 rounded-md bg-green-50 border p-3 text-sm text-green-800">
              Free call active — this session is free for up to 10 minutes. Remaining free calls: {remainingFreeCalls}
            </div>
          )}

          {error ? (
            <div className="mt-6 rounded-lg border p-4 text-red-600">{error}</div>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border p-4">
                <h3 className="font-semibold">Your Camera</h3>
                <video ref={localRef} autoPlay playsInline muted className="mt-3 w-full rounded-md bg-black" />
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-semibold">Advisor</h3>
                <div className="mt-3 w-full rounded-md bg-black text-center text-sm text-muted-foreground py-28">
                  <p>Live video from advisor would appear here in a real call.</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center gap-3">
            <Button onClick={() => setMicOn((s) => !s)}>{micOn ? "Mute" : "Unmute"}</Button>
            <Button onClick={() => setCamOn((s) => !s)}>{camOn ? "Stop Camera" : "Start Camera"}</Button>
            <Button variant="destructive" onClick={() => { if (stream) stream.getTracks().forEach(t=>t.stop()); navigate('/'); }}>
              Leave
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
