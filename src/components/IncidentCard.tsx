
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RotateCw } from 'lucide-react';

interface Incident {
  id: number;
  title: string;
  description: string;
  severity: "Low" | "Medium" | "High";
  reported_at: string;
}

interface IncidentCardProps {
  incident: Incident;
}

export function IncidentCard({ incident }: IncidentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const severityColors = {
    Low: "bg-green-600/80 text-green-100",
    Medium: "bg-yellow-600/80 text-yellow-100",
    High: "bg-red-600/80 text-red-100"
  };

  return (
    <Card className="w-full transition-all duration-300 hover:translate-z-4 hover:shadow-2xl float bg-card/70 backdrop-blur-sm border-border/30">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold group">
          <span className="inline-block transition-transform duration-300 group-hover:scale-105 pulse-subtle text-foreground/90">
            {incident.title}
          </span>
        </CardTitle>
        <Badge 
          className={`${severityColors[incident.severity]} transform transition-all duration-300 hover:scale-110`}
        >
          {incident.severity}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-2 transition-opacity duration-300 hover:opacity-80">
          {new Date(incident.reported_at).toLocaleDateString()}
        </div>
        <Button 
          variant="outline" 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm group relative overflow-hidden transition-all duration-300 hover:bg-accent/30 rotate-hover border-accent/30"
        >
          <span className="inline-flex items-center gap-2">
            <RotateCw className={`transition-transform duration-300 text-foreground/70 ${isExpanded ? 'rotate-180' : ''}`} />
            {isExpanded ? "Hide Details" : "View Details"}
          </span>
        </Button>
        {isExpanded && (
          <div className="mt-2 text-sm text-muted-foreground animate-fade-in bg-accent/10 p-3 rounded-md">
            {incident.description}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
