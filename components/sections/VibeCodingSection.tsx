'use client';

import { useEffect, useState, useRef } from 'react';
import { Container, Title, Text, Grid, Card, Badge, Group, Progress, ThemeIcon } from '@mantine/core';
import { IconCode, IconClock, IconFlame, IconCalendar } from '@tabler/icons-react';
import { useGSAP } from '@/hooks/useGSAP';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface VibeCodingProject {
  name: string;
  description: string;
  commits: number;
  lastCommit: string;
  linesOfCode: number;
  status: 'active' | 'stable' | 'planning';
  tech: string[];
}

const vibeCodingProjects: VibeCodingProject[] = [
  {
    name: 'E-Torch',
    description: '경제지표 통합 시각화 대시보드',
    commits: 245,
    lastCommit: '2 hours ago',
    linesOfCode: 15420,
    status: 'active',
    tech: ['Next.js', 'TypeScript', 'Zustand', 'Recharts']
  },
  {
    name: 'Tailwind Grid Layout',
    description: 'React Grid Layout의 Tailwind CSS 대안',
    commits: 189,
    lastCommit: '1 day ago',
    linesOfCode: 8340,
    status: 'stable',
    tech: ['React', 'TypeScript', 'Tailwind CSS']
  },
  {
    name: 'PenguinJS',
    description: 'JavaScript 학습 게임 플랫폼',
    commits: 87,
    lastCommit: '3 days ago',
    linesOfCode: 12560,
    status: 'active',
    tech: ['Next.js', 'Three.js', 'Monaco Editor']
  },
  {
    name: 'Toolypet',
    description: '개발자 도구 모음 (4개 사이트 배포)',
    commits: 312,
    lastCommit: '5 days ago',
    linesOfCode: 18900,
    status: 'active',
    tech: ['Next.js', 'Mantine UI', 'AdSense']
  },
  {
    name: 'Frontend Learning App',
    description: '모바일 학습 애플리케이션',
    commits: 45,
    lastCommit: '1 week ago',
    linesOfCode: 3200,
    status: 'planning',
    tech: ['React Native', 'Expo', 'Zustand']
  }
];

const statusColors = {
  active: 'green',
  stable: 'blue',
  planning: 'orange'
};

export default function VibeCodingSection() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [codingStreak] = useState(28);
  const sectionRef = useRef<HTMLElement>(null);
  const commitCountRef = useRef<HTMLSpanElement>(null);

  useGSAP((gsap) => {
    // Card animations
    const cards = gsap.utils.toArray('.vibe-card') as HTMLElement[];
    cards.forEach((card: HTMLElement, index: number) => {
      gsap.fromTo(card,
        {
          y: 60,
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Stats animation
    gsap.fromTo('.vibe-stats',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.vibe-stats',
          start: 'top 80%',
        }
      }
    );

    // Commit count animation
    if (commitCountRef.current) {
      gsap.fromTo(commitCountRef.current,
        { textContent: 0 },
        {
          textContent: 878,
          duration: 2.5,
          ease: 'power3.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: commitCountRef.current,
            start: 'top 80%',
          }
        }
      );
    }

    // Background animation
    gsap.to('.animate-pulse', {
      scale: 1.1,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isNightTime = currentTime.getHours() >= 21 || currentTime.getHours() < 6;
  const isWeekend = currentTime.getDay() === 0 || currentTime.getDay() === 6;

  return (
    <section ref={sectionRef} id="vibe-coding" className="vibe-section min-h-screen flex items-center py-40 md:py-48 bg-portfolio-background relative overflow-hidden">
      {/* Animated background effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-portfolio-accent rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-portfolio-primary rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <Container size="lg" className="relative z-10 w-full">
        <div className="text-center mb-12 md:mb-16">
          <Title order={2} className="text-4xl md:text-5xl font-bold mb-6">
            사이드 프로젝트
          </Title>
          <Text size="lg" c="dimmed">
            퇴근 후와 주말, 열정으로 만들어가는 프로젝트들
          </Text>
        </div>

        {/* Live Coding Status */}
        <Card className="vibe-stats mb-8 bg-portfolio-surface border border-portfolio-accent/20">
          <Grid>
            <Grid.Col span={{ base: 12, sm: 3 }}>
              <div className="text-center">
                <ThemeIcon size="xl" color={isNightTime ? 'green' : 'gray'} variant="light" className="mx-auto mb-3">
                  <IconClock size={28} />
                </ThemeIcon>
                <Text size="xs" c="dimmed">현재 시간</Text>
                <Text size="lg" fw={700} className={`mt-1 mb-2 ${isNightTime ? 'text-portfolio-accent' : ''}`}>
                  {currentTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                </Text>
                {isNightTime && <Badge color="green" size="xs">코딩 타임!</Badge>}
              </div>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 3 }}>
              <div className="text-center">
                <ThemeIcon size="xl" color="orange" variant="light" className="mx-auto mb-3">
                  <IconFlame size={28} />
                </ThemeIcon>
                <Text size="xs" c="dimmed">연속 커밋</Text>
                <Text size="lg" fw={700} className="mt-1 mb-2">{codingStreak}일</Text>
                <Badge color="orange" size="xs">🔥 On Fire!</Badge>
              </div>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 3 }}>
              <div className="text-center">
                <ThemeIcon size="xl" color="blue" variant="light" className="mx-auto mb-3">
                  <IconCode size={28} />
                </ThemeIcon>
                <Text size="xs" c="dimmed">이번 달 커밋</Text>
                <Text size="lg" fw={700} className="mt-1 mb-2">
                  <span ref={commitCountRef} className="commit-count">0</span>
                </Text>
                <Badge color="blue" size="xs">월간 신기록!</Badge>
              </div>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 3 }}>
              <div className="text-center">
                <ThemeIcon size="xl" color={isWeekend ? 'green' : 'gray'} variant="light" className="mx-auto mb-3">
                  <IconCalendar size={28} />
                </ThemeIcon>
                <Text size="xs" c="dimmed">주말 생산성</Text>
                <Text size="lg" fw={700} className="mt-1 mb-2">145%</Text>
                {isWeekend && <Badge color="green" size="xs">주말 전사</Badge>}
              </div>
            </Grid.Col>
          </Grid>
        </Card>

        {/* Projects Grid */}
        <Grid>
          {vibeCodingProjects.map((project) => (
            <Grid.Col key={project.name} span={{ base: 12, md: 6, lg: 4 }}>
              <Card 
                shadow="sm" 
                padding="lg" 
                radius="md" 
                className={`vibe-card h-full border transition-all duration-300 hover:border-portfolio-accent/50 hover:shadow-lg ${
                  project.status === 'active' ? 'border-portfolio-accent/30' : 'border-transparent'
                }`}
              >
                <Group justify="space-between" className="mb-2">
                  <Text size="lg" fw={700}>{project.name}</Text>
                  <Badge color={statusColors[project.status]} variant="light">
                    {project.status}
                  </Badge>
                </Group>

                <Text size="sm" c="dimmed" className="mb-4">
                  {project.description}
                </Text>

                <Group gap="xs" className="mb-4">
                  {project.tech.slice(0, 3).map((tech) => (
                    <Badge key={tech} size="xs" variant="dot" color="gray">
                      {tech}
                    </Badge>
                  ))}
                  {project.tech.length > 3 && (
                    <Badge size="xs" variant="dot" color="gray">
                      +{project.tech.length - 3}
                    </Badge>
                  )}
                </Group>

                <div className="space-y-3">
                  <div>
                    <Group justify="space-between" className="mb-2">
                      <Text size="xs" c="dimmed">커밋 활동</Text>
                      <Text size="xs" fw={500}>{project.commits} commits</Text>
                    </Group>
                    <Progress 
                      value={(project.commits / 400) * 100} 
                      size="xs" 
                      color={project.status === 'active' ? 'green' : 'blue'}
                    />
                  </div>

                  <div>
                    <Group justify="space-between" className="mb-2">
                      <Text size="xs" c="dimmed">코드 규모</Text>
                      <Text size="xs" fw={500}>{(project.linesOfCode / 1000).toFixed(1)}k lines</Text>
                    </Group>
                    <Progress 
                      value={(project.linesOfCode / 20000) * 100} 
                      size="xs" 
                      color="violet"
                    />
                  </div>
                </div>

                <Group justify="space-between" className="mt-4 text-xs">
                  <Text c="dimmed">최근 커밋</Text>
                  <Text c={project.lastCommit.includes('hour') || project.lastCommit.includes('day') ? 'green' : 'dimmed'}>
                    {project.lastCommit}
                  </Text>
                </Group>
              </Card>
            </Grid.Col>
          ))}
        </Grid>

        {/* Summary Stats */}
        <Card className="mt-8 bg-portfolio-surface/50 backdrop-blur">
          <Text size="lg" fw={700} className="text-center mb-4">
            프로젝트 요약
          </Text>
          <Grid>
            <Grid.Col span={{ base: 6, sm: 3 }}>
              <div className="text-center">
                <Text size="2xl" fw={700} className="text-portfolio-accent">5</Text>
                <Text size="xs" c="dimmed">진행중인 프로젝트</Text>
              </div>
            </Grid.Col>
            <Grid.Col span={{ base: 6, sm: 3 }}>
              <div className="text-center">
                <Text size="2xl" fw={700} className="text-portfolio-primary">58.4k</Text>
                <Text size="xs" c="dimmed">총 코드 라인</Text>
              </div>
            </Grid.Col>
            <Grid.Col span={{ base: 6, sm: 3 }}>
              <div className="text-center">
                <Text size="2xl" fw={700} className="text-green-500">878</Text>
                <Text size="xs" c="dimmed">이번 달 커밋</Text>
              </div>
            </Grid.Col>
            <Grid.Col span={{ base: 6, sm: 3 }}>
              <div className="text-center">
                <Text size="2xl" fw={700} className="text-orange-500">21-02시</Text>
                <Text size="xs" c="dimmed">주요 활동 시간</Text>
              </div>
            </Grid.Col>
          </Grid>
        </Card>
      </Container>
    </section>
  );
}