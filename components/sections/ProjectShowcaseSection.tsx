'use client';

import { useState } from 'react';
import { Container, Title, Text, Grid, Card, Badge, Group, Button, Image, Modal, Tabs } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconExternalLink, IconBrandGithub, IconDeviceMobile, IconWorld } from '@tabler/icons-react';
import { useGSAP } from '@/hooks/useGSAP';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProjectShowcase {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  type: 'web' | 'mobile';
  status: 'deployed' | 'development' | 'beta';
  tech: string[];
  features: string[];
  images: {
    thumbnail: string;
    screenshots: string[];
  };
  links?: {
    live?: string;
    github?: string;
    demo?: string;
  };
  highlights?: {
    users?: string;
    performance?: string;
    achievement?: string;
  };
}

const showcaseProjects: ProjectShowcase[] = [
  {
    id: 'e-torch',
    name: 'E-Torch',
    description: '경제지표 통합 시각화 대시보드',
    longDescription: 'KOSIS와 ECOS 데이터를 활용한 실시간 경제지표 시각화 서비스. 사용자 맞춤형 대시보드와 다양한 차트 컴포넌트를 제공합니다.',
    type: 'web',
    status: 'development',
    tech: ['Next.js 15', 'TypeScript', 'Zustand', 'Recharts', 'Tailwind CSS'],
    features: [
      '실시간 경제 데이터 시각화',
      '사용자 맞춤형 대시보드',
      '7종류의 인터랙티브 차트',
      '구독 기반 비즈니스 모델'
    ],
    images: {
      thumbnail: '/images/e-torch-thumb.png',
      screenshots: [
        '/images/e-torch-1.png',
        '/images/e-torch-2.png',
        '/images/e-torch-3.png'
      ]
    },
    links: {
      demo: 'https://e-torch-demo.vercel.app'
    },
    highlights: {
      performance: 'LCP < 2.5초',
      achievement: '데이터 시각화 최적화'
    }
  },
  {
    id: 'tailwind-grid',
    name: 'Tailwind Grid Layout',
    description: 'React Grid Layout의 Tailwind CSS 대안',
    longDescription: '1차 배포 완료 후 e-torch 프로젝트에 실제 사용중. 현재 버그 수정 및 성능 개선 작업 진행중입니다.',
    type: 'web',
    status: 'deployed',
    tech: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Vite'],
    features: [
      '드래그 앤 드롭 그리드 시스템',
      'React Grid Layout 완벽 호환',
      '번들 사이즈 40% 감소',
      '모바일 터치 최적화'
    ],
    images: {
      thumbnail: '/images/tailwind-grid-thumb.png',
      screenshots: [
        '/images/tailwind-grid-1.png',
        '/images/tailwind-grid-2.png'
      ]
    },
    links: {
      live: 'https://tailwind-grid-layout.vercel.app',
      github: 'https://github.com/Seungwoo321/tailwind-grid-layout',
      demo: 'https://tailwind-grid-layout-demo.vercel.app'
    },
    highlights: {
      users: '주간 50+ 다운로드',
      performance: '번들 사이즈 22KB'
    }
  },
  {
    id: 'toolypet',
    name: 'Toolypet Project',
    description: '개발자 도구 모음 서비스',
    longDescription: '총 20개 계획 중 4개 사이트 배포 완료. Google AdSense 승인을 위한 랜딩 페이지까지 개발 완료한 상태입니다.',
    type: 'web',
    status: 'deployed',
    tech: ['Next.js', 'Mantine UI', 'TypeScript', 'Google AdSense'],
    features: [
      'JSON Formatter & Validator',
      'CSS Generator Tools',
      'Image Optimization Tools',
      'SEO & Meta Tag Tools'
    ],
    images: {
      thumbnail: '/images/toolypet-thumb.png',
      screenshots: [
        '/images/toolypet-1.png',
        '/images/toolypet-2.png',
        '/images/toolypet-3.png',
        '/images/toolypet-4.png'
      ]
    },
    links: {
      live: 'https://toolypet.com'
    },
    highlights: {
      achievement: '4개 도구 사이트 배포',
      users: 'Google AdSense 승인'
    }
  },
  {
    id: 'penguinjs',
    name: 'PenguinJS',
    description: 'JavaScript 학습 게임 플랫폼',
    longDescription: '펭귄 캐릭터와 함께하는 인터랙티브 JavaScript 학습 플랫폼. 18개의 핵심 개념을 게임으로 학습할 수 있습니다.',
    type: 'web',
    status: 'development',
    tech: ['Next.js', 'Three.js', 'Monaco Editor', 'Framer Motion'],
    features: [
      '18개 JavaScript 개념 게임',
      '인터랙티브 코드 에디터',
      '3D 캐릭터 애니메이션',
      '실시간 코드 실행 환경'
    ],
    images: {
      thumbnail: '/images/penguinjs-thumb.png',
      screenshots: [
        '/images/penguinjs-1.png',
        '/images/penguinjs-2.png'
      ]
    },
    highlights: {
      achievement: '교육 게임 플랫폼 설계'
    }
  },
  {
    id: 'learning-app',
    name: 'Frontend Learning App',
    description: '프론트엔드 학습 모바일 앱',
    longDescription: 'React Native로 개발중인 프론트엔드 개발 지식 학습 앱. 30개 주제의 체계적인 학습 콘텐츠를 제공합니다.',
    type: 'mobile',
    status: 'development',
    tech: ['React Native', 'Expo', 'TypeScript', 'Zustand'],
    features: [
      '30개 프론트엔드 주제',
      '인터랙티브 학습 자료',
      '개인 학습 진도 추적',
      '오프라인 학습 지원'
    ],
    images: {
      thumbnail: '/images/learning-app-thumb.png',
      screenshots: [
        '/images/learning-app-1.png',
        '/images/learning-app-2.png',
        '/images/learning-app-3.png'
      ]
    },
    highlights: {
      achievement: '모바일 첫 프로젝트'
    }
  }
];

const statusColors = {
  deployed: { color: 'green', label: '배포됨' },
  development: { color: 'blue', label: '개발중' },
  beta: { color: 'orange', label: '베타' }
};

export default function ProjectShowcaseSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectShowcase | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  useGSAP((gsap) => {
    // Showcase cards animation
    gsap.from('.showcase-card', {
      y: 80,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.showcase-section',
        start: 'top 70%',
      }
    });

    // Title animation
    gsap.from('.showcase-title', {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.showcase-section',
        start: 'top 80%',
      }
    });
  }, []);

  const handleProjectClick = (project: ProjectShowcase) => {
    setSelectedProject(project);
    open();
  };

  return (
    <section className="showcase-section min-h-screen flex items-center py-32 md:py-40 bg-portfolio-surface">
      <Container size="xl" className="w-full">
        <div className="showcase-title text-center mb-12 md:mb-16">
          <Title order={2} className="text-4xl md:text-5xl font-bold mb-6">
            프로젝트 쇼케이스
          </Title>
          <Text size="lg" c="dimmed" className="max-w-2xl mx-auto">
            현재 개발중이거나 배포 완료한 사이드 프로젝트들입니다.
            각 프로젝트를 클릭하여 상세 정보와 스크린샷을 확인하세요.
          </Text>
        </div>

        <Grid gutter="xl">
          {showcaseProjects.map((project) => (
            <Grid.Col key={project.id} span={{ base: 12, sm: 6, lg: 4 }}>
              <Card
                shadow="md"
                padding="lg"
                radius="md"
                className="showcase-card h-full cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                onClick={() => handleProjectClick(project)}
              >
                <Card.Section className="relative h-48 bg-gradient-to-br from-portfolio-primary/10 to-portfolio-accent/10 overflow-hidden">
                  {project.images.thumbnail ? (
                    <Image
                      src={project.images.thumbnail}
                      height={192}
                      alt={project.name}
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      {project.type === 'mobile' ? (
                        <IconDeviceMobile size={48} className="text-portfolio-primary/30" />
                      ) : (
                        <IconWorld size={48} className="text-portfolio-primary/30" />
                      )}
                    </div>
                  )}
                  <Badge
                    className="absolute top-4 right-4"
                    color={statusColors[project.status].color}
                    variant="filled"
                  >
                    {statusColors[project.status].label}
                  </Badge>
                </Card.Section>

                <div className="mt-4">
                  <Group justify="space-between" className="mb-3">
                    <Text size="lg" fw={700}>{project.name}</Text>
                    {project.type === 'mobile' ? (
                      <IconDeviceMobile size={20} className="text-portfolio-primary" />
                    ) : (
                      <IconWorld size={20} className="text-portfolio-primary" />
                    )}
                  </Group>

                  <Text size="sm" c="dimmed" lineClamp={2} className="mb-4">
                    {project.description}
                  </Text>

                  <Group gap="xs" className="mb-4">
                    {project.tech.slice(0, 3).map((tech) => (
                      <Badge key={tech} size="xs" variant="light">
                        {tech}
                      </Badge>
                    ))}
                    {project.tech.length > 3 && (
                      <Badge size="xs" variant="light" color="gray">
                        +{project.tech.length - 3}
                      </Badge>
                    )}
                  </Group>

                  {project.highlights && (
                    <div className="space-y-2">
                      {Object.entries(project.highlights).slice(0, 2).map(([key, value]) => (
                        <Text key={key} size="xs" c="dimmed" className="flex items-center gap-1">
                          <span className="text-green-600">✓</span> {value}
                        </Text>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            </Grid.Col>
          ))}
        </Grid>

        {/* Project Detail Modal */}
        <Modal
          opened={opened}
          onClose={close}
          size="xl"
          title={selectedProject?.name}
          centered
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
          }}
        >
          {selectedProject && (
            <div>
              <Text size="sm" c="dimmed" className="mb-4">
                {selectedProject.longDescription}
              </Text>

              <Tabs defaultValue="screenshots" className="mb-8">
                <Tabs.List>
                  <Tabs.Tab value="screenshots">스크린샷</Tabs.Tab>
                  <Tabs.Tab value="features">주요 기능</Tabs.Tab>
                  <Tabs.Tab value="tech">기술 스택</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="screenshots" pt="md">
                  <div className="space-y-4">
                    {selectedProject.images.screenshots.map((screenshot, index) => (
                      <Image
                        key={index}
                        src={screenshot}
                        alt={`${selectedProject.name} screenshot ${index + 1}`}
                        radius="md"
                        className="border border-gray-200 dark:border-gray-700"
                      />
                    ))}
                  </div>
                </Tabs.Panel>

                <Tabs.Panel value="features" pt="md">
                  <div className="space-y-2">
                    {selectedProject.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Text size="sm" c="green" mt={2}>✓</Text>
                        <Text size="sm">{feature}</Text>
                      </div>
                    ))}
                  </div>
                </Tabs.Panel>

                <Tabs.Panel value="tech" pt="md">
                  <Group gap="xs">
                    {selectedProject.tech.map((tech) => (
                      <Badge key={tech} size="lg" variant="light">
                        {tech}
                      </Badge>
                    ))}
                  </Group>
                </Tabs.Panel>
              </Tabs>

              {selectedProject.links && (
                <Group gap="sm">
                  {selectedProject.links.live && (
                    <Button
                      variant="filled"
                      leftSection={<IconExternalLink size={16} />}
                      component="a"
                      href={selectedProject.links.live}
                      target="_blank"
                    >
                      사이트 방문
                    </Button>
                  )}
                  {selectedProject.links.github && (
                    <Button
                      variant="light"
                      leftSection={<IconBrandGithub size={16} />}
                      component="a"
                      href={selectedProject.links.github}
                      target="_blank"
                    >
                      GitHub
                    </Button>
                  )}
                  {selectedProject.links.demo && (
                    <Button
                      variant="light"
                      leftSection={<IconExternalLink size={16} />}
                      component="a"
                      href={selectedProject.links.demo}
                      target="_blank"
                    >
                      데모 보기
                    </Button>
                  )}
                </Group>
              )}
            </div>
          )}
        </Modal>
      </Container>
    </section>
  );
}