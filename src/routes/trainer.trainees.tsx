import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TrainerShell } from "@/components/layout/TrainerShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Users, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { traineePerformanceList } from "@/lib/mock-data";

export const Route = createFileRoute("/trainer/trainees")({
  head: () => ({
    meta: [
      { title: "Trainee Performance Monitor — CapacityConnect Trainer" },
      { name: "description", content: "Track trainee assessment scores, completion percentages, and compliance status." },
    ],
  }),
  component: TraineePerformanceMonitor,
});

function TraineePerformanceMonitor() {
  const [search, setSearch] = useState("");

  const filteredList = traineePerformanceList.filter(
    (t) =>
      t.traineeName.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase()) ||
      t.courseTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <TrainerShell
      title="Trainee Participation & Performance Monitor"
      description="Real-time oversight of trainee progress, exam scores, and course completion rates across assigned tracks."
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
            <Input
              placeholder="Search by trainee name, email, or course..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Users className="size-4 text-sky-600" />
            <span>Showing {filteredList.length} Trainees</span>
          </div>
        </div>

        <Card className="border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-accent/40">
                <TableHead>Trainee Name</TableHead>
                <TableHead>Assigned Course</TableHead>
                <TableHead>Completion Progress</TableHead>
                <TableHead>Assessment Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Activity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredList.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-semibold">
                    <div>
                      <p className="text-sm font-semibold">{item.traineeName}</p>
                      <p className="text-xs text-muted-foreground font-mono">{item.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs">{item.courseTitle}</TableCell>
                  <TableCell className="w-48">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span>{item.progressPercent}%</span>
                      </div>
                      <Progress value={item.progressPercent} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell className="font-bold text-sm">
                    {item.assessmentScore !== null ? (
                      <span className={item.assessmentScore >= 70 ? "text-emerald-600" : "text-rose-600"}>
                        {item.assessmentScore}%
                      </span>
                    ) : (
                      <span className="text-muted-foreground text-xs font-normal">Pending</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        item.status === "Passed"
                          ? "bg-emerald-600 text-white"
                          : item.status === "In Progress"
                          ? "bg-sky-600 text-white"
                          : "bg-rose-600 text-white"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{item.lastActive}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </TrainerShell>
  );
}
