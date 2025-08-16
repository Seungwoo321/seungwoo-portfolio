'use client';

import { Container, Title, Timeline, Text, List, Badge, Group, Card, Progress, ThemeIcon, Tabs, Paper } from '@mantine/core';
import { IconBriefcase, IconCode, IconUsers, IconTrophy, IconGitBranch, IconServer, IconRocket } from '@tabler/icons-react';
import { useGSAP } from '@/hooks/useGSAP';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceDetail {
  year: string;
  role: string;
  company: string;
  description: string;
  skills: string[];
  teamSize?: number;
}

interface Project {
  name: string;
  period: string;
  startDate: string;
  endDate?: string;
  description: string;
  tech: string[];
}

const experienceHistory: ExperienceDetail[] = [
  {
    year: '2019 - 현재',
    role: '프론트엔드 개발자',
    company: '메가존클라우드',
    description: 'B2B SaaS 플랫폼 HyperBilling 프론트엔드 개발',
    skills: ['Vue.js', 'TypeScript', 'CI/CD', '성능 최적화'],
  },
  {
    year: '2016 - 2018',
    role: '웹 개발자',
    company: '메가존',
    description: 'HyperBilling 2.0 유지보수 및 기능 개발',
    skills: ['Node.js', 'jQuery', 'AWS', 'Linux'],
  },
  {
    year: '2015 - 2016',
    role: '시스템 엔지니어',
    company: '메가존',
    description: '클라우드 인프라 모니터링 및 운영',
    skills: ['Linux', 'Python', 'Monitoring', 'AWS'],
  }
];

const majorProjects: Project[] = [
  {
    name: 'Vue3 Pivottable',
    period: '2025.01 - 진행중',
    startDate: '2025.01',
    description: 'vue-pivottable의 Vue3 버전 재설계 - HyperBilling 차기 버전 대비',
    tech: ['Vue3', 'TypeScript', 'Vite']
  },
  {
    name: 'HyperBilling 3.0',
    period: '2019.08 - 2022.11',
    startDate: '2019.08',
    endDate: '2022.11',
    description: '모놀리식에서 Vue.js 기반 SPA로 전환',
    tech: ['Vue.js', 'Node.js', 'AWS', 'Docker']
  }
];

export default function ExperienceSection() {
  useGSAP((gsap) => {
    // Timeline animation
    gsap.from('.timeline-item', {
      x: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.experience-timeline',
        start: 'top 80%',
      }
    });
  }, []);

  const totalYears = new Date().getFullYear() - 2015;

  return (
    <section id="experience" className="min-h-screen flex items-center py-32 md:py-40 bg-portfolio-surface">
      <Container size="xl" className="w-full">
        <Title order={2} className="text-4xl md:text-5xl font-bold mb-6 text-center">
          경력 사항
        </Title>
        <Text size="lg" c="dimmed" className="text-center mb-12 md:mb-16">
          {totalYears}년간의 프론트엔드 개발 여정
        </Text>

        <Timeline 
          active={0} 
          bulletSize={48} 
          lineWidth={3}
          className="experience-timeline"
        >
          {experienceHistory.map((exp, index) => (
            <Timeline.Item
              key={index}
              className="timeline-item"
              bullet={
                <ThemeIcon size={48} radius="xl" color="blue">
                  <IconBriefcase size={24} />
                </ThemeIcon>
              }
              title={
                <div className="mb-3">
                  <Group justify="space-between" align="flex-start">
                    <div>
                      <Text size="xl" fw={700} className="mb-2">{exp.role}</Text>
                      <Text size="lg" c="blue">{exp.company}</Text>
                    </div>
                    <Badge size="lg" variant="light">{exp.year}</Badge>
                  </Group>
                </div>
              }
            >
              <Text c="dimmed" size="sm" className="mb-6">{exp.description}</Text>
              
              {/* 주요 프로젝트 표시 */}
              {exp.year.includes('2019') && (
                <div className="mb-4">
                  <Text size="xs" c="dimmed" fw={500} className="mb-3">주요 프로젝트</Text>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <Text size="xs" c="dimmed">
                        <span className="text-green-700 dark:text-green-400">HyperBilling 3.0</span> (2019-2022): 모놀리식 → Vue.js SPA 전환
                      </Text>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <Text size="xs" c="dimmed">
                        <span className="text-green-700 dark:text-green-400">Vue3 Pivottable</span> (2025-): Vue3 버전 재설계
                      </Text>
                    </div>
                  </div>
                </div>
              )}
              
              {exp.skills && (
                <Group gap="xs" className="mt-6" wrap="wrap">
                  {exp.skills.map((skill) => (
                    <Badge key={skill} variant="dot" color="gray" size="sm">
                      {skill}
                    </Badge>
                  ))}
                </Group>
              )}
            </Timeline.Item>
          ))}
        </Timeline>
      </Container>
    </section>
  );
}