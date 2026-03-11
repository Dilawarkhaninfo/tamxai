import { ProjectHero } from '@/components/portfolio/storytelling/ProjectHero';
import { ArchitectureSection } from '@/components/portfolio/storytelling/ArchitectureSection';
import { ExperienceSection } from '@/components/portfolio/storytelling/ExperienceSection';
import { ImpactMetrics } from '@/components/portfolio/ImpactMetrics';
import { TestimonialSection } from '@/components/portfolio/TestimonialSection';
import { TechStack } from '@/components/portfolio/TechStack';
import { CTASection } from '@/components/home/CTASection';

// This would normally come from a CMS or local data file
const projectData: Record<string, any> = {
  'nexus-ai-platform': {
    title: 'Nexus AI Platform',
    category: 'AI Solutions',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop',
  },
  'vanguard-fintech': {
    title: 'Vanguard FinTech',
    category: 'Web Platforms',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070&auto=format&fit=crop',
  }
};

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projectData[params.slug] || projectData['nexus-ai-platform'];

  return (
    <main className="bg-dark-primary min-h-screen">
      <ProjectHero 
        title={project.title} 
        category={project.category} 
        image={project.image} 
      />
      
      <ArchitectureSection />
      
      <ExperienceSection />
      
      <div className="bg-black py-32 border-y border-white/5">
        <ImpactMetrics />
      </div>

      <TechStack />
      <TestimonialSection />
      <CTASection />
      
      {/* Navigation Footer */}
      <footer className="py-24 bg-black border-t border-white/5 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
              <button className="text-white/40 hover:text-white transition-colors flex flex-col items-start gap-2">
                  <span className="text-[10px] uppercase tracking-widest">Previous Project</span>
                  <span className="text-2xl font-bold">← Clinix AI</span>
              </button>
              <button className="text-white/40 hover:text-white transition-colors text-right flex flex-col items-end gap-2">
                  <span className="text-[10px] uppercase tracking-widest">Next Project</span>
                  <span className="text-2xl font-bold">HealSync Mobile →</span>
              </button>
          </div>
      </footer>
    </main>
  );
}
