'use client';

import { useParams } from 'next/navigation';
import { Container, Title, Text, Badge, Group, Button, Tabs, Image, Card, Accordion, Stack, Timeline, Alert, SimpleGrid } from '@mantine/core';
import { 
  IconArrowLeft, 
  IconBrandGithub, 
  IconExternalLink, 
  IconBrandNpm,
  IconCalendar,
  IconUsers,
  IconCode,
  IconBulb,
  IconMessageQuestion,
  IconScreenshot,
  IconChartBar,
  IconInfoCircle
} from '@tabler/icons-react';
import Link from 'next/link';
import { getProjectById } from '@/constants/projects-data';
import { getProjectQA } from '@/constants/project-qa';

export default function ProjectDetailPage() {
  const params = useParams();
  const project = getProjectById(params.id as string);
  const qa = getProjectQA(params.id as string);

  if (!project) {
    return (
      <Container size="lg" className="py-20">
        <Alert color="red" title="프로젝트를 찾을 수 없습니다">
          요청하신 프로젝트가 존재하지 않습니다.
        </Alert>
        <Button component={Link} href="/" mt="lg" leftSection={<IconArrowLeft size={16} />}>
          홈으로 돌아가기
        </Button>
      </Container>
    );
  }

  const getStatusColor = (status: typeof project.status) => {
    switch (status) {
      case 'production': return 'green';
      case 'development': return 'yellow';
      case 'maintained': return 'blue';
      default: return 'gray';
    }
  };

  const getStatusLabel = (status: typeof project.status) => {
    switch (status) {
      case 'production': return '운영중';
      case 'development': return '개발중';
      case 'maintained': return '유지보수';
      default: return status;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      {/* Header */}
      <section className="border-b dark:border-gray-800">
        <Container size="lg" className="py-8">
          <Button 
            component={Link} 
            href="/#projects"
            variant="subtle"
            leftSection={<IconArrowLeft size={16} />}
            mb="md"
          >
            프로젝트 목록으로
          </Button>
          
          <Group justify="space-between" align="flex-start">
            <div>
              <Title order={1} className="text-3xl md:text-4xl font-bold mb-2">
                {project.title}
              </Title>
              {project.subtitle && (
                <Text size="xl" c="dimmed" className="mb-4">
                  {project.subtitle}
                </Text>
              )}
              
              <Group gap="xs" mb="md">
                <Badge color={getStatusColor(project.status)} variant="filled">
                  {getStatusLabel(project.status)}
                </Badge>
                <Badge variant="outline" leftSection={<IconCalendar size={14} />}>
                  {project.period}
                </Badge>
                {project.teamSize && (
                  <Badge variant="outline" leftSection={<IconUsers size={14} />}>
                    {project.teamSize}명 팀
                  </Badge>
                )}
              </Group>
            </div>

            {/* Links */}
            <Group gap="xs">
              {project.links?.map((link) => {
                const getIcon = () => {
                  switch (link.type) {
                    case 'github': return <IconBrandGithub size={20} />;
                    case 'npm': return <IconBrandNpm size={20} />;
                    case 'demo': return <IconExternalLink size={20} />;
                    default: return <IconExternalLink size={20} />;
                  }
                };

                return (
                  <Button
                    key={link.url}
                    component={link.private ? "div" : "a"}
                    href={link.private ? undefined : link.url}
                    target={link.private ? undefined : "_blank"}
                    variant="light"
                    className={link.private 
                      ? "bg-gray-800 cursor-not-allowed opacity-50 text-gray-600"
                      : "bg-blue-950/30 hover:bg-blue-900/50 text-blue-300"
                    }
                    leftSection={getIcon()}
                    disabled={link.private}
                  >
                    {link.private ? `${link.label || link.type} (Private)` : (link.label || link.type)}
                  </Button>
                );
              })}
            </Group>
          </Group>
        </Container>
      </section>

      {/* Content */}
      <Container size="lg" className="py-12">
        <Tabs defaultValue="overview" className="mb-8">
          <Tabs.List>
            <Tabs.Tab value="overview" leftSection={<IconInfoCircle size={16} />}>
              개요
            </Tabs.Tab>
            <Tabs.Tab value="screenshots" leftSection={<IconScreenshot size={16} />}>
              스크린샷
            </Tabs.Tab>
            {qa && qa.length > 0 && (
              <Tabs.Tab value="qa" leftSection={<IconMessageQuestion size={16} />}>
                Q&A
              </Tabs.Tab>
            )}
            <Tabs.Tab value="technical" leftSection={<IconCode size={16} />}>
              기술 상세
            </Tabs.Tab>
          </Tabs.List>

          {/* Overview Tab */}
          <Tabs.Panel value="overview" pt="xl">
            <Stack gap="xl">
              {/* Description */}
              <Card withBorder>
                <Title order={3} size="h4" mb="md">프로젝트 소개</Title>
                <Text size="lg" className="leading-relaxed">
                  {project.longDescription || project.description}
                </Text>
              </Card>

              {/* Stats & Achievements */}
              {(project.stats || project.achievements.length > 0) && (
                <Card withBorder>
                  <Title order={3} size="h4" mb="md">주요 성과</Title>
                  <SimpleGrid cols={{ base: 2, sm: 3, md: project.achievements.length === 3 ? 3 : 4 }} spacing="lg">
                    {project.achievements.map((achievement, idx) => (
                      <div key={idx} className="text-center">
                        <Text size="2xl" fw={700} className="text-blue-600 dark:text-blue-400">
                          {achievement.metric}
                        </Text>
                        <Text size="sm" c="dimmed" mt="xs">
                          {achievement.description}
                        </Text>
                      </div>
                    ))}
                  </SimpleGrid>
                </Card>
              )}

              {/* Features */}
              {project.features && (
                <Card withBorder>
                  <Title order={3} size="h4" mb="md">주요 기능</Title>
                  <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                    {project.features.map((feature, idx) => (
                      <Group key={idx} gap="xs" align="flex-start">
                        <IconBulb size={20} className="text-yellow-500 mt-1" />
                        <Text size="sm" className="flex-1">{feature}</Text>
                      </Group>
                    ))}
                  </SimpleGrid>
                </Card>
              )}

              {/* Technologies */}
              <Card withBorder>
                <Title order={3} size="h4" mb="md">기술 스택</Title>
                <Group gap="xs">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} size="lg" variant="light">
                      {tech}
                    </Badge>
                  ))}
                </Group>
              </Card>
            </Stack>
          </Tabs.Panel>

          {/* Screenshots Tab */}
          <Tabs.Panel value="screenshots" pt="xl">
            {project.images && project.images.length > 0 ? (
              <SimpleGrid cols={{ base: 1, md: project.images.length === 1 ? 1 : 2 }} spacing="lg">
                {project.images.map((image, idx) => (
                  <Card key={idx} withBorder>
                    <Card.Section>
                      <Image
                        src={image.url}
                        alt={image.alt}
                        h={project.images?.length === 1 ? 400 : 300}
                        fit="contain"
                        p="md"
                      />
                    </Card.Section>
                    {image.caption && (
                      <Text size="sm" c="dimmed" mt="sm" ta="center" px="md" pb="md">
                        {image.caption}
                      </Text>
                    )}
                  </Card>
                ))}
              </SimpleGrid>
            ) : (
              <Alert color="blue" icon={<IconInfoCircle />}>
                스크린샷이 준비 중입니다.
              </Alert>
            )}
          </Tabs.Panel>

          {/* Q&A Tab */}
          <Tabs.Panel value="qa" pt="xl">
            {qa && qa.length > 0 ? (
              <Accordion variant="separated">
                {qa.map((item, idx) => (
                  <Accordion.Item key={idx} value={`qa-${idx}`}>
                    <Accordion.Control icon={
                      item.type === 'technical' ? <IconCode size={20} /> :
                      item.type === 'business' ? <IconChartBar size={20} /> :
                      <IconBulb size={20} />
                    }>
                      <Text fw={500}>{item.question}</Text>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Text className="whitespace-pre-wrap">{item.answer}</Text>
                      {item.code && (
                        <Card withBorder mt="md" className="bg-gray-900">
                          <pre className="text-sm overflow-x-auto">
                            <code>{item.code}</code>
                          </pre>
                        </Card>
                      )}
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            ) : (
              <Alert color="blue" icon={<IconInfoCircle />}>
                Q&A가 준비 중입니다.
              </Alert>
            )}
          </Tabs.Panel>

          {/* Technical Tab */}
          <Tabs.Panel value="technical" pt="xl">
            <Stack gap="xl">
              {/* Challenges */}
              {project.challenges && (
                <Card withBorder>
                  <Title order={3} size="h4" mb="md">기술적 도전</Title>
                  <Timeline active={project.challenges.length} bulletSize={24} lineWidth={2}>
                    {project.challenges.map((challenge, idx) => (
                      <Timeline.Item key={idx} bullet={<IconCode size={12} />}>
                        <Text size="sm">{challenge}</Text>
                      </Timeline.Item>
                    ))}
                  </Timeline>
                </Card>
              )}

              {/* Roadmap */}
              {project.roadmap && project.roadmap.length > 0 && (
                <Card withBorder>
                  <Title order={3} size="h4" mb="md">개발 로드맵</Title>
                  <Timeline active={0} bulletSize={24} lineWidth={2}>
                    {project.roadmap.map((item, idx) => (
                      <Timeline.Item key={idx} bullet={<IconBulb size={12} />}>
                        <Text size="sm">{item}</Text>
                      </Timeline.Item>
                    ))}
                  </Timeline>
                </Card>
              )}

              {/* Architecture */}
              <Card withBorder>
                <Title order={3} size="h4" mb="md">프로젝트 정보</Title>
                <Stack gap="md">
                  <Group>
                    <Text fw={500} className="w-32">역할:</Text>
                    <Text>{project.role}</Text>
                  </Group>
                  <Group>
                    <Text fw={500} className="w-32">카테고리:</Text>
                    <Badge variant="light" className="bg-indigo-950/30 text-indigo-300">
                      {project.category === 'opensource' && '오픈소스'}
                      {project.category === 'ai-powered' && 'AI 개발'}
                      {project.category === 'work' && '업무'}
                    </Badge>
                  </Group>
                  <Group>
                    <Text fw={500} className="w-32">기간:</Text>
                    <Text>{project.period}</Text>
                  </Group>
                  {project.teamSize && (
                    <Group>
                      <Text fw={500} className="w-32">팀 규모:</Text>
                      <Text>{project.teamSize}명</Text>
                    </Group>
                  )}
                </Stack>
              </Card>
            </Stack>
          </Tabs.Panel>
        </Tabs>

        <Group justify="center" mt="xl">
          <Button
            component={Link}
            href="/#projects"
            variant="light"
            className="bg-slate-800 hover:bg-slate-700 text-slate-300"
            leftSection={<IconArrowLeft size={16} />}
          >
            프로젝트 목록으로
          </Button>
        </Group>
      </Container>
    </main>
  );
}