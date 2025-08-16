'use client';

import { useState } from 'react';
import { Container, Title, Tabs, SimpleGrid, Card, Text, Badge, Group, Button, Stack, ActionIcon, Tooltip } from '@mantine/core';
import { 
  IconBrandGithub, 
  IconExternalLink, 
  IconBrandNpm,
  IconStar,
  IconGitFork,
  IconDownload,
  IconUsers,
  IconChartBar,
  IconCode,
  IconRocket,
  IconBrain,
  IconBook,
  IconPlayerPlay
} from '@tabler/icons-react';
import { projects, getProjectsByCategory } from '@/constants/projects-data';
import type { Project, ProjectCategory } from '@/types';
import Link from 'next/link';

// Project Card Component
function ProjectCard({ project }: { project: Project }) {
  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'production': return 'green';
      case 'development': return 'yellow';
      case 'maintained': return 'blue';
      default: return 'gray';
    }
  };

  const getStatusLabel = (status: Project['status']) => {
    switch (status) {
      case 'production': return '운영중';
      case 'development': return '개발중';
      case 'maintained': return '유지보수';
      default: return status;
    }
  };

  const getCategoryIcon = (category: ProjectCategory) => {
    switch (category) {
      case 'opensource': return <IconCode size={16} />;
      case 'ai-powered': return <IconBrain size={16} />;
      default: return null;
    }
  };

  return (
    <Card 
      shadow="sm" 
      padding="lg" 
      radius="md" 
      withBorder
      className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300"
    >
      {/* Header */}
      <div className="mb-4">
        <Group justify="space-between" align="flex-start" mb="xs" wrap="nowrap">
          <div className="flex-1 min-w-0">
            <Text fw={600} size="lg" className="mb-1 truncate">
              {project.title}
            </Text>
            {project.subtitle && (
              <Text size="sm" c="dimmed" className="line-clamp-2">
                {project.subtitle}
              </Text>
            )}
          </div>
          <Badge 
            color={getStatusColor(project.status)} 
            variant="light"
            size="sm"
            className="flex-shrink-0"
          >
            {getStatusLabel(project.status)}
          </Badge>
        </Group>

        <Group gap="xs" mb="md" wrap="wrap" align="center">
          <Badge 
            variant="light" 
            color="gray"
            leftSection={getCategoryIcon(project.category)}
            size="md"
            styles={{
              root: { 
                height: 'auto', 
                padding: '5px 10px 5px 8px',
                display: 'inline-flex',
                alignItems: 'center'
              },
              section: {
                marginRight: '4px',
                display: 'inline-flex',
                alignItems: 'center'
              },
              label: { 
                lineHeight: 1,
                display: 'inline-flex',
                alignItems: 'center',
                whiteSpace: 'nowrap'
              }
            }}
          >
            {project.category === 'opensource' && '오픈소스'}
            {project.category === 'ai-powered' && 'AI 개발'}
          </Badge>
          <Text size="xs" c="dimmed">
            {project.period}
          </Text>
          {project.teamSize && (
            <Badge 
              variant="outline" 
              size="md" 
              leftSection={<IconUsers size={12} />}
              styles={{
                root: { 
                  height: 'auto', 
                  padding: '5px 10px',
                  display: 'inline-flex',
                  alignItems: 'center'
                },
                section: {
                  marginRight: '6px',
                  display: 'inline-flex',
                  alignItems: 'center'
                },
                label: { 
                  lineHeight: 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  whiteSpace: 'nowrap'
                }
              }}
            >
              {project.teamSize}명
            </Badge>
          )}
        </Group>

        <Text size="sm" c="dimmed" lineClamp={3}>
          {project.description}
        </Text>
      </div>

      {/* Stats */}
      {project.stats && (
        <div className="mb-4">
          <Group gap="lg" wrap="wrap">
            {project.stats.stars && (
              <Tooltip label="GitHub Stars">
                <Group gap="xs">
                  <IconStar size={16} className="text-yellow-500" />
                  <Text size="sm" fw={500}>{project.stats.stars}</Text>
                </Group>
              </Tooltip>
            )}
            {project.stats.downloads && (
              <Tooltip label="Total Downloads">
                <Group gap="xs">
                  <IconDownload size={16} className="text-green-500" />
                  <Text size="sm" fw={500}>{project.stats.downloads.toLocaleString()}</Text>
                </Group>
              </Tooltip>
            )}
            {project.stats.coverage && (
              <Tooltip label="Test Coverage">
                <Group gap="xs">
                  <IconChartBar size={16} className="text-blue-500" />
                  <Text size="sm" fw={500}>{project.stats.coverage}%</Text>
                </Group>
              </Tooltip>
            )}
            {project.stats.completion && (
              <Tooltip label="Completion">
                <Group gap="xs">
                  <IconChartBar size={16} className="text-violet-500" />
                  <Text size="sm" fw={500}>{project.stats.completion}</Text>
                </Group>
              </Tooltip>
            )}
          </Group>
        </div>
      )}

      {/* Technologies */}
      <div className="mb-4 flex-1">
        <Group gap="xs" wrap="wrap">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="outline" size="xs" color="gray">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="outline" size="xs" color="gray">
              +{project.technologies.length - 4}
            </Badge>
          )}
        </Group>
      </div>

      {/* Achievements */}
      {project.achievements.length > 0 && (
        <div className="mb-4">
          <Stack gap="xs">
            {project.achievements.slice(0, 2).map((achievement, idx) => (
              <Group key={idx} gap="xs">
                <Text size="xs" c="dimmed">{achievement.description}:</Text>
                <Text size="xs" fw={600}>{achievement.metric}</Text>
              </Group>
            ))}
          </Stack>
        </div>
      )}

      {/* Links */}
      <Group gap="xs" mt="auto">
        {project.links?.map((link) => {
          const getIcon = () => {
            switch (link.type) {
              case 'github': return <IconBrandGithub size={18} />;
              case 'npm': return <IconBrandNpm size={18} />;
              case 'demo': return <IconPlayerPlay size={18} />;
              case 'docs': return <IconBook size={18} />;
              default: return <IconExternalLink size={18} />;
            }
          };

          return (
            <Tooltip key={link.url} label={link.label || link.type}>
              <ActionIcon
                component="a"
                href={link.url}
                target="_blank"
                variant="light"
                size="lg"
              >
                {getIcon()}
              </ActionIcon>
            </Tooltip>
          );
        })}
        
        <Button
          component={Link}
          href={`/project/${project.id}`}
          variant="subtle"
          size="xs"
          className="ml-auto"
        >
          자세히 보기
        </Button>
      </Group>
    </Card>
  );
}

export default function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<string | null>('all');

  const filteredProjects = activeTab === 'all' 
    ? projects.filter(p => p.category !== 'work')
    : getProjectsByCategory(activeTab as ProjectCategory);

  return (
    <section id="projects" className="py-32 bg-gray-50 dark:bg-gray-900">
      <Container size="xl" py={32}>
        <div className="text-center mb-12">
          <Title order={2} className="text-3xl md:text-4xl font-bold mb-4">
            Projects
          </Title>
          <Text 
            size="lg" 
            c="dimmed" 
            ta="center"
            maw={800}
            mx="auto"
          >
            오픈소스 기여부터 AI 페어 프로그래밍까지, 다양한 프로젝트를 통해 기술적 도전을 이어가고 있습니다.
          </Text>
        </div>

        <Tabs value={activeTab} onChange={setActiveTab} className="mb-8">
          <Tabs.List grow>
            <Tabs.Tab value="all">
              전체 ({projects.filter(p => p.category !== 'work').length})
            </Tabs.Tab>
            <Tabs.Tab value="opensource" leftSection={<IconCode size={16} />}>
              오픈소스 ({getProjectsByCategory('opensource').length})
            </Tabs.Tab>
            <Tabs.Tab value="ai-powered" leftSection={<IconBrain size={16} />}>
              AI 개발 ({getProjectsByCategory('ai-powered').length})
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </SimpleGrid>
      </Container>
    </section>
  );
}