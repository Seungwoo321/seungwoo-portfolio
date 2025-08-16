'use client';

import { Container, Title, Grid, Card, Text, Group, Badge, Button } from '@mantine/core';
import { IconStar, IconGitFork, IconDownload, IconBrandGithub } from '@tabler/icons-react';
import { openSourceProjects } from '@/constants/portfolio-data';

export default function OpenSourceSection() {
  return (
    <section id="opensource" className="py-32 md:py-40 bg-portfolio-background">
      <Container size="lg">
        <Title order={2} className="text-4xl md:text-5xl font-bold mb-6 text-center">
          오픈소스 기여
        </Title>
        <Text size="lg" c="dimmed" className="text-center mb-12 md:mb-16">
          커뮤니티와 함께 성장하는 개발자
        </Text>

        <Grid>
          {openSourceProjects.map((project) => (
            <Grid.Col key={project.name} span={{ base: 12, sm: 6, md: 4 }}>
              <Card shadow="sm" padding="lg" radius="md" className="h-full">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <Text size="lg" fw={700}>{project.name}</Text>
                  </div>
                  <Badge color="blue" variant="light">{project.language}</Badge>
                </div>

                <Text size="sm" c="dimmed" className="mb-4">
                  {project.description}
                </Text>

                <Group gap="lg" className="mb-4">
                  <Group gap="xs">
                    <IconStar size={16} />
                    <Text size="sm">{project.stars}</Text>
                  </Group>
                  <Group gap="xs">
                    <IconGitFork size={16} />
                    <Text size="sm">{project.forks}</Text>
                  </Group>
                  {project.downloads && (
                    <Group gap="xs">
                      <IconDownload size={16} />
                      <Text size="sm">{project.downloads}/week</Text>
                    </Group>
                  )}
                </Group>

                <Button
                  variant="light"
                  color="blue"
                  fullWidth
                  component="a"
                  href={project.url}
                  target="_blank"
                  leftSection={<IconBrandGithub size={16} />}
                >
                  View on GitHub
                </Button>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </section>
  );
}