
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IncidentFormProps {
  onSubmit: (incident: any) => void;
}

export function IncidentForm({ onSubmit }: IncidentFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !severity) return;

    const newIncident = {
      id: Date.now(),
      title,
      description,
      severity,
      reported_at: new Date().toISOString(),
    };

    onSubmit(newIncident);
    setTitle('');
    setDescription('');
    setSeverity('');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto transform transition-all duration-300 hover:translate-z-4 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="transform transition-all duration-300 hover:scale-105">Report New Incident</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2 transition-all duration-300 hover:translate-z-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="transition-all duration-300 hover:border-primary focus:translate-z-2"
            />
          </div>
          <div className="space-y-2 transition-all duration-300 hover:translate-z-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="transition-all duration-300 hover:border-primary focus:translate-z-2"
            />
          </div>
          <div className="space-y-2 transition-all duration-300 hover:translate-z-2">
            <Label>Severity</Label>
            <Select value={severity} onValueChange={setSeverity}>
              <SelectTrigger className="w-full transition-all duration-300 hover:border-primary">
                <SelectValue placeholder="Select severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button 
            type="submit" 
            className="w-full transform transition-all duration-300 hover:translate-z-4 hover:scale-[1.02] active:scale-95"
          >
            Submit Report
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
