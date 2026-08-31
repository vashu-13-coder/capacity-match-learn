import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TraineeShell } from "@/components/layout/TraineeShell";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Award, Download, ShieldCheck, Printer, ExternalLink, GraduationCap, CheckCircle2 } from "lucide-react";
import { certificatesList, currentTraineeProfile, organization } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/trainee/certificates")({
  head: () => ({
    meta: [
      { title: "Certificates Vault — CapacityConnect Trainee" },
      { name: "description", content: "View and download verified corporate course completion certificates." },
    ],
  }),
  component: CertificatesVault,
});

function CertificatesVault() {
  const [selectedCert, setSelectedCert] = useState<(typeof certificatesList)[0] | null>(null);

  function handlePrint() {
    window.print();
  }

  return (
    <TraineeShell
      title="Certificates Vault"
      description="View, verify, and download official PDF certificates issued upon passing operational assessments."
    >
      <div className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {certificatesList.map((cert) => (
            <Card key={cert.id} className="border-border hover:border-amber-500/40 transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3">
                <Badge className="bg-amber-500 text-slate-950 font-bold">
                  <ShieldCheck className="mr-1 size-3" /> VERIFIED
                </Badge>
              </div>

              <CardHeader className="pb-3">
                <div className="size-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 mb-2">
                  <Award className="size-6" />
                </div>
                <CardTitle className="text-lg">{cert.courseTitle}</CardTitle>
                <CardDescription className="text-xs">Issued to {cert.traineeName} on {cert.issuedAt}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-border pb-1">
                  <span className="text-muted-foreground">Certificate ID:</span>
                  <span className="font-mono font-semibold">{cert.certificateNo}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-1">
                  <span className="text-muted-foreground">Passing Score:</span>
                  <span className="font-bold text-emerald-600">{cert.scorePercent}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Verification Code:</span>
                  <span className="font-mono text-muted-foreground">{cert.verificationCode}</span>
                </div>
              </CardContent>

              <CardFooter className="flex gap-2 border-t border-border pt-4">
                <Button
                  onClick={() => setSelectedCert(cert)}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold"
                >
                  <ExternalLink className="mr-1.5 size-4" /> Preview PDF Certificate
                </Button>
                <Button
                  variant="outline"
                  onClick={() => toast.success(`Downloading PDF certificate ${cert.certificateNo}...`)}
                >
                  <Download className="size-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Certificate Modal Viewer */}
        <Dialog open={Boolean(selectedCert)} onOpenChange={() => setSelectedCert(null)}>
          {selectedCert && (
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Award className="size-5 text-amber-500" /> Official Certificate of Achievement
                </DialogTitle>
                <DialogDescription>
                  Verified credential issued by {organization.name}
                </DialogDescription>
              </DialogHeader>

              {/* Certificate PDF Visual Preview Canvas */}
              <div className="border-4 border-amber-600/40 rounded-xl p-8 bg-gradient-to-br from-amber-50/50 via-white to-amber-100/30 dark:from-slate-900 dark:via-slate-950 dark:to-amber-950/20 text-center space-y-4 my-2 shadow-inner">
                <div className="flex items-center justify-center gap-2 text-amber-600 font-bold uppercase tracking-widest text-xs">
                  <GraduationCap className="size-5" /> CapacityConnect Enterprise Learning
                </div>
                <h2 className="text-2xl font-serif font-extrabold text-foreground">Certificate of Competency</h2>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">This is proudly presented to</p>
                <h3 className="text-3xl font-bold text-amber-600 font-serif tracking-tight">{selectedCert.traineeName}</h3>
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  For successfully completing all requirements and passing the official assessment with a score of{" "}
                  <strong>{selectedCert.scorePercent}%</strong> in:
                </p>
                <h4 className="text-lg font-bold text-foreground underline decoration-amber-500/50 decoration-2">
                  {selectedCert.courseTitle}
                </h4>
                <div className="pt-6 flex items-center justify-between text-[11px] text-muted-foreground border-t border-amber-500/20 max-w-lg mx-auto">
                  <div>
                    <p className="font-semibold text-foreground">Date Issued</p>
                    <p>{selectedCert.issuedAt}</p>
                  </div>
                  <div className="size-12 rounded-full border border-amber-500/40 flex items-center justify-center text-amber-600 font-serif font-bold text-xs bg-amber-50 dark:bg-amber-950">
                    SEAL
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Certificate No.</p>
                    <p className="font-mono">{selectedCert.certificateNo}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={handlePrint}>
                  <Printer className="mr-1.5 size-4" /> Print
                </Button>
                <Button
                  onClick={() => toast.success(`PDF downloaded: ${selectedCert.certificateNo}.pdf`)}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold"
                >
                  <Download className="mr-1.5 size-4" /> Download Official PDF
                </Button>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </TraineeShell>
  );
}
