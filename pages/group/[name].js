import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function GroupAboutPage() {
  const router = useRouter();
  const { name } = router.query;

  // This is mock data. In a real application, you'd fetch this from a database or API
  const groupInfo = {
    "CCNY Mela Mahem": {
      description: "CCNY Mela Mahem is a vibrant cultural organization celebrating South Asian heritage through music, dance, and community events.",
      events: ["Annual Cultural Festival", "Bollywood Night", "Holi Celebration"],
      contact: "melamahem@ccny.edu"
    },
    "CCNY MSA": {
      description: "The Muslim Students Association at CCNY fosters a sense of community among Muslim students and promotes interfaith understanding.",
      events: ["Weekly Prayer Meetings", "Ramadan Iftar Gatherings", "Islamic Awareness Week"],
      contact: "msa@ccny.edu"
    },
    "CCNY MSOWII": {
      description: "MSOWII (Minority Students of Women in Intelligence and Innovation) empowers and supports minority women in STEM fields at CCNY.",
      events: ["Women in STEM Panel Discussions", "Mentorship Program", "Tech Workshops"],
      contact: "msowii@ccny.edu"
    },
    "CCNY BSA": {
      description: "The Black Student Association at CCNY promotes unity, cultural awareness, and academic excellence among Black students.",
      events: ["Black History Month Celebration", "Career Networking Events", "Community Outreach Programs"],
      contact: "bsa@ccny.edu"
    }
  };

  const group = groupInfo[name] || {};

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8 bg-white dark:bg-gray-800 animate-fade-in">
          <CardHeader className="bg-blue-600 dark:bg-blue-800 text-white">
            <CardTitle className="text-2xl">{name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{group.description}</p>
            <h3 className="text-xl font-semibold mb-2">Upcoming Events:</h3>
            <ul className="list-disc list-inside mb-4">
              {group.events && group.events.map((event, index) => (
                <li key={index} className="mb-1">{event}</li>
              ))}
            </ul>
            <p><strong>Contact:</strong> {group.contact}</p>
          </CardContent>
        </Card>
        <Button onClick={() => router.push('/')} className="bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300">
          Back to Home
        </Button>
      </div>
    </Layout>
  );
}