
import { useState } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { IncidentCard } from '@/components/IncidentCard';
import { IncidentForm } from '@/components/IncidentForm';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define the Incident type to fix TypeScript errors
type Incident = {
  id: number;
  title: string;
  description: string;
  severity: "Low" | "Medium" | "High";
  reported_at: string;
};

// Initial mock data with proper typing
const initialIncidents: Incident[] = [
  {
    id: 1,
    title: "Biased Recommendation Algorithm",
    description: "Algorithm consistently favored certain demographics...",
    severity: "Medium",
    reported_at: "2025-03-15T10:00:00Z"
  },
  {
    id: 2,
    title: "LLM Hallucination in Critical Info",
    description: "LLM provided incorrect safety procedure information...",
    severity: "High",
    reported_at: "2025-04-01T14:30:00Z"
  },
  {
    id: 3,
    title: "Minor Data Leak via Chatbot",
    description: "Chatbot inadvertently exposed non-sensitive user metadata...",
    severity: "Low",
    reported_at: "2025-03-20T09:15:00Z"
  }
];

const Index = () => {
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [severityFilter, setSeverityFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');

  const filteredAndSortedIncidents = [...incidents]
    .filter(incident => 
      severityFilter === 'All' ? true : incident.severity === severityFilter
    )
    .sort((a, b) => {
      const dateA = new Date(a.reported_at).getTime();
      const dateB = new Date(b.reported_at).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  const handleNewIncident = (newIncident: Incident) => {
    setIncidents(prevIncidents => [...prevIncidents, newIncident]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold hover:scale-105 transition-transform duration-200">AI Safety Incident Dashboard</h1>
          <ThemeToggle />
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="w-full md:w-1/2 transition-all duration-300 hover:translate-z-4">
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-full transition-colors hover:bg-accent">
                <SelectValue placeholder="Filter by severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Severities</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-1/2 transition-all duration-300 hover:translate-z-4">
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-full transition-colors hover:bg-accent">
                <SelectValue placeholder="Sort by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6 mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          {filteredAndSortedIncidents.map((incident, index) => (
            <div key={incident.id} className="animate-fade-in" style={{ animationDelay: `${0.2 * index}s` }}>
              <IncidentCard incident={incident} />
            </div>
          ))}
        </div>

        <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <IncidentForm onSubmit={handleNewIncident} />
        </div>
      </div>
    </div>
  );
};

export default Index;
