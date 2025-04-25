
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
    Low: "bg-green-500",
    Medium: "bg-yellow-500",
    High: "bg-red-500"
  };

  return (
    <Card className="w-full transition-all duration-300 hover:translate-z-4 hover:shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold group">
          <span className="inline-block transition-transform duration-300 group-hover:scale-105">
            {incident.title}
          </span>
        </CardTitle>
        <Badge 
          className={`${severityColors[incident.severity]} text-white transform transition-all duration-300 hover:scale-110`}
        >
          {incident.severity}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-2 transition-opacity duration-300 hover:opacity-80">
          {new Date(incident.reported_at).toLocaleDateString()}
        </div>
        <Button 
          variant="ghost" 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm group relative overflow-hidden transition-all duration-300 hover:bg-accent"
        >
          <span className="inline-flex items-center gap-2">
            <RotateCw className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            {isExpanded ? "Hide Details" : "View Details"}
          </span>
        </Button>
        {isExpanded && (
          <div className="mt-2 text-sm text-muted-foreground animate-fade-in">
            {incident.description}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
